const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getBotChoice, determineWinner, getResultText } = require("../../src/utils/gameUtils");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("gunting")
		.setDescription("Pilih gunting dalam permainan"),
	async execute(interaction, gameStatus) {
		if (!gameStatus.isPlaying) {
			const embed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("⚠️ Belum Mulai")
				.setDescription("Permainan belum dimulai.\nKetik `/mulaigame` untuk mulai suit!")
				.setTimestamp();

			return await interaction.reply({ embeds: [embed], ephemeral: true });
		}

		const playerChoice = "✂️ Gunting";
		const botRaw = getBotChoice();
		const botIcon = botRaw === "gunting" ? "✂️" : botRaw === "batu" ? "🪨" : "📄";
		const result = determineWinner("gunting", botRaw);
		const resultText = getResultText(result);

		if (result.includes("draw")) gameStatus.draws++;
		else if (result.includes("win")) gameStatus.wins++;
		else gameStatus.losses++;

		const embed = new EmbedBuilder()
			.setColor("#FFD700")
			.setTitle("🧠 Hasil Suit")
			.setDescription(
				`**Kamu memilih:** ${playerChoice}\n` +
				`**Bot memilih:** ${botIcon} ${botRaw}\n\n` +
				`**${resultText}**`
			)
			.setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
