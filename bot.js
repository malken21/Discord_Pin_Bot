const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const { token } = require("./Config.json");
const { commands, run } = require("./command");

client.on(Events.ClientReady, async () => {
    client.application.commands.set([commands]);//コマンド生成
    console.log(`login: (${client.user.tag})`);
});

client.on(Events.InteractionCreate, async interaction => {
    await interaction.deferReply({ ephemeral: true });
    console.log(await run(interaction))
});

client.login(token);