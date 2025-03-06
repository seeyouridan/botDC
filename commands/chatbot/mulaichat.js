const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mulaichat")
		.setDescription("Mulai Chat dengan oshi :D"),
	async execute(interaction) {
		global.chatSession = true;

		const helpEmbed = new EmbedBuilder()
			.setColor("White")
			.setTitle("Let's Chat 💬")
			.setDescription("Selamat datang di sesi chat bersama Zee Bot!")
			.setThumbnail("https://i.pinimg.com/1200x/a0/57/26/a057261e198d49a21f9b3c3ad9461598.jpg")
			.addFields(
				{ name: "\u200B", value: "🔒 **Rules** 🔒" },
				{ name: "Model AI 🤖", value: "> ➡️ `Falcon-7B-Instruct`", inline: true },
				{ name: "Language 🏳️", value: "> ➡️ `English`", inline: true },
				{ name: "\u200B", value: "⚠️ **Information** ⚠️" },
				{ name: "Memulai Sesi Chat!", value: "Silahkan tanyakan sesuatu. Gunakan bahasa yang mudah dimengerti agar mendapatkan respon yang diinginkan. Ketik `/selesaichat` untuk mengakhiri sesi chat!", }
			)
			.setTimestamp();

		await interaction.reply({ embeds: [helpEmbed] });
	},
};
