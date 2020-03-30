/**
 *
 *
 * @author: blukassen
 */



const ElementBase = base => class extends base {

    /**
     * init the element
     */
    prepare() {
        // Create a shadow root
        var shadow  = this.attachShadow({ mode: 'open' });

        // get the base style and element defintion; implement by subclasses
        var style   = this.baseStyle();
        var elem    = this.baseElement();
    }

    /***************************************************************************/
    /* Element creation                                                        */
    /***************************************************************************/

    baseStyle() {

    }

    baseElement() {

    }

    /***************************************************************************/
    /* Element Lifecycle                                                       */
    /***************************************************************************/

    /**
     * called when the element is attached to the DOM
     */
    connectedCallback() {

    }

    /**
     * called when the element is disconnected from the DOM
     */
    disconnectedCallback() {

    }

    /**
     * Invoked when the custom element is moved to a new document.
     */
    adoptedCallback() {

    }

    /**
     * Invoked when one of the custom element's attributes is added, removed, or changed.
     */
    attributeChangedCallback(name, oldValue, newValue) {

    }

};

export default ElementBase;
