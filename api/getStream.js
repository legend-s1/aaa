export default async function handler(req, res) {
    const { channel } = req.query;
    
    if (!channel) return res.status(400).json({ error: 'اسم القناة مطلوب' });

    try {
        // نستخدم User-Agent ليبدو الطلب وكأنه من متصفح حقيقي لتجنب الحظر
        const response = await fetch(`https://kick.com/api/v1/channels/${channel}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) throw new Error('فشل جلب بيانات القناة');

        const data = await response.json();
        
        // استخراج رابط البث الفعلي m3u8 الذي ينتهي بصيغة .m3u8
        if (data.playback_url) {
            res.status(200).json({ url: data.playback_url });
        } else {
            // القناة موجودة ولكنها لا تبث حالياً
            res.status(200).json({ url: null });
        }
    } catch (error) {
        res.status(500).json({ error: 'خطأ في الاتصال بـ Kick API' });
    }
}
