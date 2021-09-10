let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['addprem', 'delprem'],
	async: async (m, { conn, text, command, participants }) => {
		conn.updatePresence(m.chat, Presence.composing)
		let [ no, days ] = text.split`|`
		console.log([ no, days ])
		let isDay = (typeof days !== 'undefined') ? days.trim() : 30 // < default 30 days
		let day = 86400000 * isDay
		let now = new Date() * 1
		let number = isNaN(no.trim()) ? (no.startsWith('+') ? no.replace(/[()+\s-]/g, '').trim() : (no).split`@`[1].trim()) : no.trim()
		if (isNaN(number)) return conn.reply(m.chat, `*Invalid number.*`, m)
		if (number.length > 15 || m.quoted) return conn.reply(m.chat, `*Invalid format.*`, m)
	try {
		if (no) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}
		} catch (e) {
	} finally {
		let userF = global.db.users
		if (typeof userF[user] == 'undefined') return m.reply(`*Can't find user data.*`)
	if (command == 'addprem') { 
		if (isNaN(isDay)) return m.reply(`*The number of days must be a number.*`)
		if (userF[user].premium) return m.reply(`*Target already premium user.*`)
		userF[user].premium = true
		userF[user].expired = now + day
		let premium = 0
		for (let jid in userF) {
			if (userF[jid].premium) premium++
		} conn.reply(m.chat, `❏  *P R E M I U M*\n\n*“Successfully added premium access to @${user.split`@`[0]} for ${isDay} days”*\n\n*Total : ${premium}*`, m)
	} else if (command == 'delprem') {
		if (!userF[user].premium) return m.reply(`*Target not premium user.*`)
		userF[user].premium = false
		userF[user].expired = 0
		let premium = 0
		for (let jid in userF) {
			if (userF[jid].premium) premium++
		} conn.reply(m.chat, `❏  *D E L P R E M*\n\n*“@${user.split`@`[0]} premium status successfully removed.”*\n\n*Total : ${premium}*`, m)
	}}},
	owner: true
}