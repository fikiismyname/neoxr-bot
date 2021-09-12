let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['global'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		let setting = global.setting
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.cover), `*This command to turn off and turn on group only.*`, global.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if (args[0] == 'on') {
			if (setting.groupOnly) return m.reply(`*Group Only already OFF.*`)
			setting.groupOnly = true
			m.reply(`*Group Only successfully turned off.*`)
		} else if (args[0] == 'off') {
			if (!setting.groupOnly) return m.reply(`*Group Only already ON.*`)
			setting.groupOnly = false
			m.reply(`*Group Only successfully turned on.*`)
		}
	},
	owner: true
}