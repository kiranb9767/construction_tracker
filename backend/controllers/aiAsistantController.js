import Site from "../models/Site.js";
import dotenv from "dotenv";
import {
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq";
import { tool } from "langchain/tools";
import { z } from "zod";

dotenv.config();

const mongoTool = tool(
  async ({ method, query, projection, pipeline }) => {
    if (method === "find") {
      const data = await Site.find(query || {}, projection || {});
      return `Database Result:\n${JSON.stringify(data, null, 2)}`;
    }

    if (method === "aggregate") {
      const data = await Site.aggregate(pipeline || []);
      return `Database Result:\n${JSON.stringify(data, null, 2)}`;
    }

    return "Invalid method";
  },
  {
    name: "mongo_db_tool",
    description: `
Use this tool to query construction site database.

Schema:

Site:
- name (string)
- location (string)
- owner (string)
- budget (number)
- startDate (date)
- endDate (date)

Materials:
- name, quantity, unit, price, brand, dateOfPurchase, dateOfPayment, mediumofPayment

Labours:
- name, labourType, salary, date, mediumofPayment

Virtual fields:
- spent = total material + labour cost
- remainingBudget = budget - spent

Rules:
- Use "find" for simple queries
- Use "aggregate" for totals, sums, filtering arrays
- Always return correct MongoDB query
    `,
    schema: z.object({
      method: z.enum(["find", "aggregate"]),
      query: z.any().optional(),
      projection: z.any().optional(),
      pipeline: z.array(z.any()).optional(),
    }),
  },
);

const groq = new ChatGroq({
  temperature: 0,
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  maxTokens: 500,
}).bindTools([mongoTool]);

const formatterLLM = new ChatGroq({
  temperature: 0,
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  maxTokens: 500,
});
export async function startConversation(message) {
  try {
    const messages = [
      new SystemMessage(`
You are a construction data assistant.
Use mongo_db_tool to fetch data.
Do NOT guess.
      `),
      new HumanMessage(String(message)),
    ];

    let response = await groq.invoke(messages);

    console.log("First response:", response);

    if (response.tool_calls?.length) {
      const toolCall = response.tool_calls[0];

      const result = await mongoTool.invoke(toolCall.args);

      const formattedResponse = await formatterLLM.invoke([
        new SystemMessage(`
You are a construction assistant.

You will be given:
1. A user question
2. Database result

Your job:
- Answer the question using ONLY the data
- If answer not found → say "No data found"
- DO NOT ask for question again
- DO NOT explain JSON
- Just give final answer
`),
        new HumanMessage(
          JSON.stringify({
            question: message,
            data: result,
          }),
        ),
      ]);

      console.log("Formatted response:", formattedResponse);

      return formattedResponse.content;
    }

    console.log("Final response:", response);

    return response.content;
  } catch (error) {
    console.error("Error in startConversation:", error);
    return "Error processing request";
  }
}
