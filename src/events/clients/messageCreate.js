module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    // Cek jika pengirim adalah bot, abaikan
    if (message.author.bot) return;

    // ==============================
    // 1️⃣ Prefix Commands Handling
    // ==============================
    const prefix = "as!"; // Ubah sesuai kebutuhan
    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      const command = client.commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(message, client, args);
      } catch (error) {
        console.error(error);
        await message.reply("Terjadi kesalahan saat menjalankan perintah ini.");
      }
    }

    // ==============================
    // 2️⃣ Interaction Messages (Bot Responses)
    // ==============================
    const lowerCaseMessage = message.content.toLowerCase();

    if (lowerCaseMessage.includes("halo bot")) {
      await message.reply("Halo! Ada yang bisa aku bantu? 😊");
    } else if (lowerCaseMessage.includes("bagaimana kabarmu")) {
      await message.reply("Aku hanyalah bot, tapi terima kasih sudah bertanya! 🤖");
    } else if (lowerCaseMessage.includes("siapa pembuatmu")) {
      await message.reply("Aku dibuat oleh Raka Zainal Muttaqin! 🔥");
    }
  },
};
