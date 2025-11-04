require('dotenv').config(); // npm install dotenv
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_IZIN;

client.once('ready', () => {
  console.log(`🤖 BOT Izin Aktif`);
});

function sendUserNotification(nama_user, alasan_ic, alasan_ooc, durasi, tanggal) {
  const channel = client.channels.cache.get(CHANNEL_ID);
  if (!channel) return console.error("Channel not found");

  channel.send(
  "━━━━━━━━━━━━━━━━━━━━━━\n"+
  `**SURAT IZIN**\n` +
  "```" + 
  `🧑‍🔧Nama Crew  : ${nama_user}\n` +
  `📃AlasanIC   : ${alasan_ic}\n` +
  `📃AlasanOOC  : ${alasan_ooc}\n` +
  `🕧Durasi     : ${durasi}\n` +
  `📌Tanggal    : ${tanggal}\n` +
  "```"
);
}

client.login(TOKEN);

module.exports = {
  sendUserNotification,
};
