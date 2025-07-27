const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getBotChoice, determineWinner, getResultText } = require("../../src/utils/gameUtils");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kertas")
		.setDescription("Pilih kertas dalam permainan"),
	async execute(interaction, gameStatus) {
		if (!gameStatus.isPlaying) {
			const embed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("⚠️ Belum Mulai")
				.setDescription(
					"Permainan belum dimulai.\nKetik `/mulaigame` untuk mulai suit!"
				)
				.setTimestamp();

			return await interaction.reply({ embeds: [embed], ephemeral: true });
		}

		const playerChoice = "📄 Kertas";
		const botChoice = getBotChoice();
		const result = determineWinner("kertas", botChoice);
		const resultText = getResultText(result);
		const botIcon =
			botChoice === "kertas" ? "📄" : botChoice === "batu" ? "🪨" : "✂️";

		if (result.includes("draw")) gameStatus.draws++;
		else if (result.includes("win")) gameStatus.wins++;
		else gameStatus.losses++;

		const embed = new EmbedBuilder()
			.setColor("#ADD8E6")
			.setTitle("🧠 Hasil Suit")
			.setDescription(
				`**Kamu memilih:** ${playerChoice}\n` +
					`**Bot memilih:** ${botIcon} ${botChoice}\n\n` +
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
