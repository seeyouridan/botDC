const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("selesaigame")
		.setDescription("Mengakhiri permainan dan menampilkan hasilnya"),
	async execute(interaction, gameStatus) {
		if (!gameStatus.isPlaying) {
			const embed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("⚠️ Permainan Belum Dimulai")
				.setDescription(
					"Ketik `/mulaigame` dulu baru bisa mengakhiri permainan."
				)
				.setTimestamp();

			return await interaction.reply({ embeds: [embed], ephemeral: true });
		}

		gameStatus.isPlaying = false;

		const resultEmbed = new EmbedBuilder()
			.setColor("#90EE90")
			.setTitle("🏁 Permainan Selesai!")
			.setDescription(
				`**Pemain:** <@${interaction.user.id}>\n` +
					`**Menang:** ${gameStatus.wins}\n` +
					`**Kalah:** ${gameStatus.losses}\n` +
					`**Seri:** ${gameStatus.draws}`
			)
			.setFooter({
				text: "Terima kasih sudah bermain!",
				iconURL: interaction.client.user.displayAvatarURL(),
			})
			.setTimestamp();

		await interaction.reply({ embeds: [resultEmbed] });
	},
};
