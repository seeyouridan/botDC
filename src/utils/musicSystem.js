const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
	client.distube = new DisTube(client, {
		emitNewSongOnly: true,
		emitAddSongWhenCreatingQueue: false,
		emitAddListWhenCreatingQueue: false,
		plugins: [
			new SpotifyPlugin(),
			new SoundCloudPlugin(),
			new YtDlpPlugin({ update: true }),
		],
	});

	const status = (queue) =>
		`Volume: \`${queue.volume}%\``;

	client.distube
		.on("playSong", (queue, song) =>
			queue.textChannel.send({
				embeds: [
					new EmbedBuilder()
						.setColor("#a200ff")
						.setTitle("🎶 Sedang Memutar")
						.setDescription(
							`\`${song.name}\` - \`${song.formattedDuration}\`\nDari: ${
								song.user
							}\n\n${status(queue)}`
						),
				],
			})
		)
		.on("addSong", (queue, song) =>
			queue.textChannel.send({
				embeds: [
					new EmbedBuilder()
						.setColor("Green")
						.setDescription(
							`✅ Ditambahkan ke antrian: \`${song.name}\` (\`${song.formattedDuration}\`) oleh ${song.user}`
						),
				],
			})
		)
		.on("finish", (queue) =>
			queue.textChannel.send({
				embeds: [
					new EmbedBuilder()
						.setColor("Orange")
						.setDescription("🏁 Musik telah selesai diputar semua."),
				],
			})
		)
		.on("empty", (channel) => {
			channel.send({
				embeds: [
					new EmbedBuilder()
						.setColor("Red")
						.setDescription("👋 Voice channel kosong, bot keluar otomatis."),
				],
			});
		})
		.on("error", (channel, err) => {
			console.error(err);
			if (channel && typeof channel.send === "function") {
				channel.send({
					embeds: [
						new EmbedBuilder()
							.setColor("Red")
							.setDescription(`❌ Error: ${err.message}`),
					],
				});
			}
		});
};
