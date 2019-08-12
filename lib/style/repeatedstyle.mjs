/**
 *  Style sheet which will be repeated for each webcomponent
 *
 * @author: blukassen
 */

import Style    from "./Style";

export default class RepeatedStyle extends Style {

    applyStyle(shadow, id) {
        let styledef = this.getStyle(id);
        if (!styledef) return;
        let style = document.createElement('style');
        style.textContent = styledef;
        shadow.appendChile(style);
    }

}
