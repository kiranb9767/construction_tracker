import Site from "../models/Site.js";
import dotenv from "dotenv";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq";

dotenv.config();

const groq = new ChatGroq({
  temperature: 0,
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
  maxTokens: 500,
});

export async function startConversation(message) {
  try {
    const sites = await Site.find();

    const context = sites
      .map((site, index) => {
        return `
            Site ${index + 1}:
            Name: ${site.name}
            Location: ${site.location}
            Budget: ${site.budget}
            Owner:${site.owner}
            startDate:${site.startDate}
            endDate:${site.endDate}
            Materials:
            ${site.Materials.map((m) => `- ${m.name}, Qty: ${m.quantity}, Unit: ${m.unit}, Price: ${m.price} ,Brand: ${m.brand}, DateOfPurchase: ${m.dateOfPurchase}, DateOfPayment: ${m.dateOfPayment}, mediumofPayment: ${m.mediumofPayment}`).join("\n")}
            Labours:
            ${site.Labours.map((l) => `- ${l.name},labourType: ${l.labourType}, Salary: ${l.salary}, date: ${l.date}, mediumofPayment: ${l.mediumofPayment}`).join("\n")}`;
      })
      .join("\n\n");

    console.log("Context for LLM:", context);

    const response = await triggerLLM(message, context);
    console.log("Response from LLM:", response);
    return response;
  } catch (error) {
    console.error("Error in startConversation:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
}

async function triggerLLM(message, context) {
  console.log("Message from user:", message);
  console.log("Context provided to LLM:", context);

  const response = await groq.invoke([
    new SystemMessage(`
            You are a construction data assistant.
            Answer the user's query based on the provided construction site data.
           `),
    new HumanMessage(`
            Context: ${context}
            User: ${message}`),
  ]);

  return response.content;
}
