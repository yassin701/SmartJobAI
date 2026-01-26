import { useState } from "react";
import { generateMotivationLetter } from "../services/aiLetter";

export default function GenerateMotivationButton({ formData, setFormData }) {
  const [aiLoading, setAiLoading] = useState(false);

  const handleGenerateAI = async () => {
    if (!formData.name || !formData.domain || !formData.skills) {
      alert("Please fill name, domain and skills first");
      return;
    }

    try {
      setAiLoading(true);

      const aiText = await generateMotivationLetter({
        name: formData.name,
        domain: formData.domain,
        skills: formData.skills,
      });

      setFormData((prev) => ({
        ...prev,
        motivation: aiText,
      }));
    } catch (err) {
      alert("AI generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  const isDisabled =
    aiLoading || !formData.name || !formData.domain || !formData.skills;

  return (
    <button
      type="button"
      onClick={handleGenerateAI}
      disabled={isDisabled}
      className={`px-4 py-2 text-sm font-medium rounded-lg text-white transition
        ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
      `}
    >
      {aiLoading ? "Generating..." : "Generate with AI"}
    </button>
  );
}
