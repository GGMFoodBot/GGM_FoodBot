const pch = require('./pch.js');
const booleanManager = require('./BooleanFunction');

async function MakeEmbed(title, color, description, fields = [], image = "") {
    const embed = new pch.MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(description)
        .setThumbnail(image)
        .addFields(fields);
    return embed;
}
function MakeDate(interaction){
    let timestamp = interaction.createdTimestamp + 32400000;
    console.log("timestamp: " + timestamp);
    let date = new Date(timestamp);
    console.log(date);
    return date;
}

function ReturnMealString(interaction){
    let hour = MakeDate(interaction).getHours();
    let test = MakeDate(interaction);
    console.log("test" + test);
    console.log("Make " + MakeDate(interaction));
    console.log(hour);
    booleanManager.isNextDay = hour > 17;
    if (hour < 2) {
        return "조식";
    }
    else if (hour < 14) {
        return "중식";
    }
    else if (hour < 17) {
        return "석식";
    }
    else {
        return "조식";
    }
}


module.exports = {
    MakeEmbed,
    MakeDate,
    ReturnMealString
}