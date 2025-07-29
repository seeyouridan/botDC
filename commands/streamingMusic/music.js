const {
	EmbedBuilder,
	SlashCommandBuilder,
	PermissionFlagsBits,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("music")
		.setDescription("music system")
		.addSubcommand((sub) =>
			sub
				.setName("play")
				.setDescription("Putar musik")
				.addStringOption((opt) =>
					opt
						.setName("query")
						.setDescription("Judul atau URL")
						.setRequired(true)
				)
		)
		.addSubcommand((sub) =>
			sub
				.setName("volume")
				.setDescription("Atur volume")
				.addStringOption((opt) =>
					opt
						.setName("volume")
						.setDescription("Volume 10-100")
						.setRequired(true)
				)
		)
		.addSubcommand((sub) =>
			sub
				.setName("options")
				.setDescription("Opsi musik")
				.addStringOption((opt) =>
					opt
						.setName("options")
						.setDescription("Pilih opsi:")
						.setRequired(true)
						.addChoices(
							{ name: "queue", value: "queue" },
							{ name: "skip", value: "skip" },
							{ name: "pause", value: "pause" },
							{ name: "resume", value: "resume" },
							{ name: "stop", value: "stop" },
							{ name: "loop-queue", value: "loopqueue" },
							{ name: "loop-all", value: "loopall" },
							{ name: "autoplay", value: "autoplay" }
						)
				)
		)
		.addSubcommand((sub) =>
			sub
				.setName("search")
				.setDescription("Cari musik berdasarkan judul")
				.addStringOption((opt) =>
					opt
						.setName("query")
						.setDescription("Judul lagu yang ingin dicari")
						.setRequired(true)
				)
		),
	async execute(interaction, client) {
		const option = interaction.options;
		const subcommand = option.getSubcommand();
		const query = option.getString("query");
		const volume = option.getString("volume");
		const musicOption = option.getString("options");

		const { member, guild, channel } = interaction;
		const voiceChannel = member.voice.channel;

		const embed = new EmbedBuilder();

		if (!voiceChannel) {
			embed
				.setColor("Red")
				.setDescription("⚠️ Kamu harus berada di voice channel.");
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		if (
			guild.members.me.voice.channelId &&
			member.voice.channelId !== guild.members.me.voice.channelId
		) {
			embed
				.setColor("Red")
				.setDescription(
					`⚠️ Bot sedang aktif di <#${guild.members.me.voice.channelId}>`
				);
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		try {
			await interaction.deferReply(); // ✅ hanya sekali, di awal

			switch (subcommand) {
				case "play":
					await interaction.editReply({
						content: `🔍 Mencari dan memproses lagu...`,
					});

					const timeout = setTimeout(() => {
						interaction.editReply({
							content: "⏳ Masih memproses, mohon tunggu sebentar lagi...",
						});
					}, 8000);

					try {
						await client.distube.play(voiceChannel, query, {
							textChannel: channel,
							member,
						});
					} catch (error) {
						console.error(error);
						clearTimeout(timeout);

						const failEmbed = new EmbedBuilder()
							.setColor("Red")
							.setDescription(
								`❌ Gagal memutar lagu dengan query **"${query}"**.\n${error.message}`
							);

						return interaction.editReply({ content: "", embeds: [failEmbed] });
					}

					clearTimeout(timeout);
					return;

				case "volume":
					client.distube.setVolume(voiceChannel, parseInt(volume));
					await interaction.editReply({
						content: `🔊 Volume disetel ke ${volume}%`,
					});
					return;

				case "options":
					const queue = client.distube.getQueue(voiceChannel);
					if (!queue) {
						embed
							.setColor("Red")
							.setDescription("📭 Tidak ada musik dalam antrian.");
						return interaction.editReply({ embeds: [embed], ephemeral: true });
					}

					switch (musicOption) {
						case "skip":
							await queue.skip();
							embed.setColor("Blue").setDescription("⏭️ Musik dilewati.");
							break;
						case "stop":
							await queue.stop();
							embed.setColor("Blue").setDescription("⏹️ Musik dihentikan.");
							break;
						case "pause":
							await queue.pause();
							embed.setColor("Blue").setDescription("⏸️ Musik dijeda.");
							break;
						case "resume":
							await queue.resume();
							embed.setColor("Blue").setDescription("▶️ Musik dilanjut.");
							break;
						case "queue":
							embed
								.setColor("Blue")
								.setTitle("🎶 Antrian Musik")
								.setDescription(
									queue.songs
										.map(
											(song, i) =>
												`**${i + 1}.** ${song.name} - \`${
													song.formattedDuration
												}\``
										)
										.join("\n")
								);
							break;
						case "loopqueue":
							client.distube.setRepeatMode(queue, 2);
							embed.setColor("Blue").setDescription("🔁 Loop queue aktif.");
							break;
						case "loopall":
							client.distube.setRepeatMode(queue, 1);
							embed.setColor("Blue").setDescription("🔁 Loop semua aktif.");
							break;
						case "autoplay":
							client.distube.toggleAutoplay(queue);
							embed.setColor("Blue").setDescription("📻 Autoplay diubah.");
							break;
					}

					await interaction.editReply({ embeds: [embed] });
					return;

				case "search":
					await interaction.editReply({
						content: `🔍 Mencari dan memutar lagu: **${query}**...`,
					});
					await client.distube.play(voiceChannel, query, {
						textChannel: channel,
						member,
					});
					return;
			}
		} catch (err) {
			console.error(err);
			embed.setColor("Red").setDescription("🚫 Terjadi kesalahan.");

			if (!interaction.replied) {
				await interaction.reply({ embeds: [embed], ephemeral: true });
			} else {
				await interaction.followUp({ embeds: [embed], ephemeral: true });
			}
		}
	},
};
