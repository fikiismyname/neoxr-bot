let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['contact'],
	async: async (m, { conn, text }) => {
		conn.updatePresence(m.chat, Presence.composing)
		let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@`[1]) : text
		if (!text && !m.quoted) return conn.reply(m.chat, `*Mention or Reply chat target.*`, m)
		if (isNaN(number)) return conn.reply(m.chat, `*Invalid number.*`, m)
		if (number.length > 15) return conn.reply(m.chat, `*Invalid format.*`, m)
	try {
		if (text) {
			var user = number
		} else if(m.quoted.sender) {
			var user = m.quoted.sender.split`@`[0]
		} else if(m.mentionedJid) {
  		  var user = number
			}
		} catch (e) {
	} finally {
		conn.sendContact(m.chat, user, conn.getName(user + '@s.whatsapp.net', true), m)
	}},
	error: false
}