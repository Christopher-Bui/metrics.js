const greenSquare = '![#c5f015](https://placehold.it/15/c5f015/000000?text=+)'
const yellowSquare = '![#fff66](https://placehold.it/15/fff66/000000?text=+)'
const redSquare = '![#f03c15](https://placehold.it/15/f03c15/000000?text=+)'

function prependColor(value) {
    const [delta, unit] = value.split(' ');

    if (delta == 0) {
        return yellowSquare + ' ' + delta;
    } else if (delta < 0) {
        // Negative delta is positive result e.g. we made it faster or smaller
        return greenSquare + ' ' + delta;
    } else {
        return redSquare + ' ' + delta;
    }
}

function computeDelta(controlValue, prValue) {
    return prValue - controlValue;
}

function formatBytes(bytes) {
    return Math.ceil(bytes / 1000) + ' kb';
}

function formatMillis(millis) {
    return Math.ceil(millis) + ' ms';
}

function formatNodes(nodes) {
    return Math.ceil(nodes) + ' nodes';
}

function makeFormatTableRowFn(fieldMappings, fieldFormatters) {
    return function(field, control, pr) {
        const fieldName = fieldMappings[field];

        let fieldFormatter = (x) => x;

        if (fieldFormatters[field]) {
            fieldFormatter = fieldFormatters[field];
        }

        const controlDesktopValue = fieldFormatter(control.desktop[field]);
        const prDesktopValue = fieldFormatter(pr.desktop[field]);
        const desktopDelta = prependColor(fieldFormatter(computeDelta(control.desktop[field], pr.desktop[field])));

        const controlMobileValue = fieldFormatter(control.mobile[field]);
        const prMobileValue = fieldFormatter(pr.mobile[field]);
        const mobileDelta = prependColor(fieldFormatter(computeDelta(control.mobile[field], pr.mobile[field])));

        return [fieldName,
                controlDesktopValue,
                prDesktopValue,
                desktopDelta,
                controlMobileValue,
                prMobileValue,
                mobileDelta];
    };
}

function makeFormatTable(fieldMappings, formatTableRowFn) {
    return function(control, pr) {
        return Object.keys(fieldMappings).map((field) => {
            return formatTableRowFn(field, control, pr);
        });
    };
}

module.exports.prependColor = prependColor;
module.exports.formatMillis = formatMillis;
module.exports.formatBytes = formatBytes;
module.exports.formatNodes = formatNodes;
module.exports.makeFormatTableRowFn = makeFormatTableRowFn;
module.exports.makeFormatTable = makeFormatTable;
