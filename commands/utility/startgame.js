const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("startgame")
		.setDescription("Mulai permainan kertas, gunting, batu"),
	async execute(interaction, gameStatus) {
		if (gameStatus.isPlaying) {
			await interaction.reply(
				"Permainan sudah dimulai. Ketik /selesai untuk mengakhiri permainan."
			);
		} else {
			gameStatus.isPlaying = true;
			gameStatus.wins = 0;
			gameStatus.losses = 0;
			gameStatus.draws = 0;
			await interaction.reply(
				"Permainan dimulai! Ketik /kertas, /gunting, atau /batu untuk memilih."
			);
		}
	},
};
