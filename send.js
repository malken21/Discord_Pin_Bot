const { WebhookClient, Attachment } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const { WebHooks } = require("./webhook");

function sendWebHook(message) {//ピン留めメッセージ設置
    return new Promise(async (resolve) => {
        const WebHook = WebHooks[message.guildId];

        // WebHookが登録されていなかったら false
        if (!WebHook) resolve(false);

        const send = {
            "content": message.content,
            "username": message.author.username,
            "avatarURL": message.author.avatarURL(),
            "tts": message.tts,
            "embeds": message.embeds,
            "components": message.components,
        };
        if (message.content.length == 0 && message.embeds.length == 0) {
            send.content = "表示できないメッセージ";
        }
        const webhookClient = new WebhookClient({ id: WebHook.id, token: WebHook.token });

        resolve(await webhookClient.send(send));
    });
}
function sendButton(message, url) {//ピン留めチャンネルにボタン設置
    message.reply({
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setURL(url)
            .setLabel('メッセージへジャンプ')
            .setStyle(ButtonStyle.Link)
        )]
    });
}
function sendResult(pin, interaction) {//Discordにピン留め通知
    const url = `https://discord.com/channels/${pin.guildId}/${pin.channelId}/${pin.id}`
    interaction.editReply({
        content: "ピン留めしました",
        ephemeral: true,
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setURL(url)
            .setLabel('メッセージへジャンプ')
            .setStyle(ButtonStyle.Link)
        )]
    });
}
function sendError(interaction) {//Discordにエラー通知
    interaction.editReply({
        content: "ピン留めできませんでした",
        ephemeral: true
    });
}

module.exports = {
    sendWebHook: sendWebHook,
    sendButton: sendButton,
    sendResult: sendResult,
    sendError: sendError
}