const { MessageEmbed } = require("discord.js");
module.exports = {
  run: ({ bot, message }) => {
    message.channel.send(new MessageEmbed()
      .setDescription("Formulário [Clique aqui](https://docs.google.com/forms/d/e/1FAIpQLSefPwafZAA_cunS-IfuVoQI7YXTDdAzEL9fRswzVtiwKrUFnQ/viewform)")
      .setColor("RANDOM")
    );
  },
  name: 'form',
  aliases: ['formulário', 'formulario'],
  category: 'Utilidades',
  description: 'Link do formulário.',
}