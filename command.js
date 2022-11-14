const { ApplicationCommandType } = require('discord.js');

const { sendWebHook, sendButton, sendResult, sendError } = require("./send");

const commands = {
    name: 'pin',
    type: ApplicationCommandType.Message
};

async function run(interaction) {
    return new Promise(async (resolve) => {
        try {
            const message = interaction.targetMessage;

            const result = await sendWebHook(message);

            const channel = interaction.guild.channels.cache.get(result.channel_id);

            const url = `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`

            const pin = await channel.messages.fetch(result.id);
            sendButton(pin, url);

            resolve(`pin: ${url}`);//成功 return

            // 実行結果 Discord 送信
            sendResult(pin, interaction);// 成功
        } catch (err) {

            resolve(err);//エラー return

            // 実行結果 Discord 送信
            sendError(interaction);// エラー
        }
    });
}

module.exports = {
    commands: commands,
    run: run
}