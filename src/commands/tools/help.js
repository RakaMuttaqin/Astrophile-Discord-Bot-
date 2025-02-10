const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Menampilkan bantuan dengan tombol interaktif"),

  async execute(interaction, client) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("helpButton")
        .setLabel("Lihat Bantuan")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      content: "Klik tombol di bawah untuk melihat bantuan:",
      components: [row],
      flags: MessageFlags.Ephemeral,
    });
  },
};
