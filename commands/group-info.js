let { Presence } = require('@adiwajshing/baileys')
let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
	usage: ['groupinfo'],
	async: async (m, { conn, _func, participants }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		let { banned, mute, game, welcome, left, notify, spamProtect, localonly, nodelete, nobadword, nolink, novirtex, expired, stay } = global.groups[m.chat]
		let pic = await _func.buffer('./media/images/default.jpg')
	try {
		pic = await conn.getProfilePicture(m.chat)
	} catch {
		} finally {
			let gName = await conn.getName(m.chat)
			let name = (typeof gName == 'undefined') ? 'Undefined' : gName
			let member = participants.map(u => u.jid)
			let _meta = await conn.groupMetadata(m.chat)
			let y = `❏  *G R O U P - I N F O*\n\n`
			y += `	›  *Name* : ${name}\n`
			y += `	›  *Member* : ${member.length}\n`
			y += `	›  *Created* : ${moment(_meta.creation * 1000).format('DD/MM/YY HH:mm:ss')}\n`
			y += `	›  *Owner* : @${m.chat.split`-`[0]}\n\n`
			y += `❏  *M O D E R A T I O N*\n\n`
			y += `	›  *Anti Delete* : ${_func.swit(nodelete)}\n`
			y += `	›  *Anti Group Link* : ${_func.swit(nolink)}\n`
			y += `	›  *Anti Virtex* : ${_func.swit(novirtex)}\n`
			y += `	›  *Game* : ${_func.swit(game)}\n`
			y += `	›  *Localonly* : ${_func.swit(localonly)}\n`
			y += `	›  *Left* : ${_func.swit(left)}\n`
			y += `	›  *Spam Notification* : ${_func.swit(notify)}\n`
			y += `	›  *Spam Protection* : ${_func.swit(spamProtect)}\n`
			y += `	›  *Welcome* : ${_func.swit(welcome)}\n\n`
			y += `❏  *G R O U P - S T A T U S*\n\n`
			y += `	›  *Banned* : ${_func.check(banned)}\n`
			y += `	›  *Muted* : ${_func.check(mute)}\n`
			y += `	›  *Stay* : ${_func.check(stay)}\n`
			y += `	›  *Expired* : ${expired == 0 ? 'NOT SET' : _func.expire(expired - new Date * 1)}\n\n`
			y += global.footer
			conn.sendImage(m.chat, pic, y, m, { contextInfo: { mentionedJid: [m.chat.split`-`[0] + '@s.whatsapp.net'] }})
	}},
	group: true
}