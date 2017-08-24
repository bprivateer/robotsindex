const express = require("express");
const User = require("../models/user");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport');

mongoose.connect("mongodb://localhost:27017/robots");


// let db;
//
// let data = [];
// const getListings = function(req, res, next){
//   User.find({}).sort("name")
//   .then(function(users){
//     console.log(users);
//     req.session.users = users;
//     next();
//   })
//   .catch(function(err){
//     console.log(err);
//     next(err);
//   })
//
// }
//
// let getData = function(db, callback) {
//   let users = db.collection('users');
//
//  users.find({}).toArray().then(function(users) {
//     data = users;
//     callback();
//   });
// };
//
//
//    getData(db, function() {
//       db.close();
//       next();
//     });




router.get('/', function(req, res){

    User.find({}).sort("name")
    .then(function(users){
     console.log(users);
     req.session.users = users;
     res.render("index", {users: req.session.users})
      next();
    })
    .catch(function(err){
      console.log(err);
      next(err);
    })
  }
);

router.get('/listing/:id', function(req, res){
  let id = req.params.id
  let user = User.find(function(user){
  return user.id == id;

})
res.render("page", user)

});

router.post('/EditProfile', function(res, req){

  User.create({
    username:
    passwordHash:
    name:
    email:
    university:
    job:
    comapny:
    skills:
    phone:
    address:{
      street_num:
      Street_name:
      city:
      state_or_province:
      postal_code:
      country:
    }
  })
})


const requireLogin = function (req, res, next) {
  if (req.user) {
    console.log(req.user)
    next()
  } else {
    res.redirect('/');
  }
};

const login = function (req, res, next) {
  if (req.user) {
    res.redirect("/user")
  } else {
    next();
  }
};

router.get("/", login, function(req, res) {


  res.render("index", {
      messages: res.locals.getMessages()
  });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureFlash: true
}));

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(function(data) {
    console.log(data);
    res.redirect("/");
  })
  .catch(function(err) {
    console.log(err);
    res.redirect("/signup");
  });
});

router.get("/user", requireLogin, function(req, res) {
  res.render("user", {username: req.user.username});
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});


module.exports = router;
