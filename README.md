# Angular CPR validator

AngularJS module that checks whether an input's value is a valid Danish CPR number.
Checks that the birthday is valid, as well as the check digit (can be disabled).

## [Demo](http://crisbeto.github.io/angular-cpr-validator/)

## Install

Include Angular and [cpr.min.js](https://raw.githubusercontent.com/crisbeto/angular-cpr-validator/master/cpr.min.js) or [cpr.js](https://raw.githubusercontent.com/crisbeto/angular-cpr-validator/master/cpr.js) in your page. You can use npm, bower, or a script-tag:

`npm install angular-cpr-validator`

or

`bower install angular-cpr-validator`

or

`<script src="http://crisbeto.github.io/angular-cpr-validator/cpr.min.js"></script>`


Add `angular-cpr-validator` to your app's module dependencies:

```javascript
angular.module('someModule', ['angular-cpr-validator'])
```

## Modulus check
There are some edge cases where checking via a control number is not reliable.
If you want to disable this on a particular input, you can specify it via the `check-modulus="false"` attribute.
If you want to disable this check globally, you can change the `checkModulus` property in the `validateCprConfig` constant.

### Example:

```html
<input ng-model="cpr" validate-cpr>
```

## Development

*  `npm install` to install development dependencies
*  `grunt` to build minified demo in build/
*  `grunt deploy` to build minified demo and push it to gh-pages branch
