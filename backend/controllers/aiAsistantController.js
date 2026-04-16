import Site from "../models/Site.js";
import dotenv from "dotenv";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq";

dotenv.config();

const groq = new ChatGroq({
  temperature: 0,
  apiKey: process.env.GROQ_API_KEY,
  model: "lllama-3.1-8b-instant",
  maxTokens: 500,
});

async function startConversation(req, res) {
  try {
    const { userId, message } = req.body;

    const sites = await Site.find({ user: userId });

    // generate context from sites data
    const context = sites
      .map((site, index) => {
        return `
            Site ${index + 1}:
            Name: ${site.siteName}
            Location: ${site.location}
            Budget: ${site.budget}
            Owner:${site.owner}
            startDate:${site.startDate.toDateString()}
            endDate:${site.endDate.toDateString()}
            Materials:
            ${site.Materials.map((m) => `- ${m.name}, Qty: ${m.quantity}, Price: ${m.price}`).join("\n")}
            Labours:
            ${site.Labours.map((l) => `- ${l.name}, Salary: ${l.salary}`).join("\n")}`;
      })
      .join("\n\n");

    // trigger LLm with message and context
    const response = await triggerLLM(message, context);

    res.status(200).json({ response });
  } catch (error) {
    console.error("Error in startConversation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the conversation." });
  }
}

async function triggerLLM(message, context) {
  console.log("Message from user:", message);
  console.log("Context provided to LLM:", context);

  const response = await groq.invoke([
    new SystemMessage(`You are a helpful assistant to construction project managers, 
                           Answer based on the context provided..`),
    new HumanMessage(`
            Context: ${context}
            User: ${message}`),
  ]);

  return response.content;
}

export default { startConversation };
