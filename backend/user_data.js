const stored_data = require('data-store')({ path: process.cwd() + '/data/user.json' });

class UserData {
    constructor(username, password, score, level, equip) {
        this.username = username;
        this.password = password;
        this.score = score;
        this.level = level;
        this.equip = equip;
    }

    update () {
        stored_data.set(this.username, this);
    }

    delete () {
        stored_data.del(this.username);
    }
}

UserData.getAllUsernames = () => {
    return Object.keys(stored_data.data).map((username => {return username;}));
}

UserData.findByUsername = (username, password) => {
    let user = stored_data.get(username);
    let u = new UserData(user.username, user.password, user.score, user.level, user.equip);
    if (u == null) {
        return [null, false];
    } else if (u.password == password) {
        let user = {
            username: u.username,
            score: u.score,
            level: u.level,
            equip: u.equip
        }
        return [user, true];
    } else {
        return [u, false];
    }
}

UserData.create = (username, password, score, level, equip) => {
    let array = UserData.getAllUsernames();
    let unique = true;
    for (let i = 0; i < array.length; i++) {
        if (array[i] == username) {
            unique = false;
        }
    }
    let u = new UserData(username,password,score,level,equip);
    if (uniqe == true) {
        stored_data.set(u.username, u);
    }
    return [u,unique];
}

//let user1 = new UserData("c00lguy1337", "password", [100, 200, 300], 4, "default");
//stored_data.set(user1.username, user1);

module.exports = UserData;