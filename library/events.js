let { Presence } = require('@adiwajshing/baileys')
let fs = require('fs')
let { green, blueBright, redBright } = require('chalk')
let _func = require('./function')

module.exports = async (conn, data) => {
	let id = data.jid
	let groupSet = global.db.groups[id]
	let setting = global.db.setting
	let textwel = `• *Welcome +tag in Group +grup.*`
	let textleft = `• *Good bye +tag don't back here again.*`
	switch (data.action) {
		case 'add':
			if (groupSet.welcome) {
				for (let member of data.participants) {
					let txt = (groupSet.textwel != '' ? groupSet.textwel : textwel).replace('+tag', `@${member.split`@`[0]}`).replace('+grup', `${conn.getName(id)}`)
					let pp = await _func.buffer(setting.cover)
				try {
					pp = await _func.buffer(await conn.getProfilePicture(member))
				} catch {
					} finally {
						await conn.updatePresence(id, Presence.composing)
						await conn.send2ButtonLoc(id, pp, txt, setting.footer, `KICK`, `${setting.prefix[0]}kick ${member.split`@`[0]}`, `MENU`, `${setting.prefix[0]}bot`)
					}
				}
			}
			if (groupSet.localonly) {
				for (let member of data.participants) {
					if (!member.startsWith('62')) {
						await conn.updatePresence(id, Presence.composing)
						conn.reply(id, `*Hi @${member.split('@')[0]} ソ*\n\n*Sorry, this group is only for Indonesian People, and you will be automatically removed by the BOT.*`).then(() => {
							conn.groupRemove(id, [member])
						})
					}
				}
			}
		break
		case 'remove': 
			if (groupSet.left) {
				for (let member of data.participants) {
					let txt = (textleft != '' ? groupSet.textleft : textleft).replace('+tag', `@${member.split`@`[0]}`).replace('+grup', `${conn.getName(id)}`)
					await conn.updatePresence(id, Presence.composing)
					conn.reply(id, txt)
				}
			}
		break
		case 'promote': for (let member of data.participants) {
				await conn.updatePresence(id, Presence.composing)
				conn.reply(id, `› *@${member.split('@')[0]} now an admin. 🎉🎉🎉*`)
			}
		break
		case 'demote': for (let member of data.participants) {
				await conn.updatePresence(id, Presence.composing)
				conn.reply(id, `› *@${member.split('@')[0]} is no longer admin. 🗿*`)
			}
		break
	}	
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(redBright.bold('[ UPDATE ]'), blueBright(moment(new Date() * 1).format('DD/MM/YY HH:mm:ss')), green.bold('~ events.js'))
	delete require.cache[file]
	require(file)
})