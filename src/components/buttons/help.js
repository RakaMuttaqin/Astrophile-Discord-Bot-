const { InteractionResponseType, MessageFlags } = require("discord.js");

module.exports = {
  data: {
    name: "helpButton",
  },
  async execute(interaction, client) {
    // Ambil semua command yang sudah terdaftar
    const commandList = client.commands
      .map((cmd) => `- \`/${cmd.data.name}\``)
      .join("\n");

    await interaction.reply({
      content: `📜 Berikut daftar command yang tersedia:\n${commandList}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
