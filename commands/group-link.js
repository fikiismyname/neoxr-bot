let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['link', 'getlink'],
	async: async (m, { conn }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
		conn.reply(m.chat, 'https://chat.whatsapp.com/' + (await conn.groupInviteCode(m.chat)), m)
	},
	group: true,
	botAdmin: true
}