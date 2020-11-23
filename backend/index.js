const express = require('express');

const app = express();

const UserData = require('./user_data.js')

const bodyParser = require('body-parser');

app.use(bodyParser.json());
//app.use(express.static("../public"));
app.use(express.static("frontend"));

app.get('/userData', (req, res) => {
    res.json(UserData.getAllUsernames());
    return;
});

app.get('/userData/:mode', (req, res) => {
    let leaders = UserData.getAllScores(req.params.mode);
    leaders.sort(function(a,b) {
        return a[1] - b[1];
    });
    let topTen = leaders.slice(0,10);
    res.json(topTen);
    return;
})

app.get('/userData/:username/:password', (req, res) => {
    let u = UserData.findByUsername(req.params.username,req.params.password);
    if (u[0] == null) {
        res.status(404).send("Username not found");
        return;
    } else if (u[1] == false) {
        res.status(401).send("Wrong password to account.");
        return;
    }
    res.json(u[0]);
    return;
});

app.post('/userData', (req, res) => {
    let {username, password, score, level, crosshair} = req.body;
    let u = UserData.create(username,password,score,level,crosshair);
    if (u[0] == null) {
        res.status(400).send("Bad Request");
        return;
    } else if (u[1] == false) {
        res.status(400).send("Bad Request - username already exists");
        return;
    }
    return res.json(u[0]);
});

app.put('/userData/:username/:password', (req, res) => {
    let u = UserData.findByUsername(req.params.username,req.params.password);
    if (u[0] == null) {
        res.status(404).send("Username not found");
        return;
    } else if (u[1] == false) {
        res.status(401).send("Wrong password to account.");
        return;
    }

    let {score, level, crosshair} = req.body;
    u[0].score = score;
    u[0].level = level;
    u[0].crosshair = crosshair;
    
    u[0].update();

    res.json(u[0]);
    return;
});

app.delete('/userData/:username/:password', (req, res) => {
    let u = UserData.findByUsername(req.params.username,req.params.password);
    if (u[0] == null) {
        res.status(404).send("Username not found");
        return;
    } else if (u[1] == false) {
        res.status(401).send("Wrong password to account.");
        return;
    }
    u.delete();
    res.json(true);
    return;
});

const port = 3456;
app.listen(process.env.PORT || port, () => {
    console.log("Game backend now running on port " + port);
});