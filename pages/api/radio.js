// export default async function handler(req, res) {
// const streamUrl = "http://82.145.41.8:16105/stream";
//     const streamUrl = "http://37.157.242.105:11421/";
//     const { t } = req.query; // Parámetro para evitar el cacheo

//     res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
//     res.setHeader('Content-Type', 'audio/mpeg');
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     try {
//         const response = await fetch(streamUrl);
//         if (!response.ok) {
//             throw new Error(`Error fetching stream: ${response.status} ${response.statusText}`);
//         }
//         const reader = response.body.getReader();

//         while (true) {
//             const { done, value } = await reader.read();
//             if (done) break;
//             res.write(value);
//         }
//         res.end();
//     } catch (error) {
//         console.error('Error streaming audio:', error);
//         res.status(500).json({ error: 'Error streaming audio' });
//     }
// }

export default async function handler(req, res) {
    // const streamUrl = "http://37.157.242.105:11421/";
    const streamUrl = "http://82.145.41.50:26531/stream";

    try {
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Transfer-Encoding', 'chunked'); // Add this line
        const response = await fetch(streamUrl);
        if (!response.ok) {
            throw new Error(`Error fetching stream: ${response.status} ${response.statusText}`);
        }
        if (!response.body) {
            throw new Error("Response body is undefined");
        }
        const reader = response.body.getReader();


        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            res.write(value);
        }
        res.end();
    } catch (error) {
        console.error('Error streaming audio:', error);
        res.status(500).send(`Error streaming audio: ${error.message}`);
    }
}

