let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['autobackup'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.db.setting
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.cover), `*This command to turn off and turn on autobackup.*`, global.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.autobackup) return m.reply(`*Autobackup already ON.*`)
			setting.autobackup = true
			m.reply(`*Autobackup successfully turned on.*`)
		} else if (args[0] == 'off') {
			if (!setting.autobackup) return m.reply(`*Autobackup already OFF.*`)
			setting.autobackup = false
			m.reply(`*Autobackup successfully turned off.*`)
		}
	},
	owner: true
}