var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

/* Render home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Hello', 
        message: 'Mo Zou',
        displayName: req.user ? req.user.displayName : ''
    });
});

//load projects page
router.get('/projects', function(req, res, next) {
  res.render('projects', {
       title: 'projects', 
       displayName: req.user ? req.user.displayName : '',
       username: req.user ? req.user.username : ''
  });
});

//load service page
router.get('/service', function(req, res, next) {
  res.render('service', { 
      title: 'service', 
      service1:'Web Development', 
      service2: 'Interface Design', 
      service3: 'Database Build',
      displayName: req.user ? req.user.displayName : '',
      username: req.user ? req.user.username : ''
      });
});

//load contact page
router.get('/contact', function(req, res, next) {
  res.render('contact', { 
      title: 'contace', 
      name:'Your name', 
      email:'email', 
      todo:'what I can do for u?',
      displayName: req.user ? req.user.displayName : '',
      username: req.user ? req.user.username : ''
      
      });
});

//load about page
router.get('/about', function(req, res, next) {
  res.render('about', {
      title: 'about', 
      displayName: req.user ? req.user.displayName : '',
      username: req.user ? req.user.username : ''
      
  });
});

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        console.log("rendering login");
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
        return;
    }
    else {
        return res.redirect('/users');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});


/* Show Todo List Page */
router.get('/todolist', function (req, res, next) {

        res.render('todolist', {
            title: 'Todos',
            displayName: req.user ? req.user.displayName : '',
            username: req.user ? req.user.username : '' 
        });

});


module.exports = router;
