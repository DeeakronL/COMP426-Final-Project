export default class View {
    constructor(model) {
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

        let scoreboard = $(`<div class="score" style="top: 600px;position:fixed">Score: ${model.currentScore}</div>`);
        let highScoreboard = $(`<div class="high" style="top: 650px;position:fixed">High Score (Default) : ${model.score.default}</div>`);
        this.div.append(scoreboard);
        this.div.append(highScoreboard);
        model.onScore((gameState) => {this.updateScore(gameState.currentScore)});
        model.onTimeOut((gameState) => {this.updateHighScore(gameState.mode, gameState.score)});
        if(model.mode == 0){
            let target_loc_1 = randomCoords();

            let target_loc_2 = randomCoords();

            let target_loc_3 = randomCoords();

            let targets = [];
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
        }
        

        this.window = window;
        //let ui = $(`<div></div>`);
        let button1 = $(`<button style="width:100px;height:50px;border:1px solid #000" class="start">Start!</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '10px');
        let button2 = $(`<button style="width:100px;height:50px;border:1px solid #000" class="modeButton">Mode:</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '60px');
        let button3 = $(`<button style="width:50px;height:50px;border:1px solid #000" class="leftMode">${"<"}</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '110px');
        let button4 = $(`<button style="width:50px;height:50px;border:1px solid #000" class="rightMode">${">"}</button>`)
            .css('position', 'absolute')
            .css('left', '75px')
            .css('top', '110px');
        menu.append(button1);
        menu.append(button2);
        menu.append(button3);
        menu.append(button4);
    }

    createNewTarget(number, model, state) {
        console.log("yay" + model);
        let coords = randomCoords();
        let newTarget = new Target(10, "target", coords.x, coords.y, number, model, state);
        this.targets[number] = newTarget;
        this.window.append(newTarget.div);
    }

    updateScore(score){
        $(".score").html(`Score: ${score}`);
    }

    updateHighScore(mode, score){
        if(mode == 0){
            $(".high").html(`High Score (Default): ${score.default}`);
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
        model.onStart((gameState) => {this.update("active")});
        model.onTimeOut((gameState) => {this.update("inactive")});
    }

    isShot(x, y) {
        console.log(x, y);
        if(circleMath(x,y,this.x, this.y,50) && this.state == "active"){
            this.model.updateScore(circleMathScore(x,y,this.x,this.y,50));
            $(`.target${this.number}`).remove();//`.target${this.number}`);
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
    //console.log(x, y, cx, cy, r);
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