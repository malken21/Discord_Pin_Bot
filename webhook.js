const data = require("./webhook.json");

// ウェブフック 登録
const keys = Object.keys(data);

const WebHooks = {};

keys.map(key => {
    const split = data[key].split("/");
    WebHooks[key] = {
        // urlを tokenと idに分離
        "token": split.at(-1),
        "id": split.at(-2)
    }
});
module.exports = { WebHooks: WebHooks };