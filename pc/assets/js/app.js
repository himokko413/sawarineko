window.copy = require('clipboard-copy')
window.Base64 = require("js-base64");

import './helpers.js';
import './decoders.js';
import './parser.js';
import './encoders.js';
import './generator.js';

let accordions = document.querySelectorAll('[data-toggle="collapse"]');
for (let i = 0; i < accordions.length; i++) {
    // Attach click event to accordions to switch direction of accordion arrow
    accordions[i].addEventListener('click', function() {
        let img = this.querySelector('img');
        if (this.getAttribute('aria-expanded') === 'false') {
            img.src = img.src.replace('down', 'up');
        } else {
            img.src = img.src.replace('up', 'down');
        }
    })
}