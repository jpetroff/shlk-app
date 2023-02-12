const tmpAddr = 'http://localhost:8002'

if (process.env.NODE_ENV === 'development' && process.env.APP_TARGET == 'extension') {
  module.exports = {
    serviceUrl: tmpAddr,
    displayServiceUrl: 'shlk.cc',
    target: 'extension',
    mode: 'development'
  }
} else if (process.env.NODE_ENV === 'development' && process.env.APP_TARGET == 'webapp') {
  module.exports = {
    serviceUrl: window.location.origin,
    displayServiceUrl: 'shlk.cc',
    target: 'webapp',
    mode: 'development'
  } 
} else if (process.env.NODE_ENV === 'production' && process.env.APP_TARGET) {
  module.exports = {
    serviceUrl: 'https://shlk.cc',
    displayServiceUrl: 'shlk.cc',
    mode: 'production',
    target: process.env.APP_TARGET
  }
} else {
  module.exports = {
    serviceUrl: 'https://shlk.cc',
    displayServiceUrl: 'shlk.cc',
    target: 'webapp',
    mode: 'production'
  }
}