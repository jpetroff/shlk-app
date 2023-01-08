const tmpAddr = 'http://localhost:8002'

if (process.env.NODE_ENV === 'production') {
	module.exports = {
		serviceUrl: 'https://shlk.cc',
		displayServiceUrl: 'shlk.cc',
		mode: 'extension'
	}
} else {
	module.exports = {
		serviceUrl: tmpAddr,
		displayServiceUrl: new String(tmpAddr).replace(/^https?:\/\//ig, ''),
		mode: 'extension'
	}
}