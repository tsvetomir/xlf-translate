# xlf-translate

Populate pre-defined translation strings in Angular 2 i18n message files.

Normally, you'd localize an attribute using the following syntax:

```
<span i18n="A hello world message for the localized component">Hello!</span>
```

This utility makes use of the optional meaning tag to associate the message with an unique key.
```
<span i18n="localized.component.hello|A hello world message for the localized component">Hello!</span>
```

The key will be persisted in the messages file:

```xml
<trans-unit id="cb5fabf68b14f52c0d7cbc2b90393f8897310ba7" datatype="html">
  <source>Hello!</source>
  <target/>
  <note priority="1" from="description">A hello world message for the localized component</note>
  <note priority="1" from="meaning">localized.component.hello</note>
</trans-unit>
```

We can then look it up from a language file to provide a target translation.

## Language Files

The language files are in YAML format and contain translations corresponding to the keys in the description.

```yaml
localized:
    component:
        hello: Bonjour!
        goodbye: Au Revoir!

```

## Installation

**NO PUBLISHED VERSION YET**

`npm install -g xlf-translate`

## Usage

`xlf-translate --lang-file=lang/fr.yml --messages-file=messages.fr.xlf`

This will populate all empty target elements in the `messages.xlf` file with matching translations. Non-empty target elements will be skipped to avoid overwriting user translations.

> The file will be overwritten

You can also force overwriting all translations, regardless if empty or not:

`xlf-translate --lang-file=lang/fr.yml --messages-file=messages.fr.xlf --force`

## See Also

* [Angular 2 - Internationalization (i18n)](https://angular.io/docs/ts/latest/cookbook/i18n.html)
* [Deploying an i18n Angular app with angular-cli](https://medium.com/@feloy/deploying-an-i18n-angular-app-with-angular-cli-fc788f17e358#.2qlq8lfad)

