evolux.ui
=========

Webcomponents to build applications with meshups and extensions. 

Provides a 2 tier view definition and a 2 tier model definition.

view definition
- layout, multiple to support different devices
- elements

sub views can be replaced within a view definion by the user or another (view) component

model definition
- view model, bound to the view elements, but can be used to run headless UI tests
- bounded context

Dynamically load the UIComponent of the sub entities.
Extend components by pointing with XPath to the location where to insert the component.
Build generic UIs based on teh sub entities class or schema.

Handles UI States to restore the current UI in case of a reload (frontend) or restart (backend).
When the App is loaded from a service (non independent app) the subpath will be passed to the boot script, which
is responsible to restore the UI state. No server rendering!
The service delivers for all subrequest of a path the same content, but with the instructions where to restart.
The UI state is stored in this case on the users device as well as at the service site. 

Delivers the clients UI state when the page is requestet, in case of a subpath the state is adjustet to display the
content matching the subpath.

    window.onbeforeunload = (event) => {}

Definition: 
- Browser back button works not like an undo button, deleting the last entered key or removing the 
fresh created item, it is for navigation purpose, displaying the last view or closing a inquiry like the ESC button.
- The 'UNDO' is only implemented as top layer, requesting the undo and displaying the result of the undo. Same applies to 'REDO'.

The Registry listens also to DOM changes
- [MutationObserver](https://developer.mozilla.org/de/docs/Web/API/MutationObserver)
- [MutationObserverInit](https://developer.mozilla.org/de/docs/Web/API/MutationObserver#MutationObserverInit) --> childList=true, attributes=true, subtree=true, attributeOldValue=true


Wraps 'shadow.adoptedStyleSheets' when not available.

##View Definitions
Are an extension of a 'bounded context' definition specialized to create a UI.

