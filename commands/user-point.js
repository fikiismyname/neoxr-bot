let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['point'],
	async: async (m, { conn, _func, isPrefix }) => {
		let user = global.users[m.sender]
		let owner = global.setting.owner
		if (owner.includes(m.sender.split`@`[0])) return m.reply(`*Your point is Unlimited.*`)
		conn.updatePresence(m.chat, Presence.composing)
		if (user.point == 0) return conn.sendButtonLoc(m.chat, await _func.buffer(global.cover), `*Sorry @${m.sender.split`@`[0]}, you don't have a point, you can get points by claiming.*`, global.footer, 'CLAIM', `${isPrefix}claim`, m)
		m.reply(`*Your have _${user.point}_ points.*`)
	},
	error: false
}