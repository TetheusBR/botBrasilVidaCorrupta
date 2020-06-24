module.exports = {
  run: async ({ message }) => {
    message.channel.send('**IP do servidor**: \`mtasa://EM-BREVE\`, *MTA:SA** \`1.5.7` ')
  },
  name: 'serverip',
  aliases: ['ip'],
  description: 'Mostrar o ip do servidor.'
}