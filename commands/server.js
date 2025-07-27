const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Menampilkan informasi tentang server ini."),
	async execute(interaction) {
		const guild = interaction.guild;
		const icon = guild.iconURL({ dynamic: true, size: 1024 });
		const createdAt = `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`; // waktu dibuat (relative)

		const embed = new EmbedBuilder()
			.setColor("#5865F2") // warna khas Discord
			.setTitle(`📊 Info Server: ${guild.name}`)
			.setThumbnail(icon)
			.setDescription(
				"Beberapa informasi yang dapat saya berikan:\n\u200B\n\u200B"
			)
			.addFields(
				{ name: "🆔 ID Server", value: `${guild.id}`, inline: true },
				{ name: "👑 Owner", value: `<@${guild.ownerId}>`, inline: true },
				{
					name: "👥 Jumlah Member",
					value: `${guild.memberCount}`,
					inline: true,
				},
				{ name: "📅 Dibuat", value: `${createdAt}\n\u200B\n\u200B`, inline: true },
			)
			.setFooter({
				text: `Diminta oleh ${interaction.user.tag}`,
				iconURL: interaction.user.displayAvatarURL(),
			})
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
