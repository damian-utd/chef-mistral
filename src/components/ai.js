import { HfInference } from '@huggingface/inference'

// const SYSTEM_PROMPT = `
// You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. Dont include a preview look and dont use "*" sign. Use only european units.
// `

const SYSTEM_PROMPT = `
You are a cooking assistant. The user will provide a list of ingredients they have, and your task is to suggest a recipe they can make using some or all of these ingredients. 
- start the message with name of the dish
- don't say hello
- You do not need to use every ingredient the user provides. 
- You may include additional ingredients if necessary, but keep them minimal. 
- Format your response clearly in Markdown, suitable for rendering on a web page. 
- Do not include a preview or visual styling hints. 
- Avoid using the "*" sign. 
- Use only European units (grams, liters, etc.). 
- Include sections for "Ingredients" and "Instructions". 
- Make the instructions concise, clear, and easy to follow.
`


const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.3",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
