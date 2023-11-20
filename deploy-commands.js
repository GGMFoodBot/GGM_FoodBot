const {SlashCommandBuilder} = require('@discordjs/builders')
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v10')
const {clientId, guildIds, token} = require('./config.json')


const commands = [
    new SlashCommandBuilder()
    .setName('급식도움말')
    .setDescription('급식 도움말을 보여드립니다.'),
    new SlashCommandBuilder()
    .setName('조식')
    .setDescription('조식을 알려줄게요!')
    .addIntegerOption((option) => option.setName('일자').setDescription('숫자를 써주세요!!!').setRequired(true)),
    new SlashCommandBuilder()
    .setName('중식')
    .setDescription('중식을 알려줄게요!')
    .addIntegerOption((option) => option.setName('일자').setDescription('숫자를 써주세요!!!').setRequired(true)),
    new SlashCommandBuilder()
    .setName('석식')
    .setDescription('석식을 알려줄게요!')
    .addIntegerOption((option) => option.setName('일자').setDescription('숫자를 써주세요!!!').setRequired(true))
]

const rest = new REST({version: '9'}).setToken(token);

(async () => {
    guildIds.map(async(guildId) => {
        try{
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: {},
            })
    
            console.log(guildId + "서버 성공")
        }
        catch(error) {
            console.error(error)
        }
    })
    
    try {
        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        })
        console.log("글로벌 서버 등록 성공")
    }
    catch(error) {
        console.error(error)
    }
    
})()