/**
 *
 *
 * @author: blukassen
 */
import { className }                from "/evolux.util";

import UIElementBuilder             from "../builder/elementbuilder.mjs";

import { ErrNotImplemented }        from "../errors.mjs";

const builder   = new UIElementBuilder();

const commoncss =
    `       :host {
            display:    block;
            box-sizing: border-box;
            margin:     0;
            padding:    1px;
        /*  border:     1px dotted red; */
            overflow:   auto;
        }
        * {
            box-sizing: border-box;
            padding:    0;
            margin:     0;
        }
        div {
            overflow:   auto;
        }
`;

const ElementBase = base => class extends base {

    /**
     * init the element
     */
    prepare() {
        this._connected = false;

        // Create a shadow root
        var shadow      = this.attachShadow({ mode: 'open' });

        // get the base style and element defintion; implement by subclasses
        var style       = this.elementStyle();
        var elem        = this.buildElement();
        this._container = elem;

        // now fill the elments style and content
        this.applyCommonStyle(shadow);
        if (style) {
            shadow.appendChild(this.createStyleElement(style));
        }
        shadow.appendChild(elem);

        // don't forget content nodes
        if (this.applyChildNodes) this.doApplyChildNodes();
    }

    get container() {
        return this._container;
    }

    get builder() {
        return builder;
    }

    // **** behavior

    show() {
        this.style.visibility = 'visible';
        return this;
    }

    hide() {
        this.style.visibility = 'hidden';
        return this;
    }

    /***************************************************************************/
    /* Element creation                                                        */
    /***************************************************************************/

    /**
     * Implement by subclass
     * @return {String} a css style as string
     */
    elementStyle() {
        throw ErrNotImplemented(`${className(this)}.baseStyle()`);
    }

    /**
     * Implement by subclass
     * @return {HTMLelement} HTML element made with document.createElement(...)
     */
    buildElement() {
        throw ErrNotImplemented(`${className(this)}.baseElement()`);
    }

    /*
     * style processing
     */

    // **** handle common style
    // check if a constructed stylesheet can be used or if the style need to be repeated
    applyCommonStyle(shadow) {
        if (shadow.adoptedStyleSheets) {
            this._applyConstructed(shadow);
        } else {
            this._applyRepeated(shadow);
        }
    }

    _applyConstructed(shadow) {
        let css = this._css;
        if (!css) {
            css = new CSSStyleSheet();
            css.replaceSync(commoncss);
            this._css = css;
        }
        shadow.adoptedStyleSheets = [css];
    }

    _applyRepeated(shadow) {
        shadow.appendChild(this.createStyleElement(commoncss));
    }

    /*
     * element creation
     */

    createElement(tag, options) {
        return document.createElement(tag, options);
    }

    createStyleElement(style) {
        let css = document.createElement('style');
        css.textContent = style;
        return css;
    }

    setAttributes(attrs) {
        if (!attrs) return;
        Object.entries(attrs).forEach(([name, value]) => this.setAttribute(name, value) );
    }

    /*
     * content nodes handling
     */

    /**
     * should child nodes from the document be utilized
     * override by subclass
     *
     * @return {boolean}
     */
    get applyChildNodes() {
        return true;
    }

    /**
     * filter out some child nodes which should not be transferred
     * override by subclass
     *
     * @param childnode
     * @return {boolean}
     */
    applyChildNode(childnode) {
        return true;
    }

    doApplyChildNodes() {
        // wrap text nodes with 'span'
        let container = this.container;
        while (this.childNodes.length) {
            this.doApplyChildNode(this.firstChild, container);
        }
    }

    doApplyChildNode(child, container) {
        if (this.applyChildNode(child)) {
            container.appendChild(child);
        } else {
            this.removeChild(child);
        }
    }

    clear() {
        let container = this.container;
        while (container.childNodes.length) {
            container.removeChild(container.firstChild);
        }
    }


    /*
     * Element Lifecycle
     */

    // todo [OPEN]: define a basic set and hooks for subclasses

    /**
     * called when the element is attached to the DOM
     */
    connectedCallback() {
        this._connected = true;
    }

    /**
     * called when the element is disconnected from the DOM
     */
    disconnectedCallback() {
        this._connected = false;
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

};

export default ElementBase;
