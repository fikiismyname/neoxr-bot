let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['saveme'],
	async: async (m, { conn, text, isPrefix, command }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
		if (!text) return m.reply(`• *Example* : ${isPrefix + command} Wildan Izzudin`)
		if (text.length > 15) return m.reply(`*Your name is too long.*`)
		let user = m.sender
		let number = user.split`@`[0]
		await conn.sendContact(m.chat, number, text, m)
	},
	error: false
}