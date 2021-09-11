let { Presence } = require('@adiwajshing/baileys')
let yts = require('yt-search')
let { decode } = require('html-entities')
let { servers, ytv } = require('../library/y2mate')
exports.run = {
	usage: ['ytmp4'],
	async: async (m, { conn, _func, args, text, isPrefix, command }) => {
	try { 
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} https://youtu.be/PfKB5Zwvqqw`)
		let json = await yts(text)
		m.reply(_func.status.getdata)
		let yt = json.all.find(video => video.seconds < 3600)
		let server = (args[1] || servers[0]).toLowerCase()
		let { dl_link, title, filesize, filesizeF } = await ytv(yt.url, servers.includes(server) ? server : servers[0])
		let over = 100 * 1024 < filesize
		if (over) return m.reply(`Filesize ${filesizeF}, it's over size to upload via WhatsApp but you can download by ur self using this link : ${await _func.crop(dl_link)}`)
		conn.sendVideo(m.chat, dl_link, decode(title), m)
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false
}