import axios from "axios";

export const generateMotivationLetter = async ({ name, domain, skills }) => {
const prompt = `
Write a professional and concise motivation letter in exactly 10 lines.

Rules:
- Use ONLY the following data: name, domain, skills.
- Do NOT invent company names.
- Do NOT add placeholders like [Company Name].
- Keep the tone confident and professional.
- Do NOT repeat information unnecessarily.

Structure:
Line 1: Dear Hiring Manager,
Line 2: Introduce the candidate using name and domain.
Line 3: Express strong interest in the professional field.
Line 4: Explain what motivates the candidate in this domain.
Line 5: Highlight key strengths related to the domain.
Line 6: Present skills naturally in one sentence.
Line 7: Show readiness to apply skills in real projects.
Line 8: Emphasize willingness to learn and improve.
Line 9: Express enthusiasm to contribute to a team.
Line 10: Closing with Sincerely + name.

Data:
Name: ${name}
Domain: ${domain}
Skills: ${skills}
`;


  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_AI}`,
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
