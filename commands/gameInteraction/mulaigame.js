const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { isGameRunning, startGame } = require("../../src/utils/gameStatus");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mulaigame")
		.setDescription("Mulai permainan suit kertas, gunting, batu"),
	async execute(interaction) {
		const userId = interaction.user.id;
		const botAvatar = interaction.client.user.displayAvatarURL();

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
					.setTitle("🎮 Permainan Suit Dimulai!")
					.setDescription(
						"Siap bertanding suit dengan **ZeeBot**?\n\n" +
							"Gunakan salah satu perintah berikut:\n" +
							"• `/kertas` 📄\n" +
							"• `/gunting` ✂️\n" +
							"• `/batu` 🪨\n\n" +
							"Ketik `/selesaigame` kapan pun untuk berhenti bermain."
					)
					.setThumbnail(botAvatar)
					.setFooter({
						text: "ZeeBot siap suit kapan saja~",
						iconURL: botAvatar,
					})
					.setTimestamp(),
			],
		});
	},
};
