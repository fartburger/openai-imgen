const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req,res) => {
    const {prompt} = req.body

    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '512x512'
        });

        const imageUrls = response.data.data

        res.status(200).json({
            success: true,
            data: imageUrls
        })
    } catch (e) {
        console.log(e);
        console.log(e.response.data);
        res.status(400).json({
            success: false,
            error: 'Oops! Something went wrong'
        });
    }
}

module.exports = { generateImage }