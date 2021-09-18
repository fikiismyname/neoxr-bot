let { Presence } = require('@adiwajshing/baileys')
let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
	usage: ['setcmd', 'delcmd', 'listcmd'],
	async: async (m, { conn, text, command }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		if (command == 'setcmd') {
			if (!m.quoted || m.quoted.mtype != 'stickerMessage') return m.reply(`*Reply sticker to be used as a command sticker.*`)
			if (!text) return m.reply(`*Give a text or command.*`)
			let hash = m.quoted.fileSha256.toString('hex')
			if (typeof global.sticker[hash] != 'undefined') return m.reply('*The sticker is already in the database with the text / command* : ```' + global.sticker[hash].text + '```')
			global.sticker[hash] = {
				text: text,
				created: new Date() * 1,
			}
			m.reply('*Stickers have been set as text / command* : ```' + text + '```')
		} else if (command == 'delcmd') {
			if (!m.quoted || m.quoted.mtype != 'stickerMessage') return m.reply(`*Reply sticker that will be removed from the cmd list.*`)
			let hash = m.quoted.fileSha256.toString('hex')
			if (typeof global.sticker[hash] == 'undefined') return m.reply(`*The sticker is not in the database.*`)
			delete global.sticker[hash]
			m.reply(`*Sticker command has been removed.*`)
		} else if (command == 'listcmd') {
			let cmdS = Object.keys(global.sticker)
			if (cmdS.length == 0) return m.reply(`*No sticker command.*`)
			let y = `❏  *C M D - L I S T*\n\n`
			for (let i=0; i<cmdS.length; i++) {
				y += '*' + (i + 1) + '.* ' + cmdS[i] + '\n'
				y += '	›  *Text* : ' + global.sticker[cmdS[i]].text + '\n'
				y += '	›  *Created* : ' + moment(global.sticker[cmdS[i]].created).format('DD/MM/YY HH:mm:ss') + '\n\n'
			}
			conn.go(m.chat, y + global.footer, global.header, [m.sender])
		}
	},
	god: true
}