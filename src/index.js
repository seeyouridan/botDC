require("dotenv").config({ path: "./.env" });

const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { gameStatus } = require("./utils/gameStatus");

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { getBotChoice, determineWinner, getResultText } = require("./utils/gameUtils");
const { isGameRunning, updateGameStatus } = require("./utils/gameStatus");

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

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isButton()) return;

	const userId = interaction.user.id;

	if (!isGameRunning(userId)) {
		return interaction.reply({
			content: "⚠️ Kamu belum memulai game! Ketik `/mulaigame` dulu.",
			ephemeral: true,
		});
	}

	const playerChoice = interaction.customId;
	const botChoice = getBotChoice();
	const result = determineWinner(playerChoice, botChoice);
	const resultText = getResultText(result);

	updateGameStatus(userId, result);

	const emojiMap = {
		kertas: "📄",
		batu: "🪨",
		gunting: "✂️",
	};

	const resultEmbed = new EmbedBuilder()
		.setColor("Blue")
		.setTitle("🧠 Hasil Suit")
		.setDescription(
			`**Kamu memilih:** ${emojiMap[playerChoice]} ${playerChoice}\n` +
			`**Bot memilih:** ${emojiMap[botChoice]} ${botChoice}\n\n` +
			`**${resultText}**`
		)
		.setFooter({
			text: interaction.user.username,
			iconURL: interaction.user.displayAvatarURL(),
		})
		.setTimestamp();

	const row = new ActionRowBuilder().addComponents(
		new ButtonBuilder().setCustomId("kertas").setLabel("📄 Kertas").setStyle(ButtonStyle.Success),
		new ButtonBuilder().setCustomId("gunting").setLabel("✂️ Gunting").setStyle(ButtonStyle.Danger),
		new ButtonBuilder().setCustomId("batu").setLabel("🪨 Batu").setStyle(ButtonStyle.Secondary)
	);

	await interaction.update({
		embeds: [resultEmbed],
		components: [row],
	});
});

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const fs = require("node:fs");
const path = require("node:path");

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
