const stored_data = require('data-store')({ path: process.cwd() + '/data/user.json' });

class UserData {
    constructor(username, password, score, level, crosshair) {
        this.username = username;
        this.password = password;
        this.score = score;
        this.level = level;
        this.crosshair = crosshair;
    }

    update() {
        stored_data.set(this.username, this);
    }

    delete() {
        stored_data.del(this.username);
    }
}

UserData.getAllUsernames = () => {
    return Object.keys(stored_data.data).map((username => {return username;}));
}

UserData.getAllScores = (mode) => {
    let leaders = [];
    leaders[0] = Object.keys(stored_data.data).map((username => {return username;}));
    leaders[1] = [];
    for (let i = 0; i < leaders[0].length; i++) {
        let user = stored_data.get(leaders[0][i]);
        leaders[1][i] = user.score[mode];
    }
    let result = [];
    for (let i = 0; i < leaders[0].length; i++) {
        result[i] = [leaders[0][i], leaders[1][i]];
    }
    return result;
}

UserData.findByUsername = (username, password) => {
    let user = stored_data.get(username);
    let u = new UserData(user.username, user.password, user.score, user.level, user.crosshair);
    if (user == null) {
        return [null, false];
    } else if (u.password == password) {
        return [u, true];
    } else {
        u.password = "not_the_password";
        return [u, false];
    }
}

UserData.findUserScores = (username) => {
    let user = stored_data.get(username);
    if (user == null) {
        return [null, false];
    } else {
        let u = {
            user: user.username,
            score: [
                user.score[0],
                user.score[1],
                user.score[2]
            ]
        };
        return [u, true];
    }
}

UserData.create = (username, password, score, level, crosshair) => {
    let array = UserData.getAllUsernames();
    let unique = true;
    for (let i = 0; i < array.length; i++) {
        if (array[i] == username) {
            unique = false;
        }
    }
    let u = new UserData(username,password,score,level,crosshair);
    if (unique == true) {
        stored_data.set(u.username, u);
    }
    return [u,unique];
}

//let user1 = new UserData("c00lguy1337", "password", [100, 200, 300], 4, "default");
//stored_data.set(user1.username, user1);

module.exports = UserData;