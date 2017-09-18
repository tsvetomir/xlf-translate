'use strict';

const jp = require('jsonpath');

const indent = node => {
    const indent = node.parent().html().match(/^\s+/);
    return indent !== null ? indent[0] : '';
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
            const source = unit.find('source');
            let target = unit.find('target');
            if (target.length === 0 && source.length === 1) {
                target = doc('<target />');
                source.after(indent(source), target);
            }

            return {
                target: target,
                id: doc(unit).find('note[from=meaning]').text()
            };
        })
        .filter(d => d.id && isKey(d.id))
        .forEach(d => {
            const query = '$.' + d.id;
            const match = jp.query(lang, query);

            if (match.length === 1) {
                if (d.target.text() === '' || force) {
                    d.target.text(match[0]);
                    stats.count++;
                } else if (!force) {
                    stats.skip++;
                }
            }
        });

    return stats;
};


const isKey = val => !!val.match(/^[a-zA-Z0-9.]*$/);

module.exports = translate;

