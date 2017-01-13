var gephDaemon = null

function getBinaryPath() {
    const os = require('os')
    if (os.platform() == 'linux') {
        if (os.arch() == 'x64') {
            return __dirname + '/assets/binaries/linux-amd64/'
        } else {
            return __dirname +  '/assets/binaries/linux-i386/'
        }
    } else if (os.platform() == 'win32') {
        return __dirname +  '/assets/binaries/windows-i386/'
    } else if (os.platform() == 'darwin') {
        return __dirname +  '/assets/binaries/darwin-amd64/'
    }
    throw 'UNKNOWN OS'
}

function binExt() {
    const os = require('os')
    if (os.platform() == 'win32') {
        return ".exe"
    } else {
        return ""
    }
}

function startDaemon() {
    const os = require('os')
    const spawn = require('child_process').spawn
    let uname = localStorage.getItem("gephpref.uname")
    let pword = localStorage.getItem("gephpref.pword")
    console.log(uname)
    console.log(pword)
    let avoidChina = localStorage.getItem("gephpref.avoid-china") == "true"
    gephDaemon = spawn(getBinaryPath() + 'geph' + binExt(),
        ['client', '--geodb', __dirname + '/assets/ip-mappings.csv',
         '--uname', uname, '--pwd', pword,
         '--whitelist', avoidChina ? "CN" : "",
         "--cachedir", os.tmpdir()])
    // PAC if we are setting the browser
    if (localStorage.getItem("gephpref.autoconfig-browser") == "true") {
        spawn(getBinaryPath() + 'pac' + binExt(),
            ["on", "http://127.0.0.1:8790/proxy.pac"])
        console.log("** PAC path is " +  getBinaryPath() + "pac" + binExt(), ", trying to run **")
    }
    gephDaemon.stderr.on('data', (data) => console.log(`stderr: ${data}`))
}

function stopDaemon() {
    if (gephDaemon != null) {
        const spawn = require('child_process').spawn
        gephDaemon.kill()
        spawn(getBinaryPath() + 'pac' + binExt(), ["off"])
        gephDaemon = null
    }
}

// getCaptcha starts a proxbinder, gets a captcha, and calls cback with the result
function getCaptcha(cback) {
    const spawn = require('child_process').spawn
    let prox = spawn(getBinaryPath() + 'geph' + binExt(), ['proxbinder'])
    prox.stdout.on('data', (data) => {
        let burl = ("http://" + data).trim()
        $.post(burl + "/fresh-captcha").done((data) => {
            cback(data)
        }).always(() => prox.kill())
    })
}

// deriveKeys does the same thing for deriving keys
function deriveKeys(uname, pword, cback) {
    const spawn = require('child_process').spawn
    let prox = spawn(getBinaryPath() + 'geph' + binExt(), ['proxbinder'])
    prox.stdout.on('data', (data) => {
        let burl = ("http://" + data).trim()
        $.getJSON(burl + "/derive-keys?uname=" + uname + "&pwd=" + pword).done((data) => {
            cback(data)
        }).always(() => prox.kill())
    })
}

// registerAccount does the same thing for registering accounts
function registerAccount(uname, pubkey, captid, captsoln, cback, eback) {
    const spawn = require('child_process').spawn
    let prox = spawn(getBinaryPath() + 'geph' + binExt(), ['proxbinder'])
    prox.stdout.on('data', (data) => {
        let burl = ("http://" + data).trim()
        let tosend = JSON.stringify({
            "Username": uname,
            "PubKey": pubkey,
            "CaptchaID": captid,
            "CaptchaSoln": captsoln
        })
        $.post(burl + "/register-account", tosend, "text")
          .always(() => prox.kill())
          .done(cback).fail(eback)
    })
}

// set essential prefs if they don't exist
if (!localStorage.getItem("gephpref.autoconfig-browser")) {
    localStorage.setItem("gephpref.autoconfig-browser", "true")
}
if (!localStorage.getItem("gephpref.avoid-china")) {
    localStorage.setItem("gephpref.avoid-china", "true")
}

function arePermsCorrect() {
    const fs = require('fs')
    let stats = fs.statSync(getBinaryPath() + "pac")
    console.log("UID of pac is", stats.uid, ", root is zero")
    return (stats.uid == 0)
}

function forceElevatePerms() {
    const spawn = require('child_process').spawn
    let lol = spawn(getBinaryPath() + "cocoasudo",
        ["--prompt=" + l10n["macPacMsg"], getBinaryPath() + "pac", "setuid"])
    console.log("** PAC path is " +  getBinaryPath() + "pac" + ", trying to elevate **")
    lol.stderr.on('data', (data) => console.log(`stderr: ${data}`))
}

function elevatePerms() {
    const fs = require("fs")
    let stats = fs.statSync(getBinaryPath() + "pac")
    if (!arePermsCorrect()) {
        console.log("We have to elevate perms for pac. But to prevent running into that infamous problem, we clear setuid bits first")
        const spawnSync = require('child_process').spawnSync
        spawnSync("/bin/chmod", ["ug-s", getBinaryPath() + "pac"])
        console.log("Setuid cleared on pac, now we run cocoasudo!")
        forceElevatePerms()
    }
}

// on macOS, elevate pac permissions
const os = require('os')
if (os.platform() == 'darwin') {
    elevatePerms()
}
