const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("join")
		.setDescription("Memasukan Bot ke dalam Voice Channel"),
	async execute(interaction) {
		const member = await interaction.guild.members.fetch(interaction.user.id);
		const channel = member.voice.channel;

		if (!channel) {
			return interaction.reply(
				"⚠️ Kamu harus berada di voice channel untuk memasukan Bot! ⚠️"
			);
		}

		joinVoiceChannel({
			channelId: channel.id,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		await interaction.reply({
			content: `✅ Bergabung ke voice channel: ${channel.name}`,
		});

		const reply = await interaction.fetchReply();

		setTimeout(() => {
			reply.delete().catch(console.error);
		}, 2000);
	},
};
