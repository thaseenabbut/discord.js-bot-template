require("colors");
const { Events, REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config();

const commands = [];
const slashCommandsPath = path.join(path.resolve('data'), 'slash');
const slashCommandFolders = fs.readdirSync(slashCommandsPath)
const rest = new REST().setToken(TOKEN);

const guildId = process.env.GUILD_ID
const clientId = process.env.CLIENT_ID

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(application) {
        console.log("Bot Started".green.bold, "ON".white.bgGreen, application.user.username);

        // Load slash commands
        for (const folder of slashCommandFolders) {
            const slashPath = path.join(slashCommandsPath, folder);
            const slashCommandFiles = fs.readdirSync(slashPath).filter(file => file.endsWith('.js'));
            for (const file of slashCommandFiles) {
                const filePath = path.join(slashPath, file);
                const command = require(filePath);

                if (command.data) {
                    commands.push(command.data.toJSON());
                    application.SlashCommands.set(command.data.name, command);
                }
            }

            // Load text commands
            const textCommandsPath = path.join(path.resolve('data'), 'text');
            const textCommandFolders = fs.readdirSync(textCommandsPath)

            for (const folder of textCommandFolders) {
                const textPath = path.join(textCommandsPath, folder);
                const textCommandFiles = fs.readdirSync(textPath).filter(file => file.endsWith('.js'));
                for (const file of textCommandFiles) {
                const filePath = path.join(textPath, file);
                const command = require(filePath);
                if (command.name && command.prefixExecute) {
                    application.MessageCommands.set(command.name, command);
                    if (command.aliases) {
                        command.aliases.forEach(alias => {
                            application.MessageCommands.set(alias, command);
                        });
                    }
                }
            }
        }
    }
        
        console.log(`Added ${(application.SlashCommands.size.toString())} slash commands`);
        console.log(`Added ${(application.MessageCommands.size.toString())} text commands`);

        try {
            console.log(`Started refreshing ${commands.length} slash commands.`);

            const data = await rest.put(
                Routes.applicationCommands(clientId, guildId), 
                { body: commands },
            );

            console.log(`Successfully reloaded ${data.length} slash commands`);
        } catch (error) {
            console.error(error);
        }
    },
}