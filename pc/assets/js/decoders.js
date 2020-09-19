window.decodePluralCodeVersion = function(input) {
    return 'This code is using version ' + input + ' of the Plural Code.';
}

window.decodePluralityStatus = function(input) {
    if (input === "n") {
        return 'I am not plural.';
    } else if (input === "u") {
        return 'We are plural.';
    }
}

window.decodeHeadmateCount = function(input) {
    let text = '';
    let areIs = 'is ';
    let atLeast = '';
    let s = '';
    let ourMy = 'my';
    let count = input;

    if (count === "~") {
        text = 'There are an unknown number of headmates in our system.';
    } else {
        if (count.charAt(count.length - 1) === "+") {
            count = count.substring(0, count.length - 1);
            atLeast = 'at least ';
        }

        if (count.length < 1) {
            count = '1';
        }

        count = parseInt(count);
        if (count != 1) {
            areIs = 'are ';
            s = 's';
        }
        if (count > 1) {
            ourMy = 'our';
        }
        text = 'There ' + areIs + atLeast + count + ' headmate' + s + ' in ' + ourMy + ' system.';
    }
    return text;
}

window.decodeGender = function(input) {
    let areIs = 'is ';
    let atLeast = '';
    let s = '';
    let append = '';

    let count = input.substring(1);
    if (count.charAt(count.length - 1) == "+") {
        atLeast = 'at least ';
        count = count.substring(0, count.indexOf('+'));
    }

    let char = input.charAt(0);

    switch (char) {
        case "m":
            value = 'male ';
            break;
        case "f":
            value = 'female ';
            break;
        case "n":
            value = 'non-binary ';
            break;
        case "u":
            value = '';
            append = ' with an unknown gender';
            break;
        case "[":
            value = getCustomString(input) + ' ';
            break;
    }

    if (char === "[") {
        count = getCustomCount(count);
        console.log(count);
    }
    if (count.length < 1) {
        count = '1';
    }
    if (count === "~") {
        areIs = 'are ';
        s = 's';
        count = 'an unknown number of ';
    } else {
        count = parseInt(count);
        if (count != 1) {
            areIs = 'are ';
            s = 's';
        }

        count += ' ';
    }
    return 'There ' + areIs + atLeast + count + value + 'headmate' + s + append + '.';
}

window.decodeForm = function(input) {
    let areIs = 'is ';
    let atLeast = '';
    let s = '';
    let append = '';

    let count = input.substring(1);
    if (count.charAt(count.length - 1) == "+") {
        atLeast = 'at least ';
        count = count.substring(0, count.indexOf('+'));
    }

    let char = input.charAt(0);

    switch (char) {
        case "h":
            value = 'human ';
            break;
        case "s":
            value = '';
            append = ' with a spiritual form';
            break;
        case "x":
            value = 'shapeshifter ';
            break;
        case "u":
            value = '';
            append = ' with an unknown form';
            break;
        case "[":
            value = getCustomString(input) + ' ';
            count = getCustomCount(input);
            break;
    }

    if (count.length < 1) {
        count = '1';
    }
    if (count === "~") {
        areIs = 'are ';
        s = 's';
        count = 'an unknown number of';
    } else {
        count = parseInt(count);
        if (count != 1) {
            areIs = 'are ';
            s = 's';
        }
    }
    return 'There ' + areIs + atLeast + count + ' ' + value + 'headmate' + s + append + '.';
}

window.decodeAge = function(input) {
    let areIs = 'is ';
    let atLeast = '';
    let s = '';
    let append = '';

    let value = input.substring(0, input.indexOf('['));

    let count = input.substring(input.indexOf('[') + 1, input.indexOf(']'));
    if (count.charAt(count.length - 1) == "+") {
        atLeast = 'at least ';
        count = count.substring(0, count.indexOf('+'));
        if (count.length < 1) {
            count = '1';
        }
    }

    if (count.match(/^\d+$/)) {
        if (count != 1) {
            areIs = 'are ';
            s = 's';
        }
    } else if (count === "~") {
        areIs = 'are ';
        count = 'an unknown number of';
        s = 's';
    }

    if (value.match(/^\d+$/)) {
        value += ' year-old '
    } else if (value === "u") {
        value = '';
        append = ' with an unknown age'
    }
    return 'There ' + areIs + atLeast + count + ' ' + value + 'headmate' + s + append + '.';
}

window.decodeOrigin = function(input) {
    let areIs = 'is ';
    let atLeast = '';
    let s = '';
    let append = '';
    let value = '';

    let count = input.substring(1);
    if (count.charAt(count.length - 1) == "+") {
        atLeast = 'at least ';
        count = count.substring(0, count.indexOf('+'));
    }

    let char = input.charAt(0);

    if (count.length < 1) {
        count = '1';
    }

    switch (char) {
        case "b":
            if (parseInt(count) === 1) {
                append = ' that was';
            } else {
                append = ' that were';
            }
            append += ' born with the body';
            break;
        case "i":
            value = 'intentionally created ';
            break;
        case "n":
            value = 'natural ';
            break;
        case "t":
            value = 'traumagenic ';
            break;
        case "u":
            append = ' of unknown origin';
            break;
    }

    if (count === "~") {
        areIs = 'are ';
        s = 's';
        count = 'an unknown number of';
    } else {
        count = parseInt(count);
        if (count != 1) {
            areIs = 'are ';
            s = 's';
        }
    }
    return 'There ' + areIs + atLeast + count + ' ' + value + 'headmate' + s + append + '.';
}

window.decodeDiscoveryRating = function(input) {
    let rating = parseInt(input);
    let value = '';

    switch (rating) {
        case 1:
            value = 'completely non-existent (1/10)';
            break;
        case 2:
            value = 'almost zero (2/10)';
            break;
        case 3:
            value = 'very low (3/10)';
            break;
        case 4:
            value = 'low (4/10)';
            break;
        case 5:
            value = 'average (5/10)';
            break;
        case 6:
            value = 'decent (6/10)';
            break;
        case 7:
            value = 'reasonably complete (7/10)';
            break;
        case 8:
            value = 'mostly complete (8/10)';
            break;
        case 9:
            value = 'almost fully complete (9/10)';
            break;
        case 10:
            value = 'fully complete (10/10)';
            break;
    }
    return 'I would rate my level of headmate discovery/enumeration as ' + value + '.';
}

window.decodeCommunicationRating = function(input) {
    let rating = parseInt(input);
    let value = '';

    switch (rating) {
        case 1:
            value = 'completely non-existent (1/10)';
            break;
        case 2:
            value = 'almost zero (2/10)';
            break;
        case 3:
            value = 'very low (3/10)';
            break;
        case 4:
            value = 'low (4/10)';
            break;
        case 5:
            value = 'average (5/10)'
            break;
        case 6:
            value = 'decent (6/10)';
            break;
        case 7:
            value = 'reasonably good (7/10)';
            break;
        case 8:
            value = 'very good (8/10)';
            break;
        case 9:
            value = 'almost perfect (9/10)';
            break;
        case 10:
            value = 'perfect (10/10)';
            break;
    }
    return 'I would rate our level of communication as ' + value + '.';
}

window.decodeAmnesiaRating = function(input) {
    let rating = parseInt(input);
    let value = '';

    switch (rating) {
        case 1:
            value = 'no';
            break;
        case 2:
            value = 'almost no';
            break;
        case 3:
            value = 'very few';
            break;
        case 4:
            value = 'some';
            break;
        case 5:
            value = 'about half of all'
            break;
        case 6:
            value = 'a fair amount of';
            break;
        case 7:
            value = 'a large amount of';
            break;
        case 8:
            value = 'most';
            break;
        case 9:
            value = 'almost all';
            break;
        case 10:
            value = 'all';
            break;
    }
    return 'I remember ' + value + " events that occur while I'm switched out (" + rating + '/10).';
}

window.decodePluralityOpennessRating = function(input) {
    let rating = parseInt(input.substring(1));
    let char = input.charAt(0);
    let value = '';
    let space = '';

    switch (rating) {
        case 1:
            value = 'not open at all';
            break;
        case 2:
            value = 'highly secretive';
            break;
        case 3:
            value = 'secretive';
            break;
        case 4:
            value = 'very selective about who knows';
            break;
        case 5:
            value = 'rather selective about who knows';
            break;
        case 6:
            value = 'a bit selective about who knows';
            break;
        case 7:
            value = 'fairly open';
            break;
        case 8:
            value = 'open to most people';
            break;
        case 9:
            value = 'open to almost everyone';
            break;
        case 10:
            value = 'completely open to everyone';
            break;
    }

    if (char === 'r') {
        space = 'in real life';
    } else if (char === 'o') {
        space = 'online';
    }

    return 'I am ' + value + ' about my status as plural to people ' + space + ' (' + rating + '/10).';
}
