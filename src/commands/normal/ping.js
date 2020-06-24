module.exports = {
  run: async ({ message, bot }) => {
    const msg = await message.channel.send('Calculando latência...');
    setInterval(() => msg.edit(`Latência do bot: \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\`\nLatência da API: \`${Math.round(bot.ws.ping)}ms\``), 1 * 1000);
  },
  name: 'ping',
  aliases: ['pg', 'latencia', 'latência'],
  description: 'Mostrar o ping do bot.'
}