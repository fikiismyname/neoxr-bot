const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
module.exports = function size(url) {
	return new Promise((resolve, reject) => {
		var fileSize = ''
    	var http = new XMLHttpRequest()
    	http.open('HEAD', url, false)
    	http.send(null)
		if (http.status === 200) fileSize = http.getResponseHeader('content-length')
    	function toSize(bytes) {
   		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
 		  if (bytes == 0) return '0 Byte'
   		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
   			return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
		} resolve(toSize(fileSize))
	})
}