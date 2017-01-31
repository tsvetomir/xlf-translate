const jp = require('jsonpath');

/**
 * Fills in translations in XLIFF files based on 'meaning' metadata as a key.
 *
 * @param messages an XLIFF document parsed with xml2js
 * @param lang a tree of keys and their corresponding translations
 * @return statistics the messages will be filled in-place
 */
const translate = (messages, lang, force) => {
    const units = jp.query(messages, "$..['trans-unit']")[0];
    let stats = { count: 0, skip: 0 };

    units
        .filter(hasNotes)
        .map(unit => ({
            target: unit.target,
            id: meaning(unit)
        }))
        .filter(d => isKey(d.id))
        .forEach(d => {
            const query = '$.' + d.id;
            const match = jp.query(lang, query);

            if (match.length === 1) {
                if (d.target[0] === '' || force) {
                    d.target[0] = match[0];
                    stats.count++;
                } else if (!force) {
                    stats.skip++;
                }
            }
        });

    return stats;
};

const isKey = val => !!val.match(/^[a-zA-Z0-9.]*$/);
const hasNotes = u => !!u.note;
const meaning = unit => unit.note.find(note => note['$'].from === 'meaning')['_'];

module.exports = translate;

