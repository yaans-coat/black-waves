const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;
const USERDATA_PATH = path.join(__dirname, 'userdata', 'account system');

if (!fs.existsSync(USERDATA_PATH)) { fs.mkdirSync(USERDATA_PATH, { recursive: true }); }

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send('No URL provided');
    try {
        const response = await axios.get(targetUrl, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
            },
            responseType: 'arraybuffer'
        });

        // Delete all security headers that block iframes
        const forbiddenHeaders = ['x-frame-options', 'content-security-policy', 'content-security-policy-report-only', 'x-content-type-options'];
        Object.keys(response.headers).forEach(header => {
            if (!forbiddenHeaders.includes(header.toLowerCase())) {
                res.setHeader(header, response.headers[header]);
            }
        });

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(response.data);
    } catch (e) {
        res.status(500).send('Proxy Error: ' + e.message);
    }
});

app.post('/api/save-user', (req, res) => {
    const { username, password, type } = req.body;
    const filePath = path.join(USERDATA_PATH, `${username}.txt`);
    const content = `Type: ${type}\nUser: ${username}\nPass: ${password}\nDate: ${new Date().toLocaleString()}`;
    fs.writeFile(filePath, content, (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

app.listen(PORT, () => { 
    console.log('-------------------------------------------');
    console.log('BLACK WAVES: AGGRESSIVE PROXY ACTIVE');
    console.log('PORT: 3000');
    console.log('-------------------------------------------');
});
