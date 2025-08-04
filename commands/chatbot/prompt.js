const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");
const Queue = require("../../src/utils/queue");
const queue = new Queue();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("prompt")
		.setDescription("Kirim prompt ke LLM (deepseek-r1)")
		.addStringOption((option) =>
			option
				.setName("input")
				.setDescription("Isi prompt kamu di sini")
				.setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();

		const botAvatar = interaction.client.user.displayAvatarURL({
			dynamic: true,
		});

		const embed = new EmbedBuilder()
			.setColor("#00C7FF")
			.setTitle("🧠 Prompt Kamu Diterima!")
			.setThumbnail(botAvatar)
			.setDescription(
				`Terima kasih sudah mengirimkan prompt ke **ZeeBot AI**!\n\n` +
					`⏳ Prompt kamu akan diproses secepat mungkin.\n` +
					`📬 Hasilnya akan dikirim ke **thread khusus** agar lebih rapi.\n\n` +
					`Prompt dari: <@${interaction.user.id}>`
			)
			.setFooter({ text: "Powered by deepseek-r1:7b", iconURL: botAvatar })
			.setTimestamp();

		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setLabel("🧾 Use Model")
				.setStyle(ButtonStyle.Link)
				.setURL("https://ollama.com/library/deepseek-r1")
		);

		await interaction.editReply({ embeds: [embed], components: [row] });

		queue.addItem(interaction);
	},
};
