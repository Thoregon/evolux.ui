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
    }

    static define(tag, element) {
        if (customElements) {
            customElements.define(tag, element);
        } else {
            universe.logger.warn(`[UIElement] customElements not available, can't register '${tag}'`);
        }
    }
}

export class UIObservingElement extends Observer(UIElement) {

}
