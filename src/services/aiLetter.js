import axios from "axios";

export const generateMotivationLetter = async ({ name, domain, skills }) => {
const prompt = `
Write a short motivation letter (only 6 lines).
Use only these data: name, domain, skills.
Do NOT add any placeholders like [Company Name].

Dear Hiring Manager,

My name is ${name}. I am a student in ${domain} and I am motivated to join your team.
My skills include: ${skills}.
I am eager to learn and grow in a professional environment.
Thank you for your time and consideration.

Sincerely,
${name}
`;



  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_AI}`,
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // ✅ Gemini response
  return res.data.candidates[0].content.parts[0].text;
};
