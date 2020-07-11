/**
 *
 *
 * @author: blukassen
 */

import { Reporter }             from "/evolux.supervise";
import { className }            from "/evolux.util";

import ElementBase              from './behavior/elementbase.js';
import { ErrNotImplemented }    from "./errors.mjs";

export class UIElement extends Reporter(ElementBase(HTMLElement)) {

    constructor() {
        super();
        this.prepare();
        this.applyContent(this.container);
        this.refinish();
    }

    /**
     * with this tag, the element is available in the html document
     * override by subclass. mandatory!
     */
    static get elementTag() {
        throw ErrNotImplemented(`${className(this)}.elementTag()`);
    }

    /**
     * register this element class in the browser
     * @param {String}  tag - if not supplied the 'elementTag' of the class is used
     */
    static defineElement(tag) {
        tag = tag || this.elementTag;
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

    refinish() {
        // implment by subclass
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
        let evt = detail ? new CustomEvent(evtname, { detail }) : new Event(evtname);
        this.emitEvent(evtname, evt);
    }

    /**
     * emit an event on all possible listener channels.
     *
     * @param {String}  evtname - name of the event. Don't use spacial chars, because the name will be used also for the 'on<eventname>' register
     * @param {Event}   evt     - event object
     */
    emitEvent(evtname, evt) {
        try {
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

    /**
     * name of the defining element library
     * override by subclasses
     * @return {string}
     */
    static get libraryId() {
        return 'evoluxui';
    }

    eventName(event) {
        return `${this.constructor.libraryId}-element-${event}`
    }

    eventElementName(event) {
        return `${this.constructor.elementTag}-${event}`
    }

    /**
     * support element added event:
     *   <library>-<element>-added  ... event detail contains the element
     *   <library>-element-added    ... event detail contains { event: 'added', tag: '<elements tag name>', element: <this element>}
     *
     * called when the element is attached to the DOM
     */
    connectedCallback() {
        const eventtype = 'added';
        let evt;
        evt = new CustomEvent(this.eventName(eventtype), { detail: { event: eventtype, tag: this.constructor.elementTag, element: this} });
        document.dispatchEvent(evt);
        evt = new CustomEvent(this.eventElementName(eventtype), { detail: this});
        document.dispatchEvent(evt);
    }

    /**
     * support aurora-element-removed events on document.
     * called when the element is disconnected from the DOM
     */
    disconnectedCallback() {
        const eventtype = 'removed';
        let evt;
        evt = new CustomEvent(this.eventName(eventtype), { detail: { event: eventtype, tag: this.constructor.elementTag, element: this} });
        document.dispatchEvent(evt);
        evt = new CustomEvent(this.eventElementName(eventtype), { detail: this});
        document.dispatchEvent(evt);
    }

    /**
     * Invoked when the custom element is moved to a new document.
     */
    adoptedCallback() {
    }

    /**
     * subclass override don't forget to get observedAttributes() from super
     *  return [...super.observedAttributes, 'my-attr'];
     * @return {string[]}
     */
    static get observedAttributes() {
        return ['width', 'height'];
    }

    /**
     * Invoked when one of the custom element's attributes is added, removed, or changed.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        // implement by subclass
    }
}
