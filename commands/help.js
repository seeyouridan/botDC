const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");

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
				{
					name: "🤖 Chatbot",
					value: "• `/prompt` — Ngobrol bebas dengan bot AI.\n\u200B",
				},
				{
					name: "🎶 Musik",
					value:
						[
							"• `/join` — Masuk ke voice channel.",
							"• `/music play` — Mainkan lagu dari URL atau judul.",
							"• `/music search` — Cari lagu dan pilih dari daftar.",
							"• `/music options` — Skip, pause, stop, loop, autoplay, queue.",
							"• `/music volume` — Atur volume lagu.",
						].join("\n") + "\n\u200B",
				},
				{
					name: "🎮 Game Suit (Batu Gunting Kertas)",
					value:
						[
							"• `/mulaigame` — Mulai permainan.",
							"• `/batu` — Pilih batu.",
							"• `/gunting` — Pilih gunting.",
							"• `/kertas` — Pilih kertas.",
							"• `/selesaigame` — Selesai dan lihat hasil.",
						].join("\n") + "\n\u200B",
				},
				{
					name: "📢 Informasi Bot",
					value:
						[
							"• `/ping` — Cek latensi bot.",
							"• `/jikon` — Lihat informasi JKT48 terbaru.",
							"• `/server` — Info server saat ini.",
							"• `/help` — Tampilkan menu bantuan ini.",
						].join("\n") +
						"\n\u200B" +
						"\n\u200B",
				}
			)
			.setFooter({
				text: "ZeeBot • Serba Bisa, Serba Siap!",
				iconURL: botAvatar,
			})
			.setFooter({ text: "ZeeBot - Selalu Siap Membantu!" });

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setLabel("🧾 GitHub")
				.setStyle(ButtonStyle.Link)
				.setURL("https://ollama.com/library/deepseek-r1")
		);

		await interaction.reply({ embeds: [helpEmbed], components: [row] });
	},
};
