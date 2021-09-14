let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['gif', 'sgif', 'sk', 'stiker', 'sticker'],
	async: async (m, { conn, _func }) => {
	try {
		let exif = global.db.setting
		await conn.updatePresence(m.chat, Presence.composing)
		let q = m.quoted ? m.quoted : m
   	 let mime = (q.msg || q).mimetype || ''
		if (/image/.test(mime)) {
			let img = await q.download()
			if (!img) return m.reply(_func.status.wrong)
			await conn.sendSticker(m.chat, img, exif.sk_pack, exif.sk_author, false, m)
		} else if (/video/.test(mime)) {
			if ((q.msg || q).seconds > 11) return m.reply(`*Maximum video duration is 10 seconds.*`)
			let img = await q.download()
			if (!img) return m.reply(_func.status.wrong)
			await conn.sendSticker(m.chat, img, exif.sk_pack, exif.sk_author, true, m)
		}
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false
}