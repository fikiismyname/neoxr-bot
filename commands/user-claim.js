let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['claim'],
	async: async (m, { conn, _func }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		let user = global.users[m.sender]
		let timeClaim = 3600000
		let claimed = new Date(user.lastclaim + timeClaim)
		let timeout = claimed - new Date()
		if (new Date - user.lastclaim > timeClaim) {
    		m.reply(`*You get 100 points and 5 limits.*`) 
			user.point += 100
			user.limit += 5
			user.lastclaim = new Date() * 1
		} else {
			m.reply(`*You already claimed, you can claim it again in the next hour.*\n\n*Timeout : [ ${_func.toClock(timeout)} ]*`)
		}
	},
	error: false
}
