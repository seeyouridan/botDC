const axios = require("axios");

async function tesApi(messageContent) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B",
      {
        inputs: messageContent,
      },
      {
        headers: {
          Authorization: `Bearer ${'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'}`,
        },
      }
    );

    const botResponse = response.data[0].generated_text;

    console.log("Bot Response:", botResponse);
  } catch (error) {
    console.error(
      "Error berkomunikasi dengan Hugging Face: ",
      error.response ? error.response.data : error
    );
    console.log("Ada kesalahan dalam memproses permintaan!");
  }
}

tesApi("Jelaskan tentang teknik pembelajaran mesin yang digunakan dalam GPT.\n");
