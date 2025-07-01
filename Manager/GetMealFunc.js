const pch = require('../Core/pch');
const functions = require('../Core/FunctionManager');
const booleanManager = require('../Core/BooleanFunction');


let today = new Date();

/**
 * 임베드 형식으로 보내는 메서드
 * @param {string} 급식 조식, 중식, 석식 중 택1
 * @param {interaction} interaction interaction 객체
 */
async function GetMeal(급식, interaction){
    let meal;
    let j = Math.floor(Math.random() * pch.광고수)
    let date;

    if (booleanManager.IsDateNull(interaction)) {
        date = functions.MakeDate(interaction).getDate();
    }
    else {
        date = interaction.options.getInteger('일자');
    }
    // 방학 때 사용하는 메시지 전송 코드
    if (booleanManager.isVacation) {
        interaction.reply('2월은 방학이라구요!!')
        return;
    }

    if (!booleanManager.IsValidDate(date)) {
        interaction.reply(date + '일은 없어요!')
        return;
    }
    // if (booleanManager.isNextDay && booleanManager.isNowMealCommand) {
    //     date = date + 1;
    // }
    await interaction.deferReply();
    getMeal(date < 10 ? "0" + date : date, 급식).then(async i => {
        if (i == undefined) {
            interaction.editReply(급식 + "이 정보에 없습니다.")
            return;
        }
        let image = pch.getImage(pch.광고[j]);
        let ggmLogo = pch.getImage("ggmLogo.png");
        console.log(image);
        console.log(ggmLogo);
        let mealText = i.toString().replace(/^\d+일\s*/, "");
        console.log(mealText);
        meal = mealText.replaceAll(',', '\n\n');
        let day = functions.MakeDate(interaction);
        let embed = await functions.MakeEmbed(
            `:fork_and_knife: ${day.getMonth() + 1}월 ` + date + `일 ${급식}`,
            '6C72EF',
            "",
            [
                {name: '급식', value: meal},
                {name: ':newspaper: 광고 문의', value: '디스코드 @gwamegi, @leechangh, @leo82380_, @yogurt31'}
            ],
            pch.getAttachmentLink(ggmLogo),
        );

        (embed).setImage(pch.getAttachmentLink(image));
        (embed).setFooter({text: '관리자 : 고민수, 이창호, 이상규, 장서윤', iconURL: pch.footerUrl});
        (embed).setTimestamp();

        if (!embed) {
            console.log("error");
            interaction.editReply("에러가 발생했습니다.")
            return;
        }
        interaction.editReply({embeds: [embed], files: [image, ggmLogo]})
    });
}

/**
 * 비동기로 급식 불러오는 메서드
 * @param {number} date 날짜
 * @param {string}급식 조식,중식,석식 중 택1
 */
async function getMeal(date, 급식) {
    let meal = "";
    if (급식 == "조식") {
        meal = pch.foodJson.breakfast[Number(date)];
    }
    else if(급식 == "중식"){
        meal = pch.foodJson.lunch[Number(date)];
    }
    else if(급식 == "석식"){
        meal = pch.foodJson.dinner[Number(date)];
    }

    return meal;
}

async function GetNowMeal(interaction) {
    let meal = functions.ReturnMealString(interaction);
    console.log(meal);
    booleanManager.isNowMealCommand = true;
    await GetMeal(meal, interaction);
}

/**
 * 급식 정보 불러오기
 * @param date 날짜
 * @deprecated
 */
async function GetLunch(date){
    let year = today.getFullYear();
    let month = today.getMonth() + 1;

    // 급식 정보 불러오기
    const response = await pch.axios.get(
        '/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531377&MLSV_YMD='
        + year + (month > 9 ? month : "0" + month) + date);
    const { mealServiceDietInfo: [, { row: [{ DDISH_NM }] }] } = response.data;
    const text = DDISH_NM;

    // 급식 정보 가공하기
    let meal = text.replace(/(\s*\([^()]*\)\s*|\s*★\s*)/g, '').split('<br/>');
    return meal;
}

module.exports = {
    GetMeal,
    getMeal,
    GetNowMeal,
    GetLunch
}

