let parser = document.querySelector('.code-parser');

let url = parser.querySelector('[get-link]');
url.addEventListener('click', copyLinkToClipboard);

let codePartsRegex = [
    {"name": "Plural Code Version", "char": "P", "regex": /([0-9]+\.[0-9]+)/g},
    {"name": "Plural Status", "char": "M", "regex": /(u|n)/g},
    {"name": "Headmate Number", "char": "N", "regex": /((?:[0-9]+(?:\+|~)?)|u)/g},
    {"name": "Genders", "char": "G", "regex": /((?:[mfnu]|\[[^\]]+\])(?:[0-9]*(?:\+?|~)?)?)/g},
    {"name": "Forms", "char": "S", "regex": /((?:[hsxu]|\[[^\]]+\])(?:[0-9]*\+?|~)?)/g},
    {"name": "Age", "char": "A", "regex": /((?:[0-9]+|u)\[(?:[0-9]*\+?|~)?\])/g},
    {"name": "Origin", "char": "O", "regex": /([bintu](?:[0-9]*\+?|~)?)/g},
    {"name": "Discovery / Enumeration Status", "char": "D", "regex": /^(10|[1-9])$/g},
    {"name": "Communication Status", "char": "C", "regex": /^(10|[1-9])$/g},
    {"name": "Amnesia Status", "char": "Q", "regex": /^(10|[1-9])$/g},
    {"name": "Openness about Plural Status", "char": "W", "regex": /([ro](?:10|[1-9]))/g},
];

window.parsePluralCode = function(input) {
    let output = [];
    for (let i = 0; i < codePartsRegex.length; i++) {
         let startPos = input.indexOf(codePartsRegex[i].char);
         if (startPos !== -1) {
            let endPos = startPos;

            while (!input.charAt(endPos + 1).match(/[A-Z]/) && endPos < input.length) {
                endPos++;
            }
            let codePart = input.substring(startPos + 1, endPos).trim();
            let matches = codePart.match(codePartsRegex[i].regex);
            
            output.push(matches);
         } else {
            output.push([]);
         }
    }
    return output;
}

window.decodePluralCodeParts = function(parts) {
    let output = [];
    for (let i = 0; i < codePartsRegex.length; i++) {
        output[i] = [];
        let input = parts[i];
        if (!input) {
            continue;
        }
        for (let x = 0; x < input.length; x++) {
            let value = input[x];
            switch (codePartsRegex[i].char) {
                case "P":
                    output[i].push(decodePluralCodeVersion(value));
                    break;
                case "M":
                    output[i].push(decodePluralityStatus(value));
                    break;
                case "N":
                    output[i].push(decodeHeadmateCount(value));
                    break;
                case "G":
                    output[i].push(decodeGender(value));
                    break;
                case "S":
                    output[i].push(decodeForm(value));
                    break;
                case "A":
                    output[i].push(decodeAge(value));
                    break;
                case "O":
                    output[i].push(decodeOrigin(value));
                    break;
                case "D":
                    output[i].push(decodeDiscoveryRating(value));
                    break;
                case "C":
                    output[i].push(decodeCommunicationRating(value));
                    break;
                case "Q":
                    output[i].push(decodeAmnesiaRating(value));
                    break;
                case "W":
                    output[i].push(decodePluralityOpennessRating(value));
                    break;
            }
        }
    }
    return output;
}


let parseEvent = function() {
    let value = this.value.trim();
    let output = parser.querySelector('[parser-output]');
    let message = parser.querySelector('[parser-message]');

    let outputElements = output.querySelectorAll('h4, p, a');
    for (let i = 0; i < outputElements.length; i++) {
        outputElements[i].parentNode.removeChild(outputElements[i]);
    }

    let parts = window.parsePluralCode(value);
    let results = window.decodePluralCodeParts(parts);
    
    let codeValidate = '';

    if (parts) {
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].length < 1) {
                continue;
            }
            codeValidate += codePartsRegex[i].char;
            for (let x = 0; x < parts[i].length; x++) {
                let filteredPart = parts[i][x];
                for (let a = 0; a < filteredPart.length; a++) {
                    if (filteredPart.charAt(a) === "[" && codePartsRegex[i].char !== "A") {
                        a = filteredPart.indexOf("]", a) + 1;
                    } if (a >= filteredPart.length) {
                        break;
                    }
                    while (
                        (!filteredPart.charAt(a - 1).match(/[0-9]/)) &&
                        filteredPart.charAt(a) == '0' &&
                        (a < filteredPart.length && filteredPart.charAt(a + 1).match(/[0-9]/))
                    ) {
                        filteredPart = filteredPart.slice(0, a) + filteredPart.slice(a + 1);
                        
                    }
                }
                codeValidate += filteredPart;
            }
            codeValidate += ' ';
        }
    }

    codeValidate = codeValidate.trim();
    if (value === codeValidate) {
        message.classList.add('d-none');
        message.textContent = '';
    } else {
        message.classList.remove('d-none');
        message.textContent = 'There are errors in your Plural Code. Try this cleaned code instead: ' + codeValidate;
    }

    if (codeValidate.length > 0) {
        url.setAttribute('data-url', 'https://' + window.location.hostname + '/?code=' + encodeURIComponent(Base64.encode(codeValidate)));
        url.removeAttribute('disabled');
        url.classList.remove('btn-secondary');
        url.classList.add('btn-primary');
    } else {
        url.setAttribute('data-url', '');
        url.setAttribute('disabled', '');
        url.classList.remove('btn-primary');
        url.classList.add('btn-secondary');
    }

    for (let i = 0; i < results.length; i++) {
        if (results[i].length < 1) {
            continue;
        }

        let h4 = document.createElement('h4'); 
        h4.textContent = codePartsRegex[i].name;
        output.appendChild(h4);

        for (let x = 0; x < results[i].length; x++) {
            let p = document.createElement('p');
            p.textContent = results[i][x];
            output.appendChild(p);
        }
    }
}

let input = parser.querySelector('[parser-input]');
input.addEventListener('input', parseEvent);

let urlParams = new URLSearchParams(window.location.search);
window.addEventListener('load', function() {
    let queryCode = urlParams.get('code');
    if (queryCode) {
        input.value = Base64.decode(decodeURIComponent(queryCode));
        input.dispatchEvent(inputEvent);
    }
});
