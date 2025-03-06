const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("selesaichat")
        .setDescription("Akhiri Chat dengan oshi :D"),
    async execute(interaction) {
        global.chatSession = false;

        const helpEmbed = new EmbedBuilder()
			.setColor("White")
			.setTitle("End's Chat 💬")
			.setDescription("Terimakasih sudah berinteraksi dengan Zee Bot!")
			.setThumbnail("https://i.pinimg.com/1200x/a0/57/26/a057261e198d49a21f9b3c3ad9461598.jpg")
			.addFields(
				{ name: "\u200B", value: "⚠️ **Information** ⚠️" },
				{ name: "Mengakhiri Sesi Chat!", value: "Terimakasih sudah bertanya, semoga respon yang didapat sesuai harapan. Ketik `/mulaichat` untuk memulai kembali sesi chat!" }
			)
			.setTimestamp();

		await interaction.reply({ embeds: [helpEmbed] });
    },
};