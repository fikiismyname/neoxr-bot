let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
exports.run = {
	usage: ['glass', 'greyscale', 'invert', 'gay', 'sepia', 'threshold', 'wasted'],
	async: async (m, { conn, _func, isPrefix, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing)
		m.reply(_func.status.wait)
		let q = m.quoted ? m.quoted : m
	    let mime = (q.msg || q).mimetype || ''
		if (!mime) return m.reply(`*Media not found!*`)
		if (!/(png|jpe?g)/.test(mime)) return m.reply(`*Only for image.*`)
		let media = await q.download()
		let link = await _func.upImg(media)
		let image = await (await fetch('https://some-random-api.ml/canvas/' + command + '?avatar=' + link)).buffer()
		await conn.updatePresence(m.chat, Presence.composing)
		conn.sendImage(m.chat, image, '', m)
	} catch {
		return m.reply(_func.status.error)
	}},
	limit: true
}