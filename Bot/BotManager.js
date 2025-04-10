const pch = require("../Core/pch");

/**
 * 에러 메시지 전송
 * @param error 에러 메시지
 */
async function SendMsg(error){
    try {
        const user = await pch.client.users.fetch("792564250663976990");
        await user.send(error);
        const user2 = await pch.client.users.fetch("683656234162716713");
        await user2.send(error);

        console.log("DM sent successfully");
    } catch (err) {
        console.error("Failed to send DM:", err);
    }
}

module.exports = {
    SendMsg
}