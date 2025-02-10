const { spawn } = require("child_process");

function startBot() {
  const bot = spawn("node", ["bot.js"], { stdio: "inherit" });

  bot.on("exit", (code) => {
    if (code === 1) {
      console.log("🔄 Bot crashed! Restarting...");
      setTimeout(startBot, 3000); // Restart setelah 3 detik
    }
  });

  bot.on("error", (err) => {
    console.error("❌ Error saat menjalankan bot:", err);
  });
}

startBot();
