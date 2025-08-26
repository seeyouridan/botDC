const {
	ActionRowBuilder,
	SlashCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");
const {
	isGameRunning,
	startGame,
	updateGameStatus,
} = require("../../src/utils/gameStatus");
const {
	getBotChoice,
	determineWinner,
	getResultText,
} = require("../../src/utils/gameUtils");

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

		const mulaiGame = new EmbedBuilder()
			.setColor("Green")
			.setTitle("🎮 Permainan Suit Dimulai!")
			.setDescription(
				"Siap bertanding suit dengan **ZeeBot**?\n\n" +
					"Pilih salah satu opsi untuk memulai permainan:\n" +
					"• `🟩` atau `/kertas` 📄\n" +
					"• `🟥` atau `/gunting` ✂️\n" +
					"• `⬛` atau `/batu` 🪨\n\n" +
					"Ketik `/selesaigame` kapan pun untuk berhenti bermain."
			)
			.setThumbnail(botAvatar)
			.setFooter({
				text: "ZeeBot siap suit kapan saja~",
				iconURL: botAvatar,
			})
			.setTimestamp();

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId("kertas")
				.setLabel("📄 Kertas")
				.setStyle(ButtonStyle.Success),
			new ButtonBuilder()
				.setCustomId("gunting")
				.setLabel("✂️ Gunting")
				.setStyle(ButtonStyle.Danger),
			new ButtonBuilder()
				.setCustomId("batu")
				.setLabel("🪨 Batu")
				.setStyle(ButtonStyle.Secondary)
		);

		await interaction.reply({
			embeds: [mulaiGame],
			components: [row],
		});
	},
};
