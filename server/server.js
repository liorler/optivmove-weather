var express = require('express')
var app = express()
var port = process.env.PORT || 8888;
var request = require("request");
var cors = require('cors')
var mongoose = require('mongoose');
const bodyParser  = require('body-parser');
var User = require('./user.js');
var UserSearch = require('./userSearch.js');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://server:server1@ds259806.mlab.com:59806/weather-db');

app.post('/login', function (req, res) {
  User.findOne(req.body, function(err, user) {
    var msg = null;
    if (user == null) {
      msg = {loginSuccess: false, userInfo: null}
    }
    else {       // password matched. proceed forward
      var userInfo = user.getUserInfo();
      msg = {loginSuccess: true , userInfo: {email: userInfo.email , name: userInfo.name}}
    }
    res.send(msg);
  });
})

app.post('/addCity', function (req, res) {
  UserSearch.findOne({'email': req.query.email}, function(err, user) {
    user.searches.push({"cityName": req.query.city , "timestamp": new Date().toString()});
    user.save();
    res.send(user);
  });
})

app.delete('/deleteCity', function (req, res) {
  UserSearch.findOne({'email': req.body.email}, function(err, user) {
    user.searches.some((search, i) => {
      console.log(search.cityName.toLowerCase())
      console.log(req.body.cityName.toLowerCase())
      if(search.cityName.toLowerCase() === req.body.cityName.toLowerCase()){
        console.log('found');
        user.searches.splice(i,1);
        user.save();
        console.log(user.searches)
        res.send(user.searches);
      }
    })
  });
})

app.get('/search', function (req, res) {
  UserSearch.findOne({'email': req.query.email}, function(err, user) {
    if (user != null)
    {
      res.send(user.searches);
    }
    else {
      var userSearch = {'email': req.query.email, 'searches': []}
      UserSearch.create(userSearch, function(err, user) {
        if (err) {
          console.log(err)
        }
        else { //create new searches document and return empty searches array
          res.send([]);
        }
      })
    }
  });
})


app.post('/signin', function (req, res) {
  User.create(req.body, function(err, user) {
    var msg = null;
    if (err) {
      var msg = {loginSuccess: false , userInfo: null};
      console.log('error')
      res.send(msg);
    }
    else {
      UserSearch.create({'email' : req.body.email , 'searches': []}, function(err, user) {
        if (err) {
          var msg = {loginSuccess: false , userInfo: null};
        }
        else { //create new searches document
          var msg = {loginSuccess: true , userInfo: {email: req.body.email , name: req.body.name}};
          console.log('success')
        }
        res.send(msg);
      })
    }
  })
})

app.listen(port, () =>
  console.log(`Weather app listening on port ${port}`),
);
