let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['welcome'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.db.groups[m.chat]
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.cover), `*This command to turn off and turn on welcome message in group.*`, global.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.welcome) return m.reply(`*Welcome Message already ON.*`)
			setting.welcome = true
			m.reply(`*Welcome Message successfully turned on.*`)
		} else if (args[0] == 'off') {
			if (!setting.welcome) return m.reply(`*Welcome Message already OFF.*`)
			setting.welcome = false
			m.reply(`*Welcome Message successfully turned off.*`)
		}
	},
	admin: true,
	group: true
}