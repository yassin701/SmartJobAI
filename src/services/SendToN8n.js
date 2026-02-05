import axios from "axios";

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_API_KEY;

export const sendToN8n = async (applicationData) => {
  try {
    const response = await axios.post(
      N8N_WEBHOOK_URL,
      applicationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Send to n8n failed:", error);
    throw error;
  }
};
