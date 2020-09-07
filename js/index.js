'use strict';

// FIELDS

const unholdableKeys = [
    'Backspace', 'Tab', 'CapsLock', 'ShiftLeft', 'ShiftRight', 
    'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'MetaRight', 
    'ContextMenu', 'ControlRight', 'PrintScreen', 'ScrollLock', 'Pause',
    'Insert', 'Home', 'PageUp', 'Delete', 'End', 
    'PageDown', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'NumLock'
];

const pressedKeys = [];

// HELPER FUNCTIONS

window.addEventListener ('DOMContentLoaded', () => {

    // Elements References
    const content = document.querySelector ('#content');
    const keys = document.querySelectorAll ('.key');
    const keyHistory = document.querySelector('#keyHistory');

    // Inner Functions 

    /**
     * Paints the key pressed / released
     */
    function paintKey (event, action, keys) {
        for (let key of keys) {
            if (key.id === event.code) {

                if (unholdableKeys.indexOf (key.id) === -1) {
                    if (action === 'hold') {
                        key.classList.add ('key-pressed');
                    }
                    else {
                        key.classList.remove ('key-pressed');
                    }
                }
                else {
                    // Trick to add and remove the class after 100 ms
                    const TIMEOUT = 100;
                    key.classList.add ('key-pressed');
                    const intervalID = setInterval (() => {
                        key.classList.remove ('key-pressed');
                        clearInterval (intervalID);
                    }, TIMEOUT);

                    if (key.id === 'AltRight') { 
                        break; 
                    }
                }

                // Output
                const message = `<p><b> ${event.key} (${event.code})</b> has been pressed! </p>`;
                content.innerHTML = message;
                break;
            }
        }
    }

    /**
     * Adds the key to history and renders the same
     */
    function addKeyAndRenderHistory(event) {
        pressedKeys.push(event.key !== ' ' ? event.key : event.code);
        keyHistory.innerHTML = '';
        pressedKeys.forEach(key => keyHistory.innerHTML += `<span> ${key} </span>`);
    }



    // Event Listeners

    keys.forEach (key => {
        key.setAttribute ('tabindex', -1);
        key.addEventListener ('click', () => content.innerHTML = `<p><b> ${key.id} </b> clicked! </p>`);
        key.addEventListener ('mousedown', () => content.innerHTML = `<p> Holding <b> ${key.id} </b> ! </p>`);
        key.addEventListener ('mouseenter', () => content.innerHTML = `<p><b> ${key.id} </b> hovered! </p>`);
    });

    document.addEventListener ('keypress', (event) => paintKey (event, 'hold', keys));
    document.addEventListener ('keyup', (event) => paintKey (event, 'up', keys));
    document.addEventListener ('keyup', (event) => addKeyAndRenderHistory(event));
});
