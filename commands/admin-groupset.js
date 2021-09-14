let { Presence, GroupSettingChange } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['group', 'setname', 'setdesc', 'seticon'],
	async: async (m, { conn, text, args, isPrefix, command }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
		let value = m.quoted ? m.quoted.text : text
		if (command == 'group') {
			if (!args || !args[0]) return m.reply(`*Select option open / close*`)
			if(args[0] == 'open') {
				await conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, false)
			} else if(args[0] == 'close') {
				await conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
			}
		} else if (command == 'setname') {
			if (!text) return m.reply(`*Where is the text ?*`)
			if (value > 25) return m.reply(`*Text is too long.*`)
			await conn.groupUpdateSubject(m.chat, value)
		} else if (command == 'setdesc') {
			await conn.groupUpdateDescription(m.chat, value)
		} else if (command == 'seticon') {
			if (!m.quoted) return conn.reply(m.chat, `*Image not found.*`, m)
    		let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted }} : m
    		if (!/image/.test((m.quoted ? m.quoted : m.msg).mimetype || '')) return m.reply(`*Invalid format.*`)
			let img = await conn.downloadM(q)
			if (!img) throw img
			await conn.updateProfilePicture(m.chat, img)
		}
	},
	group: true,
	admin: true,
	botAdmin: true
}