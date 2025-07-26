const { SlashCommandBuilder, MessageFlags } = require("discord.js");

const Queue = require("../../src/utils/queue");
const queue = new Queue();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prompt')
        .setDescription('Send a prompt to our uncensored llama2')
        .addStringOption(option => option.setName('input')
        .setDescription('The prompt to send')
        .setRequired(true)),
    async execute(interaction) {
        // hanya menampilkan output pada user yang menggunakan command (tidak publik)
        await interaction.deferReply({ ephemeral: true });
        queue.addItem(interaction);
    }
};
