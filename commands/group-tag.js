let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['tag'],
	async: async (m, { conn, text, participants, isPrefix, command }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
		let users = participants.map(u => u.jid)
		if (!text) return m.reply(`• *Example* : ${isPrefix + command} my love`)
		for(let i = 0; i < 1; i++) {
			var rand = Math.floor(users.length * Math.random())
			var tag = users[rand]
			conn.reply(m.chat, `› *${text}* ~> @${tag.replace(/@.+/, '')}`, m)
		}
	},
	group: true
}