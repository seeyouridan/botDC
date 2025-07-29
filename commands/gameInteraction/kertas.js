const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
	getBotChoice,
	determineWinner,
	getResultText,
} = require("../../src/utils/gameUtils");
const {
	isGameRunning,
	updateGameStatus,
} = require("../../src/utils/gameStatus");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kertas")
		.setDescription("Pilih kertas dalam permainan"),
	async execute(interaction) {
		const userId = interaction.user.id;

		if (!isGameRunning(userId)) {
			const embed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("⚠️ Belum Mulai")
				.setDescription("Ketik `/mulaigame` dulu untuk mulai bermain.")
				.setTimestamp();

			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		const playerChoice = "kertas";
		const botChoice = getBotChoice();
		const result = determineWinner(playerChoice, botChoice);
		const resultText = getResultText(result);

		updateGameStatus(userId, result);

		const emojiMap = {
			kertas: "📄",
			batu: "🪨",
			gunting: "✂️",
		};

		const embed = new EmbedBuilder()
			.setColor("Blue")
			.setTitle("🧠 Hasil Suit")
			.setDescription(
				`**Kamu memilih:** ${emojiMap[playerChoice]} Kertas\n` +
					`**Bot memilih:** ${emojiMap[botChoice]} ${botChoice}\n\n` +
					`**${resultText}**`
			)
			.setFooter({
				text: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL(),
			})
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
