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
        this.crosshair = gameState.crosshair;
        this.user = gameState.user;
        this.level = gameState.level;
        this.pass = gameState.pass;
        this.score = {
            up: gameState.score[0],
            careful: gameState.score[1],
            quick: gameState.score[2]
        }
        this.mode = 0;
        //this.updateListeners(Model.Event.TIMEOUT);
        //this.starting = "no";
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
        }
    }

    switchCrosshair(crosshairNum, type){
        console.log(this.level, crosshairNum);
        if(this.level[0] < crosshairNum){

        } else {
            this.crosshair = type;
            this.updateListeners(Model.Event.CROSSHAIR);
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

    quickTime(model){
        let d = new Date();
        let newTime = d.getTime();
        if(this.time2 == 0){
            this.timeOut(model, model.mode);
            model.urDead();
            return "ur dead";
        }
        console.log("yay");
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
            this.updateListeners(Model.Event.BANG);
            return "ur not dead";
        }
        console.log(newTime - this.time);
    }

    urDead(){
        if(this.draw == "currently..."){
            this.updateListeners(Model.Event.BANG);
            this.updateListeners(Model.Event.URDEAD);
            this.draw = "naw";
            this.timeOut(this, this.mode);
            //alert("you died");
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
            //let promi = new Promise((resolve, reject) => {
            //let alertFunc = function() {alert("time's up")};
            //let times = this.timeOut();
            if(mode == 0 || mode == 1){
                setTimeout(function (event) {model.timeOut(model, mode)}, 60000);
            } else if (mode == 2){
                let randTime = Math.random()*5000;
                let d = new Date();
                this.time = d.getTime();
                this.draw = "currently...";
                setTimeout(function (event) {
                    if(model.draw == "currently..."){
                        setTimeout(function (event) {
                            if(model.draw == "currently..."){
                                let d2 = new Date();
                                model.time2 = d2.getTime();
                                model.updateDraw();
                                setTimeout(function(event) {model.urDead()}, 5000) 
                            }
                            
                        }, randTime)
                    }
                    
                    //alert("too slow"); model.urDead()
                }, 5000);
                
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
    URDEAD: 4,
    DRAW: 5,
    BANG: 6,
    CROSSHAIR: 7,
}