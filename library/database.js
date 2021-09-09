module.exports = (conn, m) => {
if (typeof global.db.users[m.sender] == 'undefined') {
		global.db.users[m.sender] = {
			banned: false,
			limit: 50,
			point: 0,
			hit: 0,
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
			welcome: false,
			textwel: '',
			left: false,
			textleft: '',
			localonly: false,
			nodelete: true,
			nobadword: false,
			nolink: false,
			novirtex: false,
			expired: 0,
			stay: false,
        	chat: 0
        }
	}
	
	if (typeof global.db.private[m.chat] == 'undefined' && m.chat.endsWith('s.whatsapp.net')) {
		global.db.private[m.chat] = {
			mute: false,
        	chat: 0
        }
	}
	
	if (typeof global.db.chats[m.chat] == 'undefined') {
		global.db.chats[m.chat] = {
			command: 0
        }
	}
}