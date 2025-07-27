const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("jikon")
		.setDescription("Jikoshoukai / perkenalan diri"),
	async execute(interaction) {
		const botAvatar = interaction.client.user.displayAvatarURL({ dynamic: true });

		const jikonEmbed = new EmbedBuilder()
			.setColor("#FFB6C1") // pink soft aesthetic
			.setTitle("🌸 Jikoshoukai / Perkenalan")
			.setThumbnail(botAvatar)
			.setDescription(
				"Hai~ 👋 Aku **azeeraa**, sebuah BOT 🤖 yang siap membantumu di server ini! d(*^▽^)=====b\n\n" +
				"Aku bisa melakukan berbagai hal seperti:\n" +
				"• 🎶 Memutar musik\n" +
				"• 🤖 Menjawab pertanyaan\n" +
				"• 🎭 Bermain permainan suit\n" +
				"• 📢 Memberikan info penting\n\n" +
				"Senang berkenalan denganmu! 💖"
			)
			.setFooter({ text: "ZeeBot powered by azeeraa", iconURL: botAvatar })
			.setTimestamp();

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setLabel("🐈‍⬛ GitHub")
				.setStyle(ButtonStyle.Link)
				.setURL("https://github.com/seeyouridan")
		);

		await interaction.reply({ embeds: [jikonEmbed], components: [row] });
	},
};
