const Userform = require('../model/Userform');
const LoginUser = require('../model/LoginUser');
const rootDir = require('../util/path');

register = (req, res, next) => {
    const formData = req.body;
    const userForm = new Userform(
        formData.usr,
        formData.fullname,
        formData.country,
        formData.state,
        formData.city,
        formData.pincode,
        formData.type,
        formData.bank,
        formData.phone,
        formData.password
    )
    userForm.save()
    .then((regRes) => {
        userForm.login()
        .then((loginRes) => {
            // res.redirect('/register');
            res.send("Registration Successful");
        })
        .catch(err => {
            console.log(err);
        });
        // res.redirect('/register');        
    })
    .catch(err => {
        console.log(err);
    });
}

postLogin = (req, res, next) => {
    const formData = req.body;
    const login = new LoginUser(formData.usr, formData.password);
    login.checkUserExist()
    .then((result) => {
        console.log('dbs --->', result[0].length);
        const obj = {
            msg : null,
            id : null
        }

        if(result[0].length > 0) {
           obj.msg = 'success';
           obj.id = result[0][0].id;
            res.send(obj);
            // res.redirect('/profile/'+result.id);
        } else {
            obj.msg = 'No Match'
            res.send(obj);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

deleteProfile = (req, res, next) => {
    const deleteProf = new Userform();
    deleteProf.deleteProfile(parseInt(req.params.id))
    .then((result) => {
        if(result[0].affectedRows > 0 ) {
            res.send('success');
        } else {
            res.send('');
        }
    })
    .catch(err => {
        console.log(err);
    }) 
}

updateProfile = (req, res, next) => {
    const formData = req.body;
    const updateProfile = new Userform(
        '',
        formData.fullname,
        formData.country,
        formData.state,
        formData.city,
        formData.pincode,
        '',
        '',
        formData.phone,
        ''
    )
    updateProfile.updateProfile(parseInt(req.params.id))
    .then((result) => {
        console.log(result);
        if(result[0].affectedRows > 0 ) {
            res.send('success');
        } else {
            res.send('');
        }
    })
    .catch(err => {
        console.log(err);
    }) 
}

uploadProfileImg = (req, res, next) => {
    const file = req.files;
    const body = req.body;
    console.log('form ------>', file);
    const updateProfile = new Userform()    
    // updateProfile.updateProfileImg(parseInt(req.params.id), file.photos, body.dbImg)
    // .then((result) => {
    //     console.log('img -> ', result);
    //     if(result[0].affectedRows > 0 ) {
    //         res.send('success');
    //     } else {
    //         res.send('');
    //     }
    // })
    // .catch(err => {
    //     res.send('Something went wrong. Please try again later...')
    //     console.log(err);
    // }) 
}

exports.postLogin = postLogin;
exports.register = register
exports.deleteProfile = deleteProfile;
exports.updateProfile = updateProfile;
exports.uploadProfileImg = uploadProfileImg;