// api/getStream.js
export default async function handler(req, res) {
    const { channel } = req.query;
    
    if (!channel) return res.status(400).json({ error: 'Channel name is required' });

    try {
        // نطلب البيانات من خادم Kick مباشرة (لا يوجد حظر CORS هنا)
        const response = await fetch(`https://kick.com/api/v1/channels/${channel}`);
        const data = await response.json();
        
        // نرسل رابط البث المباشر (m3u8) فقط إلى الواجهة الأمامية
        res.status(200).json({ url: data.playback_url });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stream data' });
    }
}
