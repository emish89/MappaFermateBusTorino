/** Inizializzazione */
var express = require('express');
var http = require('http');
var session = require('express-session');
var cors = require('cors')
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');


var app = express();
app.use(session({
    secret: 'topsecret',
    resave: true,
    saveUninitialized: true
}));
//per le risposte cross domain
app.use(cors());
//come motore js per frontend
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var fs = require("fs");

/** Autenticazione e autorizzazione */
var auth = function (req, res, next) {
    if (req.session && req.session.logged)
        return next();
    else
        return res.sendStatus(401);
};

/** Login */
app.post('/login', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.render('login',{message: "Missing parameters"});
    } else if (req.body.username === "fede" && req.body.password === "balla") {
        req.session.user = "fede";
        req.session.logged = true;
        req.session.save(function (err) {
            // session saved
            res.render('maps');
        })
        //res.send("Login success!");

    } else {
        res.render('login',{message: "Login Failed"});
    }
});

/** Logout */
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('login',{message: "Logged out"});
});

/** Pagina di default */
app.get('/', function (req, res) {
    //se sono loggato vado su content
    if (req.session && req.session.logged)
        res.render('maps');
    //else vado su login    
    else
        res.render('login',{message: null});
})


/** restituisce la lista fermate */
app.get('/listStops', function (req, res) {
    if (req.session && req.session.logged) {
        fs.readFile(__dirname + "/" + "fermate.json", 'utf8', function (err, data) {
            //console.log(data);
            res.end(data);
        });
    } else {
        return res.sendStatus(401);
    }
})

/** Passaggi dei bus dato un ID */
app.get('/id/:id', function (req, res) {
    if (req.session && req.session.logged) {
        let url = "http://gpa.madbob.org/query.php?stop=" + req.params.id;

        http.get(url, function (resapi) {
            let body = '';

            resapi.on('data', function (chunk) {
                body += chunk;
            });

            resapi.on('end', function () {
                //console.log(body);
                res.end(body);
            });
        }).on('error', function (e) {
            console.log("Error: ", e);
            res.end("Error: " + e);
        });
    } else {
        return res.sendStatus(401);
    }

})


/** Start del server */
var server = app.listen(process.env.PORT || 8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("App is listening at http://%s:%s", host, port)

})
