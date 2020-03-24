/**
 *
 *
 * @author: blukassen
 */

export { default as Router }            from './lib/router/router.mjs';
export { default as UIElement }         from './lib/uielement.mjs';
export { default as UIElements }        from './lib/uielements.mjs';
export { default as UIElementBuilder }  from './lib/builder/elementbuilder.mjs';

import components                       from './@components';
universe.addComponents(components);
