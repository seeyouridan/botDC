function getBotChoice() {
	const choices = ["kertas", "gunting", "batu"];
	return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, botChoice) {
	if (playerChoice === botChoice) return "Kalo seri, berarti kita satu hati!🥰";
	if (
		(playerChoice === "kertas" && botChoice === "batu") ||
		(playerChoice === "batu" && botChoice === "gunting") ||
		(playerChoice === "gunting" && botChoice === "kertas")
	) {
		return "Selamat yaa, kamu menang huhuu!🎉";
	}
	if (
		(playerChoice === "batu" && botChoice === "kertas") ||
		(playerChoice === "kertas" && botChoice === "gunting") ||
		(playerChoice === "gunting" && botChoice === "batu")
	) {
		return "Yeay, aku menang, semoga beruntung lain kali yaa!🤗";
	}
}

module.exports = { getBotChoice, determineWinner };
