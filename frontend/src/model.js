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
    }

    loadGame(gameState){
        this.score = gameState.score;
        this.crosshair = gameState.score;
        this.mode = gameState.mode;
        this.user = gameState.user;
        this.level = gameState.level;
        this.starting = "no";
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
        if(this.starting == "no"){
            this.mode = mode;
            this.updateListeners(Model.Event.MODE);
        }
    }

    updateScore(score, type) {
        if(type == "target"){
            this.currentScore += score;
        } else if (type == "target_inv") {
            this.currentScore -= score;
        }
        this.updateListeners(Model.Event.SCORE);
        //console.log(this.currentScore);
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

    quickTime(model){
        let d = new Date();
        let newTime = d.getTime();
        let diff = newTime - this.time;
        if(diff > 5000){
            diff = 5000;
        }
        this.currentScore = 5000 - diff;
        this.timeOut(model, model.mode);

        console.log(newTime - this.time);
    }

    start(model, mode){
        if(model.starting == "no"){
            model.starting = "yes";
            this.updateListeners(Model.Event.START);
            //let promi = new Promise((resolve, reject) => {
            //let alertFunc = function() {alert("time's up")};
            //let times = this.timeOut();
            if(mode == 0 || mode == 1){
                setTimeout(function (event) {model.timeOut(model, mode)}, 6000);
            } else if (mode == 2){
                let d = new Date();
                this.time = d.getTime();
            }
            
            //});
            //alertFunc();
            //promi;
            //alert("time's up");
            //this.timeOut();
        }
        
    }

    timeOut(model, mode){
        //console.log("oof");
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
    }

    getCurrentScore() {
        console.log("Current Score: " + this.currentScore); 
        return this.currentScore;
    }
}

Model.Event = {
    TIMEOUT: 0,
    START: 1,
    SCORE: 2,
    MODE: 3,
}