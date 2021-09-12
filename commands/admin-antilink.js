let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['antilink'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.groups[m.chat]
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.setting.cover), `*This command to turn off and turn on anti group link.*`, global.setting.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.nolink) return m.reply(`*Anti Link already ON.*`)
			setting.nolink = true
			m.reply(`*Anti Link successfully turned on.*`)
		} else if (args[0] == 'off') {
			if (!setting.nolink) return m.reply(`*Anti Link already OFF.*`)
			setting.nolink = false
			m.reply(`*Anti Link successfully turned off.*`)
		}
	},
	admin: true,
	group: true,
	botAdmin: true
}