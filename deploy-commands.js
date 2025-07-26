require("dotenv").config();

const { REST, Routes } = require("discord.js");

const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.DISCORD_BOT_CLIENT_ID;

const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const foldersPath = path.join(__dirname, "commands");

function readCommands(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Jika folder, panggil fungsi lagi (rekursi)
            readCommands(fullPath);
        } else if (file.endsWith(".js")) {
            // Jika file .js, load sebagai command
            const command = require(fullPath);
            if ("data" in command && "execute" in command) {
                commands.push(command.data.toJSON());
            } else {
                console.log(
                    `[WARNING] The command at ${fullPath} is missing a required "data" or "execute" property.`
                );
            }
        }
    }
}

readCommands(foldersPath);

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`
		);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands }
		);

		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`
		);
	} catch (error) {
		console.error(error);
	}
})();
