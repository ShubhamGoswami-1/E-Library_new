const fs = require('fs');
const path = require('path');

const express = require('express');
const ejs = require('ejs');

const app = express();

app.use(express.urlencoded({ extended : false }));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/profile', function(req, res){
    res.render('profile');
});
app.post('/login', function(req, res) {
    const filePath = path.join(__dirname, 'data', 'users.json');
    let existingUsers = fs.readFileSync(filePath);

    const users = JSON.parse(existingUsers);
    const email = req.body.mail;
    const password = req.body.pswd;

    for(const user of users){
        if(user.mail == email && user.passwd == password){
            return res.redirect('profile');
        }
    }
    return res.redirect('/');
});
app.get('/signup', function(req, res){
    res.render('signup');
});

app.post('/store-users', function(req, res){
    const filePath = path.join(__dirname, 'data', 'users.json');
    let existingUsers = fs.readFileSync(filePath);

    const users = JSON.parse(existingUsers);
    const email = req.body.mail;
    const username = req.body.usrname;
    const password = req.body.pswd;

    users.push({mail: email, name: username, passwd: password});
    existingUsers = fs.writeFileSync(filePath, JSON.stringify(users));
    return res.redirect('/');
});

app.listen(3000);