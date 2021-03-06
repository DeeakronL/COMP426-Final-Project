export default class Model {
    constructor() {
        
        this.score = { up: 0, careful: 0, quick: 0};
        this.crosshair = "default";
        this.mode = 0;
        this.user = "Jesse";
        this.level = [0,0];
        this.currentScore = 0;
        this.listeners = [];
        this.starting = "no";
        this.time2 = 0;
        this.draw = "naw";
        this.resetting = false;
        this.loggedIn = false;
        this.pass = "";
    }

    loadGame(gameState){
        this.switchCrosshairLite(gameState.crosshair);
        this.user = gameState.user;
        this.level = gameState.level;
        this.pass = gameState.pass;
        this.score = {
            up: gameState.score[0],
            careful: gameState.score[1],
            quick: gameState.score[2]
        }
        this.switchMode(0);
        this.updateListeners(Model.Event.LEVELUP);
        this.updateListeners(Model.Event.XP);
        this.updateListeners(Model.Event.LEADER);
    }

    save() {
        this.updateListeners(Model.Event.LEADER);
    }

    getGameState() {
        return ({
            score: this.score,
            crosshair: this.crosshair,
            mode: this.mode,
            user: this.user,
            level: this.level,
            currentScore: this.currentScore,
        })
    }



    addListener(listener, event) {
        let idx = this.listeners.findIndex((l) => l == {listener: listener, event: event});
        if (idx == -1) {
            this.listeners.push({listener: listener, event: event});
        }
     }

     removeListener(listener, event) {
        let idx = this.listeners.findIndex((l) => l == {listener: listener, event: event});
        if (idx != -1) {
            this.listeners.splice(idx, 1);
        }
     }

     updateListeners(event) {
        this.listeners.forEach((l) => {
            if(l.event == event){
                l.listener(this.getGameState());
            }
        })
    }

    switchMode(mode){
        if(this.resetting){

        } else if(this.starting == "no"){
            this.mode = mode;
            this.updateListeners(Model.Event.MODE);
            this.updateListeners(Model.Event.LEADER);
        }
    }

    switchCrosshair(crosshairNum, type){
        if(this.level[0] < crosshairNum){

        } else {
            this.crosshair = type;
            this.updateListeners(Model.Event.CROSSHAIR);
        }
    }

    switchCrosshairLite(type){
        this.crosshair = type;
        this.updateListeners(Model.Event.CROSSHAIR);
    }

    updateScore(score, type) {
        if(type == "target"){
            this.currentScore += score;
        } else if (type == "target_inv") {
            this.currentScore -= score;
        }
        this.updateListeners(Model.Event.SCORE);
    }

    async startTimer(mode){
        setTimeout(5000);
        return true;
    }

    onTimeOut(callback){
        this.addListener(callback, Model.Event.TIMEOUT);
    }

    offTimeOut(callback){
        this.removeListener(callback, Model.Event.TIMEOUT);
    }

    onStart(callback){
        this.addListener(callback, Model.Event.START);
    }

    offStart(callback){
        this.removeListener(callback, Model.Event.START);
    }

    onScore(callback){
        this.addListener(callback, Model.Event.SCORE);
    }

    onModeChange(callback){
        this.addListener(callback, Model.Event.MODE);
    }

    onUrDead(callback){
        this.addListener(callback, Model.Event.URDEAD);
    }

    onDraw(callback){
        this.addListener(callback, Model.Event.DRAW);
    }

    onBang(callback){
        this.addListener(callback, Model.Event.BANG);
    }

    onCrosshair(callback){
        this.addListener(callback, Model.Event.CROSSHAIR);
    }

    onLevelUp(callback){
        this.addListener(callback, Model.Event.LEVELUP);
    }

    onLeaderChange(callback){
        this.addListener(callback, Model.Event.LEADER);
    }

    onXP(callback){
        this.addListener(callback, Model.Event.XP);
    }

    quickTime(model){
        let d = new Date();
        let newTime = d.getTime();
        if(this.time2 == 0){
            this.timeOut(model, model.mode);
            model.urDead();
            return "ur dead";
        }
        let diff = newTime - (this.time2);
        if(diff > 5000){
            this.timeOut(model, model.mode);
            model.urDead();
            return "ur dead";
        }
        this.currentScore = 5000 - diff;
        this.timeOut(model, model.mode);
        if(diff == 5000){
            return "ur dead";
        } else {
            this.draw = "naw";
            this.draw2 = false;
            this.updateListeners(Model.Event.BANG);
            return "ur not dead";
        }
    }

    urDead(){
        if(this.draw == "currently..."){
            this.updateListeners(Model.Event.BANG);
            this.updateListeners(Model.Event.URDEAD);
            this.draw = "naw";
            this.draw2 = false;
            this.timeOut(this, this.mode);
        }
    }

    updateDraw(){
        this.updateListeners(Model.Event.DRAW);
    }

    start(model, mode){
        if(model.resetting){

        } else if (model.starting == "no"){
            model.starting = "yes";
            this.updateListeners(Model.Event.START);
            if(mode == 0 || mode == 1){
                setTimeout(function (event) {model.timeOut(model, mode)}, 60000);
            } else if (mode == 2){
                let randTime = Math.random()*5000;
                let d = new Date();
                this.time = d.getTime();
                this.draw = "currently...";
                this.draw2 = false;
                this.time2 = 0;
                setTimeout(function (event) {
                    if(model.draw == "currently..."){
                        setTimeout(function (event) {
                            if(model.draw == "currently..."){
                                model.draw2 = true;
                                let d2 = new Date();
                                model.time2 = d2.getTime();
                                model.updateDraw();
                                setTimeout(function(event) {if(model.draw == "currently..." && model.draw2) {model.urDead()}}, 5000) 
                            }
                            
                        }, randTime)
                    }
                    
                }, 5000);
                
            }
            
        }
        
    }

    timeOut(model, mode){
        model.updateHighScore(model, mode, model.getCurrentScore());
        model.updateListeners(Model.Event.TIMEOUT);
        model.currentScore = 0;
        model.starting = "no";
    }

    updateHighScore(model, mode, score){
        if(mode == 0){
            if(model.score.up < score){
                model.score.up = score;
            }
        } else if (mode == 1){
            if(model.score.careful < score){
                model.score.careful = score;
            }
        } else if (mode == 2){
            if(model.score.quick < score){
                model.score.quick = score;
            }
        }

        this.updateXP(model, mode, score);
    }

    updateXP(model, mode, score){
        let multiplier = 1;
        if(mode == 0){
            multiplier = 1;
        } else if (mode == 1){
            multiplier = 1.2;
        } else if (mode == 2){
            multiplier = 0.16
        }
        if(score < 0){
            score = 0;
        }
        model.level[1] += score;
        if(model.level[1] > 10000 && model.level[0] == 0){
            let temp = model.level[1];
            temp = temp - 10000;
            model.level[1] = temp;
            model.level[0]++;
            model.updateListeners(Model.Event.LEVELUP);
        } else if(model.level[1] > 11000 && model.level[0] == 1){
            let temp = model.level[1];
            temp = temp - 11000;
            model.level[1] = temp;
            model.level[0]++;
            model.updateListeners(Model.Event.LEVELUP);
        } else if(model.level[1] > 12100 && model.level[0] == 2){
            let temp = model.level[1];
            temp = temp - 12100;
            model.level[1] = temp;
            model.level[0]++;
            model.updateListeners(Model.Event.LEVELUP);
        } else if(model.level[1] > 13310 && model.level[0] == 3){
            let temp = model.level[1];
            temp = temp - 13310;
            model.level[1] = temp;
            model.level[0]++;
            model.updateListeners(Model.Event.LEVELUP);
        } else if(model.level[1] > 14641 && model.level[0] == 4){
            let temp = model.level[1];
            temp = temp - 14641;
            model.level[1] = temp;
            model.level[0]++;
            model.updateListeners(Model.Event.LEVELUP);
        } else if(model.level[1] > 16105 && model.level[0] == 5){
            let temp = model.level[1];
            temp = temp - 16105;
            model.level[1] = temp;
            model.level[0]++;
            model.updateListeners(Model.Event.LEVELUP);
        } else if(model.level[1] > 17716 && model.level[0] == 6){
            let temp = model.level[1];
            temp = temp - 17716;
            model.level[1] = temp;
            model.level[0]++;
            model.updateListeners(Model.Event.LEVELUP);
        } else if(model.level[1] > 19487 && model.level[0] == 7){
            let temp = model.level[1];
            temp = temp - 19487;
            model.level[1] = temp;
            model.level[0]++;
            model.updateListeners(Model.Event.LEVELUP);
        } else if(model.level[1] > 21436 && model.level[0] >= 8){
            let temp = model.level[1];
            temp = temp - 21436;
            model.level[1] = temp;
            model.level[0]++;
            model.updateListeners(Model.Event.LEVELUP);
        }
        model.updateListeners(Model.Event.XP);
    }

    getCurrentScore() {
        return this.currentScore;
    }
}

Model.Event = {
    TIMEOUT: 0,
    START: 1,
    SCORE: 2,
    MODE: 3,
    URDEAD: 4,
    DRAW: 5,
    BANG: 6,
    CROSSHAIR: 7,
    LEVELUP: 8,
    LEADER: 9,
    XP: 10,
}