// Container for generator form
let generator = document.querySelector('[generator-form]');

// All slider elements for 1-10 scale Code Parts
let sliders = generator.querySelectorAll('[slider]');

// noUiSlider library for sliders
import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";

// char = Character representing the Code Part
// input = JSON index name to fetch from input and pass to encoder
let encoders = [
    {"char": "P", "input": "version"},
    {"char": "M", "input": "status"},
    {"char": "N", "input": "quantity"},
    {"char": "G", "input": "gender"},
    {"char": "S", "input": "form"},
    {"char": "A", "input": "age"},
    {"char": "O", "input": "origin"},
    {"char": "D", "input": "discovery"},
    {"char": "C", "input": "communication"},
    {"char": "Q", "input": "amnesia"},
    {"char": "W", "input": "openness"}
];

// Helper function to add Event listeners to elements
let attachListener = function(elements, event, callback) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(event, callback);
    }
}

// Slider update Event callback to update text above slider to describe the slider's position.
let updateSliderText = function() {
    let value = parseInt(this.get());
    let output = this.target.parentNode.querySelector('[slider-output]');
    let text = this.target.parentNode.querySelector('[slider-text] span[data-value="' + value + '"]').getAttribute("data-text");
    output.textContent = text;
}

// function to run on page load to fetch a clone of each repeatable group type
let cloneGroup = function(attr) {
    let node = generator.querySelector('[' + attr + ']').cloneNode(true);
    let checks = node.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    for (let i = 0; i < checks.length; i++) {
        checks[i].checked = false;
    }
    let textInputs = node.querySelectorAll('input[type="text"]');
    for (let i = 0; i < textInputs.length; i++) {
        textInputs[i].value = "";
    }
    let numberInputs = node.querySelectorAll('input[type="text"].number-field');
    for (let i = 0; i < numberInputs.length; i++) {
        numberInputs[i].value = "1";
    }
    return node;
}

// Delete button Event callback to delete a Group from a Code Part
let deleteGroup = function() {
    let group = this.closest('.card');
    group.parentNode.removeChild(group);
}

// Input Event callback to select the radio button next to an input that has just changed
let selectRadioInput = function() {
    this.closest('label').querySelector('input[type="radio"]').checked = true;
}

// Add button Event callback to insert a new Group for a Code Part
let addGroup = function(e) {
    e.preventDefault();
    let group = this.getAttribute('data-group');
    let clone = fieldGroups[group].cloneNode(true);
    let count = generator.querySelectorAll('[' + group + '-group]').length;

    let elements = clone.querySelectorAll('[name], [id], [for]');
    for (let i = 0; i < elements.length; i++) {
        // Iterate "name", "id", and "for" attributes on all elements with them in the new group
        ["name", "id", "for"].forEach(function(attr) {
            if (elements[i].getAttribute(attr)) {
                elements[i].setAttribute(attr, elements[i].getAttribute(attr).replace(/[0-9]+/g, count));
            }
        });
    }

    // Reset radio buttons in new group
    let radios = clone.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].value === "value") {
            // Radio with value "value" is always default
            radios[i].checked = true;
        }
    }
    
    // Add event listeners for all elements in the Group
    clone.querySelector('[delete]').addEventListener("click", deleteGroup);
    attachListener(clone.querySelectorAll('input[type="number"], input[type="text"], input[type="checkbox"], select'), "click", selectRadioInput);
    attachListener(clone.querySelectorAll('input[type="text"]:not(.number-field)'), "input", inputToLowerCase);
    attachListener(clone.querySelectorAll('input[type="text"].number-field'), "input", inputToInteger);

    // Output the new Group to the DOM
    generator.querySelector('[' + group + '-groups]').appendChild(clone);
}

// Input Event callback to filter custom value inputs to remove invalid characters and make input lowercase
let inputToLowerCase = function() {
    // Get cursor position to reset position after regex replace, otherwise cursor will go to end of field
    let cursorPosition = this.selectionStart;

    let output = this.value.toLowerCase();
    output = output.replace(/[\[\]]/g, "");
    this.value = output;
    
    // Set cursor position to where it was before replace
    this.setSelectionRange(cursorPosition, cursorPosition);
}

// Input Event callback to filter number inputs to only contain a valid integer
let inputToInteger = function() {
    let cursorPosition = this.selectionStart;

    let output = this.value;
    output = output.replace(/[^0-9]/g, ""); // Remove all non-numeric characters
    output = output.replace(/^0+/, ""); // Remove leading zeros
    output = output || "0"; // Set to 0 if output ermpty
    this.value = output;

    this.setSelectionRange(cursorPosition, cursorPosition); // Move cursor back to where it should be
}

let readGeneratorFields = function() {
    let formData = new FormData(generator);
    let data = {};
    for (let pair of formData.entries()) {
        let name = pair[0].match(/([^_\[\]]+)/g); // Get name attribute of field and split it at underscores and square brackets
        data[name[1]] = data[name[1]] || {}; // Create base object for Code Part if it doesn't exist yet
        console.log(name);
        if (name[3]) {
            // Repeatable parts have 4 elements (plurality/headmates, part name, value name, index)
            data[name[1]][name[3]] = data[name[1]][name[3]] || {};
            data[name[1]][name[3]][name[2]] = pair[1];
        } else {
            // Non-repeatable parts have 3 elements (plurality/headmates, part name, value name)
            data[name[1]][name[2]] = pair[1];
        }
    }

    for (let i = 0; i < sliders.length; i++) {
        let slider = sliders[i].noUiSlider; // Get noUiSlider element from slider
        let name = sliders[i].dataset.name.match(/([^_\[\]]+)/g); // Get slider name, future support for indexed sliders if needed
        if (name[1]) {
            // For multiple sliders in same category
            data[name[0]] = data[name[0]] || {};
            data[name[0]][name[1]] = parseInt(slider.get());
        } else {
            // For sliders in their own category
            data[name[0]] = parseInt(slider.get());
        }
    }

    return data;
}

let encodePluralCodeParts = function(fields) {
    let output = [];
    let codePart = "";
    for (let i = 0; i < encoders.length; i++) {
        codePart = ""; // Reset codePart to empty
        switch (encoders[i].char) {
            case "P":
                codePart = encodePluralCodeVersion();
                break;
            case "M":
                codePart = encodePluralityStatus(fields[encoders[i].input]);
                break;
            case "N":
                codePart = encodeHeadmateCount(fields[encoders[i].input]);
                break;
            case "G":
                codePart = encodeGender(fields[encoders[i].input]);
                break;
            case "S":
                codePart = encodeForm(fields[encoders[i].input]);
                break;
            case "A":
                codePart = encodeAge(fields[encoders[i].input]);
                break;
            case "O":
                codePart = encodeOrigin(fields[encoders[i].input]);
                break;
            case "D":
                codePart = encodeDiscoveryRating(fields[encoders[i].input]);
                break;
            case "C":
                codePart = encodeCommunicationRating(fields[encoders[i].input]);
                break;
            case "Q":
                codePart = encodeAmnesiaRating(fields[encoders[i].input]);
                break;
            case "W":
                codePart = encodePluralityOpennessRating(fields[encoders[i].input]);
                break;
        }
        if (codePart !== "") {
            // Add to output array if code generated
            output.push(codePart);
        }
    }
    return output.join(' '); // Join them all together
}

for (let i = 0; i < sliders.length; i++) {
    // Slider init
    noUiSlider.create(sliders[i], {
        start: [1], // Start at 1/10
        range: {
            "min": [0],
            "max": [10]
        },
        step: 1 // Step in whole numbers
    }).on("update", updateSliderText); // Add event to update text above slider on change
}

let fieldGroups = []; // Grab a clone of each repeatable group to use for adding extra groups
["gender", "form", "age", "origin"].forEach(function(e) {
    fieldGroups[e] = cloneGroup(e + "-group");
});

// Event listener to copy link to clipboard
let url = generator.querySelector('[generate-link]');
url.addEventListener('click', copyLinkToClipboard);

// Event listener to generate plural code
generator.querySelector("[generate-code]").addEventListener("click", function(e) {
    e.preventDefault();
    let fields = readGeneratorFields();
    let parts = encodePluralCodeParts(fields);
    generator.querySelector('[code-output]').textContent = parts;

    url.setAttribute('data-url', 'https://' + window.location.hostname + '/?code=' + encodeURIComponent(Base64.encode(parts)));
    url.removeAttribute('disabled');
    url.classList.remove('btn-secondary');
    url.classList.add('btn-primary');
});

// Generator input and button event listener init
attachListener(generator.querySelectorAll('[add-group]'), "click", addGroup);
attachListener(generator.querySelectorAll('[delete]'), "click", deleteGroup);
attachListener(generator.querySelectorAll('input[type="number"], input[type="text"], input[type="checkbox"], select'), "input", selectRadioInput);
attachListener(generator.querySelectorAll('input[type="text"]:not(.number-field)'), "input", inputToLowerCase);
attachListener(generator.querySelectorAll('input[type="text"].number-field'), "input", inputToInteger);
