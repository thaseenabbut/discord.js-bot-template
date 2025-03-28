require("colors");
const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isButton()) {
            return;
        }

        if (interaction.isStringSelectMenu()) {
            return;
        }

        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.SlashCommands.get(interaction.commandName);

        if (!command) {
            console.error('[Client/Error]'.red.bold, `No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error('[Slash Command Error]'.red.bold, error);
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setDescription('🚫 An unknown error occurred while executing this command. Please try again later.');

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    }
};