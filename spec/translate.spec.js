'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const cheerio = require('cheerio');
const translate = require('../translate');

const lang = {
    "localized": {
        "component": {
            "hello": "Bonjour!",
            "goodbye": "Au Revoir!"
        }
    }
};

describe("translate", function() {
    let messages;
    let units;

    const target = (index, text) => units.eq(index).find('target').text(text);

    beforeEach(() => {
        const messageData = fs.readFileSync('./sample/messages.xlf', { encoding: 'utf-8' });
        messages = cheerio.load(messageData, { xmlMode: true, decodeEntities: false });
        units = messages('trans-unit');
    });

    it("fills tagged units", function() {
        translate(messages, lang);

        expect(target(1)).toBe(lang.localized.component.hello);
        expect(target(2)).toBe(lang.localized.component.goodbye);
    });

    it("skips translated tagged units", function() {
        target(1, 'Foo');

        translate(messages, lang);

        expect(target(1)).toBe('Foo');
    });

    it("overwrites translated tagged units with force", function() {
        target(1, 'Foo');

        translate(messages, lang, true);

        expect(target(1)).toBe(lang.localized.component.hello);
    });

    it("skips regular units", function() {
        translate(messages, lang);

        expect(target(0)).toBe('');
    });

    it("skips units with interpolations", function() {
        translate(messages, lang);

        expect(target(3)).toBe('');
    });

    it("outputs interpolations", function() {
        translate(messages, lang);

        expect(units.eq(3).find('source').html()).toBe('Créé par <x id="INTERPOLATION"/> le <x id="INTERPOLATION_1"/>');
    });
});

