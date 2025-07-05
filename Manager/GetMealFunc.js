const pch = require('../Core/pch');
const functions = require('../Core/FunctionManager');
const booleanManager = require('../Core/BooleanFunction');


let today = new Date();

/**
 * 임베드 형식으로 보내는 메서드
 * @param {string} 급식 조식, 중식, 석식 중 택1
 * @param interaction interaction 객체
 */
async function GetMeal(급식, interaction) {
    let date;
    if (booleanManager.IsDateNull(interaction)) {
        date = functions.MakeDate(interaction).getDate();
    } else {
        date = interaction.options.getInteger('일자');
    }

    if (booleanManager.isVacation) {
        await interaction.reply({content:'2월은 방학이라구요!!', ephemeral: true});
        return;
    }

    if (!booleanManager.IsValidDate(date)) {
        await interaction.reply({content:`${date}일은 없어요!`, ephemeral :true});
        return;
    }

    let mealData = getMeal(date < 10 ? "0" + date : date, 급식);
    if (!mealData) {
        await interaction.reply({content:`${급식}이 정보에 없습니다.`, ephemeral: true});
        return;
    }

    // 이미지 불러오기 등 비동기 작업도 끝낸 후 reply
    let image = await pch.getImage(pch.광고[Math.floor(Math.random() * pch.광고수)]);
    let ggmLogo = await pch.getImage("ggmLogo.png");
    let imageUrl = pch.getAttachmentLink(image);
    let ggmUrl = pch.getAttachmentLink(ggmLogo);

    let mealText = mealData.replace(/^\d+일\s*/, "").replaceAll(',', '\n\n');
    let day = functions.MakeDate(interaction);

    let embed = await functions.MakeEmbed(
        `:fork_and_knife: ${day.getMonth() + 1}월 ${date}일 ${급식}`,
        '6C72EF',
        "",
        [
            { name: '급식', value: mealText },
            { name: ':newspaper: 광고 문의', value: '디스코드 @gwamegi, @leechangh, @leo82380_, @yogurt31' }
        ],
        ggmUrl
    );
    embed.setImage(imageUrl);
    embed.setFooter({ text: '관리자 : 고민수, 이창호, 이상규, 장서윤', iconURL: pch.footerUrl });
    embed.setTimestamp();
    await interaction.reply({ embeds: [embed], files: [image, ggmLogo] });
}


/**
 * 동기로 급식 불러오는 메서드
 * @param {number} date 날짜
 * @param {string}급식 조식,중식,석식 중 택1
 */
function getMeal(date, 급식) {
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



