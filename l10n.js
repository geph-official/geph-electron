let l10nEn = {
    "geph": "Geph",

    "cancel": "Cancel",

    "errTitle": "Error",
    "errUnexpected": "Unexpected error!",
    "errCannotLogin": "Username or password incorrect!",
    "errLogOut": "Log out",

    "unameBox": "Username",
    "pwordBox": "Password",
    "loginBtn": "Login",
    "registerBtn": "Register new account",
    "captchaBox": "Verification",
    "registerSubmit": "Register",

    "registerTitle": "Register new account",
    "registerSuccess": "Registration successful!\nYou may now log in with your new account.",
    "errUserExists": "User already exists. Please choose another username.",
    "errCaptchaIncorrect": "Verification code wrong. Please try again.",

    "statusConnecting" : "Connecting...",
    "statusConnected" : "<b class='text-success'>Connected</b> to the Geph network!",
    "statusDisconnected": "Disconnected.",

    "tooltipBrowser" : "Access blocked sites using your browser.",
    "tooltipProxy": "Use the HTTP proxy localhost:8780.",

    "balanceLabel": "left",

    "connectBtn": "Connect",
    "disconnectBtn": "Disconnect",

    "settingsTitle": "Settings",
    "autoconfigBrowser": "Automatically configure browsers",
    "avoidChina": "Avoid proxying P.R. Chinese websites",
    "settingsDismiss": "Save settings",

    "macPacMsg": "Geph requires your password the first time it is started in order to configure your network."
}

let l10nZht = {
    "geph": "迷霧通",

    "cancel": "取消",

    "errTitle": "錯誤",
    "errUnexpected": "異常錯誤",
    "errCannotLogin": "用戶名或密碼不正確！",
    "errLogOut": "登出",

    "unameBox": "用戶名",
    "pwordBox": "密碼",
    "loginBtn": "登入",
    "registerBtn": "建立帳戶",
    "captchaBox": "驗證碼",
    "registerSubmit": "確認",

    "registerTitle": "建立新的帳戶",
    "registerSuccess": "您的帳戶已成功建立！\n現在便可使用您的帳戶登入。",
    "errUserExists": "該用戶名已有用戶使用。請輸入其他的用戶名。",
    "errCaptchaIncorrect": "驗證碼錯誤。請重新輸入。",

    "statusConnecting" : "正在連接...",
    "statusConnected" : "<b class='text-success'>成功連接</b>至伺服器",
    "statusDisconnected": "已斷開連接",

    "tooltipBrowser" : "打開瀏覽器便可自由上網",
    "tooltipProxy": "請用HTTP代理localhost:8780上網",

    "balanceLabel": "剩餘流量",

    "connectBtn": "連接",
    "disconnectBtn": "斷開",

    "settingsTitle": "設定",
    "autoconfigBrowser": "自動設定瀏覽器代理",
    "avoidChina": "不代理中國大陸網站",
    "settingsDismiss": "保存設定",

    "macPacMsg": "在第一次使用時，迷霧通需要您的密碼來更改您的網路設定。"
}

let l10nZhs = {
    "geph": "迷雾通",

    "cancel": "取消",

    "errTitle": "错误",
    "errUnexpected": "异常错误",
    "errCannotLogin": "用户名或密码不正确！",
    "errLogOut": "登出",

    "unameBox": "用户名",
    "pwordBox": "密码",
    "loginBtn": "登入",
    "registerBtn": "建立帐户",
    "captchaBox": "验证码",
    "registerSubmit": "确认",

    "registerTitle": "建立新的帐户",
    "registerSuccess": "您的帐户已成功建立！\n现在便可使用您的帐户登入。",
    "errUserExists": "该用户名已有用户使用。请输入其他的用户名。",
    "errCaptchaIncorrect": "验证码错误。请重新输入。",

    "statusConnecting" : "正在连接...",
    "statusConnected" : "<b class='text-success'>成功连接</b>至服务器",
    "statusDisconnected": "已断开连接",

    "tooltipBrowser" : "打开浏览器便可自由上网",
    "tooltipProxy": "请用HTTP代理localhost:8780上网",

    "balanceLabel": "剩余流量",

    "connectBtn": "连接",
    "disconnectBtn": "断开",

    "settingsTitle": "设定",
    "autoconfigBrowser": "自动设定浏览器代理",
    "avoidChina": "不代理中国大陆网站",
    "settingsDismiss": "保存设定",

    "macPacMsg": "在第一次使用时，迷雾通需要您的密码来更改您的网络设定。"
}

let l10n = l10nEn

// TODO make this configurable rather than resetting on start
if (!localStorage.getItem("gephpref.lang") || true) {
    let sysLang = require("electron").remote.app.getLocale()
    if (sysLang == "zh-TW" || sysLang == "zh-HK") {
        localStorage.setItem("gephpref.lang", "zht")
    } else if (sysLang == "zh-CN" || sysLang == "zh-SG "){
        localStorage.setItem("gephpref.lang", "zhs")
    } else {
        localStorage.setItem("gephpref.lang", "en")
    }
}

if (localStorage.getItem("gephpref.lang") == "zht") {
    l10n = l10nZht
    $("html").attr("lang", "zh-TW")
} else if (localStorage.getItem("gephpref.lang") == "zhs") {
    l10n = l10nZhs
    $("html").attr("lang", "zh-CN")
} else {
    l10n = l10nEn
    $("html").attr("lang", "en")
}
