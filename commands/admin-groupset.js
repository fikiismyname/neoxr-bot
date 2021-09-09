let { Presence, GroupSettingChange } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['group'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
		if (!args || !args[0]) return conn.send2ButtonLoc(m.chat, await _func.buffer(global.cover), `*This command to close and open group.*`, global.footer, 'CLOSE', `${isPrefix + command} close`, 'OPEN', `${isPrefix + command} open`, m)
		if(args[0] == 'open') {
			conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, false)
		} else if(args[0] == 'close') {
			conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
		}
	},
	group: true,
	admin: true,
	botAdmin: true
}