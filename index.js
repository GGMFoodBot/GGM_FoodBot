require("./server.js")
//#region 변수 선언
const pch = require('./Core/pch.js');
const Meal = require('./Manager/MealManager.js');
const Bot = require('./Bot/BotManager.js');


pch.client.login(pch.token);
pch.client.once("ready", () => {
  console.log("급식봇 등장!");
});

pch.client.on('ready', () => {
  pch.client.user.setActivity('급식 찾기',{ type: "PLAYING" })
});

//#endregion



//#region 명령어
pch.client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  try {
    await Meal.MealCommand(interaction);

  } catch (error) {
    console.error('Global Handler Error:', error);
    if (!interaction.deferred && !interaction.replied) {
      try {
        console.log("오류 메시지 전송 성공");
        await interaction.reply({ content: '오류가 발생했어요!', ephemeral: true });
      } catch (err2) {
        console.error('Reply 실패:', err2);
      }
    }
  }
});
