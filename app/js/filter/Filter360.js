(function () {

    angular.module('Filter360', []);

    angular.module('Filter360').filter('percentage', ['$filter', percentage]);

    function percentage($filter) {
        return function (input, decimals) {
            //debugger;
            return $filter('number')(input * 100, decimals) + '%';
        };
    };


    angular.module('Filter360').filter('imagecheckmark', imagecheckmark);

    function imagecheckmark() {
        return function (is_true) {
            return is_true ? '<span class="glyphicon glyphicon-ok"></span>' : '<span class="glyphicon glyphicon-remove"></span>';
        }
    }


    angular.module('Filter360').filter('courserowclass', courserowclass);

    function courserowclass() {
        return function (is_true) {
            return is_true ? 'success' : 'default';
        }
    }


    angular.module('Filter360').filter('employeeheaderclass', employeeheaderclass);

    function employeeheaderclass() {

        return function (total, completed) {
            var _class = 'panel panel-info'

            if (completed == total) {
                _class = 'panel panel-success'
            }

            if (completed == 0) {
                _class = 'panel panel-danger'
            }
            return _class;
        }
    }

})();