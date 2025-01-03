[![npm version](https://badge.fury.io/js/xlf-translate.svg)](https://badge.fury.io/js/xlf-translate)

# xlf-translate

Populates translations in XLIFF (.xlf) message files. Specifically developed for [Angular i18n](https://angular.dev/guide/i18n) - enabled apps, but might work for others as well.

## Description

Normally, you'd localize an attribute using the following syntax:

```html
<span i18n="A hello world message for the localized component">Hello!</span>
```

This utility makes use of the optional meaning tag to associate the message with an unique key.
```html
<span i18n="localized.component.hello|A hello world message for the localized component">Hello!</span>
```

The key will be persisted in the messages file as a "meaning":
```xml
<trans-unit id="cb5fabf68b14f52c0d7cbc2b90393f8897310ba7" datatype="html">
  <source>Hello!</source>
  <target/>
  <note priority="1" from="description">A hello world message for the localized component</note>
  <note priority="1" from="meaning">localized.component.hello</note>
</trans-unit>
```

This utility will look up the keys in the supplied language file to provide the target translation.

## Language Files

The language files contain translations corresponding to the keys in the description.
For example, the `localized.component.hello` key and its translation are represented as:

```yaml
localized:
    component:
        hello: Bonjour!
```

## Installation

`npm install -g xlf-translate`

## Usage

`xlf-translate --lang-file sample/lang/fr.yml sample/messages.fr.xlf`

This will populate all empty target elements in the `messages.xlf` file with matching translations. Non-empty target elements will be skipped to avoid overwriting user translations.

> The messages file will be updated in place.

You can also force overwriting all translations, regardless if empty or not:

`xlf-translate --force --lang-file sample/lang/fr.yml sample/messages.fr.xlf`

## See Also

* [Sample usage in an i18n Angular app](https://github.com/tsvetomir/angular-cli-i18n-sample)
* [Angular - Internationalization (i18n)](https://angular.dev/guide/i18n)
