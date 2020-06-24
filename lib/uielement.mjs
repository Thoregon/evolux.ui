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
     * emit an event on all possible listener channels.
     *  - exec event handlers attached with 'addEventListener'. event.detail contains the parameter you passed
     *      e.g. element.addEventListener('event', (evt) => console.log(evt.detail));
     *  - exec event handler attached with 'elem.on<eventname> = fn', no param but 'this' is the element. Make the result or the reason available
     *      e.g. element.onevent = () => { console.log(this.eventresult); }
     *  - if no 'elem.on<eventname>' handler get on<event> attribute from the element and exec it, 'this' is the element
     *      &lt;element onevent="console.log(this.eventresult);"&gt;
     *
     * @param {String}  evtname - name of the event. Don't use spacial chars, because the name will be used also for the 'on<eventname>' register
     * @param {Any}     detail  - an arbitrary object as event parameter.
     */
    emit(evtname, detail) {
        try {
            let evt = detail ? new CustomEvent(evtname, { detail }) : new Event(evtname);
            this.dispatchEvent(evt);       // all attached with 'addEventListener'
            let evton = `on${evtname}`;
            let onhandler = this[evton];
            if (onhandler) {
                onhandler.apply(this);    // sorry no param, but 'this' is the current element. same as with the attribute 'on' handler
            } else {
                // the programmed handler overrides the handler from the attribute
                let onattr = this.getAttribute(evton);
                // don't use 'eval'. the context can't be set to the element!
                // evaluates the content from the attribute in the context of this element, no param
                if (onattr) new Function(onattr).call(this);
            }
        } catch (e) {
            this.logger.error("can't emit event", e);
        }
    }
}

// todo [OPEN]: define how to observe underlying objects
export class UIObservingElement extends Observer(UIElement) {

}
