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
/*
        div {
            overflow:   auto;
        }
*/
`;

const ElementBase = base => class extends base {

    /**
     * init the element
     */
    async prepare() {
        // this._connected = false;
        // this._iinit++;
        // if (this._iinit > 0) console.log(`${this.elemId} was initialized: ${this._iinit}`);
        // Create a shadow root
        let shadow      = this.shadowRoot || this.attachShadow({ mode: 'open' });

        // get the base style and element defintion; implement by subclasses
        let style       = await this.elementStyle();
        let elem        = this.buildElement();
        this._container = elem;
        elem.uibase     = this;

        // now fill the elments style and content
        this.applyCommonStyle(shadow);
        if (style) {
            shadow.appendChild(this.createStyleElement(style));
        }
        shadow.appendChild(elem);
    }

    get container() {
        return this._container;
    }

/*
    async refreshContainer(fn) {
        let old = this._container;
        try {
            this._container = this.buildElement();
            await fn();
            old.remove();
            this.shadowRoot.appendChild(this._container);
        } catch (e) {
            console.log("Error during container refresh:", e.stack ? e.stack : e.message);
        }
    }
*/

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
     * use a div as default element
     * override by subclass
     * @return {HTMLelement} HTML element made with document.createElement(...)
     */
    buildElement() {
        return this.builder.newDiv();
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

    applyChildElements(container) {
        if (!this.applyChildNodes) return;
        let elem = container.querySelector('*[aurora-slot="main"]') || container;
        this.doApplyChildNodes(elem);
    }

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

    doApplyChildNodes(container) {
        // wrap text nodes with 'span'
        [...this.children].forEach(child => this.doApplyChildNode(child, container))
    }

    doApplyChildNode(child, container) {
        if (this.applyChildNode(child)) {
            const item = this.alterChild(child);
            if (item) container.appendChild(child);
        } else {
            container.removeChild(child);
        }
    }

    alterChild(child) {
        return child;
    }

    clear() {
        let container = this.container;
        while (container.childNodes.length) {
            container.removeChild(container.firstChild);
        }
    }

};

export default ElementBase;
