const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("join")
		.setDescription("Memasukan Bot ke dalam Voice Channel"),
	async execute(interaction) {
		const channel = interaction.member.voice.channel;

		if (!channel) {
			return interaction.reply(
				"⚠️ Kamu harus berada di voice channel untuk memasukan Bot! ⚠️"
			);
		}

		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
			// selfDeaf: true,
		});

		const reply = await interaction.reply({
			content: `✅ Bergabung ke voice channel: ${channel.name}`,
			fetchReply: true,
		});

		setTimeout(() => {
			reply.delete().catch(console.error);
		}, 2000);
	},
};
