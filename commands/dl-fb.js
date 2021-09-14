let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
exports.run = {
	usage: ['fb'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} https://www.facebook.com/groups/526925218448628/permalink/570999980707818/`)
		if (!args[0].match(/(https:\/\/www.facebook.com)/gi)) return m.reply(_func.status.invalid)
		m.reply(_func.status.getdata)
		let json = await (await fetch(global.API('neoxr', '/download/fb', { url: args[0] }, 'apikey'))).json()
		if (!json.status) return m.reply(_func.status.fail)
		conn.updatePresence(m.chat, Presence.composing) 
		let chSize = _func.overSize(json.data.sd.size, 50)
		if(chSize.oversize) return m.reply(`• *The file size you requested is ${json.data.sd.size}, the size exceeds the limit, please download it yourself via this link* :\n\n• ${await _func.crop(json.data.sd.url)}*`)
		conn.sendVideo(m.chat, json.data.sd.url, null, m)
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false,
	limit: true
}