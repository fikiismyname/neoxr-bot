let { Presence } = require('@adiwajshing/baileys')
exports.run = {
	usage: ['bot', 'menu', 'help'],
	async: async (m, { conn, _func, isPrefix }) => {
		let setting = global.db.setting
		let number = m.sender.split`@`[0]
		await conn.updatePresence(m.chat, Presence.composing)
		conn.send2ButtonLoc(m.chat, await _func.buffer(setting.cover), menu(number, isPrefix, readMore, setting), global.footer, 'SCRIPT', `${isPrefix}script`, `OWNER`, `${isPrefix}owner`, m)
	},
	error: false
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const menu = (number, prefix, readMore, setting) => {
return `
Hai @${number} 🍃

“${setting.msg}”

Mode : ${setting.public ? 'Public' : 'Self'}
${readMore}
*01.*  P O I N T & L I M I T

	›  ${prefix}exchange
	›  ${prefix}claim
	›  ${prefix}limit
	›  ${prefix}me
	›  ${prefix}point
	›  ${prefix}profile

*02.*  S T I C K E R - T O O L S

	›  ${prefix}toimg *reply sticker*
	›  ${prefix}emo *emoji*
	›  ${prefix}flat *emoji*
	›  ${prefix}sk *reply foto / video*
	›  ${prefix}sgif *reply video / gif*
	›  ${prefix}swm *pack | author*
	
*03.*  D O W N L O A D E R

	›  ${prefix}ig *link*
	›  ${prefix}mediafire *query*
	›  ${prefix}play *query*
	›  ${prefix}tikmp3 *link*
	›  ${prefix}tiktok *link*
	›  ${prefix}tikwm *link*
	›  ${prefix}ytmp3 *link*
	›  ${prefix}ytmp4 *link*
	
*04.*  O N L Y - G R O U P

	›  ${prefix}contact *@target*
	›  ${prefix}delete
	›  ${prefix}link
	›  ${prefix}tag *text*
	›  ${prefix}tagme
	›  ${prefix}steal *@target*
	›  ${prefix}saveme *name*
	
*05.*  G R O U P - A D M I N

	›  ${prefix}antilink
	›  ${prefix}antivirtex
	›  ${prefix}ephe
	›  ${prefix}filter
	›  ${prefix}group
	›  ${prefix}hidetag
	›  ${prefix}kick
	›  ${prefix}mute
	›  ${prefix}left
	›  ${prefix}textleft
	›  ${prefix}textwel
	›  ${prefix}tagall
	›  ${prefix}welcome
	
*06.*  S P E C I A L

	›  ${prefix}botstat
	›  ${prefix}listban
	›  ${prefix}listblock    
	›  ${prefix}owner
	›  ${prefix}tools
	›  ${prefix}report
	›  ${prefix}runtime
`
}