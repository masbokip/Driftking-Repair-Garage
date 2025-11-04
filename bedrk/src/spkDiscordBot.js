const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_SPK;

client.once('ready', () => {
  console.log(`🤖 BOT Spk Aktif`);
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

function sendUserNotification(id_spk, nama_user, nama_client, jenis_kendaraan, pengerjaan, total_pengerjaan, total_modal, tanggal) {
  const channel = client.channels.cache.get(CHANNEL_ID);
  
  if (!channel) return console.error("Channel not found");
    const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(total_pengerjaan);

   const formattedModal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(total_modal);

//    const pengerjaanFormatted = formatPengerjaanList(pengerjaan);

  channel.send(
    "━━━━━━━━━━━━━━━━━━━━━━\n" +
    `**Surat Perintah Kerja** ***${id_spk}***\n` +
    "```" + 
    `🧑‍🔧Nama Mekanik       : ${nama_user}\n`+
    `👧Nama Client        : ${nama_client}\n`+
    `🛻Jenis Kendaraan    : ${jenis_kendaraan}\n` +
    `🛠️Pengerjaan         : \n` +
    `${pengerjaan}\n` + 
    `📆Tanggal Pengerjaan : ${tanggal}\n` +
    "```"+
    `**Modal                  :** *** ${formattedModal}***\n` +
    `**Total Invoice      :** *** ${formattedTotal}***\n`
    );
}
client.login(TOKEN);
module.exports = {
  sendUserNotification,
};