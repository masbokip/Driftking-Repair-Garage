const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_RESTOCK;

client.once('ready', () => {
  console.log(`🤖 BOT Restock Aktif`);
});

// function formatPengerjaanList(pengerjaanList) {
//   return pengerjaanList.map(({ kebutuhan, harga }, idx) => {
//     const formattedHarga = new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(harga);
//     return `  ${idx + 1}. ${kebutuhan} - ${formattedHarga}`;
//   }).join('\n');
// }

function sendUserNotification(nama_manager, nama_invoice, daftar_toolkit, total_invoice, tanggal) {
  const channel = client.channels.cache.get(CHANNEL_ID);
  
  if (!channel) return console.error("Channel not found");
    const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(total_invoice);

//    const pengerjaanFormatted = formatPengerjaanList(pengerjaan);

  channel.send(
    "━━━━━━━━━━━━━━━━━━━━━━\n"+
    `** Pembelian Toolkit **\n` +
    "```"+
    `🧑‍💼Nama Manager       : ${nama_manager}\n` +
    `🧑‍🔧Nama Invoice       : ${nama_invoice}\n` +
    `💵Total Invoice      : ${formattedTotal}\n` +
    `🛠️Daftar Toolkit     : \n` +
    `${daftar_toolkit}\n` +
    `📆Tanggal Invoice    : ${tanggal}\n` +
    "```"
    );
}

client.login(TOKEN);

module.exports = {
  sendUserNotification,
};