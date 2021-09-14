let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
exports.run = {
	usage: ['goreplay'],
	async: async (m, { conn, _func, text, isPrefix, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing)
		if (!text) return m.reply(`• *Example* : ${isPrefix + command} isis execution`)
		m.reply(_func.status.getdata)
		let json = await (await fetch(global.API('neoxr', '/download/goreplay', { query: text }, 'apikey'))).json()
		if (!json.status) return m.reply(_func.status.fail)
		await conn.updatePresence(m.chat, Presence.composing)
		conn.sendVideo(m.chat, json.data.video, `❏  *G O R E - P L A Y*\n\n	›  *Title* : ${json.data.title}\n	›  *Author* : ${json.data.author}\n	›  *Views* : ${json.data.views}\n	›  *Extension* : .mp4\n\n${global.footer}`, m)
	} catch {
		return m.reply(_func.status.error)
	}},
	limit: false
}