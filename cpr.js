'use strict';

angular.module('angular-cpr-validator', [])
    .constant('validateCprConfig', {
        checkModulus: true,
        cprRegex: /^\d{10}$/,
        cleanupRegex: /-/g,
        daysInMonth: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        controlNumbers: [4, 3, 2, 7, 6, 5, 4, 3, 2, 1] // via http://da.wikipedia.org/wiki/CPR-nummer#Kontrol_af_personnummer
    })
    .directive('validateCpr', ['validateCprConfig', function(validateCprConfig){
        var isValidCpr = function(val){
            if(!val) return false;

            var value = (val + '').replace(validateCprConfig.cleanupRegex, '');

            if(validateCprConfig.cprRegex.test(value)){
                var month = (value.substring(2, 4)) - 0; // - 0 removes the number padding
                if(month === 0 || month > 12) return false; // whether the month is valid

                var day = parseInt(value.substring(0, 2));
                if(day > validateCprConfig.daysInMonth[month - 1]) return false; // whether the day is valid

                return value;
            }

            return false;
        };

        var isModulus11 = function(val){
            var components  = (val + '').split('');
            var control     = validateCprConfig.controlNumbers;
            var sum         = 0;

            angular.forEach(components, function(current, index){
                var currentControl = control[index];
                sum += current*currentControl;
            });

            return sum % 11 === 0;
        };

        return {
            require: 'ngModel',
            scope: {
                checkModulus: '='
            },
            link: function (scope, elem, attrs, ctrl) {
                var callback = function(val){
                    var isValid = isValidCpr(val);
                    var checkModulus = angular.isDefined(scope.checkModulus) ? scope.checkModulus : validateCprConfig.checkModulus;

                    if(isValid && checkModulus){
                        isValid = isModulus11(isValid);
                    }

                    ctrl.$setValidity('cpr', isValid);
                    return isValid || undefined;
                };

                ctrl.$parsers.push(callback);
                ctrl.$formatters.push(callback);
            }
        };
    }
]);
