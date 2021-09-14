let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
exports.run = {
	usage: ['tiktok', 'tikwm', 'tikmp3'],
	async: async (m, { conn, args, _func, isPrefix, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} https://vt.tiktok.com/ZSJTTSNrS`)
		m.reply(_func.status.getdata)
		let json = await (await fetch(global.API('neoxr', '/download/tiktok', { url: args[0] }, 'apikey'))).json()
		if (!json.status) return m.reply(_func.status.fail)
		if (command == 'tiktok') {
			await conn.updatePresence(m.chat, Presence.composing)
			return conn.sendVideo(m.chat, json.data.video, null, m)
		} else if (command == 'tikwm') {
			await conn.updatePresence(m.chat, Presence.composing)
			return conn.sendVideo(m.chat, json.data.videoWM, null, m)
		} else if (command == 'tikmp3') {
			await conn.updatePresence(m.chat, Presence.composing)
			return conn.sendAudio(m.chat, json.data.audio, false, m)
		}
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false,
	limit: true
}