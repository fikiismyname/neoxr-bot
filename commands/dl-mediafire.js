let { Presence, MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let { decode } = require('html-entities')
exports.run = {
	usage: ['mf', 'mediafire'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} https://www.mediafire.com/file/1fqjqg7e8e2v3ao/YOWA.v8.87_By.SamMods.apk/file`)
		if (!args[0].match(/(https:\/\/www.mediafire.com)/gi)) return m.reply(_func.status.invalid)
		m.reply(_func.status.getdata)
		let json = await (await fetch(global.API('neoxr', '/download/mediafire', { url: args[0] }, 'apikey'))).json()
		if (!json.status) return m.reply(_func.status.fail)
		let y = `•  *Name* : ${unescape(decode(json.data.filename))}\n`
		y += `•  *Mime* : ${json.data.mime}\n`
		y += `•  *Size* : ${json.data.size}\n`
		y += `•  *Extension* : ${json.data.extension}`
		conn.updatePresence(m.chat, Presence.composing) 
		let chSize = _func.overSize(json.data.size, 80)
		if(chSize.oversize) return m.reply(`• *The file size you requested is ${json.data.size}, the size exceeds the limit, please download it yourself via this link* :\n\n• ${await _func.crop(json.data.link)}*`)
		m.reply(y).then(() => {
			conn.updatePresence(m.chat, Presence.composing)
			conn.sendDoc(m.chat, json.data.link, unescape(decode(json.data.filename)), m)
		})
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false,
	limit: true
}