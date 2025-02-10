const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "categoryMenu",
  },
  async execute(interaction, client) {
    const selected = interaction.values[0];

    await interaction.reply({
      content: `📂 Anda memilih kategori: **${selected}**`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
