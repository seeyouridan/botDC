const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("selesaichat")
        .setDescription("Akhiri Chat dengan oshi :D"),
    async execute(interaction) {
        global.chatSession = false;
        await interaction.reply("Sesi Chat berakhir!");
    },
};