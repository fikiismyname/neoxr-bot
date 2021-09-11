let { Presence } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
exports.run = {
	usage: ['igs'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
	try {
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return m.reply(`• *Example* :\n\n${isPrefix + command} hosico_cat\n${isPrefix + command} hosico_cat 2`)
		m.reply(_func.status.getdata)
		let json = await (await fetch(global.API('neoxr', '/download/stories', { username: args[0] }, 'apikey'))).json()
		if (!json.status) return m.reply(_func.status.fail)
		if (!args[1]) {
			await m.reply(`*Fetching ${json.data.length} strories from ${args[0]} . . .*`)
			for (let i=0; i<json.data.length; i++) {
				if (json.data[i].type == 'mp4') {
					conn.sendVideo(m.chat, json.data[i].url, `*Stories .${i + 1}*`, m) 
				} else if (json.data[i].type == 'jpg') { 
					conn.sendImage(m.chat, json.data[i].url, `*Stories .${i + 1}*`, m)
				} await _func.delay(2500)
			}
		} else {
			if (isNaN(args[1])) return conn.reply(m.chat, `*Must be a number.*`, m)
			if (args[1] > json.data.length) return conn.reply(m.chat, `*There are only ${json.data.length} stories on the ${args[0]} account.*`, m)
			let numb = args[1] - 1
			if (json.data[numb].type == 'mp4') {
				conn.sendVideo(m.chat, json.data[numb].url, `*Stories .${args[1]}*`, m) 
			} else if(json.data[numb].type == 'jpg') { 
				conn.sendImage(m.chat, json.data[numb].url, `*Stories .${args[1]}*`, m)
			} 
		}
	} catch {
		return m.reply(_func.status.error)
	}},
	error: false,
	limit: true
}