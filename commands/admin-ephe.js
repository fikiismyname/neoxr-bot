let { Presence, GroupSettingChange } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['ephe'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.cover), `*This command to turn on and turn off disappearing message.*`, global.footer, 'ON', `${isPrefix + command} on`, 'OFF', `${isPrefix + command} off`, m)
		if(args[0] == 'on') {
			await conn.toggleDisappearingMessages(m.chat, 604800)
		} else if(args[0] == 'off') {
			await conn.toggleDisappearingMessages(m.chat, 0)
		}
	},
	group: true,
	admin: true,
	botAdmin: true
}