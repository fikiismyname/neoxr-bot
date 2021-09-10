let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['report'],
	async: async (m, { conn, text, _func, isPrefix, command }) => {
		conn.updatePresence(m.chat, Presence.composing)
		if (!text) return m.reply(`• *Example* : ${isPrefix + command} I found a bug in the sticker feature not working.*`)
		if (text.length > 300) return m.reply(`*Text too long.*`)
		let y = `❏  *R E P O R T*\n\n`
		y += `Someone sends a report from chat : *${conn.getName(m.chat)}*\n\n`
		y += `• *Sender* : @${m.sender.split`@`[0]}\n`
		y += `• *Message* : ${text}`
		conn.reply(global.db.setting.owner[0] + '@c.us', y, m).then(() => {
			m.reply(`*Report sent successfully.*`)
		})
	},
	error: false
}