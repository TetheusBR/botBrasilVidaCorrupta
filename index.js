require('dotenv').config();
const { Client, Message } = require('discord.js');
const FileUtils = require('./src/utils/FileUtils');

const CLIENT_OPTIONS = {
  fetchAllMembers: true,
  disableEveryone: true,
  disabledEvents: ['TYPING_START'],
};

const bot = new Client(CLIENT_OPTIONS);

bot.login().catch((e) => {
  console.error(e);
  process.exit(1);
});

bot
  .on('shardReconnecting', () => console.log('Client is reconnecting...'))
  .on('warn', (warn) => console.log(warn))
  .on('shardDisconnected', () => {
    console.log('Client is disconnecting...');
    process.exit(1);
  })
  .on('invalidated', () => {
    console.log('The client\'s session is now invalidated.');
    process.exit(1);
  });

process
  .on('uncaughtException', (error) => {
    const msg = error.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception:', msg);
    process.exit(1);
  })
  .on('unhandledRejection', (error) => console.error('Uncaught Promise Error:', error));

Message.prototype.reply = function(content) {
  if (this.author) return this.channel.send(`» **${this.author.tag}** | ${content}`);
  return this.channel.send(content);
};

bot.commands = [];
bot.map = new Map();

FileUtils.requireDirectory('src/commands', (command) => {
  command.usersCooldown = new Set();
  if (!command.cooldown) command.cooldown = 3000;
  bot.commands.push(command);
}, console.error).then(() => console.log('Comandos carregados.'));

FileUtils.requireDirectory('src/listeners', (listener, name) => {
  bot.on(name, listener.run);
}, console.error).then(() => console.log('Eventos carregados.'));
