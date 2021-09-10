let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['listblock'],
	async: async (m, { conn, _func, isPrefix }) => {
		conn.updatePresence(m.chat, Presence.composing)
		let lb = conn.blocklist
		function gName(arr) {
			let isName = conn.getName(arr, true)
			let name = (typeof isName !== 'undefined') ? isName : 'Unnamed'
			return name
		} 
		if (lb.length == 0) return m.reply(`*No users are blocked.*`)
		return conn.go(m.chat, `❏  *L I S T B L O C K*\n\n*“There are ${userBan.length} users who have been blocked.”*\n\n${lb.map(v => '  ›  *Name*  :  ' + gName(v) + '\n     wa.me/' + v.replace(/@.+/, '')).join('\n') + '\n\n' + global.footer}`, global.headtext, [m.sender])
	},
	error: false
}