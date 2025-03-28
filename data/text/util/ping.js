module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    async prefixExecute(message) {
        message.reply('Pong!');
    },
};
