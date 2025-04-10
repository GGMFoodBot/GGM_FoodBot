const functions = require('./FunctionManager');

let isNowMealCommand = false;
let isNextDay = false;
/** 방학 여부 (방학일 때 true로 바꿔주기) */
let isVacation = false;

//#region Boolean 함수
/**
 * 급식 명령어인지 확인하는 메서드
 * @param commandName 명령어 이름
 * @returns {boolean} 급식 명령어인지 아닌지
 */
function IsMealCommand(commandName){
    isNowMealCommand = false;
    return commandName == "조식" || commandName == "중식" || commandName == "석식";
}

/**
 * 급식 도움말 명령어인지 확인하는 메서드
 * @param commandName 명령어 이름
 * @returns {boolean} 급식 도움말 명령어인지 아닌지
 */
function IsMealHelpCommand(commandName){
    return commandName == "급식도움말";
}

/**
 * 급식 광고 명령어인지 확인하는 메서드
 * @param commandName 명령어 이름
 * @returns {boolean} 급식 광고 명령어인지 아닌지
 */
function IsMealAdCommand(commandName){
    return commandName == "급식광고";
}

/**
 * '급식' 명령어인지 확인하는 메서드
 * @param commandName 명령어 이름
 */
function IsSchoolMealCommand(commandName){
    return commandName == "급식";
}

/**
 * 날짜가 비어있는지 확인하는 메서드
 * @param interaction interaction 객체
 * @returns {boolean} 날짜가 비어있는지 아닌지
 */
function IsDateNull(interaction){
    return interaction.options.getInteger('일자') == null || interaction.options.getInteger('일자') == undefined;
}





/**
 * 날짜가 유효한지 확인하는 메서드
 * @param date 날짜
 * @returns {boolean} 날짜가 유효한지 아닌지
 * @constructor
 */
function IsValidDate(date){
    return date >= 1 && date <= 31;
}
//#endregion

module.exports = {
    IsMealCommand,
    IsMealHelpCommand,
    IsMealAdCommand,
    IsSchoolMealCommand,
    IsDateNull,
    IsValidDate,
    isNowMealCommand,
    isNextDay,
    isVacation
}