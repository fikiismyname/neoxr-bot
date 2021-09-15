let { Presence } = require('@adiwajshing/baileys')
let lyricsParse = require('lyrics-parse')
let { decode } = require('html-entities')
exports.run = {
	usage: ['lirik'],
	async: async (m, { conn, _func, text, isPrefix, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing) 
		if (!text) return m.reply(`• *Example* : ${isPrefix + command} dear god`)
		m.reply(_func.status.getdata)
		let lyrics = await lyricsParse(text, '')
		await conn.updatePresence(m.chat, Presence.composing)
		lyrics ? m.reply(unescape(decode(lyrics))) : m.reply(_func.status.fail)
	} catch {
		m.reply(_func.status.error)
	}},
	error: false
}