let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['tagme'],
	async: async (m, { conn }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		conn.reply(m.chat, `@${m.sender.split`@`[0]}`, m)
	},
	group: true
}