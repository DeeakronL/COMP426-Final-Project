import View from '/view.js';
import Model from '/model.js';

let model = new Model();
let view = new View(model);
$('body').append(view.div);
