require("dotenv").config({ path: "./.env" });

const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { gameStatus } = require("./utils/gameStatus");

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const fs = require("node:fs");
const path = require("node:path");

const client = new Client({
	intents: [
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
});

client.commands = new Collection();

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SoundCloudPlugin } = require("@distube/soundcloud");

// client: instance dari Discord Client
client.distube = new DisTube(client, {
	emitNewSongOnly: true,
	plugins: [
		new SpotifyPlugin(),
		new SoundCloudPlugin(),
		new YtDlpPlugin({ update: true }),
	],
});

const foldersPath = path.join(__dirname, "../commands");
const getAllFiles = (dirPath, arrayOfFiles = []) => {
	const files = fs.readdirSync(dirPath);

	files.forEach((file) => {
		const filePath = path.join(dirPath, file);
		if (fs.statSync(filePath).isDirectory()) {
			getAllFiles(filePath, arrayOfFiles);
		} else if (file.endsWith(".js")) {
			arrayOfFiles.push(filePath);
		}
	});

	return arrayOfFiles;
};

const commandFiles = getAllFiles(foldersPath);
for (const filePath of commandFiles) {
	const command = require(filePath);
	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(
			`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
		);
	}
}

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Haii, it's me azeeraa! 🎉`);

	readyClient.user.setPresence({
		activities: [{ name: "JKT48's Playlist 🎧", type: 2 }],
		status: "online",
	});
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	try {
		await command.execute(interaction, interaction.client);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "Error guys!",
				flags: 1 << 6,
			});
		} else {
			await interaction.reply({
				content: "Error guys!",
				flags: 1 << 6,
			});
		}
	}
});

client.login(DISCORD_BOT_TOKEN).then(() => {
	require("./utils/musicSystem")(client);
});
