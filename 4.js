const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzU1NzU5NzU1Njg3MTAwNDU2.X2H-Hw.7C6e1iLGjI3Vx7dxj6yXd3AQYto';
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == '!가격표') {
    let img = 'https://cdn.discordapp.com/attachments/755736337662869574/756499620296786010/1.png';
    let embed = new Discord.RichEmbed()
      .setTitle('디스코드 부동산 가격표')
      .setURL('http://www.naver.com')
      .setAuthor('서버스 이용하기전에 꼭 확인하세요!', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('1단계:서버틀', '채널만 만들어져있으며 가격은 무료입니다')
      .addField('2단계:서버 기본팩', '어는정도의 채널,봇이 추가,세팅이 되있습니다', true)
      .addField('3단계:서버 업그레이드 팩', '기본팩보다 더 좋은것들이 추가되있습니다', true)
      .addField('4단계:서버 선택팩', '선택할수있는 항목은 샵,파이브엠 이렀게 두개가 있습니다', true)
      .addField('모든 단계 가격표', '1단계:공짜\n2단계:3000원\n3단계:5000원,4단계:샵5000원,파이브엠7000원\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('제작자:파이리#1482,봇 소스:나긋해', img)

    message.channel.send(embed)
  } else if(message.content == '!바로가기') {
    let helpImg = 'https://cdn.discordapp.com/attachments/755736337662869574/756499620296786010/1.png';
    let commandList = [
      {name: '자유채팅방', desc: '<#755736255991644222>'},
      {name: '스크린샷,사진 자랑하는 방', desc: '<#755736337662869574>'},
      {name: '공지사항,태그가 되있으면 꼭 읽어보세요', desc: '<#755738531850092625>'},
      {name: '저희 서버 서비스 이용 가격표입니다', desc: '<#755735438559281172>'},
      {name: '서비스 신청 양식', desc: '<#755735620953047090>'},
      {name: '서비스 신청방', desc: '<#755735641618382909>'},   
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('편하게 이용하는 바로가기 기능', helpImg)
      .setColor('#186de6')
      .setFooter(`디스코드 부동산 시스템`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);