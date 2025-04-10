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
  }
  catch (error) {
    console.error(error);
    await Bot.SendMsg("고쳐라 이거: " + error);
  }
})