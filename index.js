require("./server.js")
const { GetMealFromDB, UpdateMealToDB } = require("./DB/DB.js")

const { token } = require('./config.json')
const {
  Client,
  Intents,
  MessageEmbed
} = require("discord.js")
const { 광고 } = require('./food_echo.json')
const { 중식 } = require('./food_echo.json')
const axios = require('axios');
const { MealType } = require("./DB/types.js")
axios.defaults.baseURL = "https://open.neis.go.kr/hub"

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});
client.login(token);
client.once("ready", () => {
  console.log("급식봇 등장!");
});

let date = ""
let 광고수 = 4;

const month = 11;

client.on('ready', () => {
  client.user.setActivity('급식 찾기 ',{ type: "PLAYING" })
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;


  if (commandName === '조식') {
    GetMeal("조식", interaction)
  }

  if (commandName === '중식') {
    GetMeal("중식", interaction)
  }

  if (commandName === '석식') {
    GetMeal("석식", interaction)
  }

  if (commandName === '급식도움말') {
    embed = new MessageEmbed()
        .setTitle(":fork_and_knife: 급식 명령어")
        .setColor('6C72EF')
        .setThumbnail('https://ifh.cc/g/4JHxDp.png')
        .addFields(
            { name: '명령어 사용법', value: '/ 입력 후 원하는 명령어 입력' },
            { name: '주의 사항', value: '날짜 입력칸에는 무조건 "일자"만 적어주세요.\n(예: 9월 21일 조식 -> /조식 일자:21)' },
            { name: '\n', value: '\n' },
            { name: '봇이 작동하지 않을 경우', value: '디코 서버에서 개발자를 핑해주시거나 DM으로 알려주세요.' },
            { name: '\n', value: '\n' },
            { name: '업데이트 된 점', value: '1. 11월 급식이 업데이트 되었습니다.\n2. 광고가 추가되었습니다.' },
            { name: '\n', value: '\n' },
            { name: '그 외', value: '오타 있으면 @장서윤(1학년) 멘션해주세요...' })
        .setTimestamp()
        .setDescription("*더욱 좋은 급식봇을 개발할 수 있도록 노력하겠습니다.")
    await interaction.reply({ embeds: [embed] })
  }

  if (commandName === '급식광고') {
    embed = new MessageEmbed()
        .setTitle(":fork_and_knife: 급식 광고 도움말")
        .setColor('6C72EF')
        .setThumbnail('https://ifh.cc/g/4JHxDp.png')
        .addFields(
            { name: '광고 배너 규격', value: '1000 X 237\n' },
            { name: '\n', value: '\n' },
            { name: '포함 내용', value: '겜마고에 관한 내용만 가능\n' },
            { name: '\n', value: '\n' },
            { name: '금지 내용', value: '논란이 될만한 내용\n' },
            { name: '\n', value: '\n' },
            { name: '그 외', value: '더 궁금한 내용이 있거나 광고 신청을 하고 싶은 경우, \nyogurt31[장서윤 (1학년)], leo82380_[이상규 (1학년)] 에게 DM 주시면 됩니다.' })
        .setTimestamp()
        .setFooter({ text: '만든 사람: 장서윤, 이상규', iconURL: 'https://ifh.cc/g/4JHxDp.png' })
    interaction.reply({ embeds: [embed] })
  }
})

/**
 * 비동기로 급식 불러오는 메서드
 * @param {number} date 날짜 
 * @param {string}급식 조식,중식,석식 중 택1
 */
async function getMeal(date, 급식) {
  let query = new Date();
  query.setDate(date);

  if(급식 == "조식"){
    let meals = await GetMealFromDB(query, MealType.Breakfast);
    if(meals == null){
      let 조식 = jjjson.조식[date] + " ";
      return 조식;
    }
    return meals;
    
  }
  else if(급식 == "중식"){
    console.log(date);
    let meals = await GetMealFromDB(query, MealType.Lunch);
    if(meals == null){
      return 중식[date] + " ";
    }
    if(meals == null)
    {
      const response = await axios.get('/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531377&MLSV_YMD=202311' + date);
      
      if(response.data)
      {
        
        const { mealServiceDietInfo: [, { row: [{ DDISH_NM }] }] } = response.data;
        meals = DDISH_NM.replace(/(\s*\([^()]*\)\s*|\s*★\s*)/g, '').split('<br/>');
        UpdateMealToDB(query, date, MealType.Lunch, meals);
      }
      return meals;
    }
    return meals;
    // try {
    //   if (date != undefined) {
        
    //     const response = await axios.get('/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531377&MLSV_YMD=202310' + (date < 10 ? "0" + date : date));
    //     const { mealServiceDietInfo: [, { row: [{ DDISH_NM }] }] } = response.data;
    //     const text = DDISH_NM;
    //     let meal = text.replace(/(\s*\([^()]*\)\s*|\s*★\s*)/g, '').split('<br/>')
    //     return meal;
    //   }
    // } catch (error) {
    //   console.error(error);
    //   
    // }
  }
  else if(급식 == "석식"){
    let meals = await GetMealFromDB(query, MealType.Dinner);
    if(meals == null){
      let 석식 = jjjson.석식[date] + " ";
      return 석식;
    }
    return meals;
    
  }
}

/**
 * 임베드 형식으로 보내는 메서드
 * @param {string} 급식 조식, 중식, 석식 중 선택해 적기 
 * @param {interaction} interaction 그냥 interaction 적어
 */
function GetMeal(급식, interaction){
  let meal;
  let j = Math.floor(Math.random() * 광고수)
  let date = interaction.options.getInteger('일자')
  if (date < 1 || date > 31) {
    interaction.reply(date + '일은 없어요!')
    return;
  }
  embed = new MessageEmbed()
  getMeal(date < 10 ? "0" + date : date, 급식).then(i => {
    if(i == undefined){
      interaction.reply(급식 + "이 정보에 없습니다.")
    }
    meal = i.toString().replaceAll(',', '\n\n')
          embed.setTitle(`:fork_and_knife: ${month}월 ` + date + `일 ${급식}`)
          .setColor('6C72EF')
          .setThumbnail('https://ifh.cc/g/z7aQya.jpg')
          .addFields(
              { name: '급식', value: meal },
              { name: ':newspaper: 광고 문의', value: '디스코드 @leo82380_, @yogurt31' })
          .setImage(광고[j])
          .setTimestamp()
          .setFooter({ text: '만든 사람: 장서윤, 이상규', iconURL: 'https://ifh.cc/g/4JHxDp.png' })
    interaction.reply({ embeds: [embed] })
  });
}

