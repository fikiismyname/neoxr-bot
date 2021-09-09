let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['kick', '-'],
	async: async (m, { conn, text, isPrefix, command, participants }) => {
		conn.updatePresence(m.chat, Presence.composing)
		let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@`[1]) : text
		if (!text && !m.quoted) return conn.reply(m.chat, `*Mention or Reply chat target.*`, m)
		if (isNaN(number)) return conn.reply(m.chat, `*Invalid number.*`, m)
		if (number.length > 15) return conn.reply(m.chat, `*Invalid format.*`, m)
	try {
		if (text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}
		} catch (e) {
	} finally {
		let users = m.isGroup ? participants.find(u => u.jid == user) : {}
		if (!users) return m.reply(`*Sorry my system can't find Target.*`)
		if (user == conn.user.jid) return m.reply(`*The fuck?*`)
		conn.groupRemove(m.chat, [user])
	}},
	group: true,
	admin: true,
	botAdmin: true
}