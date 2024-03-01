const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// 允許伺服器處理JSON和URL編碼的資料
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 提供靜態文件，例如HTML, CSS, JavaScript
app.use(express.static('public'));

// 定義API路由
app.post('/api/call', async (req, res) => {
    const { pageLimit, network, collection, chainId, page } = req.body;
    const url = `https://v3-api.lootex.io/api/v3/explore/assets?limit=${pageLimit}&collectionSlugs%5B0%5D=${network}%3A${collection}&sortBy=bestListPrice&chainId=${chainId}&page=${page}`;
    
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('API call failed:', error);
        res.status(500).send('API call failed');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
