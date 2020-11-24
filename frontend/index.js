import View from './src/view.js';
import Model from './src/model.js';
import Controller from './src/controller.js';

$(document).ready(function () {
    let model = new Model();
    let view = new View(model);
    let controller = new Controller(model, view);
    controller.setupTargets(0);
    $('body').append(view.div);
})
