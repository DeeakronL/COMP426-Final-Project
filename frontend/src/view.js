export default class View {
    constructor(model) {
        let back = randomBackground();
        this.setup = "not done";
        this.div = $(`<div class="main"></div>`);
        let window = $(`<div class="window"></div>`)
            .css('position','absolute')
            .css('width',  1000 + "px")
            .css('height', 500 + "px")
            .css('margin','auto')
            .css('background-color','gray')
            .css('background-image', `url("/public/background_${back}.png")`)
            .css('cursor',"url('/public/crosshair_default.png') 50.5 50.5, auto");
        this.div.append(window);
        let menu = $(`<div class="sidebar"></div>`)
            .css('position','fixed')
            .css('width',  150 + "px")
            .css('height', 500 + "px")
            .css('margin','auto')
            .css('background-color','gray')
            .css('background-image', 'url("/public/menu_test.png")');
        this.div.append(menu);
        let leader = $(`<div class="leader"></div>`)
            .css('position','fixed')
            .css('left', 1000 + "px")
            .css('width',  150 + "px")
            .css('height', 500 + "px")
            .css('margin','auto')
            .css('background-color','gray')
            .css('background-image', 'url("/public/menu_test.png")');
        this.div.append(leader);

        let scoreboard = $(`<div class="score" style="top: 650px; width: 565px; position:fixed;border:1px solid #000">Score: ${model.currentScore}</div>`);
        let highScoreboard1 = $(`<div class="highUp" style="top: 670px; width: 565px; position:fixed;border:1px solid #000">High Score (Up): ${model.score.up}</div>`);
        let highScoreboard2 = $(`<div class="highCareful" style="top: 690px; width: 565px; position:fixed;border:1px solid #000">High Score (Careful): ${model.score.careful}</div>`);
        let highScoreboard3 = $(`<div class="highQuick" style="top: 710px; width: 565px; position:fixed;border:1px solid #000">High Score (Quick): ${model.score.quick}</div>`);
        this.div.append(scoreboard);
        this.div.append(highScoreboard1);
        this.div.append(highScoreboard2);
        this.div.append(highScoreboard3);
        let levelMeter = $(`<div class="levelMeter" style="top: 630px; width: 1132px; position:fixed;border:1px solid #000">Level: ${model.level[0]}      XP: ${model.level[1]}</div>`);
        this.div.append(levelMeter);
        let scoreLookUp = $(`<div class="lookUp" style="top: 650px; left: 575px; width:565px; height:78px; position:fixed;border: 1px solid #000; text-align: center">Find a User's Score</div>`);
        this.div.append(scoreLookUp);
        let formScore = $(
            `<form class="formScore">
                <div>
                    <input class="scoreAuto" type="text" value="" style="position: absolute; left:115px"></input>
                    <button class="formScoreAuto" type="submit"style="width:175px;height:20px;border:1px solid #000; top: 19px;position: absolute"></button>
                </div>
            </form>`
        );
        scoreLookUp.append(formScore);
        let scoreResults = $(
            `<div>
                <div style="position: absolute; top: 50px" class="scoreUp">Up: </div>
                <div style="position: absolute; top: 50px; left: 175px;" class="scoreCareful">Careful: </div>
                <div style="position: absolute; top: 50px; left: 400px;" class="scoreQuick">Quick: </div>
            </div>`
        );
        scoreLookUp.append(scoreResults);
        model.onScore((gameState) => {this.updateScore(gameState.currentScore)});
        model.onStart((gameState) => {this.start()});
        model.onTimeOut((gameState) => {this.updateHighScore(gameState.mode, gameState.score)});
        model.onTimeOut((gameState) => {this.end(gameState.mode)});
        model.onDraw((gameState) => {this.draw()});
        model.onBang((gameState) => {this.bang(model)});
        model.onCrosshair((gameState) => {this.updateCursor(gameState.crosshair)});
        model.onLevelUp((gameState) => {this.updateLevel(gameState.level)});
        model.onXP((gameState) => {this.updateXP(gameState.level)});
        model.onLeaderChange((gameState) => {this.updateLeaders(model)});
        this.reset = true;
        let view = this;
        model.onModeChange((gameState) => {this.setupTargets(model.mode, view, model, view.setup); this.newBack()})
        this.modeName = "";
        this.targets = [];
        this.window = window;
        this.setupTargets(model.mode, this, model, this.setup);
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
        let button6 = $(`<button style="width:100px;height:50px;border:1px solid #000" class="signUp">Sign Up</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '210px');
        let button7 = $(`<button style="width:100px;height:50px;border:1px solid #000" class="logIn">Log In</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '260px');
        let button8 = $(`<button style="width:100px;height:50px;border:1px solid #000;background-color:gray" class="logOut">Log Out</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '310px');
        let button9 = $(`<button style="width:100px;height:50px;border:1px solid #000;background-color:gray" class="save">Save Progress</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '360px');
        let button10 = $(`<button style="width:100px;height:50px;border:1px solid #000;background-color:gray" class="delete">Delete Account</button>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '410px');
        menu.append(button1);
        menu.append(button2);
        menu.append(button3);
        menu.append(button4);
        menu.append(button5);
        menu.append(button6);
        menu.append(button7);
        menu.append(button8);
        menu.append(button9);
        menu.append(button10);


        let crossButton0 = $(`<button style="width:115px;height:115px;border:1px solid #000;background-image: url(/public/button_default.png)" class="cross0"></button>`)
            .css('position', 'absolute')
            .css('left', '0px')
            .css('top', '510px');
        let crossButton1 = $(`<button style="width:115px;height:115px;border:1px solid #000;background-image: url(/public/locked_n00b.png)" class="cross1"></button>`)
            .css('position', 'absolute')
            .css('left', '115px')
            .css('top', '510px');
        let crossButton2 = $(`<button style="width:115px;height:115px;border:1px solid #000;background-image: url(/public/locked_arr.png)" class="cross2"></button>`)
            .css('position', 'absolute')
            .css('left', '230px')
            .css('top', '510px');
        let crossButton3 = $(`<button style="width:115px;height:115px;border:1px solid #000;background-image: url(/public/locked_x.png)" class="cross3"></button>`)
            .css('position', 'absolute')
            .css('left', '345px')
            .css('top', '510px');
        let crossButton4 = $(`<button style="width:115px;height:115px;border:1px solid #000;background-image: url(/public/locked_oldstyle.png)" class="cross4"></button>`)
            .css('position', 'absolute')
            .css('left', '460px')
            .css('top', '510px');
        let crossButton5 = $(`<button style="width:115px;height:115px;border:1px solid #000;background-image: url(/public/locked_east.png)" class="cross5"></button>`)
            .css('position', 'absolute')
            .css('left', '575px')
            .css('top', '510px');
        let crossButton6 = $(`<button style="width:115px;height:115px;border:1px solid #000;background-image: url(/public/locked_hands.png)" class="cross6"></button>`)
            .css('position', 'absolute')
            .css('left', '690px')
            .css('top', '510px');
        let crossButton7 = $(`<button style="width:115px;height:115px;border:1px solid #000;background-image: url(/public/locked_square.png)" class="cross7"></button>`)
            .css('position', 'absolute')
            .css('left', '805px')
            .css('top', '510px');
        let crossButton8 = $(`<button style="width:115px;height:115px;border:1px solid #000;background-image: url(/public/locked_elite.png)" class="cross8"></button>`)
            .css('position', 'absolute')
            .css('left', '920px')
            .css('top', '510px');
        let crossButton9 = $(`<button style="width:115px;height:115px;border:1px solid #000;background-image: url(/public/locked_crown.png)" class="cross9"></button>`)
            .css('position', 'absolute')
            .css('left', '1035px')
            .css('top', '510px');
        this.div.append(crossButton0);
        this.div.append(crossButton1);
        this.div.append(crossButton2);
        this.div.append(crossButton3);
        this.div.append(crossButton4);
        this.div.append(crossButton5);
        this.div.append(crossButton6);
        this.div.append(crossButton7);
        this.div.append(crossButton8);
        this.div.append(crossButton9);

        let leadersTop = $(`<div style="width:100px;height:60px;border:1px solid #000" class="top">Top 10: <br>Shoot 'em Up</div>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '10px')
            .css('text-align', 'center')
            .css('background-color','#efefef');
        let leadersTop1 = $(`<div style="width:100px;height:40px;border:1px solid #000" class="top1">1:</div>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '70px')
            .css('text-align', 'center')
            .css('background-color','gold');
        let leadersTop2 = $(`<div style="width:100px;height:40px;border:1px solid #000" class="top2">2:</div>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '110px')
            .css('text-align', 'center')
            .css('background-color','silver');
        let leadersTop3 = $(`<div style="width:100px;height:40px;border:1px solid #000" class="top3">3:</div>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '150px')
            .css('text-align', 'center')
            .css('background-color','sandybrown');
        let leadersTop4 = $(`<div style="width:100px;height:40px;border:1px solid #000" class="top4">4:</div>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '190px')
            .css('text-align', 'center')
            .css('background-color','#efefef');
        let leadersTop5 = $(`<div style="width:100px;height:40px;border:1px solid #000" class="top5">5:</div>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '230px')
            .css('text-align', 'center')
            .css('background-color','#efefef');
        let leadersTop6 = $(`<div style="width:100px;height:40px;border:1px solid #000" class="top6">6:</div>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '270px')
            .css('text-align', 'center')
            .css('background-color','#efefef');
        let leadersTop7 = $(`<div style="width:100px;height:40px;border:1px solid #000" class="top7">7:</div>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '310px')
            .css('text-align', 'center')
            .css('background-color','#efefef');
        let leadersTop8 = $(`<div style="width:100px;height:40px;border:1px solid #000" class="top8">8:</div>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '350px')
            .css('text-align', 'center')
            .css('background-color','#efefef');
        let leadersTop9 = $(`<div style="width:100px;height:40px;border:1px solid #000" class="top9">9:</div>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '390px')
            .css('text-align', 'center')
            .css('background-color','#efefef');
        let leadersTop10 = $(`<div style="width:100px;height:40px;border:1px solid #000" class="top10">10:</div>`)
            .css('position', 'absolute')
            .css('left', '25px')
            .css('top', '430px')
            .css('text-align', 'center')
            .css('background-color','#efefef');
        leader.append(leadersTop);
        leader.append(leadersTop1);
        leader.append(leadersTop2);
        leader.append(leadersTop3);
        leader.append(leadersTop4);
        leader.append(leadersTop5);
        leader.append(leadersTop6);
        leader.append(leadersTop7);
        leader.append(leadersTop8);
        leader.append(leadersTop9);
        leader.append(leadersTop10);
        this.setup = "done";

        this.updateLeaders(model);
    }

    createNewTarget(number, model, state) {
        if(model.mode == 0 || model.mode == 2){
            let coords = randomCoords();
            let newTarget = new Target(10, "target", coords.x, coords.y, number, model, state);
            this.targets[number] = newTarget;
            this.window.append(newTarget.div);
        } else if (model.mode == 1){
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
            let target_loc_1 = {x: 475, y: 200};
            let target1 = new Target(10, "target_draw", target_loc_1.x, target_loc_1.y, 0, model, "inactive");
            targets.push(target1);
            view.targets = targets;
            window.append(target1.div);
            view.modeName = "Shoot 'em quick";
            if(setup == "done"){
                $(".modeName").html(`${view.modeName}`);
            }
        }
    }

    updateScore(score){
        $(".score").html(`Score: ${Math.floor(score)}`);
    }

    updateHighScore(mode, score){
        if(mode == 0){
            $(".highUp").html(`High Score (Up): ${Math.floor(score.up)}`);
        } else if (mode == 1){
            $(".highCareful").html(`High Score (Careful): ${Math.floor(score.careful)}`);
        } else if (mode == 2){
            $(".highQuick").html(`High Score (Quick): ${Math.floor(score.quick)}`)
        }
    }

    updateLevel(level){
        let lvl = level[0];
        if(lvl >= 0){};
        if(lvl >= 1){
            $(".cross1").css('background-image', `url("/public/button_n00b.png")`);
        } else {$(".cross1").css('background-image', `url("/public/locked_n00b.png")`);};
        if(lvl >= 2){
            $(".cross2").css('background-image', `url("/public/button_arr.png")`);
        } else {$(".cross2").css('background-image', `url("/public/locked_arr.png")`);};
        if(lvl >= 3){
            $(".cross3").css('background-image', `url("/public/button_x.png")`);
        } else {$(".cross3").css('background-image', `url("/public/locked_x.png")`);};
        if(lvl >= 4){
            $(".cross4").css('background-image', `url("/public/button_oldstyle.png")`);
        } else {$(".cross4").css('background-image', `url("/public/locked_oldstyle.png")`);};
        if(lvl >= 5){
            $(".cross5").css('background-image', `url("/public/button_east.png")`);
        } else {$(".cross5").css('background-image', `url("/public/locked_east.png")`);};
        if(lvl >= 6){
            $(".cross6").css('background-image', `url("/public/button_hands.png")`);
        } else {$(".cross6").css('background-image', `url("/public/locked_hands.png")`);};
        if(lvl >= 7){
            $(".cross7").css('background-image', `url("/public/button_square.png")`);
        } else {$(".cross7").css('background-image', `url("/public/locked_square.png")`);};
        if(lvl >= 8){
            $(".cross8").css('background-image', `url("/public/button_elite.png")`);
        } else {$(".cross8").css('background-image', `url("/public/locked_elite.png")`);};
        if(lvl >= 9){
            $(".cross9").css('background-image', `url("/public/button_crown.png")`);
        } else {$(".cross9").css('background-image', `url("/public/locked_crown.png")`);};
    }

    start() {
        let div = $(`<img src="/public/game_start.png" class="game_start" draggable="false">`)
            .css('position','absolute')
            .css('left', "475px")
            .css('top', "150px")
            .css('pointer-events', 'none');
        this.window.append(div);
        setTimeout(function () {$(`.game_start`).remove();}, 1000);
        
    }

    end(mode) {
        if(mode != 2){
            let div = $(`<img src="/public/times_up.png" class="game_end" draggable="false">`)
                .css('position','absolute')
                .css('left', "475px")
                .css('top', "150px")
                .css('pointer-events', 'none');
            this.window.append(div);
            setTimeout(function () {$(`.game_end`).remove()}, 1000);

        }
    }

    draw() {
        let div = $(`<img src="/public/draw.png" class="draw" draggable="false">`)
            .css('position','absolute')
            .css('left', "475px")
            .css('top', "150px")
            .css('pointer-events', 'none');
        this.window.append(div);
        setTimeout(function () {$(`.draw`).remove();}, 1000);
    }

    bang(model) {
        let div = $(`<img src="/public/bang.png" class="bang" draggable="false">`)
            .css('position','absolute')
            .css('left', "375px")
            .css('top', "150px")
            .css('pointer-events', 'none');
        this.window.append(div);
        model.resetting = true;
        setTimeout(function () {$(`.bang`).remove();}, 1000);
        $(`.modeButton`).html("Reset");
        $("#root").on("click", ".modeButton", function(event) { model.resetting = false; model.switchMode(2); $(`.modeButton`).html("Mode:"); $('#root').off("click", '.modeButton');});
    }

    showForm(model, form){
        let view = this;
        if(model.starting == "no" && model.resetting == false && model.loggedIn == false){
            if(form == "sign up"){
                model.resetting = true;
                let div =$(
                    `<form class="form">
                        <div style="height: 200px;width: 200px; background-color: white; border:1px solid #000; margin: auto">
                            <div class="field">
                                <label class="label">Username:</label>
                            <div class="control">
                                <input class="username" type="text" value="${model.user}">
                            </div>
                            </div>
                            <div class="field">
                                <label class="label">Password:</label>
                            <div class="control">
                                <input class="password" type="password" value="">
                            </div>
                            </div>
                            <button style="width:100px;height:50px;border:1px solid #000;-ms-transform: translateX(50%);transform: translateX(50%)" class="submit">Sign Up</button>
                            <button style="width:100px;height:50px;border:1px solid #000;-ms-transform: translateX(50%);transform: translateX(50%)" class="cancel">Cancel</button>
                            <div style="color: red" class="error"></div>
                        </div>
                    </form>`)
                    .css("position", "absolute")
                    .css("left", "400px");
                $("#root").on("click", ".submit", function (event) {view.handleSignUp(model, event)});
                $("#root").on("click", ".cancel", function (event) {model.resetting = false; $(".form").remove()});
                this.window.append(div);
            } else if(form == "log in") {
                model.resetting = true;
                let div =$(
                    `<form class="form">
                        <div style="height: 200px;width: 200px; background-color: white; border:1px solid #000; margin: auto">
                            <div class="field">
                                <label class="label">Username:</label>
                            <div class="control">
                                <input class="username" type="text" value="${model.user}">
                            </div>
                            </div>
                            <div class="field">
                                <label class="label">Password:</label>
                            <div class="control">
                                <input class="password" type="password" value="">
                            </div>
                            </div>
                            <button style="width:100px;height:50px;border:1px solid #000;-ms-transform: translateX(50%);transform: translateX(50%)" class="submit">Log In</button>
                            <button style="width:100px;height:50px;border:1px solid #000;-ms-transform: translateX(50%);transform: translateX(50%)" class="cancel">Cancel</button>
                            <div style="color: red" class="error"></div>
                        </div>
                    </form>`)
                    .css("position", "absolute")
                    .css("left", "400px");
                $("#root").on("click", ".submit", function (event) {view.handleLogIn(model, event)});
                $("#root").on("click", ".cancel", function (event) {model.resetting = false; $(".form").remove()});
                this.window.append(div);
            }
            
        }
    }

    handleSignUp(model, event){
        event.preventDefault();
        let user = event.target.parentNode.childNodes[1].childNodes[3].childNodes[1].value;
        let pass = event.target.parentNode.childNodes[3].childNodes[3].childNodes[1].value;
        let score = [model.score.up, model.score.careful, model.score.quick];
        let level = model.level;
        let crosshair = model.crosshair;
        if(user == null || user == undefined || user == "" || pass == null || pass == undefined || pass == ""){

        } else {
            async function doSignUp(user, pass, score, level, crosshair){
                let result;
                result = await axios ({
                    method: 'post',
                    url: '/userData',
                    data: {
                        username: user,
                        password: pass,
                        score: score,
                        level: level,
                        crosshair: crosshair,
                    }
                }).catch(function(error){
                    let text = error.response.data;
                    $(".error").html(`${text}`);
                });
    
                if (result != undefined){
                    model.resetting = false;
                    model.user = user;
                    model.pass = pass;
                    model.loggedIn = true;
                    $(".logOut").css("background-color","");
                    $(".save").css("background-color","");
                    $(".delete").css("background-color","");
                    $(".signUp").css("background-color","gray");
                    $(".logIn").css("background-color","gray");
                    $(".form").remove();
                }
                
    
            }
            doSignUp(user, pass, score, level, crosshair);
        }
        
    }

    handleLogIn(model, event){
        let view = this;
        event.preventDefault();
        let user = event.target.parentNode.childNodes[1].childNodes[3].childNodes[1].value;
        let pass = event.target.parentNode.childNodes[3].childNodes[3].childNodes[1].value;
        if (pass == ""){
            pass = "ouhwggiuwyt87iugrhgi8gwiuhiuw";
        }
        async function doLogIn(user, pass){
            let result;
            result = await axios ({
                method: 'get',
                url: `/userData/users/${user}/${pass}`,
            }).catch(function(error){
                let text = error.response.data;
                $(".error").html(`${text}`);
            });

            if (result != undefined){
                model.resetting = false;
                let gameState = {
                    user: result.data.username,
                    pass: pass,
                    score: result.data.score,
                    level: result.data.level,
                    crosshair: result.data.crosshair,
                }
                model.loadGame(gameState);
                view.updateHighScore(0, model.score);
                view.updateHighScore(1, model.score);
                view.updateHighScore(2, model.score);
                view.updateScore(0);
                model.loggedIn = true;
                $(".logOut").css("background-color","");
                $(".save").css("background-color","");
                $(".delete").css("background-color","");
                $(".signUp").css("background-color","gray");
                $(".logIn").css("background-color","gray");
                $(".form").remove();
            }
            

        }
        doLogIn(user, pass);
    }

    newBack(){
        let back = randomBackground();
        $(".window").css('background-image', `url("/public/background_${back}.png")`)
    }

    logOut(model){
        if(model.starting == "no" && model.resetting == false && model.loggedIn){
            let view = this;
            this.save(model);
            let gameState = {
                user: "Jesse",
                pass: "",
                score: [0,0,0],
                level: [0,0],
                crosshair: "default",
            }
            model.loadGame(gameState);
            view.updateHighScore(0, model.score);
            view.updateHighScore(1, model.score);
            view.updateHighScore(2, model.score);
            view.updateScore(0);
            $(".logOut").css("background-color","gray");
            $(".save").css("background-color","gray");
            $(".delete").css("background-color","gray");
            $(".signUp").css("background-color","");
            $(".logIn").css("background-color","");
            model.loggedIn = false;
        }
    }

    save(model){
        if(model.starting == "no" && model.resetting == false && model.loggedIn){
            let score = [model.score.up, model.score.careful, model.score.quick];
            let level = model.level;
            let crosshair = model.crosshair;
            async function doSave(user, pass, score, level, crosshair){
                let result;
                result = await axios ({
                    method: 'put',
                    url: `/userData/${user}/${pass}`,
                    data: {
                        score: score,
                        level: level,
                        crosshair: crosshair,
                    }
                }).catch(function(error){
                    let text = error.response.data;
                    alert(text);
                });
    
                if (result != undefined){
                    model.save();
                }
            }
            doSave(model.user, model.pass, score, level, crosshair);
        }
    }

    delete(model){
        if(model.starting == "no" && model.resetting == false && model.loggedIn){
            model.resetting = true;
            let view = this;
            let div = $(`
                <div class="warning" style="height: 200px;width: 200px; background-color: white; border:1px solid #000; margin: auto">
                    <div>Are you sure you want to delete your account?</div>
                    <button style="width:100px;height:50px;border:1px solid #000;-ms-transform: translateX(50%);transform: translateX(50%)" class="yes">Yes</button>
                    <button style="width:100px;height:50px;border:1px solid #000;-ms-transform: translateX(50%);transform: translateX(50%)" class="no">No</button>
                    <div style="color: red" class="error"></div>
                </div>
            `)
                .css("position", "absolute")
                .css("left", "400px");
            $("#root").on("click", ".yes", function (event) {view.handleDelete(model)});
            $("#root").on("click", ".no", function (event) {model.resetting = false; $(".warning").remove()});
            this.window.append(div);
        }
    }

    handleDelete(model){
        let view = this;
        let user = model.user;
        let pass = model.pass;
        async function doDelete(user, pass){
            let result;
            result = await axios ({
                method: 'delete',
                url: `/userData/${user}/${pass}`,
            }).catch(function(error){
                let text = error.response.data;
                $(".error").html(`${text}`);
            });

            if (result != undefined){
                model.resetting = false;
                let gameState = {
                    user: "Jesse",
                    pass: "",
                    score: [0,0,0],
                    level: [0,0],
                    crosshair: "default",
                }
                model.loadGame(gameState);
                view.updateHighScore(0, model.score);
                view.updateHighScore(1, model.score);
                view.updateHighScore(2, model.score);
                view.updateScore(0);
                $(".logOut").css("background-color","gray");
                $(".save").css("background-color","gray");
                $(".delete").css("background-color","gray");
                $(".signUp").css("background-color","");
                $(".logIn").css("background-color","");
                model.loggedIn = false;
                $(".warning").remove();
            }
            

        }
        doDelete(user, pass);
    }

    updateCursor(crosshair){
        $(".window").css('cursor',`url('/public/crosshair_${crosshair}.png') 50.5 50.5, auto`);
    }

    updateLeaders(model){
        let mode = model.mode;
        async function doLeaders(mode){
            let result;
            result = await axios ({
                method: 'get',
                url: `/userData/${mode}`,
            }).catch(function(error){
                let text = error.response.data;
                $(".error").html(`${text}`);
            });
            if (result != undefined){
                let top10 = result.data;
                let type = "";
                if(mode == 0){
                    type = "Up";
                } else if (mode == 1){
                    type = "Careful";
                } else if (mode == 2){
                    type = "Quick";
                }
                $(`.top`).html(`Top 10: <br>Shoot 'em ${type}`);
                $(`.top1`).html(`${top10[0][0].slice(0,11)}<br>${Math.floor(top10[0][1])}`);
                $(`.top2`).html(`${top10[1][0].slice(0,11)}<br>${Math.floor(top10[1][1])}`);
                $(`.top3`).html(`${top10[2][0].slice(0,11)}<br>${Math.floor(top10[2][1])}`);
                $(`.top4`).html(`${top10[3][0].slice(0,11)}<br>${Math.floor(top10[3][1])}`);
                $(`.top5`).html(`${top10[4][0].slice(0,11)}<br>${Math.floor(top10[4][1])}`);
                $(`.top6`).html(`${top10[5][0].slice(0,11)}<br>${Math.floor(top10[5][1])}`);
                $(`.top7`).html(`${top10[6][0].slice(0,11)}<br>${Math.floor(top10[6][1])}`);
                $(`.top8`).html(`${top10[7][0].slice(0,11)}<br>${Math.floor(top10[7][1])}`);
                $(`.top9`).html(`${top10[8][0].slice(0,11)}<br>${Math.floor(top10[8][1])}`);
                $(`.top10`).html(`${top10[9][0].slice(0,11)}<br>${Math.floor(top10[9][1])}`);
            }
        }
        doLeaders(mode);
    }

    updateScoreFinder(event, model){
        event.preventDefault();
        let user = event.target.innerHTML;
        if(user == undefined || user == ""){

        } else {
            async function doScoreGet(user) {
                let result;
                result = await axios ({
                    method: 'get',
                    url: `/userData/scores/${user}`,
                }).catch(function(error){
                    let text = error.response.data;
                    $(".error").html(`${text}`);
                });
                if(result != undefined){
                    $('.scoreUp').html(`Up: ${Math.floor(result.data.score[0])}`);
                    $('.scoreCareful').html(`Careful: ${Math.floor(result.data.score[1])}`);
                    $('.scoreQuick').html(`Quick: ${Math.floor(result.data.score[2])}`);
                }
            }
            doScoreGet(user);
        }
        
    }

    updateXP(level){
        $('.levelMeter').html(`Level: ${level[0]}      XP: ${level[1]}`);
    }
}

class Target {
    constructor(size, type, x, y, number, model, state) {
        this.div = $(`<img src="/public/${type}.png" class="target target${number}" value="${number}" draggable="false">`)
            .css('position','absolute')
            .css('left', (x - 56) + "px")
            .css('top', (y - 56) + "px");
        if(type == "target_draw"){
            this.div.css('left', (x - 100) + "px");
            this.div.css('right', (y - 100) + "px");
        }
        this.number = number;
        this.x = x;
        this.y = y;
        this.model = model;
        this.state = state;
        this.type = type;
        model.onStart((gameState) => {this.update("active")});
        model.onTimeOut((gameState) => {this.update("inactive")});
        if(type == "target_draw"){
            model.onUrDead((gameState) => {this.isShot(x, y)});
        }
    }

    isShot(x, y) {
        if(this.type == "target" && this.state == "active" && circleMath(x,y,this.x, this.y,50)){
            this.model.updateScore(circleMathScore(x,y,this.x,this.y,50), this.type);
            $(`.target${this.number}`).remove();
            return true;
        } else if (this.type == "target_inv" && this.state == "active" && circleMath(x,y,this.x, this.y, 50)){
            this.model.updateScore(100, this.type);
            $(`.target${this.number}`).remove();
            return true;
        } else if (this.type == "target_draw" && this.state == "active" && circleMath(x,y,this.x, this.y, 100)){
            let result = this.model.quickTime(this.model);
            if(result == "ur dead"){
                this.uDied();
            } else {
                this.noU();
                this.model.updateScore(result, this.type);
            }
            return false;
        }
        return false;
        
    }

    update(state){
        if(state == "active"){
            this.state = state;
        } else if (state == "inactive"){
            this.state = state;
        }
    }

    uDied(){
        $(`.target${this.number}`).attr("src", "/public/target_deadeye.png");
    }

    noU(){
        $(`.target${this.number}`).attr("src", "/public/target_poser.png");
    }


}

function circleMath(x,y,cx,cy,r){
    if( ((x-cx) * (x-cx)) + ((y-cy) * (y-cy)) > (r * r)  ) {
        return false;
    } else {
        return true;
    }
}

function circleMathScore(x, y, cx, cy, r){
    return 100 * (1 - (((x-cx) * (x-cx)) + ((y-cy) * (y-cy)))/( r*r ));
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

function randomBackground() {
    let num = Math.floor(Math.random() * 3);
    if(num == 0){
        return "beach";
    } else if (num == 1){
        return "space";
    } else if (num == 2){
        return "badlands";
    }
}