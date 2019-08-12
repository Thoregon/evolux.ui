/**
 * Constructed style sheet which is reused for all webcomonents.
 * Currently only available for Chrome
 *
 * @author: blukassen
 */

import Style    from "./Style";

export default class ConstructedStyle extends Style {

    createStyle(stylesheet) {
        let css = new CSSStyleSheet();
        css.replaceSync(stylesheet);
        return css;
    }

    applyStyle(shadow, id) {
        let css = this.getStyle(id);
        if (!css) return;
        shadow.adoptedStyleSheets = [css];
    }

}
