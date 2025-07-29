const gameSessions = new Map();

function startGame(userId) {
	gameSessions.set(userId, {
		isPlaying: true,
		wins: 0,
		losses: 0,
		draws: 0,
	});
}

function endGame(userId) {
	gameSessions.delete(userId);
}

function getGameStatus(userId) {
	return gameSessions.get(userId);
}

function updateGameStatus(userId, result) {
	const status = gameSessions.get(userId);
	if (!status) return;

	if (result === "win") status.wins++;
	else if (result === "lose") status.losses++;
	else if (result === "draw") status.draws++;

	gameSessions.set(userId, status);
}

function isGameRunning(userId) {
	const status = gameSessions.get(userId);
	return status?.isPlaying || false;
}

module.exports = {
	startGame,
	endGame,
	getGameStatus,
	updateGameStatus,
	isGameRunning,
};
