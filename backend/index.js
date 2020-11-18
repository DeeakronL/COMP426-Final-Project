const express = require('express');

const app = express();

const UserData = require('./user_data.js')

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/userData', (req, res) => {
    res.json(UserData.getAllUsernames());
    return;
});

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
    let {username, password, score, level, equip} = req.body;
    let u = UserData.create(username,password,score,level,equip);
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

    let {score, level, equip} = req.body;
    u.score = score;
    u.level = level;
    u.equip = equip;
    
    u.update();

    res.json(u);
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
app.listen(port, () => {
    console.log("Game backend now running on port " + port);
});