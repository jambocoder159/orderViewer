// api/call.js
const axios = require('axios');

module.exports = async (req, res) => {
    // 从请求体中解构参数
    const { pageLimit, network, collection, chainId, page } = req.body;

    const url = `https://v3-api.lootex.io/api/v3/explore/assets?limit=${pageLimit}&collectionSlugs%5B0%5D=${network}%3A${collection}&sortBy=bestListPrice&chainId=${chainId}&page=${page}`;
    
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('API call failed:', error);
        res.status(500).send('API call failed');
    }
};
