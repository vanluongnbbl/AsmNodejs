// const db = require('../db');
// const shortid = require('shortid');
var User = require('../models/user.model')


module.exports.index = function(req, res){
    User.find().then((users) => {

        // res.json(users)
        res.render('users/index', {
            users: users
        })
    })
}

module.exports.search = function(req, res){

    User.find({name: {$regex: req.query.q, $options: '-i'}})
    .then((users) => {
        res.render('users/index', {
            users: users
        })
    })
    .catch(err => {
        res.send(err)
    })
}

module.exports.create = function(req, res){
    res.render('users/create');
}

module.exports.get = function(req, res){
    User.findById({_id: req.params.id}, function (err, User) {
        if (err) res.send(err);
        // res.json(User)
        res.render('users/view', {
            user: User
        })
    })
}

module.exports.postCreate = function(req, res){
    User.create({ name: req.body.name, email: req.body.email, phone: req.body.phone, password: req.body.password }, function (err, user) {
        if (err) {
            res.send(err)
        }

      })
            res.redirect('/users')
}

exports.delete = (req, res) => {
    console.log(req.params.userId)
    User.deleteOne({_id: req.params.userId})
    .then(result => {
        res.redirect('/users')
    })
    .catch(err => {
        res.send(err)
    })
}

module.exports.update = function(req, res){
    res.render('users/update');
}

exports.postUpdate = (req, res) => {
    User.updateOne({_id: req.params.userId}, {name: req.body.name, email: req.body.email, phone: req.body.phone, password: req.body.password})
    .then(result => {
        res.redirect('/users')
    })
    .catch(err => {
        res.send(err)
    })
}