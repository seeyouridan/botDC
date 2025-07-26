const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
	client.distube = new DisTube(client, {
		// leaveOnFinish: true,
		// searchCooldown: 10,
		// leaveOnEmpty: false,
		// leaveOnStop: true,
		emitNewSongOnly: true,
		emitAddSongWhenCreatingQueue: false,
		emitAddListWhenCreatingQueue: false,
		plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin()],
	});

	const status = (queue) =>
		`Volume: \`${queue.volume}%\` |  Filter: \`${
			queue.filters.names.join(", ") || "Inactive"
		}\` | Repeat: \`${
			queue.repeatMode ? (queue.repeatMode === 2 ? "Queue" : "Track") : "Off"
		}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
	client.distube
		.on("playSong", (queue, song) =>
			queue.textChannel.send({
				embeds: [
					new EmbedBuilder()
						.setColor("#a200ff")
						.setDescription(
							`🎶 | Playing: \`${song.name}\` - \`${
								song.formattedDuration
							}\`\nFrom: ${song.user}\n${status(queue)}`
						),
				],
			})
		)
		.on("addSong", (queue, song) =>
			queue.textChannel.send({
				embeds: [
					new EmbedBuilder()
						.setColor("#a200ff")
						.setDescription(
							`🎶 | Added \`${song.name}\` - \`${song.formattedDuration}\` to queue by: ${song.user}`
						),
				],
			})
		)
		.on("addList", (queue, playlist) =>
			queue.textChannel.send({
				embeds: [
					new EmbedBuilder()
						.setColor("#a200ff")
						.setDescription(
							`🎶 | Added from \`${playlist.name}\` : \`${
								playlist.songs.length
							} \` queue tracks; \n${status(queue)}`
						),
				],
			})
		)
		.on("error", (channel, e) => {
			if (channel && typeof channel.send === "function") {
				channel.send(`⛔ | Error: ${e.toString().slice(0, 1974)}`);
			} else {
				console.error(e);
			}
		})
		.on("empty", (channel) => {
			if (channel && typeof channel.send === "function") {
				channel.send({
					embeds: [
						new EmbedBuilder()
							.setColor("Red")
							.setDescription(
								"⛔ | The voice channel is empty! Leaving the channel..."
							),
					],
				});
			}
		})
		.on("searchNoResult", (message, query) => {
			if (message.channel && typeof message.channel.send === "function") {
				message.channel.send({
					embeds: [
						new EmbedBuilder()
							.setColor("Red")
							.setDescription(`⛔ | No results found for: \`${query}\`!`),
					],
				});
			}
		})
		.on("finish", (queue) =>
			queue.textChannel.send({
				embeds: [
					new EmbedBuilder()
						.setColor("#a200ff")
						.setDescription("🏁 | The queue is finished!"),
				],
			})
		);
};
