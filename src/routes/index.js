const express = require('express');
const router = express.Router();

const passport = require('passport');

const Jobs = require('../models/jobs');
const Pags = require('../models/pagination');
const Categ = require('../models/category');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/action',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/action',
    failureRedirect: 'signin',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/signin');
});

router.get('/action', isAuthenticated, async (req, res, next) => {
    const jobs = await Jobs.find();
    //console.log(jobs);
    res.render('home', {jobs});
});

router.get('/details/:id', isAuthenticated, async (req, res) => {
    const {id} = req.params;
    const categ = await Categ.find();
    const jobs = await Jobs.findById(id);
    res.render('details', {jobs, categ});
});

router.get('/delete/:id', isAuthenticated, async (req, res) => {
    const {id} = req.params;
    await Jobs.remove({_id: id});
    res.redirect('/action');
});

router.get('/edit/:id', isAuthenticated, async (req, res) => {
    const {id} = req.params;
    const jobs = await Jobs.findById(id);
    const categ = await Categ.find();
    res.render('edit', {jobs, categ});
});

router.post('/edit/:id', isAuthenticated, async (req, res) => {
    const {id} = req.params;
    await Jobs.update({_id: id}, req.body);
    res.redirect('/action');
});

router.get('/configuration', isAuthenticated, async (req, res, next) => {
    const pags = await Pags.find();
    //console.log(pags);
    res.render('config', {pags});
});

router.post('/configuration/:id', isAuthenticated,async (req, res) => {
    const {id} = req.params;
    await Pags.update({_id: id}, req.body);
    res.redirect('/configuration');
});

router.get('/categories', isAuthenticated, async (req, res, next) => {
    const categ = await Categ.find();
    //console.log(pags);
    res.render('category', {categ});
});

router.get('/categories/:id', isAuthenticated, async (req, res, next) => {
    const {id} = req.params;
    const categ = await Categ.findById(id);
    res.render('edit_category', {categ});
});

router.post('/categories/:id', isAuthenticated, async (req, res, next) => {
    const {id} = req.params;
    await Categ.update({_id: id}, req.body);
    res.redirect('/categories');
});

router.get('/status/:id', isAuthenticated, async (req, res) => {
    const {id} = req.params;
    const categ = await Categ.findById(id);
    categ.Status = !categ.Status;
    await categ.save();
    res.redirect('/categories/'+id);
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
};

module.exports = router;