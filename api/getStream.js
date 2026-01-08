export default async function handler(req, res) {
    const { channel } = req.query;
    
    if (!channel) return res.status(400).json({ error: 'اسم القناة مطلوب' });

    try {
        // الخادم يطلب البيانات من Kick (لا يوجد حظر CORS هنا)
        const response = await fetch(`https://kick.com/api/v1/channels/${channel}`);
        const data = await response.json();
        
        // إرسال رابط m3u8 إلى index.html
        res.status(200).json({ url: data.playback_url });
    } catch (error) {
        res.status(500).json({ error: 'فشل في جلب بيانات البث' });
    }
}
