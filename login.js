const fs = require('fs')

var LoginInput = document.getElementById(LoginInput),
    PassInput = document.getElementById(PassInput),
    //NEED TO MAKE PASSWORD <input type='password'>
    LoginBut = document.getElementById(LoginBut),
    MakeUsrBut = document.getElementById(MakeUsrBut),

    NewUsrInput = document.getElementById(NewUsrInput),
    NewUsrPass = document.getElementById(NewUsrPass),
    ConfirmPass = document.getElementById(ConfirmPass)

var Accs = []

var Logged_in = ""

var LoadAccfile = () => {
    Accs = ReadAccfile('accounts.json')
};

var ReadAccfile = (file) => {
    try {
        return JSON.parse(fs.readFileSync(file))
    }
    catch (exception) {
        if(exception.code === 'ENOENT'){
            fs.writeFileSync(file, '[]');
            return JSON.parse(fs.readFileSync(file))
        }
        else {
            window.alert(exception)
        }
    }
};

var WriteAccfile = () => {
    fs.writeFileSynch('accounts.json', JSON.stringify(Accs))
};

var UserNameCheck = () => {
    for(i = 0, i < entities.length; i++;) {
        if(NewUsrInput.value == entities[i].user) {
            window.alert('Username already taken.')
            return 1
        }
    }
    return 0
};

var PasswordCheck = () => {
    if(NewUsrPass.value != ConfirmPass.value) {
        window.alert('Passwords do not match')
        return 1
    }
    else {
        return 0
    }
};

var LoginCheck = () => {
    for(i = 0, i < entities.length; i++;) {
        if(LoginInput.value != entities[i].user || PassInput.value != entities[i].pass) {
            window.alert('Username or password incorrect')
            return 1
        }
        else {
             return 0
        }
    }
};

var AddUsr = () => {
    LoadAccfile()
    if(UserNameCheck() == 0 && PasswordCheck() == 0) {
        var acc = {
            'user': NewUsrInput.value,
            'pass': NewUsrPass.value,
        }
        Accs.push(acc)
        WriteAccfile()
        NewUsrInput.value = ""
        NewUsrPass.value = ""
        window.alert('Account made!')
        // NEED TO RETURN TO MAIN PAGE //
    }
};

var Login = () => {
    LoadAccfile()
    if(LoginCheck() == 0) {
        // LOAD USER PAGE //
        console.log('')
    }
};
