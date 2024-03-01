// api/call.js
const axios = require('axios');

module.exports = async (req, res) => {
    const { pageLimit, network, collection, chainId, page } = req.query; // 注意：使用req.query接收GET请求的参数

    const url = `https://v3-api.lootex.io/api/v3/explore/assets?limit=${pageLimit}&collectionSlugs%5B0%5D=${network}%3A${collection}&sortBy=bestListPrice&chainId=${chainId}&page=${page}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('API call failed:', error);
        res.status(500).send('API call failed');
    }
};
