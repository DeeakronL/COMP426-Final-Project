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
        $("#root").on("click", '.target',function(event) {if(view.targets[event.target.getAttribute("value")].isShot(event.pageX, event.pageY)){view.createNewTarget(event.target.getAttribute("value"), model, "active"); setupTargetsPost(mode, event.target.getAttribute("value"), view, model)}});//view.targets[event.target.value].isShot()});
            //};
        //});
        $("#root").on("click", ".menu", function(event) {model.start(model)});
        $("#root").on("click", ".quit", function(event) {model.timeOut()});
    }

    
}

function setupTargetsPost(mode, number, view, model){
    $("#root").off("click", `.target${number}`);
    $()
    $(`#root`).on("click", `.target${number}`, function(event) {if(view.targets[number].isShot(event.pageX, event.pageY)){ view.createNewTarget(number, model, "active"); setupTargetsPost(mode, number, view, model)}});
}