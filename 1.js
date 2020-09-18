const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzU1NzU5NzU1Njg3MTAwNDU2.X2H-Hw.7C6e1iLGjI3Vx7dxj6yXd3AQYto';

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(token);