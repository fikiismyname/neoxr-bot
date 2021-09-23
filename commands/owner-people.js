let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['addown', 'delown', 'setown'],
	async: async (m, { conn, text, isPrefix, command }) => {
		conn.updatePresence(m.chat, Presence.composing)
		let owner = global.db.setting.owners
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
		if (command == 'addown') {
			if (owner.includes(user)) return m.reply(`*Target has become owner.*`)
			owner.push(user)
			conn.reply(m.chat, `*Successfully added @${user} to owner list.*`, m)
		} else if (command == 'delown') {
			if (!owner.includes(user)) return m.reply(`*Target is not in owner list.*`)
			owner.forEach((data, index) => {
				if (data === user) owner.splice(index, 1)
			}) 
			conn.reply(m.chat, `*Successfully removed @${user} from owner list.*`, m)
		} else if (command == 'setown') {
			global.setting.owner = user
			conn.reply(m.chat, `*Successfully set @${user} as owner.*`, m)
		}
	}},
	god: true
}