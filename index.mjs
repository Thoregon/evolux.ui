/**
 *
 *
 * @author: blukassen
 */

export { default as Router }                from './lib/router/router.mjs';
export { UIElement, UIObservingElement }    from './lib/uielement.mjs';
export { default as UIElements }            from './lib/uielements.mjs';
export { default as UIElementBuilder }      from './lib/builder/elementbuilder.mjs';

// addons
export { default as QRCode }                from './ext/qrcode.mjs';

import components                           from './@components';
universe.addComponents(components);
