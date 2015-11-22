(function () {
    //debugger;
    "use strict;"

    angular.module('FD360').controller('NavbarController', ['$scope', '$rootScope', '$location', NavbarController]);

    function NavbarController($scope, $rootScope, $location) {
         
        var vm = this;

        vm.getClass = function (path) {
            if ($location.path().substr(0, path.length) === path) {
                return 'active';
            } else {
                return '';
            }
        }

    };

})();