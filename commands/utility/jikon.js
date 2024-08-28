const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("jikon")
		.setDescription("Jikoshoukai / perkenalan diri"),
	async execute(interaction) {
		await interaction.reply(
			"Si gadis tomboy yang semangatnya meletup-letup, hai semuanyaa, aku Zee 💖!"
		);
	},
};
