//define directive module
(function () {

    angular.module('Directive360', []);

    angular.module('Directive360').directive("ngSort360", ngSort360);

    function ngSort360() {

        return {
            restrict: 'A',
            transclude: true,
            template:
              '<a ng-click="onClick()">' +
                '<span ng-transclude></span>' +
                '<i class="pull-right glyphicon" ng-class="{\'glyphicon-arrow-up\' : order === by && !reverse,  \'glyphicon-arrow-down\' : order===by && reverse}"></i>' +
              '</a>',
            scope: {
                order: '=',
                by: '=',
                reverse: '='
            },
            link: function (scope, element, attrs) {
                scope.onClick = function () {
                    if (scope.order === scope.by) {
                        scope.reverse = !scope.reverse
                    } else {
                        scope.by = scope.order;
                        scope.reverse = false;
                    }
                }
            }
        }
    }

    angular.module('Directive360').directive("loadingIndicator", loadingIndicator);

    function loadingIndicator() {
        return {
            restrict: "A",
            template: "<div style='padding:40px'><div class='alert alert-warning' role='alert'><h1><strong>Loading!</strong></h1><div class='progress'><div class='progress-bar progress-bar-warning progress-bar-striped' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%'><span class='sr-only'></span></div></div></div></div>",
            link: function (scope, element, attrs) {
                scope.$on("loading-started", function (e) {
                    element.css({ "display": "" });
                });

                scope.$on("loading-complete", function (e) {
                    element.css({ "display": "none" });
                });

            }
        };
    }


    angular.module('Directive360').directive("ngStats360", ngStats360);

    function ngStats360() {
        return {
            templateUrl: 'app/js/directive/tpls/ng_stats360.html',
            restrict: 'E',
            replace: true,
            scope: {
                'model': '=',
                'comments': '@',
                'number': '@',
                'name': '@',
                'colour': '@',
                'details': '@',
                'type': '@',
                'goto': '@'
            }

        }
    };


    angular.module('Directive360').directive("ngTab360", ngTab360);

    function ngTab360() {
        return {
            link: function (scope, element, attrs) {
                element.click(function (e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    };


    angular.module('Directive360').directive("capitalize", capitalize);

    function capitalize() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]);  // capitalize initial value
            }
        };
    };

})();