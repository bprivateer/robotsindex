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


router.get('/index', function(req, res){
  User.find({})
  .then(function(users) {
    res.render("index", {users: users})
  });
});



router.get('/', function(req, res){

    User.find({}).sort("name")
    .then(function(users){
     console.log(users);
     req.session.users = users;
     res.render("login", {users: req.session.users})
      // next();
    })
    .catch(function(err){
      console.log(err);
      // next(err);
    })
  }
);
//
// router.get('/listing/:id', function(req, res){
//   let id = req.params.id
//   let user = User.find(function(user){
//   return user.id == id;
//
// })
// res.render("page", user)
//
// });

router.post('/login', function(req, res){
  res.redirect("/index")
});


router.post('/signup', function(req, res){
  User.create({
    username: req.body.username,
    passwordHash: req.body.password,
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
    console.log(data);
    res.redirect('/index')
  })



});



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

// router.post("/edit/:id", function(req, res){
//  let id = req.params.id;
//
//   User.update({'_id': id},{
//     username: req.body.username,
//     passwordHash: req.body.password,
//     name: req.body.name,
//     email: req.body.email,
//     university: req.body.university,
//     job: req.body.job,
//     company: req.body.company,
//     skills: req.body.skills,
//     phone: req.body.phone,
//     address:{
//       street_num: req.body.streetNum,
//       Street_name: req.body.streetName,
//       city: req.body.city,
//       state_or_province: req.body.state,
//       postal_code: req.body.zipCode,
//       country: req.body.country,
//     }
//   }).then(function(data){
//     console.log("catch");
//     console.log(req.user);
//     res.redirect("/")
//   })
//   .catch(function(err) {
//     console.log(err);
//   })
//
//
// });

router.get("/edit/:id", function(req, res){
  console.log('PARAMS',req.params);
  // id = req.params.id;
  // console.log('ID HERE',id);
  console.log("hahahahahahahahah", req.params.idr);
  User.findOne({_id: req.params.id})
    .then(function(user) {
      console.log('USER HERE:',user);
      res.render('editprofile', user);
    })

  // User.find({_id: id})
  // .then(function(data){
  //   console.log(data);
  //   res.render("editprofile", data[0])
  // })
  // .catch(function(err){
  //   console.log(err);
  // })
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
