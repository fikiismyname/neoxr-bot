let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['ban', 'unban'],
	async: async (m, { conn, text, command, participants }) => {
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
		let userF = global.db.users
		let ownerF = (global.db.setting.owner).includes(user)
		if (typeof userF[user] == 'undefined') return m.reply(`*Can't find user data.*`)
	if (command == 'ban') { 
		if (ownerF) return m.reply(`*You can't banned owner number.*`)
		if (user == conn.user.jid) return m.reply(`*The fuck?*`)
		if (userF[user].banned) return m.reply(`*Target already banned.*`)
		userF[user].banned = true
		let banned = 0
		for (let jid in userF) {
			if (userF[jid].banned) banned++
		} conn.reply(m.chat, `❏  *B A N N E D*\n\n*“Successfully to put @${user.split`@`[0]} in the banned list.”*\n\n*Total : ${banned}*`, m)
	} else if (command == 'unban') {
		if (user == conn.user.jid) return m.reply(`*The fuck?*`)
		if (userF[user].banned) return m.reply(`*Target not banned.*`)
		userF[user].banned = false
		let banned = 0
		for (let jid in userF) {
			if (!userF[jid].banned) banned++
		} conn.reply(m.chat, `❏  *U N B A N N E D*\n\n*“Now @${user.split`@`[0]} can using BOT again.”*\n\n*Total : ${banned}*`, m)
	}}},
	owner: true
}