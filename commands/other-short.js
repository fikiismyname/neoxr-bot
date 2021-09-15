let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['short'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing) 
		if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} https://www.google.com`)
		await m.reply(_func.status.wait)
		await conn.updatePresence(m.chat, Presence.composing) 
		await m.reply(`*Result* : ${await _func.crop(args[0])}`)
	} catch {
		m.reply(_func.status.error)
	}},
	error: false
}