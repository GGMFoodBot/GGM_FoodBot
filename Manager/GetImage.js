const fs = require('fs/promises');
const { MessageAttachment } = require('discord.js');
const path = require('path');

const IMAGE_FOLDER = path.join(__dirname, '../Images');

async function getImage(imageName) {
    const imagePath = path.join(IMAGE_FOLDER, imageName);

    try {
        await fs.access(imagePath);
    } catch (err) {
        throw new Error(`Image not found: ${imageName}`);
    }

    return new MessageAttachment(imagePath, imageName);
}


/**
 * Generates a link for an attachment in Discord.
 * @param imageName MessageAttachment
 * @returns {string} Attachment link for Discord
 */
function getAttachmentLink(imageName){
    return `attachment://${imageName.name}`
}

module.exports = {
    getImage,
    getAttachmentLink
};