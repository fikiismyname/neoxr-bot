let { Presence, MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../library/sticker')
const upload = require('../library/upload')
const fetch = require('node-fetch')
exports.run = {
	usage: ['take'],
	async: async (m, { conn, text, _func, isPrefix, command }) => {
	try {
		let exif = global.setting
		await conn.updatePresence(m.chat, Presence.composing)
		if (!text) return m.reply(`• *Example* : ${isPrefix + command} wildan | izzudin`)
		if (!text.match(/[|]/gi)) {
			x = text
			y = exif.sk_author
		} else {
			let [ pack, author ] = text.split`|`
			x = pack
			y = author
		}
		let q = m.quoted ? m.quoted : m
   	 let mime = (q.msg || q).mimetype || ''
		if (!/webp/.test(mime)) return m.reply(`*Only for sticker.*`)
   	 let img = await m.quoted.download()
		if (!m.quoted.isAnimated) {
   		await conn.sendSticker(m.chat, img, x, y, false, m)
   	} else {
		let link = await upload.webp(img)
		let stiker = await sticker(false, link, x, y)
			await conn.sendMessage(m.chat, stiker, MessageType.sticker, { quoted: m }).then(() => {
				fetch(`https://api.indocoder.dev/?del=${link.split('/')[4]}`)
			})
   	}
	} catch {
		return m.reply(_func.status.error)
	}},
	premium: true
}