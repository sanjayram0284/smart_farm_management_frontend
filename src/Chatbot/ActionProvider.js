import { getRecommendations, getSoils } from "../services/api";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  async handleRecommendation(text) {
    try {
      const soilsRes = await getSoils();
      const soilList = soilsRes.data.map(s => s.soilType.toLowerCase());

      let soil = soilList.find(s => text.includes(s));
      let season = ["summer", "winter", "rainy", "autumn"].find(sea =>
        text.includes(sea)
      );

      if (!soil || !season) {
        this.reply("Please mention valid soil and season.");
        return;
      }

      // 🔥 normalize for backend
      soil = soil.charAt(0).toUpperCase() + soil.slice(1);
      season = season.charAt(0).toUpperCase() + season.slice(1);

      const res = await getRecommendations(soil, season);

      if (res.data.length === 0) {
        this.reply("No crops found for this soil and season.");
        return;
      }

      const msg = res.data
        .map(c => `🌱 ${c.name} (₹${c.estimatedCost})`)
        .join("\n");

      this.reply(msg);
    } catch (err) {
      this.reply("Error fetching recommendations.");
    }
  }

  handleUnknown() {
    this.reply("Try: crops for loamy soil in winter");
  }

  reply(text) {
    const message = this.createChatBotMessage(text);
    this.setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  }
}

export default ActionProvider;
