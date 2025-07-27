function getBotChoice() {
	const choices = ["kertas", "gunting", "batu"];
	return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, botChoice) {
	if (playerChoice === botChoice) return "draw";
	if (
		(playerChoice === "kertas" && botChoice === "batu") ||
		(playerChoice === "batu" && botChoice === "gunting") ||
		(playerChoice === "gunting" && botChoice === "kertas")
	) {
		return "win";
	}
	return "lose";
}

function getResultText(code) {
	if (code === "win") return "Selamat yaa, kamu menang huhuu!🎉";
	if (code === "draw") return "Kalo seri, berarti kita satu hati!🥰";
	if (code === "lose") return "Hihi, kamu kalah, sayang banget, semoga beruntung lain kali yaa!🤗";
}

module.exports = { getBotChoice, determineWinner, getResultText };
