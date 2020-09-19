window.encodePluralCodeVersion = function(input) {
    return "P1.0"; // Current version is 1.0
}

window.encodePluralityStatus = function(input) {
    return "M" + input.value; // Simple, u for plural, n for not plural.
}

window.encodeHeadmateCount = function(input) {
    let output = "N";
    if (input.number === "") {
        return ""; // "Prefer not to answer" selected
    }

    if (input.number === "value") {
        if (input.count.length && input.count > 0) {
            output += input.count; // Headmate number always printed, even if 1
        }
        if (input.atleast === "+") {
            output += input.atleast; // "At least" selected
        }
    } else if (input.number === "~") {
        output += input.number; // "Unknown number" selected
    } else {
        return ""; // Invalid input somehow??
    }

    if (output.length === 1) {
        return ""; // Output only contains starting letter, return no result
    }

    return output;
}

window.encodeGender = function(input) {
    if (typeof input === 'undefined') {
        return "";
    }

    let output = "G";
    let length = Object.keys(input).length;
    if (!length) {
        return "";
    }

    for (let i = 0; i < length; i++) {
        let part = "";
        if (input[i].type === "value") {
            part += input[i].preset; // Preset value from drop-down selected
        } else if (input[i].type === "[") {
            part += "[" + input[i].value + "]"; // Custom value from text box selected
        } else if (input[i].type === "u") {
            part += input[i].type; // Unknown selected
        } else {
            continue; // How did you get here?
        }

        if (input[i].number === "value") {
            if (input[i].count.length && input[i].count != 1) {
                part += input[i].count; // Print number if greater than 1
            }
            if (input[i].atleast === "+") {
                part += input[i].atleast;
            }
        } else if (input[i].number === "~") {
            part += input[i].number;
        } else {
            continue;
        }
        output += part;
    }

    if (output.length === 1) {
        return "";
    }

    return output;
}

window.encodeForm = function(input) {
    if (typeof input === 'undefined') {
        return "";
    }

    let output = "S";
    let length = Object.keys(input).length;
    if (!length) {
        return "";
    }

    for (let i = 0; i < length; i++) {
        let part = "";
        if (input[i].type === "value") {
            part += input[i].preset;
        } else if (input[i].type === "[") {
            part += "[" + input[i].value + "]";
        } else if (input[i].type === "u") {
            part += input[i].type;
        } else {
            continue;
        }

        if (input[i].number === "value") {
            if (input[i].count.length && input[i].count != 1) {
                part += input[i].count; // Print number if greater than 1
            }
            if (input[i].atleast === "+") {
                part += input[i].atleast;
            }
        } else if (input[i].number === "~") {
            part += input[i].number;
        } else {
            continue;
        }
        output += part;
    }

    if (output.length === 1) {
        return "";
    }

    return output;
}

window.encodeAge = function(input) {
    if (typeof input === 'undefined') {
        return "";
    }

    let output = "A";
    let length = Object.keys(input).length;
    if (!length) {
        return "";
    }

    for (let i = 0; i < length; i++) {
        let part = "";
        if (input[i].type === "value") {
            part += input[i].value;
        } else if (input[i].type = "u") {
            part += input[i].type;
        } else {
            continue;
        }

        if (input[i].number === "value") {
            if (!input[i].count.length) {
                input[i].count = 1;
            }
            part += "[" + input[i].count;
            if (input[i].atleast === "+") {
                part += input[i].atleast;
            }
            part +=  "]";
        } else if (input[i].number === "~") {
            part += "[" + input[i].number + "]";
        } else {
            continue;
        }
        output += part;
    }

    if (output.length === 1) {
        return "";
    }

    return output;
}

window.encodeOrigin = function(input) {
    if (typeof input === 'undefined') {
        return "";
    }

    let output = "O";
    let length = Object.keys(input).length;
    if (!length) {
        return "";
    }

    for (let i = 0; i < length; i++) {
        let part = "";
        if (input[i].type === "value") {
            part += input[i].option;
        } else if (input[i].type = "u") {
            part += input[i].type;
        } else {
            continue;
        }

        if (input[i].number === "value") {
            if (input[i].count.length && input[i].count != 1) {
                part += input[i].count;
            }
            if (input[i].atleast === "+") {
                part += input[i].atleast;
            }
        } else if (input[i].number === "~") {
            part += input[i].number;
        } else {
            continue;
        }
        output += part;
    }

    if (output.length === 1) {
        return "";
    }

    return output;
}

window.encodeDiscoveryRating = function(input) {
    let output = "D";
    if (input < 1) {
        return ""; // Prefer not to answer selected, return empty output
    }

    return output + input; // Simple, output is input.
}

window.encodeCommunicationRating = function(input) {
    let output = "C";
    if (input < 1) {
        return "";
    }

    return output + input;
}

window.encodeAmnesiaRating = function(input) {
    let output = "Q";
    if (input < 1) {
        return "";
    }

    return output + input;
}

window.encodePluralityOpennessRating = function(input) {
    let output = "W";
    [['irl', 'r'], ['online', 'o']].forEach(function(value) {
        // Loop through both sliders
        if (input[value[0]] < 1) {
            return;
        }
        output += value[1] + input[value[0]];
    });

    if (output.length === 1) {
        return "";
    }

    return output;
}
