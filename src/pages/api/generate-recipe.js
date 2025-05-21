import { CohereClientV2 } from 'cohere-ai';

const cohereClient = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt, userMessage } = req.body;
    if (!prompt || !userMessage) {
      return res.status(400).json({ error: "Prompt and userMessage are required" })
    }
    try {
      const chat = await cohereClient.chat({
        model: 'command-a-03-2025',
        messages: [
          {
            role: 'system',
            content: 'You are a skilled AI sous-chef specializing in creating delicious, realistic recipes',
          },
          { role: 'user', content: [{ type: 'text', text: prompt }] },
          { role: 'user', content: [{ type: 'text', text: userMessage }] },
        ],
        temperature: 0.7
      });
      if (!chat || !chat.message || !chat.message.content) {
        return res.status(500).json({ error: 'Failed to generate recipe' });
      }
      return res.status(200).json({ chatResponse: chat.message.content[0].text });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}