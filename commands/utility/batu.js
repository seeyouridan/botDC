const { SlashCommandBuilder } = require("discord.js");
const { getBotChoice, determineWinner } = require("../../src/utils/gameUtils");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("batu")
		.setDescription("Pilih batu dalam permainan"),
	async execute(interaction, gameStatus) {
		if (!gameStatus.isPlaying) {
			await interaction.reply(
				"Permainan belum dimulai. Ketik /start untuk memulai permainan."
			);
			return;
		}

		const playerChoice = "batu";
		const botChoice = getBotChoice();
		const result = determineWinner(playerChoice, botChoice);

		if (result === "Kalo seri, berarti kita satu hati!🥰") {
			gameStatus.draws++;
		} else if (result === "Selamat yaa, kamu menang huhuu!🎉") {
			gameStatus.wins++;
		} else {
			gameStatus.losses++;
		}

		await interaction.reply(
			`Kamu memilih: ${playerChoice}\nBot memilih: ${botChoice}\n${result}`
		);
	},
};