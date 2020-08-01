const execa = require('execa')

function osascript (cmd) {
  return execa.stdout('osascript', ['-e', cmd], { preferLocal: false })
}

exports.getVolume = async function () {
  let volString = await osascript('output volume of (get volume settings)')
  return +volString
}

exports.setVolume = async function (val) {
  return osascript('set volume output volume ' + val).then(() => undefined)
}

exports.getMuted = async function () {
  return osascript('output muted of (get volume settings)').then(mute => (mute === 'true'))
}

exports.setMuted = async function (val) {
  return osascript('set volume ' + (val ? 'with' : 'without') + ' output muted').then(() => undefined)
}
