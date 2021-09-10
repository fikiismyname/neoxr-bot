let { yellow, gray, green, blueBright, cyanBright, redBright } = require('chalk')
let fs = require('fs')
let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = async (conn, m, _func) => {
	let who = m.fromMe ? 'Self' : conn.contacts[m.sender] ? conn.contacts[m.sender].vname || conn.contacts[m.sender].notify || m.sender.split('@')[0] || undefined : m.sender.split('@')[0]
	let time = m.messageTimestamp.low
	let pc = false
    if (m.chat.endsWith('@s.whatsapp.net')) pc = true
	if (!pc) {
		if (typeof m.text !== 'object' && m.text.startsWith(global.myPrefix)) return console.log('\n' + yellow.bold('[ CMD ]'), _func.color(moment(time * 1000).format('DD/MM/YY HH:mm:ss'), 'green'), gray.bgGreen(' ' + m.mtype + ' '), green.bold('from'), '[' + m.sender.split`@`[0] + '] ' + gray.bgYellow(' ' + who + ' '), _func.color('in'), '[' + m.chat + '] ' + gray.bgYellow(' ' + conn.getName(m.chat) + ' '), `\n${_func.mtype(m)}`)
		console.log('\n' + blueBright.bold('[ MSG ]'), _func.color(moment(time * 1000).format('DD/MM/YY HH:mm:ss'), 'green'), gray.bgGreen(' ' + m.mtype + ' '), green.bold('from'), '[' + m.sender.split`@`[0] + '] ' + gray.bgYellow(' ' + who + ' '), _func.color('in'), '[' + m.chat + '] ' + gray.bgYellow(' ' + conn.getName(m.chat) + ' '), `\n${_func.mtype(m)}`)
	} else if (pc) {
        if (typeof m.text !== 'object' && m.text.startsWith(global.myPrefix)) return console.log('\n' + yellow.bold('[ CMD ]'), _func.color(moment(time * 1000).format('DD/MM/YY HH:mm:ss'), 'green'), gray.bgGreen(' ' + m.mtype + ' '), green.bold('from'), '[' + m.sender.split`@`[0] + '] ' + gray.bgYellow(' ' + who + ' '), _func.color('in'), '[' + m.chat + '] ' + gray.bgYellow(' ' + conn.getName(m.chat) + ' '), `\n${_func.mtype(m)}`)
		console.log('\n' + blueBright.bold('[ MSG ]'), _func.color(moment(time * 1000).format('DD/MM/YY HH:mm:ss'), 'green'), gray.bgGreen(' ' + m.mtype + ' '), green.bold('from'), '[' + m.sender.split`@`[0] + '] ' + gray.bgYellow(' ' + who + ' '), _func.color('in'), '[' + m.chat + '] ' + gray.bgYellow(' ' + conn.getName(m.chat) + ' '), `\n${_func.mtype(m)}`)
	}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(redBright.bold('[ UPDATE ]'), blueBright(moment(new Date() * 1).format('DD/MM/YY HH:mm:ss')), green.bold('~ logs.js'))
	delete require.cache[file]
	require(file)
})