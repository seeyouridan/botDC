const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
	isGameRunning,
	startGame,
} = require("../../src/utils/gameStatus");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mulaigame")
		.setDescription("Mulai permainan suit kertas, gunting, batu"),
	async execute(interaction) {
		const userId = interaction.user.id;

		if (isGameRunning(userId)) {
			return interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor("Red")
						.setTitle("⚠️ Permainan Sudah Dimulai")
						.setDescription("Ketik `/selesaigame` untuk mengakhiri permainan."),
				],
				ephemeral: true,
			});
		}

		startGame(userId);

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor("Green")
					.setTitle("🎮 Permainan Dimulai!")
					.setDescription(
						"Gunakan `/batu`, `/gunting`, atau `/kertas` untuk bermain.\nKetik `/selesaigame` untuk menyelesaikan."
					),
			],
		});
	},
};
