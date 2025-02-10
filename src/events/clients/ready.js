const fs = require("fs");
const path = require("path");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`✅ Bot ${client.user.tag} is now online!`);

    // Menampilkan daftar server yang bot ikuti
    console.log(`📌 Connected to ${client.guilds.cache.size} servers!`);

    // Menampilkan jumlah total pengguna di semua server
    let totalUsers = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );
    console.log(`👥 Watching over ${totalUsers} users across all servers.`);

    // Mendapatkan waktu bot mulai berjalan
    const startTime = new Date();
    console.log(`🕒 Bot started at: ${startTime.toLocaleString()}`);

    // Menyimpan log waktu bot aktif ke dalam file
    const logFile = path.join(__dirname, "../../bot.log"); // Simpan di root proyek

    function logUptime() {
      const now = new Date();
      const uptime = now - startTime; // Waktu uptime dalam milidetik

      // Konversi uptime ke jam, menit, detik
      const hours = Math.floor(uptime / (1000 * 60 * 60));
      const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

      const logMessage = `[${now.toLocaleString()}] Uptime: ${hours}h ${minutes}m ${seconds}s\n`;

      // Tulis log ke file
      fs.appendFileSync(logFile, logMessage, "utf8");

      console.log(`📜 ${logMessage.trim()}`);
    }

    // Log uptime setiap 10 menit (600000 ms)
    setInterval(logUptime, 600000);

    // Mengatur status bot
    const statuses = [
      `📢 Listening to !help`,
      `👀 Watching ${totalUsers} users`,
      `🎮 Playing with commands`,
      `⚡ Online and ready!`,
    ];

    let i = 0;
    setInterval(() => {
      client.user.setPresence({
        activities: [{ name: statuses[i], type: "PLAYING" }],
        status: "online",
      });

      i = (i + 1) % statuses.length;
    }, 2000);

    process.on("uncaughtException", (err) => {
      const errorMessage = `[${new Date().toLocaleString()}] Uncaught Exception: ${
        err.stack
      }\n`;
      fs.appendFileSync(errorLog, errorMessage, "utf8");
      console.error("🔥 Bot crashed! Restarting...");
      process.exit(1); // Exit agar `bot-restart.js` bisa mendeteksi crash
    });

    process.on("unhandledRejection", (reason, promise) => {
      const errorMessage = `[${new Date().toLocaleString()}] Unhandled Rejection: ${reason}\n`;
      fs.appendFileSync(errorLog, errorMessage, "utf8");
      console.error(
        "⚠️ Unhandled Promise Rejection! See error.log for details."
      );
    });
  },
};
