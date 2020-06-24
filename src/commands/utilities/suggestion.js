const { MessageEmbed } = require('discord.js');
module.exports = {
  run: async ({ message, bot }) => {
    const msg = await message.channel.send('Você tem \`60s\` para enviar uma sugestão.'),
      channel = message.guild.channels.get('705966140765241355'),
      filter = (m) => m.author.equals(message.author),
      collector = msg.channel.createMessageCollector(filter, { max: 1, time: 60 * 1000 });

    collector.on('collect', async (msg) => {
      const newMsg = await channel.send(new MessageEmbed()
        .setAuthor(`Sugestão enviada por ${message.member.user.tag}`, message.member.user.displayAvatarURL())
        .setDescription(msg.content)
        .setThumbnail(bot.user.avatarURL({ size: 1024, format: 'png' }))
        .setColor('#00f7ff')
        .setFooter('Brasil Vida Real IP: mtasa://EM-BREVE')
      ),
      emojis = ['613734678167289880', '613734677890465822'];

      message.reply('Sua sugestão foi enviada com sucesso, confira o status dela em <#705966140765241355>');
      for (const i in emojis) {
        await newMsg.react(emojis[i]);
      }
    });
  },
  name: 'suggestion',
  aliases: ['sugestão', 'sugestao', 'sugerir'],
  category: 'Utilidades',
  description: 'Enviar uma sugestão.',
}