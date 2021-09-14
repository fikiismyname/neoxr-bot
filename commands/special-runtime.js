let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['runtime'],
	async: async (m, { conn, _func }) => {
		conn.updatePresence(m.chat, Presence.composing)
		const _uptime = process.uptime() * 1000
  	  const uptime = _func.toClock(_uptime) 
		m.reply(`*Running for : [ ${uptime} ]*`)
	},
	error: false
}