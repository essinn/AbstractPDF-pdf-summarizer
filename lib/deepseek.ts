import axios from "axios";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY!;
const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL!;

export const summarizePDF = async (text: string) => {
  try {
    const res = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: `Summarize this PDF content in 3-5 concise paragraphs: ${text.substring(
              0,
              3000
            )}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    return res.data.choices[0].message.content;
  } catch (error) {
    console.log("Failed to summarize PDF: ", error);
    throw new Error("Failed to summarize PDF");
  }
};
