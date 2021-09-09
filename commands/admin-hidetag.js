let { MessageType, Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['hidetag'],
	async: async (m, { conn, text, participants }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
		let users = participants.map(u => u.jid)
		let q = m.quoted ? m.quoted : m
		let c = m.quoted ? m.quoted : m.msg
		let msg = conn.cMod(m.chat, conn.prepareMessageFromContent(m.chat, {[c.toJSON ? q.mtype : MessageType.extendedText]: c.toJSON ? c.toJSON() : { text: c || '' }}, { contextInfo: { mentionedJid: users }, quoted: null }), text || q.text)
		await conn.relayWAMessage(msg)
	},
	group: true,
	admin: true
}