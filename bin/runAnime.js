#!/usr/bin/env node

var express = require("express");
var path = require('path');
var app = express();
var session = require('express-session')
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
var fs = require('fs');
var nano = require('nano')('http://couchadmin:test@localhost:5984');

var couchDbUtils = require('./couchDbUtils.js');
var loginHandler = require('./loginHandler.js');

var webSitePath = path.resolve(__dirname + '/../views/');
app.set('appRootPath', path.resolve(__dirname + '/..'));
app.use(express.static(webSitePath));
// var sess;
var chat = {};
app.use(session({
    secret: 's0mErAnDoMseCr@tKeY',
    name: 'connect.dis'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(helmet());
app.use(cors());


//To detect the user device type
var clientDeviceProcessor = require('./ClientDeviceProcessor');
app.use(clientDeviceProcessor());

var router = express.Router();

router.use(function (req, res, next) {
    next();
});

router.get("/", function (req, res) {
    res.sendFile(webSitePath + "/index.html");
});

router.get("/anime", function (req, res) {
    res.sendFile(webSitePath + "/test.html");
});

router.get("/mobileintern", function (req, res){
    res.sendFile(webSitePath + "/mobile.html");
});


app.use("/", router);

app.use("*", function (req, res) {
    res.sendFile(webSitePath + "/404.html");
});


app.listen(80, function (error) {
    if (error) {
        console.log('Looks like You dont have permission on port 80, \n consider executing following commands');
        console.log('sudo apt-get install libcap2-bin;sudo setcap cap_net_bind_service=+ep `which node`');

    } else {
        console.log("Live at Port 80");
    }
});

// var server = app.listen(8081, function () {
//     var host = server.address().address
//     var port = server.address().port

//     console.log("Example app listening at http://%s:%s", host, port)
// })


function sendMail(to, s, t, h) {
    const nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: 'alienhuweb@gmail.com',
            pass: 'webmailer2000'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"AleinHu Web" <alienhuweb@gmail.com>', // sender address
        to: to, // list of receivers
        // subject: 'Hello ✔', // Subject line
        // text: 'Hello world ?', // plain text body
        // html: '<b>Hello world ?</b>' // html body
        subject: s, // Subject line
        text: t, // plain text body
        html: h // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}