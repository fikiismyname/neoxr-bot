let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['stat', 'botstat'],
	async: async (m, { conn, _func, isPrefix }) => {
		await conn.updatePresence(m.chat, Presence.composing) 
		const chat = conn.chats.all()
		const groups = chat.filter(v => v.jid.endsWith('g.us'))
		const groupsIn = groups.filter(v => !v.read_only)
		const chats = conn.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net') && !v.read_only && v.message).map(v => v.jid).length
		const gcleft = groups.length - groupsIn.length
		const total = Object.keys(global.db.chats).length
		const users = Object.keys(global.db.users).length
		const s = global.db.setting
		const blocked = conn.blocklist.length
		const _uptime = process.uptime() * 1000
  	  const uptime = _func.toClock(_uptime) 
    	let user = global.db.users
		let banned = 0
		for (let jid in user) {
			if(user[jid].banned == true) banned++
		}
		conn.go(m.chat, botstat(_func, groupsIn, gcleft, chats, total, users, s, blocked, banned, uptime, global.footer), global.header, [m.sender])
		
	},
	error: false
}

const botstat = (_func, group, gcleft, chat, total, user, s, blocked, banned, uptime, footer) => { 
return `
*01.*  S T A T I S T I C

	›  *${group.length}* Groups Joined
	›  *${gcleft}* Groups Left
	›  *${chat}* Personal Chats
	›  *${total}* Total Chats
	›  *${user}* Users In Database
	›  *${blocked}* Users Blocked
	›  *${banned}* Users Banned
	›  *Uptime ~> ${uptime}*

*02.*  S Y S T E M

	›  Auto Backup : ${_func.swit(s.autobackup)}
	›  Auto Clear : ${_func.swit(s.autoclear)}
	›  Auto Read : ${_func.swit(s.autoread)}
	›  Simsimi : ${_func.swit(s.simsimi)}
	›  Self Mode : ${_func.swit(s.public)}
	›  Only Group : ${_func.swit(s.groupOnly)}
	›  Prefix : ${s.multiprefix ? 'Multi' : s.onlyprefix}
    
${footer}`
}