module.exports = {
  data: {
    name: "pingButton",
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `🏓 Pong! Latency: ${client.ws.ping}ms`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
