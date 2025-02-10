const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "languageMenu",
  },
  async execute(interaction, client) {
    const selected = interaction.values[0];

    await interaction.reply({
      content: `✅ Bahasa dipilih: **${selected}**`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
