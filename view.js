export default class View {
    constructor(model) {
        this.div = $(`<div></div>`)
            .css('cursor',"url('/crosshair_default.png') 50.5 50.5, auto");
        let window = $(`<div class=window></div>`)
            .css('position','relative')
            .css('width',  1000 + "px")
            .css('height', 500 + "px")
            .css('margin','auto')
            .css('background-color','gray')
            .css('background-image', 'url("/background_test.png")');
        this.div.append(window);

        let target_loc_1 = {};
        target_loc_1.x = Math.random()*1000;
        target_loc_1.y = Math.random()*500;

        let target_loc_2 = {};
        target_loc_2.x = Math.random()*1000;
        target_loc_2.y = Math.random()*500;

        let target_loc_3 = {};
        target_loc_3.x = Math.random()*1000;
        target_loc_3.y = Math.random()*500;
        let target1 = $(`<img src="/target.png">`)
            .css('position','relative')
            .css('left', (target_loc_1.x - 50) + "px")
            .css('top', (target_loc_1.y - 50) + "px");
        let target2 = $(`<img src="/target.png">`)
            .css('position','relative')
            .css('left', (target_loc_2.x - 50) + "px")
            .css('top', (target_loc_2.y - 50) + "px");
        let target3 = $(`<img src="/target.png">`)
            .css('position','relative')
            .css('left', (target_loc_3.x - 50) + "px")
            .css('top', (target_loc_3.y - 50) + "px");
        window.append(target1);
        window.append(target2);
        window.append(target3);

        //let ui = $(`<div></div>`);
        let button1 = $(`<div style="width:100px;height:50px;border:1px solid #000">Menu</div>`)
            .css('position', 'relative')
            .css('left', '0px')
            .css('top', '0px');
        let button2 = $(`<div style="width:100px;height:50px;border:1px solid #000">Quit Game</div>`)
            .css('position', 'relative')
            .css('left', '0px')
            .css('top', '100px');
        window.append(button1);
        window.append(button2);
    }
}