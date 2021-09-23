module.exports = (m) => {

if (typeof global.db.users[m.sender] == 'undefined') {
		global.db.users[m.sender] = {
			banned: false,
			banTemp: false,
			premium: false,
			expired: 0,
			limit: 50,
			point: 0,
			hit: 0,
			lastclaim: 0,
			lastseen: 0,
			usebot: 0,
			spam: 0,
			warning: 0
        }
	}
	
	if (typeof global.db.groups[m.chat] == 'undefined' && m.chat.endsWith('g.us')) {
		global.db.groups[m.chat] = {
			banned: false,
			mute: false,
			game: false,
			welcome: false,
			textwel: '',
			left: false,
			textleft: '',
			notify: false,
			spamProtect: false,
			localonly: false,
			nodelete: true,
			nobadword: false,
			nolink: false,
			novirtex: false,
			expired: 0,
			stay: false
        }
	}
	
	if (typeof global.db.private[m.chat] == 'undefined' && m.chat.endsWith('s.whatsapp.net')) {
		global.db.private[m.chat] = {
			mute: false
        }
	}
	
	if (typeof global.db.chats[m.chat] == 'undefined') {
		global.db.chats[m.chat] = {
			command: 0,
			chat: 0,
			lastseen: 0
        }
	}
}