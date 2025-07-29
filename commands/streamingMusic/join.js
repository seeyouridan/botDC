const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("join")
		.setDescription("Memasukkan bot ke dalam Voice Channel"),
	async execute(interaction) {
		const member = await interaction.guild.members.fetch(interaction.user.id);
		const channel = member.voice.channel;

		// Jika user tidak di voice channel
		if (!channel) {
			const warningEmbed = new EmbedBuilder()
				.setColor("Red")
				.setTitle("⚠️ Tidak Bisa Bergabung")
				.setDescription(
					"Kamu harus berada di **Voice Channel** dulu sebelum aku bisa ikut! 🎧"
				)
				.setTimestamp()
				.setFooter({
					text: `${interaction.user.username}`,
					iconURL: interaction.user.displayAvatarURL(),
				});
			return interaction.reply({ embeds: [warningEmbed], ephemeral: true });
		}

		// Gabung ke voice channel
		joinVoiceChannel({
			channelId: channel.id,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		const successEmbed = new EmbedBuilder()
			.setColor("Green")
			.setTitle("✅ Berhasil Bergabung!")
			.setDescription(
				`Aku sudah masuk ke **${channel.name}** dan siap muter musik~ 🎶`
			)
			.setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setFooter({
				text: `${interaction.user.username}`,
				iconURL: interaction.user.displayAvatarURL(),
			});

		await interaction.reply({ embeds: [successEmbed] });

		// Hapus embed setelah 5 detik
		const reply = await interaction.fetchReply();
		setTimeout(() => {
			reply.delete().catch(() => {});
		}, 5000);
	},
};
