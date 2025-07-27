const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Menampilkan informasi mengenai Bot"),
	async execute(interaction) {
		const botAvatar = interaction.client.user.displayAvatarURL({
			dynamic: true,
			size: 1024,
		});

		const helpEmbed = new EmbedBuilder()
			.setColor("White")
			.setTitle("📖 Help Menu")
			.setThumbnail(botAvatar)
			.setDescription(
				"Selamat datang di **ZeeBot**! Berikut beberapa perintah yang dapat kamu gunakan:\n\u200B\n\u200B"
			)
			.addFields(
				{ name: "🤖 Chatbot", value: "`/prompt` — Ajak bot ngobrol!\n\u200B" },

				{
					name: "🎶 Musik",
					value:
						"`/join`, `/music play`, `/pause`, `/resume`, `/skip`, `/loopqueue`, `/queue` — Mainkan musik favoritmu!\n\u200B",
				},

				{
					name: "🎮 Permainan Suit",
					value:
						"`/mulaigame`, `/kertas`, `/gunting`, `/batu`, `/selesaigame` — Bermain suit dengan bot!\n\u200B",
				},

				{
					name: "📢 Info Bot",
					value: "`/ping`, `/help`, `/jikon`, `/server` — Lihat info bot dan statusnya.\n\u200B\n\u200B",
				}
			)
			.setFooter({ text: "ZeeBot - Selalu Siap Membantu!" })

		await interaction.reply({ embeds: [helpEmbed] });
	},
};
