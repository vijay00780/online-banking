const db = require('../util/database');

class LoginUser {
    constructor(usr, password) {
        this.usr = usr;
        this.password = password;
    }

    checkUserExist() {
       return this.returnUserId()
        .then(res => {
            if(res.length > 0) {
                return db.execute('SELECT id FROM login WHERE password=?', [this.password]);
            } else {
                return [];
            }
        })
        .catch(err => {
            console.log(err);
        });
      
    }

    returnUserId() {
        return db.execute('SELECT Username, password FROM register WHERE  Username = ? and password = ?', [this.usr, this.password]);   

    }
}

module.exports = LoginUser;