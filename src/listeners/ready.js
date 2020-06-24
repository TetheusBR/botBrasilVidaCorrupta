const axios = require('axios');
module.exports.run = function() {
  const Interval = async () => {
    const response = await axios.get('https://www.game-state.com/COLOCAR-IP-SERVIDOR/');
    this.user.setPresence({ activity: { name: `com ${response.data.online ? response.data.players.online : "O servidor está offline."}/${response.data.online ? response.data.players.max : ""} jogadores!` }, status: 'online' });
  }
  Interval();
  setInterval(() => Interval(), 20 * 1000);
  console.log("Bot iniciado com sucesso!");
  console.log('Status carregado com sucesso!');
}