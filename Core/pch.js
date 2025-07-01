const { Client, Intents, MessageEmbed, AttachmentBuilder  } = require("discord.js");
const { token } = require('../config.json');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT
    ]
});

const {광고} = require('../food_echo.json');
let 광고수 = 광고.length

const footerUrl = "https://yt3.googleusercontent.com/ytc/AIdro_mQDcJrRKtDPylprKXd9SLw_tFmrhATMdUObt6h1ePbtQ=s900-c-k-c0x00ffffff-no-rj";
const foodJson = require('../food_echo.json');

const axios = require('axios');
const { getImage, getAttachmentLink } = require('../Manager/GetImage.js');


axios.defaults.baseURL = "https://open.neis.go.kr/hub"

module.exports = {
    Client,
    Intents,
    MessageEmbed,
    token,
    client,
    광고,
    광고수,
    footerUrl,
    foodJson,
    axios,
    AttachmentBuilder,
    getImage,
    getAttachmentLink
}
