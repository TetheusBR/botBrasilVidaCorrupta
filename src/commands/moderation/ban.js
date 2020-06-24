module.exports = {
  run: async ({ message, args }) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]),
      reason = args.slice(1).join(' ');

    if (!member) {
      return message.reply(`Por favor, insira o id ou mencione o usuário que deseja banir.`);
    } else if (!reason) {
      return message.reply(`Por favor, insira um motivo para banir este usuário.`);
    } else if (message.member.user.equals(member.user)) {
      return message.reply('Você não pode banir a si mesmo.');
    } else {
      const msg = await message.reply(`Você tem certeza de banir o usuário ${member} pelo motivo: \`${reason}\` ? <:CheckMark_Win10:613734678167289880> para **SIM** e <:WrongMark_Win10:613734677890465822> para **NÃO**.`),
        emojis = ['613734678167289880', '613734677890465822'];

      for (const i in emojis) {
        await msg.react(emojis[i]);
      }

      const filter = (r, u) => r.me && u.equals(message.author),
        collector = msg.createReactionCollector(filter, { max: 1, time: 60 * 1000 });

      collector.on('collect', async (r) => {
        msg.delete();
        switch (r.emoji.id) {
          case emojis[0]: {
            if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
              return message.reply(`Desculpe, eu preciso da permissão \`BAN_MEMBERS\` para executar este comando.`);
            } else if (!message.member.permissions.has('BAN_MEMBERS')) {
              return message.reply(`Desculpe, você precisa da permissão \`BAN_MEMBERS\` para executar este comando.`);
            } else if (message.member.user.equals(message.guild.owner.user)) {
              await member.send(`» **${member.user.username}** | Você foi banido por **${message.author.username}**. \n» Motivo: \`${reason}\`.`).catch(() => null);
              await member.ban(reason);
              return message.reply(`» O usuário **${member.user.tag} ID:** \`${member.user.id}\` | Foi banido com sucesso. <:CheckMark_Win10:613734678167289880>`);
            } else if (member.user.equals(message.guild.owner.user)) {
              return message.reply(`Desculpe, você não pode banir o dono do servidor.`);
            } else if (message.guild.me.roles.highest.position <= member.roles.highest.position) {
              return message.reply(`Desculpe, o meu cargo é menor ou igual ao usuário a ser banido.`);
            } else if (member.roles.highest.position >= message.member.roles.highest.position) {
              return message.reply(`Desculpe, o cargo do usuário a ser banido é maior ou igual ao seu.`);
            } else {
              await member.send(`» **${member.user.username}** | Você foi banido por **${message.author.username}**. \n» Motivo: \`${reason}\`.`).catch(() => null);
              await member.ban(reason);
              message.reply(`» O usuário **${member.user.tag} ID:** \`${member.user.id}\` | Foi banido com sucesso. <:CheckMark_Win10:613734678167289880>`);
            }
            break;
          }
          case emojis[1]: {
            message.reply(`» A acão de banimento do usuário **${member.user.tag}** ID: \`${member.user.id}\` | Foi cancelada. <:WrongMark_Win10:613734677890465822>`);
            break;
          }
        }
      });
    }
  },
  name: 'ban',
  aliases: ['banir', 'punir'],
  category: 'Moderação',
  description: 'Banir um usuário.',
};
