require("colors");
const { Events, EmbedBuilder } = require('discord.js');
const { prefix } = require("../config/default.json");

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot || !message.guild) return;

        if (!message.content.startsWith(prefix)) return;

        const client = message.client;
        if (message.author.bot || !message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.MessageCommands.get(commandName);
        if (!command) return;

        try {
            await command.prefixExecute(message, args);
        } catch (error) {
            console.error('[Text Command Error]'.red.bold, error);
            await message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription('🚫 An unknown error occurred while executing this command. Please try again later.')
                ]
            });
        }
    }
};