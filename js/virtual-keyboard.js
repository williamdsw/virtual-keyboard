"use strict";

let content = document.getElementById ("content");

//---------------------------------------------------------------------------------------//
// HELPER FUNCTIONS

window.addEventListener ("load", function ()
{
    let index = 0;
    let keys = document.querySelectorAll (".key");
    for (let key of keys)
    {
        key.setAttribute ("tabindex", index);

        // Click
        key.addEventListener ("click", function ()
        {
            let message = `<p><b>${key.id}</b> clicked!</p>`;
            content.innerHTML = message;
        });

        // Mouse Down
        key.addEventListener ("mousedown", function ()
        {
            let message = `<p>Holding <b>${key.id}</b>!</p>`;
            content.innerHTML = message;
        });

        // Mouse Enter
        key.addEventListener ("mouseenter", function ()
        {
            let message = `<p><b>${key.id}</b> hovered!</p>`;
            content.innerHTML = message;
        });

        index++;
    }

    // Document Keypress
    document.addEventListener ("keypress", function (event)
    {
        paintKey (event, "hold", keys);
    });

    // Document Keyup
    document.addEventListener ("keyup", function (event)
    {
        paintKey (event, "up", keys);
    });
});

/**
 * Paints the key pressed / released
 * @param {Event} event 
 * @param {String} action 
 * @param {HTMLCollection} keys 
 */
function paintKey (event, action, keys)
{
    // Can't capture the "hold" of these...
    let deniedKeys = ["Backspace", "Tab", "CapsLock", "ShiftLeft", "ShiftRight", 
                       "ControlLeft", "MetaLeft", "AltLeft", "AltRight", "MetaRight", 
                       "ContextMenu", "ControlRight", "PrintScreen", "ScrollLock", "Pause",
                       "Insert", "Home", "PageUp", "Delete", "End", 
                       "PageDown", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "NumLock"];

    for (let key of keys)
    {
        if (key.id === event.code)
        {
            // None of denied
            if (deniedKeys.indexOf (key.id) === -1)
            {
                if (action === "hold")
                {
                    key.classList.add ("key-pressed");
                }
                else 
                {
                    key.classList.remove ("key-pressed");
                }
            }
            else
            {
                // Trick to add and remove the class after 100 ms
                const TIMEOUT = 100;
                key.classList.add ("key-pressed");
                let intervalID = setInterval (function ()
                {
                    key.classList.remove ("key-pressed");
                    clearInterval (intervalID);
                }, TIMEOUT);

                if (key.id === "AltRight") { break; }
            }

            // Output
            let message = `<p><b>${event.key} (${event.code})</b> has been pressed!</p>`;
            content.innerHTML = message;
            break;
        }
    }
}