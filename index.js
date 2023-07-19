const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
  client.getChats().then((chats) => {
    console.log(chats[0]);
  });
});

const time = new Date();

// JSON verilerini okuma ve işleme
fs.readFile('C:\\Users\\abdur\\Desktop\\API-DENEME\\veriler.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Hata:', err);
    return;
  }

  const veri = JSON.parse(data);

  
  veri.forEach((element) => {
    const mesaj = element.mesaj;
    const date = element.date;
    const sendtime = new Date(date);
    if (time > sendtime) {
      
    } 
    const timeDifference = sendtime.getTime() - time.getTime();
    const delay = timeDifference + 1000;

    if(delay > 0 ){
      client.on('message', async (msg) => {
        const chat = await msg.getChat();
        const contact = await msg.getContact();
  
        console.log(delay + ' dk');
  
        if (delay > 0 && delay != 1000) {
          setTimeout(() => {
            chat.sendMessage(mesaj, {
              mentions: [contact],
            });
          }, delay);
        }
      });
    }
  });
});

client.initialize();

