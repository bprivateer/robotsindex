const express = require("express");
const User = require("../models/user");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport');

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
    res.redirect("/index")
  } else {
    console.log("Login");
    next();
  }
};

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
//
// router.get('/page', function(res, req){
//
//   User.find({})
//   .then(function(data){
//     console.log(data);
//   })
//
//   res.rednder("page", data)
// })

router.get('/index', requireLogin, function(req, res){
  User.find({})
  .then(function(users) {
    res.render("index", {users: users})
  });
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post('/signup', function(req, res){
  User.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    university: req.body.university,
    job: req.body.job,
    company: req.body.company,
    skills: req.body.skills,
    phone: req.body.phone,
    address:{
      street_num: req.body.streetNum,
      Street_name: req.body.streetName,
      city: req.body.city,
      state_or_province: req.body.state,
      postal_code: req.body.zipCode,
      country: req.body.country,
    }
  })
  .then(function(data){
    // console.log(data);
    res.redirect('/login')
  })

});

router.get("/", login, function(req, res) {

  res.render("index", { messages: res.locals.getMessages()});
});

router.get('/login', function(req, res){
  console.log(req.user);
     res.render("login")
    })


router.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post("/edit/:id", function(req, res){
 let id = req.params.id;

  User.update({'_id': id},{
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    university: req.body.university,
    job: req.body.job,
    company: req.body.company,
    skills: req.body.skills,
    phone: req.body.phone,
    address:{
      street_num: req.body.streetNum,
      Street_name: req.body.streetName,
      city: req.body.city,
      state_or_province: req.body.state,
      postal_code: req.body.zip,
      country: req.body.country,
    }
  }).then(function(data){
    console.log("catch");
    console.log(req.user);
    res.redirect("/")
  })
  .catch(function(err) {
    console.log(err);
  })


});

router.get("/edit/:id", function(req, res){
  // console.log(req.user);

  // User.findOne({_id: req.params.id})
  // .catch(function(user){
  //   console.log("USERRRRRRR", user);
  // })
  // .then(function(err){
  //   console.log(err);
  // })
// let id = req.params.username;
  if(req.user._id == req.params.id){
    User.findOne({_id: req.params.id})
    .then(function(user) {
      console.log(user);
      res.render('editprofile', user);
    })
    .catch(function(err) {
      res.send(err);
    });
  } else {
    res.render('page', {})
  }
//   console.log("IIIIIIIDDD",id);
// res.render("editprofile")
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/login");
});
//
//
router.get("/view/:id", function(req, res) {
  let id = req.params.id

  User.findOne({_id: req.params.id})
  .then(function(user){
    console.log("USER",user);
    res.render("page", user);
  })
  .catch(function(err){
    console.log(err);
  })
  console.log("ID", id);
  console.log(req.params.id);

});




module.exports = router;
