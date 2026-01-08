// api/getStream.js
export default async function handler(req, res) {
    const { channel } = req.query;
    if (!channel) return res.status(400).json({ error: 'Channel name required' });

    try {
        // نرسل طلباً إلى واجهة Kick مع تعريف متصفح (User-Agent) لتجنب الحظر
        const response = await fetch(`https://kick.com/api/v1/channels/${channel}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const data = await response.json();
        
        // استخراج رابط البث المباشر الفعلي m3u8
        if (data && data.playback_url) {
            res.status(200).json({ url: data.playback_url });
        } else {
            res.status(200).json({ url: null }); // القناة ليست في وضع البث
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
