let { Presence } = require('@adiwajshing/baileys')
let yts = require('yt-search')
let { decode } = require('html-entities')
let { servers, yta } = require('../library/y2mate')
exports.run = {
	usage: ['play'],
	async: async (m, { conn, _func, args, text, isPrefix, command }) => {
	try { 
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} lathi`)
		m.reply(_func.status.getdata)
		let json = await yts(text)
		let yt = json.all.find(video => video.seconds < 3600)
		let server = (args[1] || servers[0]).toLowerCase()
		let { dl_link, title, filesize, filesizeF } = await yta(yt.url, servers.includes(server) ? server : servers[0])
		let y = '	›  *Title* : ' + decode(yt.title) + '\n'
		y += '	›  *Duration* : ' + yt.seconds + ' (' + yt.timestamp + ')\n'
		y += '	›  *Publish* : ' + yt.ago + '\n'
		y += '	›  *Views* : ' + Number(yt.views).toLocaleString().replace(/,/g, '.') + '\n'
		y += '	›  *Channel* : ' + yt.author.name
		await conn.updatePresence(m.chat, Presence.composing)
		conn.send2ButtonLoc(m.chat, await _func.buffer(yt.thumbnail), y, global.footer, 'AUDIO', `${isPrefix}ytmp3 ${yt.url}`, 'VIDEO', `${isPrefix}ytmp4 ${yt.url}`)
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false
}