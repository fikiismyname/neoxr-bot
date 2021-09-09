let { Presence } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let { exec } = require('child_process')
exports.run = {
	usage: ['toimg'],
	async: async (m, { conn, _func }) => {
	try {
		conn.updatePresence(m.chat, Presence.composing)
		if (!m.quoted) return conn.reply(m.chat, `*Only for Sticker!*`, m)
		let encM = (typeof JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.ephemeralMessage == 'undefined') ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.ephemeralMessage.message.extendedTextMessage.contextInfo
		if (typeof encM.message.stickerMessage == 'undefined') return m.reply(`*Only for Sticker!*`)
		let media = await conn.downloadAndSaveMediaMessage(encM)
		let file = await _func.named('png')
		let isFile = path.join(__dirname, '../tmp', file)
		exec(`ffmpeg -i ${media} ${isFile}`, (err, stderr, stdout) => {
			fs.unlinkSync(media)
			if (err) return m.reply(_func.status.error)
			buffer = fs.readFileSync(isFile)
			conn.sendImage(m.chat, buffer, null, m)
			fs.unlinkSync(isFile)
		})
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false
}