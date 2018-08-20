var nano = require('nano-blue')('http://couchadmin:letsRelaxOnCouch*17@localhost:5984');

var db= require('./couchDbUtils.js');
var dbName="web_users";
var session = require('express-session');
var express = require("express");
var app = express();
app.use(session({
    secret: 's0mErAnDoMseCr@tKeY',
    cookie: { maxAge: 60000}
}));
var sess="";

/*
** https://github.com/expressjs/session
*/

var LoginHandler = function() {
    // 'use strict';

    var _self = this;

    this.doLogin= async function(req, username, password){
        if(!password || password==null || password==undefined || password=="" ||
            !username || username=="" || username==null || username==undefined){
            return false;
        }
        try{
            var doc=await db.getDoc(dbName, username);
            // console.log(doc);
            if(doc!==false && doc.password===password){
                // set session
                sess =req.session;
                sess.username=username;
                sess.role='admin';
                console.log(sess);
                return true;
            }
            else{
                return false;
            }
        }
        catch(err){
            // return 'failed.'
            return false;
        }
       
    }
    this.isLogged= async function(req, username){
        if(!password || password==null || password==undefined || password=="" ||
            !username || username=="" || username==null || username==undefined){
            return false;
        }
        // console.log(sess.username);
        if(sess.username!==null){
            try{
                var resp=await db.getDoc(dbName, username);
                console.log(resp);
                if(resp!==false){
                    return true;
                }
            }
            catch(err){ return false;}
        }
        return false;  
       
    }

    this.logout=async function(req){
        // var sess=req.session;
        // sess.username=null;
        // sess=null;
        try{
            sess.username=null;
            await session.destroy();  
            session.cookie=null;          
            return true;        
        }
        catch(err){
            return err;
        }
    }

};

module.exports = new LoginHandler();