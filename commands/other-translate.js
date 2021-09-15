let { Presence } = require('@adiwajshing/baileys')
let translate = require('translate-google-api')
let _default = 'en'
let _tld = 'cn'
exports.run = {
	usage: ['tr', 'translate'],
	async: async (m, { conn, _func, args, isPrefix, command }) => {
		await conn.updatePresence(m.chat, Presence.composing)
		if (!args || !args[0]) return m.reply(`• *Example* : ${isPrefix + command} id i love you`) 
		let lang = args[0]
   	 let text = args.slice(1).join(' ')
   	 if ((args[0] || '').length !== 2) {
      	  lang = _default
       	 text = args.join(' ')
   	 }
		if (!text && m.quoted && m.quoted.text) text = m.quoted.text
		let result
	try {
		result = await translate(`${text}`, { _tld, to: lang })
    } catch (e) {
        result = await translate(`${text}`, { _tld, to: _default })
        m.reply(_func.status.error)
    } finally {
        m.reply(result[0])
    }},
	error: false
}