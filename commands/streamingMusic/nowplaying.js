const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nowplaying")
		.setDescription("Menampilkan musik yang sedang diputar"),

	async execute(interaction, client) {
		const member = await interaction.guild.members.fetch(interaction.user.id);
		const voiceChannel = member.voice.channel;

		const embed = new EmbedBuilder();

		// ❌ Cek apakah user ada di voice channel
		if (!voiceChannel) {
			embed
				.setColor("Red")
				.setTitle("⚠️ Tidak di Voice Channel")
				.setDescription(
					"Kamu harus berada di voice channel untuk melihat lagu yang sedang diputar."
				)
				.setTimestamp();

			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		// ❌ Cek apakah ada musik yang sedang diputar
		const queue = client.distube.getQueue(voiceChannel);
		if (!queue || !queue.songs.length) {
			embed
				.setColor("Red")
				.setTitle("📭 Tidak Ada Musik")
				.setDescription("Tidak ada musik yang sedang diputar saat ini.")
				.setTimestamp();

			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		// ✅ Ambil lagu yang sedang diputar
		const song = queue.songs[0];
		embed
			.setColor("#a200ff")
			.setTitle("🎵 Sedang Diputar Sekarang")
			.setDescription(`[${song.name}](${song.url})`)
			.setThumbnail(song.thumbnail || "")
			.addFields(
				{
					name: "⏳ Durasi",
					value: `\`${song.formattedDuration}\``,
					inline: true,
				},
				{ name: "🎧 Diminta oleh", value: `${song.user}`, inline: true },
				{
					name: "🔁 Mode Loop",
					value: `\`${
						queue.repeatMode === 1
							? "Track"
							: queue.repeatMode === 2
							? "Queue"
							: "Off"
					}\``,
					inline: true,
				},
				{
					name: "📻 Autoplay",
					value: `\`${queue.autoplay ? "On" : "Off"}\``,
					inline: true,
				},
				{ name: "🔊 Volume", value: `\`${queue.volume}%\``, inline: true }
			)
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
