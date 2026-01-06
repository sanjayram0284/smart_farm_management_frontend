import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "FarmBot 🌱",
  initialMessages: [
    createChatBotMessage(
      "Hi! Ask me crop recommendations.\nExample: crops for red soil in winter"
    )
  ],
};

export default config;
