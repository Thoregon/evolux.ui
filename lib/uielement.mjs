/**
 *
 *
 * @author: blukassen
 */

import { Reporter }             from "/evolux.supervise";

import ElementBase              from './behavior/elementbase.js';
import Observer                 from './behavior/observer.js';

export class UIElement extends Reporter(ElementBase(HTMLElement)) {

    constructor() {
        super();
        this.prepare();
        this.applyContent(this.container);
    }

    /**
     * register this element class in the browser
     * @param tag
     */
    static defineElement(tag) {
        if (customElements) {
            customElements.define(tag, this);
        } else {
            universe.logger.warn(`customElements not available, can't register '${tag}'`);
        }
    }

    /**
     * Implement by subclass
     * Fill the container with content for this UI Element
     * @param {HTMLElement} container - the base element for this UI element
     */
    applyContent(container) {
        // implement by subclass
    }

    /*
     * Event support
     */

    /**
     * emit an event on all possible channels.
     *  - exec event handlers attached with 'addEveltListener'
     *  - exec event handler attached with 'elem.on<event> = fn'
     *  - if no 'elem.on' handler get on<event> attribute from the element and exec it
     * @param evtname
     * @param detail
     */
    emit(evtname, detail) {
        try {
            let evt = detail ? new CustomEvent(evtname, { detail }) : new Event(evtname);
            this.dispatchEvent(evt);
            let evton = `on${evtname}`;
            let onhandler = this[evton];
            if (onhandler) {
                onhandler.apply(this);    // sorry no param, but 'this' is the current element. same as with the attribute 'on' handler
            } else {
                // the programmed handler overrides the handler from the attribute
                let onattr = this.getAttribute(evton);
                // this is one of the very rare moments to use 'eval'.
                // evaluates the content from the attribute in the context of this element, no param
                if (onattr) eval.call(this, onattr);
            }
        } catch (e) {
            this.logger.error("can't emit event", e);
        }
    }
}

// todo [OPEN]: define how to observe underlying objects
export class UIObservingElement extends Observer(UIElement) {

}
