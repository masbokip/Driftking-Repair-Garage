const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ABSEN;

client.once('ready', () => {
  console.log(`🤖 BOT Absen Aktif`);
});

function sendUserNotification(nama, tgl_absen1, tgl_absen2, total_duty) {
  const channel = client.channels.cache.get(CHANNEL_ID);
  if (!channel) return console.error("Channel not found");
  channel.send(
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  `** ABSENSI **\n` +
  "```" + 
  `🧑‍🔧Nama Crew   : ${nama}\n`+
  `🕒DutyON      : ${tgl_absen1}\n` +
  `🕔DutyOFF     : ${tgl_absen2}\n` +
  `⏳Total Duty  : ${total_duty}\n` +
  "```"
);
}

client.login(TOKEN);

module.exports = {
  sendUserNotification,
};