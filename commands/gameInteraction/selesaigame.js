const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("selesaigame")
		.setDescription("Mengakhiri permainan dan menampilkan hasilnya"),
	async execute(interaction, gameStatus) {
		if (!gameStatus.isPlaying) {
			await interaction.reply(
				"Permainan belum dimulai. Ketik /start untuk memulai permainan."
			);
			return;
		}

		gameStatus.isPlaying = false;
		const results = `Permainan selesai!\nUser bermain: ${interaction.user.username}\nMenang: ${gameStatus.wins}\nKalah: ${gameStatus.losses}\nSeri: ${gameStatus.draws}`;
		await interaction.reply(results);
	},
};
