let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['setmsg', 'setheader', 'setfooter', 'setwm', 'setcover'],
	async: async (m, {conn, text, _func, isPrefix, command }) => {
		let setting = global.setting
		if (command == 'setmsg') {
			if (!text) return m.reply(`• *Example* : ${isPrefix + command} I'am a Just Simple WhatsApp Bot`)
			setting.msg = text
			m.reply(`*Menu Message successfully set.*`)
		} else if (command == 'setheader') {
			if (!text) return m.reply(`• *Example* : ${isPrefix + command} JUST FOR FUN`)
			setting.header = text
			m.reply(`*Header Message successfully set.*`)
		} else if (command == 'setfooter') {
			if (!text) return m.reply(`• *Example* : ${isPrefix + command} Created by Wildan Izzudin`)
			setting.footer = text
			m.reply(`*Footer Message successfully set.*`)
		} else if (command == 'setwm') {
			if (!text || !text.match(/[|]/gi)) return m.reply(`• *Example* : ${isPrefix + command} Sticker by | @neoxrs`)
			if (text.match(/[|]/gi)) {
				let [ pack, author ] = text.split`|`
				setting.sk_pack = pack.trim()
				setting.sk_author = author.trim()
				m.reply(`*Sticker Watermark successfully set.*`)
			}
		} else if (command == 'setcover') {
		try {
			let q = m.quoted ? m.quoted : m
   		 let mime = (q.msg || q).mimetype || ''
			if (!/image/.test(mime)) return m.reply(`*Image not found.*`)
			m.reply(_func.status.wait)
			let img = await q.download()
			if (!img) return m.reply(_func.status.wrong)
			let link = await _func.upImg(img)
			setting.cover = link
			m.reply(`*Cover successfully set.*`)
		} catch {
			return m.reply(_func.status.error)
		}}
	},
	owner: true
}
