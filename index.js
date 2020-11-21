import View from './view.js';
import Model from './model.js';
import Controller from './controller.js';
import $ from "./node_modules/jquery/dist/jquery.js";

/*const express = require('express');

const app = express();

const bodyParser = require('body-parser');

// app.use(bodyParser.json());*/

//var http;
//http.listen(process.env.PORT || 3000);

//$(document).ready()
(function ($) {
    let model = new Model();
    let view = new View(model);
    let controller = new Controller(model, view);
    controller.setupTargets(0);
    $('body').append(view.div);
})
