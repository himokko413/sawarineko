// Input event, used for triggering event to parse code from URL
window.inputEvent = new Event('input', {
    bubbles: true,
    cancelable: true,
});

// Function to get custom string value from code part
window.getCustomString = function(input) {
    return input.substring(1, input.indexOf(']'));
}

// Function to get quantity from custom code part
window.getCustomCount = function(input) {
    return input.substring(input.indexOf(']') + 1);
}

// Function to remove leading zeros from number without making 0 an empty string
window.trimLeadingZeros = function(input) {
    let output = input;
    while (input.length > 1) {
        // Don't remove last zero
        output = input.replace(/^0/);
    }
    return output;
}

// Function to attach a listener to multiple nodes at once
window.attachListener = function(elements, event, callback) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(event, callback);
    }
}

// Function to copy a link to the clipboard
window.copyLinkToClipboard = function(e) {
    e.preventDefault();
    if (copy(this.getAttribute('data-url'))) {
        this.classList.add('btn-success');
        this.classList.remove('btn-primary');
        setTimeout(() => {
            this.classList.add('btn-primary');
            this.classList.remove('btn-success');
        }, 1000);
    } else {
        this.classList.add('btn-danger');
        this.classList.remove('btn-primary');
        setTimeout(() => {
            this.classList.add('btn-primary');
            this.classList.remove('btn-danger');
        }, 1000);
    };
}