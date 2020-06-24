const { MessageEmbed } = require("discord.js");
module.exports = {
  run: async (member) => {
    if (member.user.bot) return;

    const channel = member.guild.channels.get("6705966124373639269"),
      channelCount = member.guild.channels.get('6705966124373639269'),
      membersArray = member.guild.memberCount.toString().split(''),
      emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'],
      count = membersArray.map((i) => emojis[i]).join(' ');

    channelCount.setTopic(`Bem-vindos ao Brasil Vida Corrupta, estamos com exatamente ${count} membros.`);
    channel.send(new MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setDescription(`${member} Seja Bem-vindo(a) ao Discord do Brasil Vida Corrupta, atualmente temos \`${member.guild.memberCount}\` membros, leia as regras em <#705966127129428100> e evite ser punido do Discord/Servidor\n\n**IP do servidor**: mtasa://EM BREVE\n**Loja** [Link](https://lojabrasilvidacorrupta.tk)\n**Twitter**: [Link](https://twitter.com/bvcorruptamta)\n\nCaso tenha alguma dúvida sobre o bot digite /help, mas caso seja referente a outras dúvidas chame a staff.`)
      .setColor('#00f7ff')
      .setThumbnail(member.guild.iconURL({ size: 1024, format: 'png' }))
    );
  },
};
