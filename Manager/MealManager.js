const pch = require('../Core/pch');
const functions = require('../Core/FunctionManager');
const Bot = require('../Bot/BotManager');
const booleanManager = require('../Core/BooleanFunction');
const GetMealFunc = require('./GetMealFunc');
const e = require("express");
const foolsDay = require('../foolsday.json')
/**
 * 급식 광고 도움말
 * @param interaction interaction 객체
 */
async function AdMeal(interaction){
    let embed = await functions.MakeEmbed
    (
        ":fork_and_knife: 급식 광고 도움말",
        '6C72EF',
        '',
        [
            { name: '광고 배너 규격', value: '1000 X 237\n' },
            { name: '\n', value: '\n' },
            { name: '포함 내용', value: '겜마고 전공, 창체 동아리 & 그 외 학교에 관련된 홍보할 것들 전부\n' },
            { name: '\n', value: '\n' },
            { name: '금지 내용', value: '논란이 될 만한 내용\n학교에 관련되지 않은 내용' },
            { name: '\n', value: '\n' },
            { name: '그 외', value: '더 궁금한 내용이 있거나 광고 신청을 하고 싶은 경우, \nyogurt31[장서윤(2학년)], leo82380_[이상규(2학년)] 에게 DM 주시면 됩니다.\n광고 배너 규격을 지키지 않을 경우 광고 삽입이 어렵습니다.' }
        ],
        'https://ifh.cc/g/4JHxDp.png',
    )

    embed.setTimestamp();
    embed.setFooter({ text: '관리자 : 고민수, 이창호, 이상규, 장서윤', iconURL: pch.footerUrl });

    await interaction.reply({ embeds: [embed] })
}

/**
 * 급식 명령어
 * @param interaction interaction 객체
 */
async function MealCommand(interaction){
    const { commandName } = interaction;

    try {
        // var rating = Math.floor(Math.random() * foolsDay.foolsday.length)
        // interaction.reply(`오늘의 노래 추천해드리도록 하겠습니다.\n${foolsDay.foolsday[rating]}`);
        // return;
        if (booleanManager.IsMealCommand(commandName)) {

            await GetMealFunc.GetMeal(commandName, interaction);
        } else if (booleanManager.IsMealHelpCommand(commandName)) {
            await HelpMeal(interaction);
        } else if (booleanManager.IsMealAdCommand(commandName)) {
            await AdMeal(interaction);
        } else if (booleanManager.IsSchoolMealCommand(commandName)) {
            await GetMealFunc.GetNowMeal(interaction);
        } else if (booleanManager.IsWorkerMealCommand(commandName)) {
            var rating = Math.floor(Math.random() * pch.foodJson.로동자.length);
            interaction.reply(`나의 선택은 ${pch.foodJson.로동자[rating]}! 너다!`);
            return;
        }
    }
    catch (error) {
        console.error(error);
        await Bot.SendMsg("고쳐라 이거: " + error);
    }
}

/**
 * 급식 도움말
 * @param interaction interaction 객체
 */
async function HelpMeal(interaction){
    let embed = await functions.MakeEmbed(
        ":fork_and_knife: 급식 명령어",
        '6C72EF',
        "더욱 좋은 급식봇을 개발하기 위한 피드백은 언제나 환영입니다!",
        [
            { name: '명령어 사용법', value: '/ 입력 후 원하는 명령어 입력' },
            { name: '주의 사항', value: '날짜 입력칸에는 무조건 "일자"만 적어주세요.\n(예: 9월 21일 조식 -> /조식 일자:21)' },
            { name: '\n', value: '\n' },
            { name: '봇이 작동하지 않을 경우', value: '@고민수(1학년), @이창호(1학년), @이상규(2학년), @장서윤(2학년) 중 멘션 혹은 DM으로 알려주시길 바랍니다.' },
            { name: '\n', value: '\n' },
            { name: '업데이트 된 점', value: '관리자가 업데이트 되었습니다.' },
            { name: '\n', value: '\n' },
            { name: '그 외', value: '현재 동아리 홍보용 배너를 모집하고 있습니다! 관심 있으신 분들은 /급식광고 명령어를 확인해주세요 :>\n오타 있으면 관리자 멘션해주세요...' }
        ],
        'https://ifh.cc/g/4JHxDp.png',
    )

    embed.setTimestamp();
    await interaction.reply({ embeds: [embed] })
}



module.exports = {
    MealCommand
}
