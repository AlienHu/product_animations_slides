#!/usr/bin/env node

var express = require("express");
var path = require('path');
var app = express();
var apiai = require('apiai');
var chatapp = apiai("f1275a0d19ba4d7aaaffded50742bb87");
var session = require('express-session')
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
var fs = require('fs');
var nano = require('nano')('http://couchadmin:test@localhost:5984');

var couchDbUtils = require('./couchDbUtils.js');
var loginHandler = require('./loginHandler.js');

var webSitePath = path.resolve(__dirname + '/../views/');
var profitGuruMAPP_RETAIL = path.resolve(__dirname + '/../profitGuruMAPP_RETAIL');
var profitGuruDAPP_RETAIL = path.resolve(__dirname + '/../profitGuruDAPP_RETAIL');
app.set('appRootPath', path.resolve(__dirname + '/..'));
app.use(express.static(webSitePath));
app.use(express.static(profitGuruMAPP_RETAIL));
app.use(express.static(profitGuruDAPP_RETAIL));
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


// app.use('/admin', express.static('./node_modules/admin-lte-express/public'))
// app.use('/', require('admin-lte-express'));

//To detect the user device type
var clientDeviceProcessor = require('../middleWares/clientDeviceProcessor');
app.use(clientDeviceProcessor());

var router = express.Router();

router.use(function (req, res, next) {
    next();
});

router.get("/", function (req, res) {
    res.sendFile(webSitePath + "/index.html");
});


// app.get('/admin/', function(req, res){
//     console.log('kjsgfh');
//     var authenticated = false;
//     //do something to authenticate user
//     if(authenticated === true){
//        //user is already authenticated
//        return res.sendFile(__dirname + "/../admin/" + 'index.html');
//     }else{
//        //redirect to login
//        return res.sendFile(__dirname + "/../admin/" + 'login.html');

//    }
// });

app.get("/download_list", function (req, res) {
    var db = nano.db.use('installer_link', function (err, body) {
        if (err) {
            res.send([]);
            return;
        }
    });
    params = {
        include_docs: true,
        descending: true
    };
    db.list(params, function (error, body, headers) {
        let download_list = [];
        for (var i = 0; i < body.total_rows; i++) {
            var download = body.rows[i].doc;
            if (body.rows[i].doc.show == true)
                download_list.push(download);
        }
        download_list.sort(function (a, b) {
            return (a.order - b.order);
        });
        res.send(download_list);
    });
});


router.get("/download", function (req, res) {
    // TODO: get pos installer link from couch
    var soft_type = req.param('type');
    var doc_id = "";
    if (soft_type == "" || soft_type == undefined || soft_type == null) {
        res.send('<center><h2><br>Please select one type of software.</h2></center>');
        return;
    }
    if (soft_type == 'restaurant') {
        doc_id = 'pos_restaurant_64_stable';
    } else if (soft_type == 'retail') {
        doc_id = 'pos_retail_64_stable';
    } else if (soft_type == 'android') {
        doc_id = 'pos_android_stable';
    } else {
        req.send('<center><h2><br>Invalid type of software.</h2></center>');
    }
    var db = nano.db.use('installer_link');
    db.get(doc_id, {
        revs_info: true
    }, function (err, body) {
        if (!err) {
            //console.log(body);
            res.redirect(body.link);
        } else {
            res.send('<center><h2><br>No software found...Please check back later.</h2></center>');
        }
    });
});

function getIndexFile(req, app) {
    let data;
    if (req.clientType === "DeskTopApp") {
        data = fs.readFileSync(profitGuruDAPP_RETAIL + "/index.html");
    } else {
        data = fs.readFileSync(profitGuruMAPP_RETAIL + "/index.html");
    }
    console.log(data);
    if (data) {
        data = data.toString().replace('app=retail', "app=" + app);
        return data;
    }
}
router.get("/pgRetail", function (req, res) {
    var data = getIndexFile(req, 'retail');
    res.send(data);
});

router.get("/pgRestaurant", function (req, res) {
    var data = getIndexFile(req, 'restaurant');
    res.send(data);
});

router.get("/contact", function (req, res) {
    res.sendFile(webSitePath + "/contact.html");
});
router.get("/termsOfService", function (req, res) {
    res.sendFile(webSitePath + "/termsOfService.html");
});
router.get("/termsAndConditions", function (req, res) {
    res.sendFile(webSitePath + "/TNC.HTML");
});
router.get("/privacy", function (req, res) {
    res.sendFile(webSitePath + "/privacy.html");
});
router.get("/refundPolicy", function (req, res) {
    res.sendFile(webSitePath + "/refundpolicy.html");
});
router.get("/eula", function (req, res) {
    res.sendFile(webSitePath + "/eula.html");
});
app.use("/", router);

router.get("/update-password", function (req, res) {
    var key = req.param('key');
    res.redirect('http://52.66.110.58:7777/update-password?key=' + key);
});

router.get("/desk", function (req, res) {
    var port = req.app.settings.port;
    // res.locals.requested_url = req.protocol + '://' + req.hostname + ':' + 7777 + req.path;
    res.locals.requested_url = 'http://52.66.110.58' + ':' + 7777 + req.path;
    res.redirect(res.locals.requested_url);
});

router.get("/employee", function (req, res) {
    res.redirect('http://52.66.110.58:7777');
});


app.get('/chatbot', function (req, res) {
    // res.send('Hello World');
    // session init
    var user_msg = req.param('msg');
    // var user_msg = 'hi there';
    var sess = req.session;
    chat.msg = user_msg;
    chat.session = sess.id;
    var request = chatapp.textRequest(user_msg, {
        sessionId: '234'
    });
    // var phoneno = new Regex(/[2-9]{2}\d{8}/);
    var phoneno = /[2-9]{2}\d{8}/;
    var emailr = /\S+@\S+\.\S+/;
    // console.log(phoneno.exec(user_msg));
    if ((phoneno.exec(user_msg)) !== null || (emailr.exec(user_msg)) !== null) {
        var doc = {
            session: sess.id,
            msg: user_msg,
            date: new Date()
        }
        nano.db.create('chatbot_inputs', function (err, body) {
            if (!err) {
                console.log('database chatbot_inputs created!');
            } else {
                console.log('db chatbot_inputs creation failed!');
            }
        });
        //Database information
        var db = nano.db.use('chatbot_inputs');
        nano.db.get('chatbot_inputs', function (err, body) {
            if (!err) {
                db.insert(doc, function (err, body, header) {
                    if (err) {
                        console.log('error', err.message);
                        return;
                    }
                    console.log('you have inserted the doc.')
                    console.log(body);
                });
            } else {
                console.log('db info error');
                console.log(body);
                res.send('We ran into a problem. Call 7022507345 for support.');
                return;
            }
        });
    }
    request.on('response', function (response) {
        chat.response = response.result.fulfillment.speech;
        res.json(chat.response);
    });
    request.on('error', function (error) {
        chat.response = 'error';
        res.json(chat.response);
    });
    sendMail('alienhuweb@gmail.com', 'Web Chat Message', user_msg, '<i>contact: </i>' + '<b>' + user_msg + '</b>');
    if ((phoneno.exec(user_msg)) !== null || (emailr.exec(user_msg)) !== null) {
        sendMail('admin@alienhu.com', 'Web-Chat Contact', user_msg, '<i>contact: </i>' + '<b>' + user_msg + '</b>');
    }
    request.end();
})

app.post('/contact', function (req, res) {
    // session init
    var user_fname = req.body.first_name;
    var user_state = req.body.state;
    var user_mobile = req.body.phone;
    var user_msg = req.body.comment;
    if (user_fname == undefined || user_mobile == undefined || user_mobile == null || user_mobile == "") {
        res.send('Insufficient data.');
        return;
    }
    sendMail('admin@alienhu.com', 'Web Contact', 'Name: ' + user_fname + ',Phone: ' + user_mobile + 'State: ' + user_state + ',Message: ' + user_msg, '<i>Name: </i>' + '<b>' + user_fname + '</b><br>' + '<i>Mobile: </i>' + '<b>' + user_mobile + '</b><br>' + '<i>State: </i>' + '<b>' + user_state + '</b><br>' + '<i>Message: </i>' + '<b>' + user_msg + '</b>');
    var doc = {
        fname: user_fname,
        state: user_state,
        phone: user_mobile,
        date: new Date(),
        msg: user_msg
    }
    var phoneno = /[2-9]{2}\d{8}/;
    // if ((phoneno.exec(phone)) !== null) {
    //     res.send('phone not valid');
    // }
    nano.db.create('web_contact', function (err, body) {
        if (!err) {
            console.log('database web_contact created!');
        } else {
            console.log('db web_contact creation failed!');
        }
    });
    var db = nano.db.use('web_contact');
    nano.db.get('web_contact', function (err, body) {
        if (!err) {
            db.insert(doc, function (err, body, header) {
                if (err) {
                    console.log('insert form error', err.message);
                    return;
                } else {
                    console.log('you have inserted the form.')
                    console.log(body);
                }
            });
        } else {
            console.log('db info error');
            console.log(body);
            res.send('We ran into a problem. Call 7022507345 for support.');
            return;
        }
    });
})


app.get('/book_package', function (req, res) {
    // session init
    var package = req.param('package');
    var user_mobile = req.param('phone');
    var user_state = req.param('state');
    var user_name = req.param('name');
    // console.log(user_mobile);
    // console.log(package);
    var phoneno = /[2-9]{2}\d{8}/;
    if ((phoneno.exec(user_mobile)) == null) {
        res.send('Please try again with valid mobile number.');
        return;
    }
    if ((user_state == undefined) || (user_state == null) || (user_state == "")) {
        res.send('Please select your State');
        return;
    }
    sendMail('admin@alienhu.com', 'Buy Pack Message', 'package: ' + package + ',phone: ' + user_mobile, '<i>Pack: </i>' + '<b>' + package + '</b><br>' + '<i>Mobile: </i>' + '<b>' + user_mobile + '</b><br>' + '<i>Name: </i>' + '<b>' + user_name + '</b><br>' + '<i>State: </i>' + '<b>' + user_state + '</b><br>');

    var doc = {
        package: package,
        phone: user_mobile,
        name: user_name,
        state: user_state,
        date: new Date()
    }
    nano.db.create('package_book', function (err, body) {
        if (!err) {
            // console.log('database package_book created!');
        } else {
            // console.log('db package_book creation failed!');
        }
    });
    var db = nano.db.use('package_book');
    nano.db.get('package_book', function (err, body) {
        if (!err) {
            db.insert(doc, function (err, body, header) {
                if (err) {
                    // console.log('insert book error', err.message);
                    res.send('We ran into problem while booking. Call 7022507345 for support.');
                    return;
                } else {
                    // console.log('you have inserted the book.')
                    // console.log(body);
                    res.send('Thanks. We will contact you soon for the installment.');
                }
            });
        } else {
            console.log('db info error');
            // console.log(body);
            res.send('We ran into a problem. Call 7022507345 for support.');
            return;
        }
    });
})


app.get('/downloaders_contact', function (req, res) {
    // session init
    var user_mobile = req.param('phone');
    var user_email = req.param('email');
    var app_type = req.param('app');
    var phoneno = /[2-9]{2}\d{8}/;
    var emailr = /\S+@\S+\.\S+/;
    if ((phoneno.exec(user_mobile)) == null && (emailr.exec(user_email)) == null) {
        // ENHANCEMENTS: block from downloading
    }
    sendMail('admin@alienhu.com', 'Downloader Contact', '', '<i>Email: </i>' + '<b>' + user_email + '</b><br>' + '<i>Mobile: </i>' + '<b>' + user_mobile + '</b><br>');

    var doc = {
        phone: user_mobile,
        email: user_email,
        app: app_type,
        date: new Date()
    }
    nano.db.create('downloaders', function (err, body) {
        if (!err) {
            // console.log('database package_book created!');
        } else {
            // console.log('db package_book creation failed!');
        }
    });
    var db = nano.db.use('downloaders');
    nano.db.get('downloaders', function (err, body) {
        if (!err) {
            db.insert(doc, function (err, body, header) {
                if (err) {
                    // console.log('insert book error', err.message);
                    res.send('We ran into problem while booking. Call 7022507345 for support.');
                    return;
                } else {
                    // console.log('you have inserted the book.')
                    // console.log(body);
                    res.send('Thanks for downloading.');
                }
            });
        } else {
            console.log('db info error');
            // console.log(body);
            res.send('We ran into a problem. Call 7022507345 for support.');
            return;
        }
    });
})


app.post('/get', async function (req, res) {
    // var db = req.param('db');
    jsonDoc = req.body;
    // console.log(jsonDoc);
    var db = 'downloaders';
    // var id= jsonDoc._id;
    try {
        let resp = await couchDbUtils.updateBulk(db, jsonDoc);
        // console.log(resp);
        res.send(resp);
    } catch (err) {
        res.send(err);
    }
});

app.post('/login', async function (req, res) {
    username = req.body.username;
    password = req.body.password;
    try {
        if (await loginHandler.doLogin(req, username, password) == true) {
            res.send('yayyy');
        }
        res.send('invalid');
    } catch (err) {
        console.log('failed here');
        res.send(err);
    }
})

app.get('/logout', async function (req, res) {
    try {
        await loginHandler.logout(req);
        res.redirect('/admin/pages/examples/login.html');
        // res.send('logout');
    } catch (err) {
        console.log('failed');
        res.send('error')
    }
});

app.post('/checkLogin', async function (req, res) {
    username = req.body.username;
    try {
        if ((await loginHandler.isLogged(req, username)) === true) {
            res.send('already login');
        }
    } catch (err) {
        console.log('failed');
        res.send('error')
    }
    res.send('logged out');
})



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