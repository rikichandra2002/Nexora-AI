import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

try {
    const models = await client.models.list();

    console.log("\nAVAILABLE GEMINI MODELS:\n");

    for await (const model of models) {
        console.log(model.id);
    }
} catch (error) {
    console.error("\nGEMINI MODEL ERROR:");
    console.error(error.message);
}