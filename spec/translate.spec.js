'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const xml = require('xml2js');
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

    beforeEach(() => {
        messages = require('./message-data');
        units = messages.xliff.file[0].body[0]['trans-unit'];
    });

    it("fills tagged units", function() {
        translate(messages, lang);

        expect(units[1].target[0]).toBe(lang.localized.component.hello);
        expect(units[2].target[0]).toBe(lang.localized.component.goodbye);
    });

    it("skips translated tagged units", function() {
        units[1].target[0] = 'Foo';

        translate(messages, lang);

        expect(units[1].target[0]).toBe('Foo');
    });

    it("overwrites translated tagged units with force", function() {
        units[1].target[0] = 'Foo';

        translate(messages, lang, true);

        expect(units[1].target[0]).toBe(lang.localized.component.hello);
    });

    it("skips regular units", function() {
        translate(messages, lang);

        expect(units[0].target[0]).toBe('');
    });
});

