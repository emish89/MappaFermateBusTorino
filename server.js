/** Inizializzazione */
var express = require('express');
var http = require('http');
var session = require('express-session');

var app = express();
app.use(session({
    secret: 'topsecret',
    resave: true,
    saveUninitialized: true
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
app.get('/login', function (req, res) {
    if (!req.query.username || !req.query.password) {
        res.send('login failed');
    } else if (req.query.username === "fede" || req.query.password === "balla") {
        req.session.user = "fede";
        req.session.logged = true;
        res.send("Login success!");
    }
});

/** Logout */ 
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("Logout success!");
});

/** Pagina test
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});
*/

/** restituisce la lista fermate */
app.get('/listStops', function (req, res) {
    if (req.session && req.session.logged) {
        fs.readFile(__dirname + "/" + "fermate.json", 'utf8', function (err, data) {
            console.log(data);
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
                console.log(body);
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

/*app.get('/login', function(req, res) {
    var data = {
        "login params": {
            "user": req.query.user,
            "pass": req.query.pass
        }
    }; 

    console.log(data);
    res.end(JSON.stringify(data));
});*/

/** Start del server */
var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("App is listening at http://%s:%s", host, port)

})