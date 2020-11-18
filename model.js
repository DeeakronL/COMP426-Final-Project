export default class Model {
    constructor() {
        
        this.score = 0;
        this.crosshair = "default";
        this.mode = 0;
        this.user = "Jesse";
        this.level = [0,0];
        this.currentScore = 0;
        this.listeners = [];
    }

    loadGame(gameState){
        this.score = gameState.score;
        this.crosshair = gameState.score;
        this.mode = gameState.mode;
        this.user = gameState.user;
        this.level = gameState.level;
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
        this.mode = mode;
    }

    updateScore(score) {
        this.currentScore += score;
        this.updateListeners(Model.Event.SCORE);
        console.log(this.currentScore);
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

    start(model){
        this.updateListeners(Model.Event.START);
        //let promi = new Promise((resolve, reject) => {
        //let alertFunc = function() {alert("time's up")};
        //let times = this.timeOut();
        setTimeout(function () {alert("time's up"); model.timeOut()}, 60000);
        //});
        //alertFunc();
        //promi;
        //alert("time's up");
        //this.timeOut();
    }

    timeOut(){
        console.log("oof");
        this.updateListeners(Model.Event.TIMEOUT);
    }
}

Model.Event = {
    TIMEOUT: 0,
    START: 1,
    SCORE: 2,
}