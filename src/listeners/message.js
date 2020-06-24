module.exports = {
  run: async function(message) {
    const prefix = process.env.PREFIX;

    if (message.author.bot || message.channel.type == "DM") return;

    if (message.content.toLowerCase().startsWith(prefix)) {
      const args = message.content.slice(prefix.length).split(' '),
        nome = args.shift().toLowerCase(),
        command = this.commands.find((cmd) => (cmd.aliases && cmd.aliases.includes(nome)) || cmd.name === nome);

      if (command) {
        if (command.usersCooldown.has(message.author.id)) {
          const m = await message.channel.send("Aguarde \`3s\` para usar outro comando novamente.");
          return m.delete({ timeout: 60 * 1000 });
        } else {
          Object.defineProperty(message, 'command', { value: command });
          command.run({ bot: this, message, args });
          command.usersCooldown.add(message.author.id);
          setTimeout(() => {
              command.usersCooldown.delete(message.author.id);
          }, command.cooldown);
        }
      }
    }
    const botMention = message.guild ? message.guild.me.toString() : this.user.toString();
    if (!message.command) {
      if (message.content.startsWith(botMention)) {
        const msg = await message.channel.send(`**${message.author.tag}** | Olá eu sou o bot oficial do Brasil Vida Corrupta, está com dúvidas? Digite /help.`)
        return msg.delete({ timeout: 60 * 1000 });
      }
    }
  }
}
