import Groq from "groq-sdk";


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generatedContent = async (difficulty, timeLimit) => {
  const fallbackText = "Loading typing practice text... start typing here!";

  try {
    const prompt = `
    Unique test id: ${Date.now()}
Generate typing practice text based on the following parameters:

Difficulty Mode: ${difficulty}  (easy, medium, hard)
Time Limit: ${timeLimit} min (1min, 3min, or 5min)

Automatically determine an appropriate character count based on the time limit:
- 1 minute: ~700–900 characters
- 3 minutes: ~1800–2200 characters
- 5 minutes: ~3000–3500 characters

Constraints:
- Produce a single continuous paragraph.
- No markdown formatting.
- Create either a short story, an article-style passage, or a descriptive narrative (your choice).
- Easy mode: simple vocabulary, short sentences.
- Medium mode: moderately varied vocabulary and mixed sentence length.
- Hard mode: complex vocabulary, advanced sentence structures, richer punctuation.
- Keep the text coherent and engaging.
`

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", 
      
      temperature: 0.8, 
    });

    return chatCompletion.choices[0]?.message?.content || fallbackText;

  } catch (err) {
    console.error("Error generating text with Groq:", err);
    return fallbackText;
  }
};

export default generatedContent;
    