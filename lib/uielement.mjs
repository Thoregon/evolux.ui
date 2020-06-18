/**
 *
 *
 * @author: blukassen
 */

import ElementBase  from './behavior/elementbase.js';
import Observer     from './behavior/observer.js';

export class UIElement extends ElementBase(HTMLElement) {

    constructor() {
        super();
        this.prepare();
        this.applyContent(this.container);
    }


    /**
     * Implement by subclass
     * Fill the container with content for this UI Element
     * @param {HTMLElement} container - the base element for this UI element
     */
    applyContent(container) {
        // implement by subclass
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
}

// todo [OPEN]: define how to observe underlying objects
export class UIObservingElement extends Observer(UIElement) {

}
