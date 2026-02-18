'use strict';

const indent = node => {
    const indent = node.parent().html().match(/^\s+/);
    return indent !== null ? indent[0] : '';
};

function query(obj, id) {
    if (typeof id !== 'string') {
        return null;
    }

    const parts = id.split('.');
    if (!Object.hasOwnProperty.call(obj, parts[0])) {
        return null;
    }

    const value = obj[parts[0]];
    if (parts.length === 1) {
        return value;
    } else {
        const subid = parts.slice(1).join('.');
        return query(value, subid);
    }
};

/**
 * Fills in translations in XLIFF files based on 'meaning' metadata as a key.
 *
 * @param doc an XLIFF document parsed with cheerio
 * @param lang a tree of keys and their corresponding translations
 * @return statistics the messages will be filled in-place
 */
const translate = (doc, lang, force) => {
    const units = doc('trans-unit').toArray();
    let stats = { count: 0, skip: 0 };

    units
        .map(unit => doc(unit))
        .filter(unit => unit.find('note').length > 0)
        .map(unit => {
            return {
                unit: unit,
                id: doc(unit).find('note[from=meaning]').text()
            };
        })
        .filter(({ id }) => id && isKey(id))
        .map(({ id, unit }) => {
            const match = query(lang, id);

            return {
                found: match !== null,
                text: match,
                unit: unit
            };
        })
        .filter(({ found }) => found)
        .map(({ unit, text }) => {
            const source = unit.find('source');
            let target = unit.find('target');
            if (target.length === 0 && source.length === 1) {
                target = doc('<target />');
                source.after(indent(source), target);
            }

            return {
                target: target,
                text: text
            };
        })
        .forEach(({ target, text }) => {
            if (target.text() === '' || force) {
                target.text(text);
                stats.count++;
            } else if (!force) {
                stats.skip++;
            }
        });

    return stats;
};


const isKey = val => !!val.match(/^[a-zA-Z0-9.\-_]*$/);

module.exports = translate;

