const db = require('../util/database');


class Userform {
    constructor(usr, fullname, country, state, city, pincode, type, bank, phone, password) {
        this.usr = usr;
        this.fullname = fullname;
        this.country = country;
        this.state = state;
        this.city = city;
        this.pincode = pincode;
        this.type = type;
        this.bank = bank;
        this.phone = phone;
        this.password = password;
    }

    save() {
        const uniqueAccNo = Math.floor(100000000 + Math.random() * 900000000);
        return db.execute(
            'INSERT INTO register(Username, Password, Fullname, Country, State, City, Pincode, TypeofAcc, Bank, Phone, Accno) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.usr, this.password, this.fullname, this.country, this.state, this.city, this.pincode, this.type, this.bank, this.phone, uniqueAccNo+'']
        );
    } 
    
    login() {
        return db.execute(
            'INSERT INTO login (Username, Password) VALUES (?, ?)',
            [this.usr, this.password]
        )
    }

    getProfile(id) {
        return db.execute('SELECT * FROM register WHERE id= ?', [id]);
    }

    getProfileImg(id) {
        return db.execute('SELECT * FROM profile WHERE id= ?', [id]);
    }

    updateProfile(id) {
        return db.execute('UPDATE register SET Fullname=?, Country=?, State=?, City=?, Pincode=?, Phone=? WHERE id=?', [this.fullname, this.country, this.state, this.city, this.pincode, this.phone, id]);
    }

    updateProfileImg(id, file, type) {
        console.log(type);
        if(type === 'upload') {
            return db.execute( 'INSERT INTO profile (id, img, name) VALUES (?, ?, ?)',
            [id, file, file.name]);
        } else {
            return db.execute('UPDATE profile SET img=?, name=?  WHERE id=?', [file, file.name, id]);
        }
    }

    deleteProfile(id) {        
        return db.execute('Delete register, login FROM register INNER JOIN login ON register.id=login.id WhERE login.id = ?', [id]);
    }
}

module.exports = Userform;

