export default async function handler(req, res) {
    const { channel } = req.query;
    
    if (!channel) return res.status(400).json({ error: 'Channel required' });

    try {
        const response = await fetch(`https://kick.com/api/v1/channels/${channel}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        // التحقق من وجود رابط البث الفعلي
        if (data.playback_url) {
            res.status(200).json({ url: data.playback_url });
        } else {
            res.status(404).json({ error: 'Stream not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch' });
    }
}
