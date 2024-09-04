const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("Menghapus sejumlah pesan di channel")
		.addIntegerOption((option) =>
			option
				.setName("jumlah")
				.setDescription("Jumlah pesan yang ingin dihapus")
				.setRequired(true)
		),
	async execute(interaction) {
		const jumlah = interaction.options.getInteger("jumlah");

		if (jumlah < 1 || jumlah > 100) {
			return interaction.reply({
				content: "Kamu hanya bisa menghapus 1 hingga 100 pesan sekaligus.",
				ephemeral: true,
			});
		}

		// Menghapus pesan
		await interaction.channel
			.bulkDelete(jumlah, true)
			.then((deleted) =>
				interaction.reply({
					content: `Berhasil menghapus ${deleted.size} pesan.`,
					ephemeral: true,
				})
			)
			.catch((error) =>
				interaction.reply({
					content: `Terjadi kesalahan: ${error.message}`,
					ephemeral: true,
				})
			);
	},
};
