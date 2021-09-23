let { MessageType, Presence } = require('@adiwajshing/baileys')
let { green, blueBright, redBright } = require('chalk')
let _func = require('./system/function')
let util = require('util')
let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
let fs = require('fs')
let fetch = require('node-fetch')

module.exports = async function (conn, m) {
try {
	require('./system/database.js')(m)
	let isGod = [ global.conn.user.jid.split`@`[0], global.setting.owner, ...global.setting.owners ].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
	let isOwner = isGod || m.fromMe
	let isPrem = (typeof global.users[m.sender] !== 'undefined' && global.users[m.sender].premium) || isOwner
	let groupMetadata = m.isGroup ? conn.chats.get(m.chat).metadata || await conn.groupMetadata(m.chat) : {} || {}
	let participants = m.isGroup ? groupMetadata.participants : [] || []
	let user = m.isGroup ? participants.find(u => u.jid == m.sender) : {} // User Data
	let bot = m.isGroup ? participants.find(u => u.jid == conn.user.jid) : {} // Data Kamu (bot)
	let isAdmin = user.isAdmin || user.isSuperAdmin || false // Apakah user admin?
	let isBotAdmin = bot.isAdmin || bot.isSuperAdmin || false // Apakah kamu (bot) admin?
	let isBlock = conn.blocklist.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid).includes(m.sender)
	let groupSet = global.groups[m.chat]
    let users = global.users[m.sender]
    let chats = global.chats[m.chat]
    let setting = global.setting
    require('./system/logs')(conn, m, _func)
    if (m.chat.endsWith('broadcast')) return
    if (setting.autoread && !m.chat.endsWith('broadcast')) await conn.chatRead(m.chat)
    if (m.isGroup && !isBotAdmin && groupSet.localonly) groupSet.localonly = false
	// if (m.isGroup && !isBotAdmin && groupSet.spamProtect) groupSet.spamProtect = false
	let cPref = (typeof m.text !== 'object') ? m.text.trim().split('\n')[0].split(' ')[0] : ''
	if (setting.multiprefix ? setting.prefix.includes(cPref.slice(0,1)) : setting.onlyprefix == cPref) {
		global.myPrefix = cPref.slice(0,1)
		var prefix = new RegExp('^[' + (global.myPrefix) + ']')
	}
	if (!m.fromMe && (new Date * 1) >= global.users[m.sender].expired && global.users[m.sender].expired !== 0 && global.users[m.sender].premium) {
		await conn.updatePresence(m.chat, Presence.composing)
		return conn.reply(m.sender, `*Your premium package has expired, thank you for buying premium.*`, m).then(() => {
			global.users[m.sender].expired = 0
			global.users[m.sender].premium = false
		})
	}
	global.APIs = { 
		neoxr: 'https://neoxr-api.herokuapp.com/api',
		pk: 'https://pencarikode.xyz'
	}
	global.APIKeys = { 
		'https://neoxr-api.herokuapp.com/api': 'yntkts',
		'https://pencarikode.xyz': 'pais'
	}
	global.API= (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
	global.cover = setting.cover
	global.header = setting.header
	global.footer = setting.footer
	users.lastseen = new Date() * 1
	chats.lastseen = new Date() * 1
	chats.chat += 1
	if (m.isBaileys || users.banTemp != 0) return
	if (!m.fromMe && setting.groupOnly && !m.isGroup && !isOwner && !isPrem) {
		await conn.updatePresence(m.chat, Presence.composing) 
		return conn.go(m.chat, `*Bots can only be used in groups, sorry your number will be blocked automatically.*`, global.header, [m.sender]).then(async() => {
			await conn.blockUser(m.chat, 'add')
		})
	}
	if (typeof m.text !== 'object' && !m.fromMe && !users.banned && !setting.groupOnly && setting.simsimi && !m.isGroup && !m.text.startsWith(global.myPrefix) && !/^[>|=>|$]/.test(m.text.slice(0,1))) {
	try {
		let simi = await (await fetch('https://simsumi.herokuapp.com/api?text=' + encodeURIComponent(m.text) + '&lang=id')).json()
		if (!(simi.success).match(/queries/gi)) {
			await conn.updatePresence(m.chat, Presence.composing)
			conn.reply(m.chat, simi.success, m) 
		}
	} catch {
			return
		}  
	}
    if (typeof m.text !== 'object' && m.text.startsWith(global.myPrefix) && !isOwner) { 
		users.hit += 1
		users.usebot = new Date() * 1
	if (new Date() * 1 - chats.command > 5000) { // < 5s per-command
		chats.command = new Date() * 1
	} else {
		if (!m.fromMe) return
		}
	}
	if (((m.isGroup && !groupSet.banned) || !m.isGroup) && !users.banned) {
	if (typeof m.text !== 'object' && m.text == global.myPrefix) {
		conn.updatePresence(m.chat, Presence.composing)
		let old = new Date()
		let banchat = setting.public ? true : false
	if (banchat) {
		await m.reply('*Checking . . .*')
		return m.reply('*Response Speed : ' + ((new Date - old)*1) + 'ms*')
	} else {
		await m.reply('*Checking . . .*')
		return m.reply('*Response Speed : ' + ((new Date - old)*1) + 'ms (nonaktif)*')
			}
		}
	}
	if (!setting.public) if(!m.fromMe && !isOwner) return
	require('./system/games')(conn, m, _func)
	require('./system/utilities')(conn, m, users, groupSet, isBotAdmin, isAdmin, setting)
	require('./customize')(conn, m, _func, isGod, isOwner, isBlock, isAdmin, isBotAdmin)
	if (typeof m.text !== 'object' && setting.errorCmd.includes(m.text.split` `[0].substring(1).trim())) {
		conn.updatePresence(m.chat, Presence.composing) 
		return m.reply(`*Command _${m.text.split` `[0].trim()}_ is disabled due to an error.*`)
	}
	if (m.isGroup && groupSet.notify && !users.banned && !m.fromMe) {
		users.spam += 1
		let spam = users.spam
		if (spam >= 3) setTimeout(() => { users.spam = 0 }, 5000)
		if (m.isGroup && !isAdmin && isBotAdmin && !users.banned && groupSet.spamProtect && spam == 6) {
		return conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, true).then(async () => {
			await conn.updatePresence(m.chat, Presence.composing)
			conn.blockUser (m.sender, "add")
			conn.go(m.chat, `*Spam protect, group closing automatically and will open after 1 minute.*`, global.header, [m.sender]).then(async() => {
				await conn.updatePresence(m.chat, Presence.composing)
				conn.sendButtonLoc(m.chat, global.cover, `*Spammer @${m.sender.split`@`[0]}, for admins if you want to remove him / her from the group press the kick button.*`, 'KICK', `${global.myPrefix}kick @${m.sender.split`@`[0]}`)
			})
			users.spam = 0
				setTimeout(() => {
					conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, false)
				}, 60000)
			})
		} else 
	    if (m.isGroup && !isAdmin && !users.banned && spam == 6) {
			return conn.reply(m.chat, `*Over spam, you got temporarily banned for 1 minute.*`, m).then(() => {
				users.banTemp = new Date() * 1
			})
		} 
	    if (m.isGroup && groupSet.notify) {
			if(spam == 5) return conn.reply(m.chat, `*Hi @${m.sender.split('@')[0]} don't spam, cooldown 5 seconds.*`, m)
		}
	}
	if (new Date() * 1 - users.banTemp > 60000) { 
		users.banTem = 0
	}
	if (setting.autoclear) {
		if (chats.chat > 100) {
			conn.modifyChat(m.chat, 'delete').then(() => {
				chats.chat = 0
				conn.go(m.chat, `*Automatic Clear Chat.*`, global.header, ['0@s.whatsapp.net'])
			})
		}
	}
	if (setting.autobackup) {
		if (new Date() * 1 - setting.backupTime > 1000 * 60 * 60) {
			await global.save
			let dbFile = await _func.buffer('./database.json')
			conn.sendDoc(setting.owner + '@c.us', dbFile, 'database.json').then(() => {
				setting.backupTime = new Date() * 1
			})
		}
	}
	let isPrefix
	if (typeof m.text !== 'object' && m.text && m.text.length != 1 && (isPrefix = (global.myPrefix || '')[0])) {
		let args = m.text.replace(isPrefix, '').split` `.filter(v=>v)
		let command = args.shift().toLowerCase()
		let noPrefix = m.text.replace(isPrefix, '')
		let _args = noPrefix.trim().split` `.slice(1)
        let text = _args.join` `
	for (let n in global.cmd) {
		let cmd = global.cmd[n].run
		let turn = cmd.usage instanceof RegExp ? cmd.usage.test(command) : cmd.usage instanceof Array ? cmd.usage.includes(command) : cmd.usage instanceof String ? cmd.usage == command : false
		if (!m.text.startsWith('>') && !m.text.startsWith('=>')) {
			if (!m.text.startsWith(global.myPrefix)) return
		}
		if (!turn) continue
		if (m.chat in global.groups || m.sender in global.users) {
            let group = global.groups[m.chat]
            let user = global.users[m.sender]
            let setting = global.setting
            if (!['admin-activation.js', 'group-check.js', 'group-info.js'].includes(n) && group && (group.banned || group.mute)) return
            if (!['user-me.js', 'user-profile.js'].includes(n) && user && user.banned) return
		}
		if (typeof cmd.error !== 'undefined' && cmd.error) {
			m.reply(_func.status.errorF)
			continue
		}
		if (typeof cmd.premium !== 'undefined' && cmd.premium && !isPrem) { 
			m.reply(_func.status.premium)
            continue
		}
		if (typeof cmd.limit !== 'undefined' && cmd.limit && !isPrem && global.users[m.sender].limit > 0) {
			global.users[m.sender].limit -= 1
		}
		if (typeof cmd.limit !== 'undefined' && cmd.limit && !isPrem && global.users[m.sender].limit == 0) {
			conn.sendButtonLoc(m.chat, await _func.buffer(global.setting.cover), `*Sorry @${m.sender.split`@`[0]}, you don't have a limit, please exchange it with your points first.*`, global.setting.footer, 'EXCHANGE', `${isPrefix}exchange 1`, m)
			continue
		}
		if (typeof cmd.owner !== 'undefined' && cmd.owner && !isOwner) { 
			m.reply(_func.status.owner)
            continue
		}
		if (typeof cmd.god !== 'undefined' && cmd.god && !isGod) { 
			m.reply(_func.status.god)
            continue
		}
		if (typeof cmd.group !== 'undefined' && cmd.group && !m.isGroup) {
			m.reply(_func.status.group)
            continue
		} else if (typeof cmd.botAdmin !== 'undefined' && cmd.botAdmin && !isBotAdmin) {
            m.reply(_func.status.botAdmin)
            continue
		} else if (typeof cmd.admin !== 'undefined' && cmd.admin && !isAdmin) {
            m.reply(_func.status.admin)
            continue
		}
		if (typeof cmd.private !== 'undefined' && cmd.private && m.isGroup) {
            m.reply(_func.status.private)
            continue
		}
		cmd.async(m, { conn, _func, args, text, isPrefix, command, participants })
		break
			}
		}
    } catch (e) {
    	console.log(e)
    	// return m.reply('*error :* ' + util.format(e))
	}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(redBright.bold('[ UPDATE ]'), blueBright(moment(new Date() * 1).format('DD/MM/YY HH:mm:ss')), green.bold('~ handler.js'))
	delete require.cache[file]
	require(file)
})