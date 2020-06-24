const { MessageEmbed } = require("discord.js");
module.exports = {
  run: async (member) => {
    if (member.user.bot) return;

    const channel = member.guild.channels.get("705966125346717798"),
      channelCount = member.guild.channels.get('705966125346717798'),
      membersArray = member.guild.memberCount.toString().split(''),
      emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'],
      count = membersArray.map((i) => emojis[i]).join(' ');

    channelCount.setTopic(`Bem-vindos ao Brasil Vida Corrupta, estamos com exatamente ${count} membros.`);
    channel.send(new MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setDescription(`${member} saiu do servidor 😥 atualmente temos \`${member.guild.memberCount}\` membros.`)
      .setColor('#00f7ff')
      .setThumbnail(member.guild.iconURL({ size: 1024, format: 'png' }))
    );
  },
};
