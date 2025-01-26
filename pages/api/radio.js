// pages/api/radio.js
export default async function handler(req, res) {
    // const streamUrl = "https://uk16freenew.listen2myradio.com/live.mp3?typeportmount=s1_33828_stream_518870635";
    const streamUrl = "https://unlimited5-us.dps.live/biobiosantiago/aac/icecast.audio";
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
