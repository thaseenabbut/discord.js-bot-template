const { Client, GatewayIntentBits, Partials, Options, Collection } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.User,
        Partials.Reaction,
        Partials.Message,
    ],
    makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        GuildMemberManager: {
            maxSize: 200,
            keepOverLimit: member => member.id === member.client.user.id,
        },
    }),
    sweepers: {
		...Options.DefaultSweeperSettings,
		messages: {
			interval: 3_600, // Every hour.
			lifetime: 1_800, // Remove messages older than 30 minutes.
		},
		users: {
			interval: 3_600, // Every hour.
			filter: () => user => user.bot && user.id !== user.client.user.id, // Remove all bots.
		},
	}
});

client.SlashCommands = new Collection();
client.MessageCommands = new Collection();
client.SubCommands = new Collection();

module.exports = client;