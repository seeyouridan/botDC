const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("disconnect")
		.setDescription("Mengeluarkan bot dari voice channel"),

	async execute(interaction, client) {
		const { member, guild } = interaction;
		const voiceChannel = member.voice.channel;
		const botVoiceChannel = guild.members.me.voice.channel;

		const embed = new EmbedBuilder();

		if (!botVoiceChannel) {
			embed
				.setColor("Red")
				.setDescription("❌ Bot tidak sedang berada di voice channel.");
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		if (!voiceChannel || voiceChannel.id !== botVoiceChannel.id) {
			embed
				.setColor("Red")
				.setDescription(
					"⚠️ Kamu harus berada di voice channel yang sama dengan bot."
				);
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}

		try {
			client.distube.voices.leave(voiceChannel);
			embed
				.setColor("Blue")
				.setDescription("✅ Bot berhasil keluar dari voice channel.");
			return interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.error(error);
			embed
				.setColor("Red")
				.setDescription("🚫 Terjadi kesalahan saat keluar dari voice channel.");
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}
	},
};
