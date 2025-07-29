const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
	getGameStatus,
	isGameRunning,
	endGame,
} = require("../../src/utils/gameStatus");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("selesaigame")
		.setDescription("Mengakhiri permainan dan menampilkan hasilnya"),
	async execute(interaction) {
		const userId = interaction.user.id;

		if (!isGameRunning(userId)) {
			const embed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("⚠️ Permainan Belum Dimulai")
				.setDescription(
					"Ketik `/mulaigame` dulu baru bisa mengakhiri permainan."
				);

			return await interaction.reply({ embeds: [embed], ephemeral: true });
		}

		const status = getGameStatus(userId);
		endGame(userId); // reset status user

		const embed = new EmbedBuilder()
			.setColor("Green")
			.setTitle("🏁 Permainan Selesai!")
			.setDescription(
				`**Pemain:** <@${userId}>\n` +
					`**Menang:** ${status.wins}\n` +
					`**Kalah:** ${status.losses}\n` +
					`**Seri:** ${status.draws}`
			)
			.setFooter({
				text: "Terima kasih sudah bermain!",
				iconURL: interaction.client.user.displayAvatarURL(),
			})
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
