const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Menampilkan informasi mengenai Bot"),
	async execute(interaction) {
		const helpEmbed = new EmbedBuilder()
			.setColor("White")
			.setTitle("Help Menu 🦖")
			.setDescription("Selamat datang di Zee Bot!")
			.setThumbnail("https://i.pinimg.com/1200x/a0/57/26/a057261e198d49a21f9b3c3ad9461598.jpg")
			.addFields(
				{ name: "\u200B", value: "📌 **List Commands** 📌" },
				{ name: "> Chatbot 🤖", value: "➡️ `/mulaichat - /selesaichat`" },
				{ name: "> Pemutar Musik 🎵", value: "➡️ `/join - /play - /pause - /resume - /skip - /loop - /queue`" },
				{ name: "> Permainan Suit 🎭", value: "➡️ `/mulaigame - /kertas - /gunting - /batu - /selesaigame`" },
			)
			.setTimestamp();

		await interaction.reply({ embeds: [helpEmbed] });
	},
};
