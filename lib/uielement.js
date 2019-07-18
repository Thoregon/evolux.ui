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
}

export class UIObservingElement extends Observer(UIElement) {

}
