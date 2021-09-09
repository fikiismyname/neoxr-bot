let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['owner'],
	async : async (m, { conn }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		conn.sendContact(m.chat, m.sender.split`@`[0], conn.getName(m.sender, true), m)
	},
	error: false
}