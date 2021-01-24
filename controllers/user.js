const path = require('path');
const rootDir = require('../util/path');
const formsMsg = require('./forms');
const UserForm = require('../model/Userform');
const fs = require('fs');


exports.register = (req, res, next) => {
    res.render(path.join(rootDir, 'views', 'register'), {
            title: 'register',
            img: false
        }   
    );
}

exports.login = (req, res, next) => {
    // res.sendfile(path.join(__dirname, '../', 'views', 'login.ejs'));
    res.render(path.join(rootDir, 'views', 'login'), {title: 'Login', img: false});
}

exports.home = (req, res, next) => {
    res.render(path.join(rootDir, 'views', 'home'), {title: 'Home', img: true});
}

exports.profile = (req, res, next) => {
    const param = req.params.id;
    const profile = new UserForm();
    profile.getProfile(parseInt(param))
    .then(prof => {
        if(prof[0].length > 0) {
            profile.getProfileImg(parseInt(param))
            .then((result) => {
                // const base = new Buffer(result[0][0].img.toString('base64'))
                // let base;
                // if(result[0][0]) {
                //     base = 'data:image/jpeg;base64,'+new Buffer(result[0][0].img).toString('base64');
                // } else {
                //     base = null;
                // }
                // console.log('prof-- 1>', 'data:image/jpeg;base64,' + new Buffer(result[0][0].img, 'binary').toString('base64'));
                res.render(path.join(rootDir, 'views', 'profile'), {title: 'Profile', profile: prof[0][0], profImg: result[0], img: false});
                
            })
            .catch(err => {
                console.log(err);
            })
        } 
        else {
            res.redirect('/login');
        } 
        
       
    })
    .catch(err => {
        console.log(err);
    });
}


exports.pageNotFound = (req, res, next) => {
    // res.sendfile(path.join(__dirname, '../', 'views', 'login.ejs'));
    res.status(404).render(path.join(rootDir, 'views', '404'), {title: '404', img: false})
}

