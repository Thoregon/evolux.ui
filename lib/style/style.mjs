/**
 *  Base class for styles
 *
 * @author: blukassen
 */

export default class Style {

    constructor() {
        this._styles = {};
    }

    defineStyle(id, stylesheet) {
        this._styles[id] = this.createStyle(stylesheet);
    }

    createStyle(stylesheet) {
        return stylesheet;
    }

    getStyle(id) {
        return this,this._styles[id];
    }

    applyStyle(shadow, id) {
        throw Error("method 'applyStyle' not implemented");
    }

}
