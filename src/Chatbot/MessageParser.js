class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const text = message.toLowerCase();

    // example: "crops for loamy soil in winter"
    if (text.includes("crop")) {
      this.actionProvider.handleRecommendation(text);
      return;
    }

    this.actionProvider.handleUnknown();
  }
}

export default MessageParser;
