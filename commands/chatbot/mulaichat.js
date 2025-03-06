const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mulaichat")
		.setDescription("Mulai Chat dengan oshi :D"),
	async execute(interaction) {
		global.chatSession = true;
		await interaction.reply("Sesi chat dimulai! Silakan tanyakan sesuatu.");
	},
};
