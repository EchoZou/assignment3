/* global Contract */
var express = require('express');
var passport = require('passport');
var router = express.Router();


var Contract = require('../models/contract');


/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  next();
}

/* Render Contracts list page. */
router.get('/', requireAuth, function (req, res, next) {
    Contract.find(function (err, contracts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('users/index', {
                title: 'Users',
                contracts: contracts,
                //show display name on header
                displayName: req.user ? req.user.displayName : ''
                
                
            });
        }
    });
});

/* Render the Add Contract Page */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('users/add', {
        title: 'Users',
        //show display name on header
        displayName: req.user ? req.user.displayName : ''
    });
});

/* process the submission of a new contract */
router.post('/add', requireAuth, function (req, res, next) {
    //add new contract to Contract 
    var contract = new Contract(req.body);
    Contract.create({
        contactName: req.body.contactName,
        contactNumber: req.body.contactNumber,
        emailAddress: req.body.emailAddress,
    }, function (err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/users');
        }
    });
});

/* Render the Edit Page */
router.get('/:id', requireAuth, function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    // use mongoose and our model to find the right contract
    Contract.findById(id, function (err, contract) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('users/edit', {
                title: 'Users',
                contract: contract,
                //show display name on header
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* process the edit form submission */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var contract = new Contract(req.body);
   
    contract._id = id;
    contract.updated = Date.now();
    
    // use mongoose to do the update
    Contract.update({ _id: id }, contract, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/users');
        }
    });
});

/* run delete on the selected contract */
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Contract.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/users');
        }
    });
});

module.exports = router;
