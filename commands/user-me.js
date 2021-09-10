let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['me'],
	async: async (m, { conn, _func, isPrefix }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		let user = global.db.users[m.sender]
		let setting = global.db.setting
		let pic = await _func.buffer('./media/images/default.jpg')
	try {
		pic = await _func.buffer(await conn.getProfilePicture(m.sender))
	} catch {
		} finally {
		let getname = await conn.getName(m.sender, true)
		let now = new Date() * 1
		let name = (typeof getname == 'undefined') ? '(unnammed)' : getname
		let lastseen = (user.lastseen == 0) ? 'Never' : _func.toTime(now - user.lastseen)
		let usebot = (user.usebot == 0) ? 'Never' : _func.toTime(now - user.usebot)
		let y = `❏  *U S E R - P R O F I L E*\n\n`
		y += `	›  *Name* : ${name}\n`
		y += `	›  *Point* : ${_func.numbFormat(user.point)}\n`
		y += `	›  *Limit* : ${_func.numbFormat(user.limit)}\n`
		y += `	›  *Warning* : ${user.warning} / 5\n`
		y += `	›  *Hitstat* : ${_func.numbFormat(user.hit)}\n`
		y += `	›  *Usebot* : ${usebot}\n`
		y += `	›  *Lastseen* : ${lastseen}\n\n`
		y += `❏  *U S E R - S T A T U S*\n\n`
		y += `	›  *Blocked* : ${_func.check(conn.blocklist.includes(m.sender))}\n`
		y += `	›  *Banned* : ${_func.check(user.banned)}\n`
		y += `	›  *Owner* : ${_func.check(setting.owner.includes(m.sender.split`@`[0]))}\n`
		y += `	›  *Premium* : ${_func.check(user.premium)}\n`
		y += `	›  *Expired* : ${user.expired == 0 ? '-' : _func.expire(user.expired)}\n\n`
		y += global.footer
		conn.sendImage(m.chat, pic, y, m)
	}},
	error: false
}