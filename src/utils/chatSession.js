module.exports = async function handleChatSession(message, global) {
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

			botResponse = `Sekarang hari ${dayName}, tanggal ${date} ${monthName} ${year}`;
		} else {
			botResponse = "Kata belum terdaftar!";
		}

		await message.reply(botResponse);
	}
};