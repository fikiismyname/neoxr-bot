let { Presence } = require('@adiwajshing/baileys')
const { EmojiAPI } = require("emoji-api")
const emoji = new EmojiAPI()
exports.run = {
	usage: ['emo'],
	async: async (m, { conn, args, _func, isPrefix, command }) => {
	try {
		let exif = global.setting
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} 🙂`)
		let json = await emoji.get(args[0])
		await conn.sendSticker(m.chat, json.images[4].url, exif.sk_pack, exif.sk_author, false, m)
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false
}