const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzU1NzU5NzU1Njg3MTAwNDU2.X2H-Hw.7C6e1iLGjI3Vx7dxj6yXd3AQYto';
const welcomeChannelName = "🎉안녕하세요";
const byeChannelName = "🌈안녕히가세요";
const welcomeChannelComment = "안녕하세요! 저희 디코 부동산에 오신걸환영합니다";
const byeChannelComment = "안녕히가세요, 나중에 필요하시면 다시 오세요!";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(token);