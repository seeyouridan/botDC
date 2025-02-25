require("dotenv").config({ path: "./.env" });
const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY;

const handleChatSession = async (message) => {
	if (message.author.bot) return;

	// Cek Sesi Chat
	if (!global.chatSession) return;

	// Custom Responses (Pertanyaan dan jawaban manual)
	const userMessage = message.content.toLowerCase();
	let botResponse;

	if (userMessage.includes("hai")) {
		botResponse = "Hai juga! Apa kabar?";
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

		const months = [
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
		const monthName = months[now.getMonth()];
		const date = now.getDate();
		const year = now.getFullYear();

		botResponse = `Sekarang hari ${dayName}, tanggal ${date} ${monthName} ${year}`;
	} else {
		// jika pertanyaan tidak ditemukan dalam custom respons, gunakan API Hugging Face untuk responnya
		try {
			const hfResponse = await axios.post(
				"https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
				{
					inputs: message.content,
					parameters: {
						max_new_tokens: 2048,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${HF_API_KEY}`,
					},
				}
			);

			botResponse =
				hfResponse.data[0]?.generated_text || "Hmm, aku bingung menjawabnya.";
		} catch (error) {
			console.error("Error saat memproses pesan AI:", error);
			botResponse = "Maaf, aku tidak bisa menjawab itu sekarang.";
		}
	}

	// berikan respon
	await message.reply(botResponse);
};

module.exports = handleChatSession;
