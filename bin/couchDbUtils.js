var nano = require('nano-blue')('http://couchadmin:letsRelaxOnCouch*17@localhost:5984');
var db=nano.db;


/*
** https://github.com/apache/couchdb-nano#dbheaddocname-callback
** https://wiki.apache.org/couchdb/HTTP_Bulk_Document_API
*/

var CouchDBUtils = function() {
    // 'use strict';

    var _self = this;

    this.create= async function(dbName){
        try{
            await db.get(dbName);
            console.log('db exists');
            return true;
        }
        catch(err){
            console.log('db will be created now');
        }
        try{
            await db.create(dbName);
            console.log(dbName+' created');
            return true;
        }
        catch(err){
            console.log('db creation failed');
            return false;
        }
    }

    this.insert = async function(dbName, jsonDoc){
        var currenDb=await db.use(dbName);
        try{
            await currenDb.insert(jsonDoc);
            console.log('insertion success');
            return true;
        }
        catch(err){
            console.log('insertion failed');
            return false;
        }
    }

    this.delete= async function(dbName, docId){
        var currenDb=await db.use(dbName);
        var doc=await this.getDoc(dbName, docId);
        try{
            await currenDb.destroy(docId, doc._rev);
            console.log('delete success');
            return true;
        }
        catch(err){
            console.log('delete failed');
            return false;
        } 
    }

    this.getDoc= async function(dbName, docId){
        var currenDb = await db.use(dbName);
        try{
            var resp=await currenDb.get(docId);
            console.log(resp[0]);
            return resp[0];
        }catch(err){
            return false;
        }
    }

    this.update = async function(dbName, jsonDoc) {
        if(!jsonDoc._id){
            console.log('id not given');
            return false;
        }
        var currenDb=await db.use(dbName);
        try{
            var resp= await currenDb.head(jsonDoc._id);
            // to remove extra double quotes from rev
            jsonDoc._rev= resp[1].etag.replace(/['"]+/g, '');
        }
        catch(err){
            console.log('fetching head failed');
            return false;
        }
        try{
            console.log(jsonDoc);
            await currenDb.insert(jsonDoc);
            console.log('update success');
            return true;
        }
        catch(err){
            console.log('update failed');
            return false;
        }

    };

    this.deleteBulk= async function(dbName, jsonArray){
        // pass array of id: jsonArray
        var currenDb=await db.use(dbName);
        var documents=jsonArray;
        for (var i=0;i<jsonArray.length;i++){
            if(!documents[i]._id) return false;
            documents[i]._rev=(await currenDb.head(jsonArray[i]._id))[1].etag.replace(/['"]+/g, '');
            documents[i]._deleted=true;
        }
        console.log(documents);
        try{
            await currenDb.bulk({docs: documents});
            return true;
        }
        catch(err){
            return false;
        }
    }

    this.updateBulk=async function(dbName, jsonArray){
        var jsonArray2=jsonArray;
        var tempArray=[];
        for(var i=0;i<jsonArray.length;i++){
            var doc={};
            doc._id=jsonArray[i]._id;
            tempArray.push(doc);
        }
        var currenDb=await db.use(dbName);
        try{
            var resp=await currenDb.fetchRevs({docs: tempArray}, include_docs=false);
            for(var i=0;i<resp[0].rows.length;i++){
                jsonArray2[i]._rev=resp[0].rows[i].value.rev;
            }
        }
        catch(err){return false;}
        try{
            console.log(jsonArray2);
            var resp=await currenDb.bulk({docs: jsonArray2});
            console.log(resp);
            return true;
        }
        catch(err){
            return false;
        }

    }

    this.getBulkRevs= async function(dbName, jsonArray){
        /*
        **  returns
        ** [
                {
                    "id": "f922d588d2f9051388d147d3cc000eac",
                    "key": "f922d588d2f9051388d147d3cc000eac",
                    "value": {
                        "rev": "1-27ed6147f6502be146ef7c7c04dcdc93"
                    }
                }
            ]
        **
        */

        var currenDb=await db.use(dbName);
        try{
            var resp=await currenDb.fetchRevs({docs: jsonArray}, include_docs=false);
            console.log(resp[0].rows);
            return resp[0].rows;
        }
        catch(err){
            return false;
        }
    }
    this.getBulk= async function(dbName, jsonArray){
        /*
        **  returns
        ** [
                {
                    "id": "f922d588d2f9051388d147d3cc000eac",
                    "key": "f922d588d2f9051388d147d3cc000eac",
                    "value": {
                        "rev": "1-27ed6147f6502be146ef7c7c04dcdc93"
                    }
                }
            ]
        **
        */

        var currenDb=await db.use(dbName);
        try{
            var resp=await currenDb.fetchRevs({docs: jsonArray}, include_docs=true);
            // console.log(resp[0].rows);
            return resp[0].rows;
        }
        catch(err){
            return false;
        }
    }



};

module.exports = new CouchDBUtils();