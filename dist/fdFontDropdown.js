(function () {
    window.WebFontConfig = { google: { families: [] } };

    angular.module('app').controller('FontDropdownCtrl', ['$scope', function ($scope) {
        var WEBFONTAPI;
        WEBFONTAPI = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        $scope.FONTSLIST = [
            {
                name: 'Source Sans Pro',
                face: 'Source+Sans+Pro:900italic',
                style: {
                    fontFamily: 'Source Sans Pro',
                    fontWeight: 900,
                    fontStyle: 'italic'
                }
            },
            {
                name: 'Quattrocento Sans',
                face: 'Quattrocento+Sans',
                style: { fontFamily: 'Quattrocento Sans' }
            },
            {
                name: 'Ubuntu',
                face: 'Ubuntu:700',
                style: { fontFamily: 'Ubuntu' }
            },
            {
                name: 'Arizonia',
                face: 'Arizonia',
                style: { fontFamily: 'Arizonia' }
            },
            {
                name: 'Lora',
                face: 'Lora:700',
                style: {
                    fontFamily: 'Lora',
                    fontWeight: 700
                }
            },
            {
                name: 'Sansita One',
                face: 'Sansita+One',
                style: { fontFamily: 'Sansita One' }
            },
            {
                name: 'Armata',
                face: 'Armata',
                style: { fontFamily: 'Armata' }
            },
            {
                name: 'Black Ops One',
                face: 'Black+Ops+One',
                style: { fontFamily: 'Black Ops One' }
            },
            {
                name: 'Russo One',
                face: 'Russo+One',
                style: { fontFamily: 'Russo One' }
            }
        ];
        return $scope.loadFonts = function () {
            var font, i, len, ref, s, wf;
            ref = this.FONTSLIST;

            for (i = 0, len = ref.length; i < len; i++) {
                font = ref[i];
                WebFontConfig.google.families.push(font.face);
            }

            wf = document.createElement('script');
            wf.src = ('https:' === document.location.protocol ? 'https:' : 'http:') + WEBFONTAPI;
            wf.type = 'text/javascript';
            wf.async = 'true';
            s = document.getElementsByTagName('script')[0];
            return s.parentNode.insertBefore(wf, s);
        };
    }]);
    angular.module('app').directive('fdFontDropdown', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            bindToController: {
                selectedFont: '=selectedFont'
            },
            controllerAs: 'ctrl',
            controller: 'FontDropdownCtrl',
            link: function (scope, element, attr, Ctrl) {
                scope.loadFonts();
                scope.fontslist = scope.FONTSLIST;

                // identify pre selected font
                scope.$watch('ctrl.selectedFont', function (newValue) {
                    if (newValue != undefined) {
                        scope.selectedIdx = _.findIndex(scope.fontslist, { name: newValue });
                    }
                });

                scope.changeFont = function (idx) {
                    scope.selectedIdx = idx;

                    var invoker = $parse(attr.onFontChange);
                    invoker(scope, { fontFamily: scope.fontslist[scope.selectedIdx].name });
                };
                return element.bind('click', function () {
                    return element.toggleClass('active');
                });
            }
        };
    }]);
})();