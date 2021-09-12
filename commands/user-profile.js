let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['profile'],
	async: async (m, { conn, text, _func, command, participants }) => {
		conn.updatePresence(m.chat, Presence.composing)
		let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@`[1]) : text
		if (!text && !m.quoted) return conn.reply(m.chat, `*Mention or Reply chat target.*`, m)
		if (isNaN(number)) return conn.reply(m.chat, `*Invalid number.*`, m)
		if (number.length > 15) return conn.reply(m.chat, `*Invalid format.*`, m)
	try {
		if (text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}
		} catch (e) {
	} finally {
		let users = global.users[user]
		if (typeof users == 'undefined') return m.reply(`*Can't find user data.*`)
		let setting = global.setting
		let pic = await _func.buffer('./media/images/default.jpg')
	try {
		pic = await _func.buffer(await conn.getProfilePicture(user))
	} catch {
		} finally {
		let getname = await conn.getName(user, true)
		let now = new Date() * 1
		let name = (typeof getname == 'undefined') ? '(unnammed)' : getname
		let lastseen = (users.lastseen == 0) ? 'Never' : _func.toTime(now - users.lastseen)
		let usebot = (users.usebot == 0) ? 'Never' : _func.toTime(now - users.usebot)
		let y = `❏  *U S E R - P R O F I L E*\n\n`
		y += `	›  *Name* : ${name}\n`
		y += `	›  *Point* : ${_func.numbFormat(users.point)}\n`
		y += `	›  *Limit* : ${user.premium ? 'Unlimited' : _func.numbFormat(users.limit)}\n`
		y += `	›  *Warning* : ${users.warning} / 5\n`
		y += `	›  *Hitstat* : ${_func.numbFormat(users.hit)}\n`
		y += `	›  *Usebot* : ${usebot}\n`
		y += `	›  *Lastseen* : ${lastseen}\n\n`
		y += `❏  *U S E R - S T A T U S*\n\n`
		y += `	›  *Blocked* : ${_func.check(conn.blocklist.includes(user.replace('s.whatsapp.net', 'c.us')))}\n`
		y += `	›  *Banned* : ${_func.check(users.banned)}\n`
		y += `	›  *Owner* : ${_func.check(setting.owner.includes(user.split`@`[0]))}\n`
		y += `	›  *Premium* : ${_func.check(users.premium)}\n`
		y += `	›  *Expired* : ${users.expired == 0 ? '-' : _func.expire(users.expired - new Date * 1)}\n\n`
		y += global.footer
		conn.sendImage(m.chat, pic, y, m)
	}}},
	error: false
}