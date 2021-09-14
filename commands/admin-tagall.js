let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['tagall', 'everyone'],
	async: async (m, { conn, text, participants }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
		let users = participants.map(u => u.jid)
		let pesan = (!text) ? 'Hello everyone, admin mention you in ' + conn.getName(m.chat) + ' group.' : text
		conn.go(m.chat, `❏  *E V E R Y O N E*\n\n*“${pesan}”*\n${readMore}\n${users.map(v => '  ›  @' + v.replace(/@.+/, '')).join('\n')}\n\n${global.footer}`, global.header, users)
	},
	group: true,
	admin: true
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)