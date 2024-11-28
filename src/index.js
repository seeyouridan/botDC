require('dotenv').config();

const fs = require("node:fs");
const path = require("node:path");
const { OpenAI } = require('openai');
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("../config.json");
const { gameStatus } = require("./utils/gameStatus");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

let chatSession = false;

client.commands = new Collection();

const foldersPath = path.join(__dirname, "../commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}
}

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Haii, Zee disini💖!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction, gameStatus);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "Error cok!",
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: "Error cok!",
				ephemeral: true,
			});
		}
	}
});

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;

	if (global.chatSession) {
		const userMessage = message.content.toLowerCase();
		let botResponse;

		if (userMessage.includes("hai")) {
			botResponse = "Hai Juga!";
		} else if (userMessage.includes("hari apa")) {
			const now = new Date();

			const days = [
				"Minggu",
				"Senin",
				"Selasa",
				"Rabu",
				"Kamis",
				"Jum'at",
				"Sabtu",
			];
			const month = [
				"Januari",
				"Februari",
				"Maret",
				"April",
				"Mei",
				"Juni",
				"Juli",
				"Agustus",
				"September",
				"Oktober",
				"November",
				"Desember",
			];

			const dayName = days[now.getDay()];
			const monthName = month[now.getMonth()];

			const date = now.getDate();
			const year = now.getFullYear();

			botResponse =
				`Sekarang hari ${dayName}, tanggal ${date} ${monthName} ${year}`;
		} else {
			botResponse = "Kata belum terdaftar!";
		}

		await message.reply(botResponse);
	}
});

client.login(token);
