export default class View {
    constructor(model) {
        this.setup = "not done";
        this.div = $(`<div class="main"></div>`);
        let window = $(`<div class="window"></div>`)
            .css('position','fixed')
            .css('width',  1000 + "px")
            .css('height', 500 + "px")
            .css('margin','auto')
            .css('background-color','gray')
            .css('background-image', 'url("/background_test.png")')
            .css('cursor',"url('/crosshair_default.png') 50.5 50.5, auto");
        this.div.append(window);
        let menu = $(`<div class="sidebar"></div>`)
            .css('position','fixed')
            .css('width',  150 + "px")
            .css('height', 500 + "px")
            .css('margin','auto')
            .css('background-color','gray')
            .css('background-image', 'url("/menu_test.png")');
        this.div.append(menu);
        let leader = $(`<div class="leader"></div>`)
            .css('position','fixed')
            .css('left', 1000 + "px")
            .css('width',  150 + "px")
            .css('height', 500 + "px")
            .css('margin','auto')
            .css('background-color','gray')
            .css('background-image', 'url("/menu_test.png")');
        this.div.append(leader);

        let scoreboard = $(`<div class="score" style="top: 600px;position:fixed">Score: ${model.currentScore}</div>`);
        let highScoreboard1 = $(`<div class="highUp" style="top: 650px;position:fixed">High Score (Up): ${model.score.up}</div>`);
        let highScoreboard2 = $(`<div class="highCareful" style="top: 670px;position:fixed">High Score (Careful): ${model.score.careful}</div>`);
        let highScoreboard3 = $(`<div class="highQuick" style="top: 690px;position:fixed">High Score (Quick): ${model.score.quick}</div>`);
        this.div.append(scoreboard);
        this.div.append(highScoreboard1);
        this.div.append(highScoreboard2);
        this.div.append(highScoreboard3);
        model.onScore((gameState) => {this.updateScore(gameState.currentScore)});
        model.onStart((gameState) => {this.start()});
        model.onTimeOut((gameState) => {this.updateHighScore(gameState.mode, gameState.score)});
        model.onTimeOut((gameState) => {this.end()});
        let view = this;
        model.onModeChange((gameState) => {this.setupTargets(model.mode, view, model, view.setup)})
        this.modeName = "";
        this.targets = [];
        this.window = window;
        this.setupTargets(model.mode, this, model, this.setup);
        /*if(model.mode == 0){
            targets = [];
            wind
            let target_loc_1 = randomCoords();

            let target_loc_2 = randomCoords();

            let target_loc_3 = randomCoords();

            let target1 = new Target(10, "target", target_loc_1.x, target_loc_1.y, 0, model, "inactive");
            let target2 = new Target(10, "target", target_loc_2.x, target_loc_2.y, 1, model, "inactive");
            let target3 = new Target(10, "target", target_loc_3.x, target_loc_3.y, 2, model, "inactive");
            targets.push(target1);
            targets.push(target2);
            targets.push(target3);
            this.targets = targets;
            window.append(target1.div);
            window.append(target2.div);
            window.append(target3.div);
            this.modeName = "Shoot 'em up";
        } */
        
        //let ui = $(`<div></div>`);
        let button1 = $(`<button style="width:100px;height:50px;border:1px solid #000" class="start">Start!</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '10px');
        let button2 = $(`<button style="width:100px;height:50px;border:1px solid #000" class="modeButton">Mode:</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '60px');
        let button3 = $(`<button style="width:100px;height:50px;border:1px solid #000" class="modeName">${this.modeName}</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '110px');
        let button4 = $(`<button style="width:50px;height:50px;border:1px solid #000" class="leftMode">${"<"}</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '160px');
        let button5 = $(`<button style="width:50px;height:50px;border:1px solid #000" class="rightMode">${">"}</button>`)
            .css('position', 'absolute')
            .css('left', '75px')
            .css('top', '160px');
        menu.append(button1);
        menu.append(button2);
        menu.append(button3);
        menu.append(button4);
        menu.append(button5);
        this.setup = "done";
    }

    createNewTarget(number, model, state) {
        if(model.mode == 0 || model.mode == 2){
            console.log("yay" + model);
            let coords = randomCoords();
            let newTarget = new Target(10, "target", coords.x, coords.y, number, model, state);
            this.targets[number] = newTarget;
            this.window.append(newTarget.div);
        } else if (model.mode == 1){
            console.log("yay" + model);
            let coords1 = randomCoords();
            let coords2 = randomCoords();
            let newTarget1 = new Target(10, "target", coords1.x, coords1.y, number, model, state);
            let newTarget2 = new Target(10, "target_inv", coords2.x, coords2.y, number, model, state);
            this.targets[number] = newTarget1;
            this.targets[number + 3] = newTarget2;
            this.window.append(newTarget1.div);
            this.window.append(newTarget2.div);
        }
    }

    setupTargets(mode, view, model, setup){
        if(mode == 0){
            let targets = view.targets;
            let window = view.window;
            targets = [];
            $(".target").remove();
            let target_loc_1 = randomCoords();

            let target_loc_2 = randomCoords();

            let target_loc_3 = randomCoords();

            let target1 = new Target(10, "target", target_loc_1.x, target_loc_1.y, 0, model, "inactive");
            let target2 = new Target(10, "target", target_loc_2.x, target_loc_2.y, 1, model, "inactive");
            let target3 = new Target(10, "target", target_loc_3.x, target_loc_3.y, 2, model, "inactive");
            targets.push(target1);
            targets.push(target2);
            targets.push(target3);
            view.targets = targets;
            window.append(target1.div);
            window.append(target2.div);
            window.append(target3.div);
            view.modeName = "Shoot 'em up";
            if(setup == "done"){
                $(".modeName").html(`${view.modeName}`);
            }
        } else if(mode == 1){
            let targets = view.targets;
            let window = view.window;
            targets = [];
            $(".target").remove();
            let target_loc_1 = randomCoords();
            let target_loc_11 = randomCoords();
            let target_loc_2 = randomCoords();
            let target_loc_21 = randomCoords();
            let target_loc_3 = randomCoords();
            let target_loc_31 = randomCoords();
            let target1 = new Target(10, "target", target_loc_1.x, target_loc_1.y, 0, model, "inactive");
            let target2 = new Target(10, "target", target_loc_2.x, target_loc_2.y, 1, model, "inactive");
            let target3 = new Target(10, "target", target_loc_3.x, target_loc_3.y, 2, model, "inactive");
            let target11 = new Target(10, "target_inv", target_loc_11.x, target_loc_11.y, 0, model, "inactive");
            let target21 = new Target(10, "target_inv", target_loc_21.x, target_loc_21.y, 1, model, "inactive");
            let target31 = new Target(10, "target_inv", target_loc_31.x, target_loc_31.y, 2, model, "inactive");
            // sp00ky comment
            targets.push(target1);
            targets.push(target2);
            targets.push(target3);
            targets.push(target11);
            targets.push(target21);
            targets.push(target31);
            view.targets = targets;
            window.append(target1.div);
            window.append(target2.div);
            window.append(target3.div);
            window.append(target11.div);
            window.append(target21.div);
            window.append(target31.div);
            view.modeName = "Shoot 'em careful";
            if(setup == "done"){
                $(".modeName").html(`${view.modeName}`);
            }
        } else if(mode == 2){
            let targets = view.targets;
            let window = view.window;
            targets = [];
            $(".target").remove();
            let target_loc_1 = randomCoords();

            let target_loc_2 = randomCoords();

            let target_loc_3 = randomCoords();

            let target1 = new Target(10, "target", target_loc_1.x, target_loc_1.y, 0, model, "inactive");
            let target2 = new Target(10, "target", target_loc_2.x, target_loc_2.y, 1, model, "inactive");
            let target3 = new Target(10, "target", target_loc_3.x, target_loc_3.y, 2, model, "inactive");
            targets.push(target1);
            targets.push(target2);
            targets.push(target3);
            view.targets = targets;
            window.append(target1.div);
            window.append(target2.div);
            window.append(target3.div);
            view.modeName = "Shoot 'em quick";
            if(setup == "done"){
                $(".modeName").html(`${view.modeName}`);
            }
        }
    }

    updateScore(score){
        $(".score").html(`Score: ${score}`);
    }

    updateHighScore(mode, score){
        if(mode == 0){
            $(".highUp").html(`High Score (Up): ${score.up}`);
        } else if (mode == 1){
            $(".highCareful").html(`High Score (Careful): ${score.careful}`);
        } else if (mode == 2){
            $(".highQuick").html(`High Score (Quick): ${score.quick}`)
        }
    }

    start() {
        let div = $(`<img src="/game_start.png" class="game_start" draggable="false">`)
            .css('position','absolute')
            .css('left', "475px")
            .css('top', "150px")
            .css('pointer-events', 'none');
        this.window.append(div);
        let opacity = 100;
        for(let i = 0; i < 100; i++){
            opacity -= 1;
            //console.log(opacity);
            setTimeout(function () {$(`.game_start`).css(`opacity`, opacity/100);}, 1000);
        }
    }

    end() {
        let div = $(`<img src="/times_up.png" class="game_end" draggable="false">`)
            .css('position','absolute')
            .css('left', "475px")
            .css('top', "150px")
            .css('pointer-events', 'none');
        this.window.append(div);
        let opacity = 100;
        for(let i = 0; i < 100; i++){
            opacity -= 1;
            //console.log(opacity);
            setTimeout(function () {$(`.game_end`).css(`opacity`, opacity/100);}, 1000);
        }
    }
}

class Target {
    constructor(size, type, x, y, number, model, state) {
        this.div = $(`<img src="/${type}.png" class="target target${number}" value="${number}" draggable="false">`)
            .css('position','absolute')
            .css('left', (x - 50) + "px")
            .css('top', (y - 50) + "px");

        this.number = number;
        this.x = x;
        this.y = y;
        this.model = model;
        this.state = state;
        this.type = type;
        model.onStart((gameState) => {this.update("active")});
        model.onTimeOut((gameState) => {this.update("inactive")});
    }

    isShot(x, y) {
        console.log(x, y, this.x, this.y);
        if(this.type == "target" && this.state == "active" && circleMath(x,y,this.x, this.y,50)){
            this.model.updateScore(circleMathScore(x,y,this.x,this.y,50), this.type);
            $(`.target${this.number}`).remove();//`.target${this.number}`);
            return true;
        } else if (this.type == "target_inv" && this.state == "active" && circleMath(x,y,this.x, this.y, 50)){
            this.model.updateScore(100, this.type);
            $(`.target${this.number}`).remove();
            return true;
        } else {
            return false;
        }
        
    }

    update(state){
        if(state == "active"){
            this.state = state;
        } else if (state == "inactive"){
            this.state = state;
        }
    }


}

function circleMath(x,y,cx,cy,r){
    console.log(x, y, cx, cy, r);
    //console.log(((x-cx) * (x-cx)) + ((y-cy) * (y-cy)), (r * r));
    //console.log(x - cx, (x-cx) * (x-cx));
    if( ((x-cx) * (x-cx)) + ((y-cy) * (y-cy)) > (r * r)  ) {
        return false;
    } else {
        //console.log(((x-cx) * (x-cx)) + ((y-cy) * (y-cy)));
        return true;
    }
}

function circleMathScore(x, y, cx, cy, r){
    return 100 - (((x-cx) * (x-cx)) + ((y-cy) * (y-cy)))/( r*r );
}

function randomCoords() {
    let x = Math.random()*1000;
    let y = Math.random()*500;
    while( x < 200 || x > 950){
        x = Math.random()*1000; 
    }
    while( y < 50 || y > 450){
        y = Math.random()*500;
    }
    return {x: x, y: y};
}