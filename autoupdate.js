function getOsName() {
    const os = require('os')
    if (os.platform() == 'linux') {
        if (os.arch() == 'x64') {
            return 'Linux64'
        } else {
            return 'Linux32'
        }
    } else if (os.platform() == 'win32') {
        return 'Windows'
    } else if (os.platform() == 'darwin') {
        return 'MacOS'
    }
    return ''
}

const {dialog} = require('electron').remote
const {shell} = require('electron')

var dialogShowed = false
var currentVersion = "2.1.0"

function checkForUpdates() {
    $.getJSON("https://raw.githubusercontent.com/rensa-labs/geph-autoupdate/master/stable.json",
        function(data) {
            let meta = data[getOsName()]
            console.log(meta)
            if (meta.Latest != currentVersion && !dialogShowed) {
                dialogShowed = true
                let dialogOpts = {
                    type: 'info',
                    buttons: [l10n["updateDownload"], l10n["updateLater"]],
                    message: l10n["updateInfo"],
                }
                dialog.showMessageBox(dialogOpts, (response) => {
                    if (response === 0) {
                        shell.openExternal(meta.Mirrors[0])
                    }
                })
            }
        })
}

console.log("YAY")
setInterval(checkForUpdates, 60 * 60 * 1000)
