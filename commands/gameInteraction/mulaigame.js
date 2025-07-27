const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mulaigame")
		.setDescription("Mulai permainan suit kertas, gunting, batu"),
	async execute(interaction, gameStatus) {
		const botAvatar = interaction.client.user.displayAvatarURL({
			dynamic: true,
		});

		if (gameStatus.isPlaying) {
			const embed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("⚠️ Permainan Sudah Dimulai")
				.setDescription(
					"Permainan suit sedang berlangsung.\nKetik `/selesaigame` untuk mengakhiri dulu ya."
				)
				.setFooter({ text: "ZeeBot Game Engine", iconURL: botAvatar });

			await interaction.reply({ embeds: [embed], ephemeral: true });
		} else {
			gameStatus.isPlaying = true;
			gameStatus.wins = 0;
			gameStatus.losses = 0;
			gameStatus.draws = 0;

			const embed = new EmbedBuilder()
				.setColor("#00FFAB")
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
				.setFooter({ text: "ZeeBot siap suit kapan saja~", iconURL: botAvatar })
				.setTimestamp();

			await interaction.reply({ embeds: [embed] });
		}
	},
};
