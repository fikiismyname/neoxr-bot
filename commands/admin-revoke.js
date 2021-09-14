let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['revoke'],
	async: async (m, { conn }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
		await conn.revokeInvite(m.chat)
		// conn.reply(m.chat, 'https://chat.whatsapp.com/' + res.code, m)
	},
	group: true,
	admin: true,
	botAdmin: true
}