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

Definition: 
- Browser back button works not like an undo button, deleting the last entered key or removing the 
fresh created item, it is for navigation purpose, displaying the last view or closing a inquiry like the ESC button.
- The 'UNDO' is only implemented as top layer, requesting the undo and displaying the result of the undo. Same applies to 'REDO'.

Wraps 'shadow.adoptedStyleSheets' when not available.

## View Definitions
Are an extension of a 'bounded context' definition specialized to create a UI.

Based on a view model, builder offers a shortcut to create the viewmodel at once

````js
const builder = new ViewBuilder();
const style = '<get the style from where ever>';    // can also be the result of StyleBuilder

const orderTableView = builder.name('Orders')
    .style(style)
    .table()
    .userCustomize(true)        // default
    .viewmodel('Orders')
        // 'interactive' delivers an interactive filter which is operated by the table
        .from(universe.matter.orders.interactive.orderBy('date').desc)    
    .addColumn()
        .name('Num')
        .format('#,##0')
        .from('id')
        .sortable(true)
        // define all possible columns, also those which should not be displayed by default --> .view(false)
        // the user can later customize it
        .view(true)             
    .addColumn()
        .name('Customer')
        from('address.name')
        .sortable(true)
        .view(true)
    .addDetail()
        .from('address.street')
        .from('address.zip')
        .from('address.city')
    .build();
    
const orderItemTableView = builder.name('OrderItem')
    .style(anotherStyle)
    .appendTo(orderTableView)
    .table()
    .viewModel('OrderItem')
        .fromParent('orderitems')
    .addColumn('artNr')

````

### Input Controls
Input component for a property, based on the schema attibute type. 
Default apperence, options for the view definition to change apperance e.g. to dropdown/checkbox.

## UI Element Controls
Stored in Matter to communicate toe current state of UI components between same view or same viewed entities on
multiple UI's, also on different clients.

## ViewObjectMirror
An object directly representing a view model which is a mirror of a (part) bounded context. It is comprised 
of entities, value objects and computations of the context

For cooperative work, it supports modes of syncronisations:
- immediate ... sync on each keystroke. e.g. for editor fields ...
- changed   ... sync each 'field' change, use for setting like models which does not trigger expensive computations
- collected ... collect all changes to the model and apply it in one transaction

This is not only available for model components, but also for UI components enables syncing of UI between users/devices.

With the layered architecture of this, it also possible to combine sync modes for local only and whole universe.
It can also trigger distributed computations e.b. for data cubes.

Get a rendering thread:
-> https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame 

## Standard UI
The settings for a11y, i18n, UI theme and User Settings must be available on every page/screen

System status display (condensed wiht icons) must be available on every page/screen
- sync status indicator
- busy indicator
- background indicator

