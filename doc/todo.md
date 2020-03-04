ToDo
====


- analyze source of functions for conditions of 'disabled' and other properties
    - find out origin dependencies and listen on changes instead of evaluating all functions on the (visible) UI

- for meshups
    - publish UI component API
    - messaging infrastructure between components
    - [support also '<'iframe>'](https://www.heise.de/developer/artikel/iframes-der-heilige-Gral-bei-verteilten-Webanwendungen-4496075.html?seite=3)
        - communication with window.postMessage(), window.addEventListener('message', listener)

- The Registry listens also to DOM changes?
    - [MutationObserver](https://developer.mozilla.org/de/docs/Web/API/MutationObserver)
    - [MutationObserverInit](https://developer.mozilla.org/de/docs/Web/API/MutationObserver#MutationObserverInit) --> childList=true, attributes=true, subtree=true, attributeOldValue=true

Design
======

Great design:
- http://get-d.net/home/about/
