export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    

    setupTargets(mode){
        console.log(this.view);
        let view = this.view;
        let model = this.model;
        console.log(view.targets);
        //$(`.target`).forEach(element => {
            //if(element.attr("onClick") == undefined) {
        $("#root").on("click", '.target',function(event) {
            view.targets.forEach(element => {
                //console.log(event.pageX, event.pageY);
                if(element.isShot(event.pageX, event.pageY)){
                    view.createNewTarget(element.number, model, "active"); setupTargetsPost(mode, element.number, view, model)
                }
            });
            //if(view.targets[event.target.getAttribute("value")].isShot(event.pageX, event.pageY)){view.createNewTarget(event.target.getAttribute("value"), model, "active"); setupTargetsPost(mode, event.target.getAttribute("value"), view, model)}
        });//view.targets[event.target.value].isShot()});
            //};
        //});
        $("#root").on("click", ".start", function(event) {model.start(model, model.mode)});
        $("#root").on("click", ".quit", function(event) {model.timeOut(model, model.mode)});
        $("#root").on("click", ".leftMode", function(event) {switcher(model, model.mode, "left")});
        $("#root").on("click", ".rightMode", function(event) {switcher(model, model.mode, "right")});
        $("#root").on("click", ".signUp", function(event) {view.showForm(model, "sign up")});
        $("#root").on("click", ".logIn", function(event) {view.showForm(model, "log in")});
        $("#root").on("click", ".logOut", function(event) {view.logOut(model)});
        $("#root").on("click", ".save", function(event) {view.save(model)});
        $("#root").on("click", ".delete", function(event) {view.delete(model)});
    }

    
}

function setupTargetsPost(mode, number, view, model){
    $("#root").off("click", `.target${number}`);
    $()
    $(`#root`).on("click", `.target${number}`, function(event) {
        view.targets.forEach(element => {
            if(element.isShot(event.pageX, event.pageY)){view.createNewTarget(element.number, model, "active"); setupTargetsPost(mode, element.number, view, model)}
        });
        //if(view.targets[number].isShot(event.pageX, event.pageY)){ view.createNewTarget(number, model, "active"); setupTargetsPost(mode, number, view, model)}
    });
}

function switcher(model, mode, direction){
    console.log(mode, direction);
    if(mode == 0 && direction == "left") {
        model.switchMode(2);
    } else if (mode == 0 && direction == "right"){
        model.switchMode(1);
    } else if (mode == 1 && direction == "left"){
        model.switchMode(0);
    } else if (mode == 1 && direction == "right"){
        model.switchMode(2);
    } else if (mode == 2 && direction == "left"){
        model.switchMode(1);
    } else if (mode == 2 && direction == "right"){
        model.switchMode(0);
    }
}