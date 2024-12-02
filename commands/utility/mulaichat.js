const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mulaichat")
        .setDescription("Mulai Chat dengan oshi :D"),
    async execute(interaction) {
        global.chatSession = true;
        await interaction.reply("Sesi chat dimulai!\n Berikan pertanyaan yang jelas dengan Bahasa Inggris guna mempermudah BOT untuk mengerti pertanyanmu!");
    },
};