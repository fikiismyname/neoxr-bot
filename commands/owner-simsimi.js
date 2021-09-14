let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['simsimi'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.db.setting
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.cover), `*This command to turn off and turn on simsimi.*`, global.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.simsimi) return m.reply(`*Simsimi already ON.*`)
			setting.simsimi = true
			m.reply(`*Simsimi successfully turned on.*`)
		} else if (args[0] == 'off') {
			if (!setting.simsimi) return m.reply(`*Simsimi already OFF.*`)
			setting.simsimi = false
			m.reply(`*Simsimi successfully turned off.*`)
		}
	},
	owner: true
}