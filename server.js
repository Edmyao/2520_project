const express = require('express');
var app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const maps = require('./maps.js')
const port = process.env.PORT || 8080;

app.get('/map',(request,response) => {
    response.render('map_view.hbs', {
        title: 'map page'
    })
})

// maps.request_coodrs().then((response) => {
//     //console.log(response);
//     return maps.get_sturbuckses(response.latitude,response.longtitude).then((response) => {
//     console.log(response.list_of_places);
//     })
// }).catch((error) => {
//     console.log('Error',error);
// })

// maps.get_sturbuckses(49.264,-122.9369).then((response) => {
//     console.log(response.list_of_places);
// }).catch((error) => {
//     console.log("Error ",error);
// })

maps.request_coodrs().then((response) => {
    console.log(response);
    location = JSON.parse(response);
    return maps.get_sturbuckses(location.latitude,location.longitude);
}, (errorMessage) => {
    console.log(errorMessage);
}).then((response) => {
    //console.log(response2);
    console.log(response.list_of_places);
    place_list = response.list_of_places
    hbs.registerHelper('closest_place',() => {
        return place_list[0];
    });
}).catch((error) => {
    console.log("Error ",error);
})




// ////////////////////////////////////////////////////////////



var Accs = []
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    response.render('index.hbs');

});

app.get('/home', (request, response) => {
	response.render('index.hbs');

});
app.get('/login', (request, response) => {
    response.render('index2.hbs');
})

app.post('/login', (request,response) => {
    response.render('index2.hbs', {
        testvar : request.body.search
    })
})

app.post('/loginconfirm', (request,response) =>{

    var LoginCheck = (request, accs) => {
        for(i = 0; i < accs.length; i++) {
            if((request.body.username == accs[i].user) && (request.body.password == accs[i].pass)) {
                return 0
            }
        };
    };
    var Login = (request, response) => {
        var filecontents = ReadAccfile('accounts.json')
        if (LoginCheck(request, filecontents) == 0 ){
            response.render('index2.hbs');
        } else {
            response.render('error1.hbs');
        }
    };

    var LoadAccfile = () => {
        var accs = ReadAccfile('accounts.json');
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
    Login(request, response);
});

app.post('/', (request,response) => {

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
        fs.writeFileSync('accounts.json', JSON.stringify(Accs));
    };

    var UserNameCheck = (request) => {
        for(i = 0; i < Accs.length; i++) {
            if(request.body.NewUser == Accs[i].user) {
                response.render('error.hbs');
                return 1
            }
        }
        return 0
    };

    var PasswordCheck = (request) => {
        if(request.body.NewPassword != request.body.confirmp) {
            response.render('error.hbs');
            return 1
        }
        else {
            return 0
        }
    };
    var AddUsr = (request) => {
        LoadAccfile()
        if(UserNameCheck(request) == 0 && PasswordCheck(request) == 0) {
            var acc = {
                'user': request.body.NewUser,
                'pass': request.body.NewPassword,
            }
            Accs.push(acc)
            WriteAccfile()
        }
    };
    AddUsr(request);
    response.render('index.hbs');
});

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
}) 

app.listen(port, () => {
	console.log('Server is up on the port 8080');
});




// var LoadAccfile = () => {
//     Accs = ReadAccfile('accounts.json')
// };


// var ReadAccfile = (file) => {
//     try {
//         return JSON.parse(fs.readFileSync(file))
//     }
//     catch (exception) {
//         if(exception.code === 'ENOENT'){
//             fs.writeFileSync(file, '[]');
//             return JSON.parse(fs.readFileSync(file))
//         }
//         else {
//             window.alert(exception)
//         }
//     }
// };

// var WriteAccfile = () => {
//     fs.writeFileSynch('accounts.json', JSON.stringify(Accs));
// };

// var UserNameCheck = () => {
//     for(i = 0, i < entities.length; i++;) {
//         if(request.body.NewUser == entities[i].user) {
//             window.alert('Username already taken.')
//             return 1
//         }
//     }
//     return 0
// };

// var PasswordCheck = () => {
//     if(request.body.NewPassword != request.body.confirmp) {
//         window.alert('Passwords do not match')
//         return 1
//     }
//     else {
//         return 0
//     }
// };

// var LoginCheck = () => {
//     for(i = 0, i < entities.length; i++;) {
//         if(LoginInput.value != entities[i].user || PassInput.value != entities[i].pass) {
//             window.alert('Username or password incorrect')
//             return 1
//         }
//         else {
//              return 0
//         }
//     }
// };

// var AddUsr = () => {
//     LoadAccfile()
//     if(UserNameCheck() == 0 && PasswordCheck() == 0) {
//         var acc = {
//             'user': NewUsrInput.value,
//             'pass': NewUsrPass.value,
//         }
//         Accs.push(acc)
//         WriteAccfile()
//         NewUsrInput.value = ""
//         NewUsrPass.value = ""
//         window.alert('Account made!')
//         // NEED TO RETURN TO MAIN PAGE //
//     }
// };

// var Login = () => {
//     LoadAccfile()
//     if(LoginCheck() == 0) {
//         // LOAD USER PAGE //
//         console.log('')
//     }
// };