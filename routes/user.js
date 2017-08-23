const express = require('express');
const router = express.Router();

let data = [];

// let getData = function(db, callback) {
//   let users = db.collection('users');
//
//  users.find({}).toArray().then(function(users) {
//     data = users;
//     callback();
//   });
// };

const getListings = function(req, res, next){
  let MongoClient = require('mongodb').MongoClient;
  let assert = require('assert');

 let url = "mongodb://localhost:27017/robots";


 MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

   getData(db, function() {
      db.close();
      next();
    });
  });

  let getData = function(db, callback) {
    let users = db.collection('users');

   users.find({}).toArray().then(function(users) {
      data = users;
      callback();
    });
  };

};

router.get('/', getListings, function(req, res){
  res.render("index", {users: data})
})



module.exports = router;
