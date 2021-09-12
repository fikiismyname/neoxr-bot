let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['exchange'],
	async: async (m, { conn, args }) => {
		let user = global.users[m.sender]
		let price = 5
		await conn.updatePresence(m.chat, Presence.composing)
		if (isNaN(args[0])) return m.reply(`*Limit must be a number.*`)
		if (user.point >= price * parseInt(args[0])) {
			user.point -= price * parseInt(args[0])
			user.limit += parseInt(args[0])
    		m.reply(`*You exchange ${price * args[0]} points for ${args[0]} limit.*`)
		} else {
			m.reply(`*Your points are not enough to be exchanged for ${args[0]} limit.*`)
		}
	},
	error: false
}
