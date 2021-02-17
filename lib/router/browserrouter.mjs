/**
 * A simple UI router
 *
 * todo [REFACTOR]:
 *  - make it more mature
 *
 * @author: blukassen
 */

// todo: replace by a dispatchers from 'evolux.universe' which
const runtime   = globalThis;
const container = runtime.document;

// options by convention
const defaultoptions = {};

export default class BrowserRouter {

    constructor(options) {
        this.options = Object.assign({}, defaultoptions, options);
        runtime.onpopstate = (event) => this.pop(event);
        this.linkElements();
        runtime.history.replaceState({ current: null, title: "No Page" }, "No Page", '');
        container.title = "No Page";
    }

    /*
     * route handling
     */

    pop(event) {
        console.log(event);
        let state   = event.state;
        if (!state) return false;
        let id      = state.current;
        let title   = state.title;
        this.toPage(id, title);
        return true;
    }

    add(route, view) {

    }

    toPage(id, title) {
        let elems = container.querySelectorAll('div.content>div');
        elems.forEach(elem => elem.style.visibility = (elem.id === id) ? 'visible' : 'hidden');
        container.title = title;
        return false;
    }

    navigateTo(elem) {
        let tgt     = elem.href;
        this.restore(tgt);
    }

    restore(url) {
        let id    = this._extractId(url);
        let title = `Page ${id}`;

        this.toPage(id, title);
        runtime.history.pushState({ current: id, title: title }, title, id);
    }

    _extractId(url) {
        let parts   = url.split("/");
        if (parts.length < 4) return;
        let id      = parts[3];
        return id;
    }

    linkElements() {
        let elems = container.querySelectorAll('.rlink');
        elems.forEach(elem => elem.onclick = event => {
            this.navigateTo(elem);
            return false;
        });
    }
}
