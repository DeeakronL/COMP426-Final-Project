export default class View {
    constructor(model) {
        this.div = <div></div>;
        let window = $(`<div class=window></div>`)
            .css('position','relative')
            .css('width',  1000 + "px")
            .css('height', 50 + "px")
            .css('margin','auto')
            .css('background-color','gray');
    }
}