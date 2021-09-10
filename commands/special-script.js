let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['script'],
	async: async (m, { conn }) => {
		conn.updatePresence(m.chat, Presence.composing)
		m.reply(`*Default Source* : https://github.com/neoxr/neoxr-bot`)
	},
	error: false
}