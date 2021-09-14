let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['steal'],
	async: async (m, { conn, text, _func, isPrefix, command, participants }) => {
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
		let pp = false
		try {
			pp = await (await _func.buffer(await conn.getProfilePicture(user)))
		} catch {
	  } finally {
			let bio = await conn.getStatus(user)
			if (!pp) return conn.reply(m.chat, `*Target @${user.split`@`[0]} doesn't put a profile picture maybe depressed.*\n\n• *Bio* : ${bio.status == 401 ? 'Follow me on instagram @neoxrs' : bio.status}`, m)
			conn.sendImage(m.chat, pp, `• *Bio* : ${bio.status == 401 ? 'Follow me on instagram @neoxrs' : bio.status}`, m)
		}
	}},
	group: true
}