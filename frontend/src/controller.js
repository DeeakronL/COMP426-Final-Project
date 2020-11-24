export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    

    setupTargets(mode){
        let view = this.view;
        let model = this.model;
        $("#root").on("click", '.target',function(event) {
            view.targets.forEach(element => {
                if(element.isShot(event.pageX, event.pageY)){
                    view.createNewTarget(element.number, model, "active"); setupTargetsPost(mode, element.number, view, model)
                }
            });
        });
        $("#root").on("click", ".start", function(event) {model.start(model, model.mode)});
        $("#root").on("click", ".quit", function(event) {model.timeOut(model, model.mode)});
        $("#root").on("click", ".leftMode", function(event) {switcher(model, model.mode, "left")});
        $("#root").on("click", ".rightMode", function(event) {switcher(model, model.mode, "right")});
        $("#root").on("click", ".signUp", function(event) {view.showForm(model, "sign up")});
        $("#root").on("click", ".logIn", function(event) {view.showForm(model, "log in")});
        $("#root").on("click", ".logOut", function(event) {view.logOut(model)});
        $("#root").on("click", ".save", function(event) {view.save(model)});
        $("#root").on("click", ".delete", function(event) {view.delete(model)});
        $("#root").on("click", ".cross0", function(event) {model.switchCrosshair(0, "default")});
        $("#root").on("click", ".cross1", function(event) {model.switchCrosshair(1, "n00b")});
        $("#root").on("click", ".cross2", function(event) {model.switchCrosshair(2, "arr")});
        $("#root").on("click", ".cross3", function(event) {model.switchCrosshair(3, "x")});
        $("#root").on("click", ".cross4", function(event) {model.switchCrosshair(4, "oldstyle")});
        $("#root").on("click", ".cross5", function(event) {model.switchCrosshair(5, "east")});
        $("#root").on("click", ".cross6", function(event) {model.switchCrosshair(6, "hands")});
        $("#root").on("click", ".cross7", function(event) {model.switchCrosshair(7, "square")});
        $("#root").on("click", ".cross8", function(event) {model.switchCrosshair(8, "elite")});
        $("#root").on("click", ".cross9", function(event) {model.switchCrosshair(9, "crown")});
        $("#root").on("keypress", ".scoreAuto", function(event) {autoComplete(event)});
        $("#root").on("click", ".formScoreAuto", function(event) {view.updateScoreFinder(event, model)});
    }

    
}

function setupTargetsPost(mode, number, view, model){
    $("#root").off("click", `.target${number}`);
    $()
    $(`#root`).on("click", `.target${number}`, function(event) {
        view.targets.forEach(element => {
            if(element.isShot(event.pageX, event.pageY)){view.createNewTarget(element.number, model, "active"); setupTargetsPost(mode, element.number, view, model)}
        });
    });
}

function switcher(model, mode, direction){
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

function autoComplete(event){
    if(event.which == '13'){
        event.preventDefault();
    }
    let value = event.target.value + event.originalEvent.key;
    async function doAutoComplete(filter){
        let result;
        result = await axios ({
            method: 'get',
            url: `/userData/filter/${filter}`,
        }).catch(function(error){
            let text = error.response.data;
            $(".error").html(`${text}`);
        });
        if(result != undefined){
            $(".formScoreAuto").html(result.data[0]);
        }
    }
    doAutoComplete(value);
    
}