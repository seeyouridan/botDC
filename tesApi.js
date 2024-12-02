const axios = require("axios");

async function tesApi(messageContent) {
	try {
		const response = await axios.post(
			"https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
			{
				inputs: messageContent,
				parameters: {
					max_new_tokens: 500,
					// stop: ["\n"],
				},
			},
			{
				headers: {
					Authorization: `Bearer ${"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"}`,
				},
			}
		);

		const botResponse = response.data[0].generated_text;

		console.log("Zee🦖 :", botResponse);
	} catch (error) {
		console.error(
			"Error berkomunikasi dengan Hugging Face: ",
			error.response ? error.response.data : error
		);
		console.log("Ada kesalahan dalam memproses permintaan!");
	}
}

tesApi("how to show all data from table in mysql?\n");
