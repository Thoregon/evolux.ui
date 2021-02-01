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
const container = document;

// options by convention
const defaultoptions = {};

export default class Router {

    constructor(options) {
        this.options = Object.assign({}, defaultoptions, options);
        runtime.onpopstate = (event) => this.pop(event);
        this._linkElements();
        runtime.history.replaceState({ current: null, title: "No Page" }, "No Page", '');
        container.title = "No Page";
    }

    /*
     * API
     */

    /*async*/ view(route) {
        return new Promise(((resolve, reject) => {
            let ui = this.appregistry.forRoute(route);
            let top = this.envelop;
            let widget = document.createElement(ui.widget.elementTag);  // todo [REFACTOR]: not only widgets!
            top.appendChild(widget);
            // create view model and connect
            widget.addEventListener('exists', (evt) => {
                let vm = universe.aurora.ViewModel();
                vm.view = widget;
                vm.model = universe.observe(ui.app);
                resolve(vm);
            });
        }));
    }

    /**
     *
     */
    /* async */ request(route, event) {
        return new Promise(async (resolve, reject) => {
            let vm = await this.view(route);
            // wait for done
            if (vm.model.on) {
                vm.model.on(event, (evt) => {
                    // remove UI
                    this.envelop.removeChild(vm.east);
                    resolve();
                })
            }
/*
            vm.done = (state) => {
                resolve(state);
                // remove UI
                this.envelop.removeChild(widget);
            }
*/
        }) ;
    }

    get appregistry() {
        return universe.dorifer.appregistry;
    }

    get envelop() {
        return universe.dorifer.appElement;
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

    _linkElements() {
        let elems = container.querySelectorAll('.rlink');
        elems.forEach(elem => elem.onclick = event => {
            this.navigateTo(elem);
            return false;
        });
    }
}
