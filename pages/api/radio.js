// pages/api/radio.js
export default async function handler(req, res) {
    const streamUrl = "http://82.145.41.8:16105/stream";
    const { t } = req.query; // Parámetro para evitar el cacheo

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const response = await fetch(streamUrl);
        if (!response.ok) {
            throw new Error(`Error fetching stream: ${response.status} ${response.statusText}`);
        }
        const reader = response.body.getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
        }
        res.end();
    } catch (error) {
        console.error('Error streaming audio:', error);
        res.status(500).json({ error: 'Error streaming audio' });
    }
}
