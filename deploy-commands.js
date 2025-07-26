require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.DISCORD_BOT_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

const commands = [];
const foldersPath = path.join(__dirname, "commands");

function readCommands(dir) {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const fullPath = path.join(dir, file);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			readCommands(fullPath);
		} else if (file.endsWith(".js")) {
			const command = require(fullPath);
			if ("data" in command && "execute" in command) {
				console.log(`Loaded: ${command.data.name}`);
				commands.push(command.data.toJSON());
			}
		}
	}
}

readCommands(foldersPath);

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} guild (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands }
		);

		console.log(`Successfully reloaded ${data.length} guild (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
