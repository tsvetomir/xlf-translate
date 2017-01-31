# xlf-translate

Populate pre-defined translation strings in Angular 2 i18n message files.

Normally, you'd localize an attribute using the following syntax:

```
<component i18n-hello hello="Hello from Localized Component"></component>
```

This utility makes use of the optional description tag to associate the message with a key.
```
<component i18n-hello="localized-component-hello" hello="Hello from Localized Component"></component>
```

The key will end-up in the messages file as a "note from description":

```xml
<trans-unit id="63587ed5b07c28dbb733d562ffeca4ee181c37c6" datatype="html">
  <source>Hello!</source>
  <target/>
  <note priority="1" from="description">localized-component-hello</note>
</trans-unit>
```

It can be then looked-up in a manually populated language file to provide a target translation.

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

You can also force overwriting all translations, regardless if empty or not:

`xlf-translate --lang-file=lang/fr.yml --messages-file=messages.fr.xlf --force`

## See Also

* [Angular 2 - Internationalization (i18n)](https://angular.io/docs/ts/latest/cookbook/i18n.html)
* [Deploying an i18n Angular app with angular-cli](https://medium.com/@feloy/deploying-an-i18n-angular-app-with-angular-cli-fc788f17e358#.2qlq8lfad)

