let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['wame'],
	async: async (m, { conn, text, command }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		let number = m.quoted ? (m.quoted.sender).split`@`[0] : (m.sender).split`@`[0]
		let chat = text ? text : 'Hai+kak'
		await m.reply(`https://wa.me/${number}?text=${chat}`)
	},
	error: false
}