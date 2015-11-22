(function () {

    angular.module('FD360').controller(
        'EmployeeController', ['$scope', '$rootScope', 'DataFactory',
                          EmployeeController]);

    function EmployeeController($scope, $rootScope, DataFactory) {
        // debugger;
        $rootScope.is_finish_loading = false;
        $scope.finish_count = 0;
        //$scope.is_finish_loading = false;
        $scope.is_add = false;
        $scope.is_finished_all = false;
        $scope.is_not_strat = true;
        $scope.course_count = 0;
        $scope.employees;
        $scope.courses;
        $scope.is_all_pending = '';
        $scope.is_all_completed = '';
        $scope.seach_all = 'Search all Employees';
        $scope.new_employee =
                    {
                        "$id": "0",
                        "EmployeeID": 0,
                        "HireDate": new Date(),
                        "Name": '',
                        "EmployeeCourses": [],
                        "isAllowCourse": true,
                        "order": 'Code',
                        "reverse": '',
                        "ErrorMessage": ''
                    };


        function init() {
            getCourses();
            getEmployees();
        }


        function reSetNewEmployee() {
            $scope.new_employee =
        {
            "$id": "0",
            "EmployeeID": 0,
            "HireDate": new Date(),
            "Name": '',
            "EmployeeCourses": [],
            "isAllowCourse": true,
            "order": 'Code',
            "reverse": '',
            "ErrorMessage": ''
        };

            for (var i = 0; i < $scope.courses.length; i++) {
                $scope.courses[i].isSelect = false;
            }

        }

        $scope.addNewEmployeeCancel = function () {

            $scope.new_employee.ErrorMessage = '';
            $scope.is_add = false;
            reSetNewEmployee();
        }

        $scope.addNewEmployee = function () {

            if ($scope.couseCount() < 4) {

                $scope.new_employee.ErrorMessage = "ERROR : Please select 4 courses"
            } else {
                // add go here
                var _emloyeeID = $scope.employees.length;

                for (var i = 0; i < $scope.courses.length; i++) {
                    if ($scope.courses[i].isSelect) {
                        $scope.new_employee.EmployeeCourses.push(
                            {
                                "EmployeeID": _emloyeeID,
                                "CourseID": $scope.courses[i].CourseID,
                                "Name": $scope.courses[i].Name,
                                "Code": $scope.courses[i].Code,
                                "isComplete": false,
                            });
                    }
                }

                //$scope.employees.push($scope.new_employee);
                DataFactory.addEmployees($scope.new_employee);
                $scope.new_employee.ErrorMessage = '';
                $scope.is_add = false;
                reSetNewEmployee();


            }

        }

        $scope.couseCount = function () {
            var _count = 0;
            for (var i = 0; i < $scope.courses.length; i++) {
                if ($scope.courses[i].isSelect) {
                    _count++
                }
            }

            return _count;
        }

        $scope.remove = function () {
            var _employeeID = this.employee.EmployeeID;

            for (var i = 0; i < $scope.employees.length; i++) {
                if ($scope.employees[i].EmployeeID == _employeeID) {
                    $scope.employees.splice(i, 1);
                    break;
                }

            }

        }

        $scope.toggleShowCourses = function () {
            this.employee.isNotShowCourses = !this.employee.isNotShowCourses;
        }

        $scope.changeComplete = function () {
            this.Course.isComplete = !this.Course.isComplete;
        }

        $scope.changeSelect = function () {
            this.Course.isSelect = !this.Course.isSelect;
            var _count = 0;
            for (var i = 0; i < $scope.courses.length; i++) {
                if ($scope.courses[i].isSelect) {
                    _count++
                }
            }

            if (_count >= 4) {
                $scope.new_employee.isAllowCourse = false
            } else {
                $scope.new_employee.isAllowCourse = true;
            }

        }

        $scope.searchCleare = function () {
            $scope.serch.Name = '';
        }

        function getEmployees() {
            //debugger;
            var employees = DataFactory.getEmployees();
            for (var i = 0; i < employees.length; i++) {
                employees[i].isToDelete = false;
                employees[i].isAllPending = true;
                employees[i].isAllCompleted = true;
                employees[i].order = 'Code';
                employees[i].reverse = '';
                for (var j = 0; j < employees[i].EmployeeCourses.length; j++) {

                    if (employees[i].EmployeeCourses[j].isComplete) {
                        employees[i].isAllPending = false;
                    } else {
                        employees[i].isAllCompleted = false;
                    }

                    for (var k = 0; k < $scope.courses.length; k++) {
                        if ($scope.courses[k].CourseID == employees[i].EmployeeCourses[j].CourseID) {
                            employees[i].EmployeeCourses[j].Name = $scope.courses[k].Name;
                            employees[i].EmployeeCourses[j].Code = $scope.courses[k].Code;
                            break;
                        }
                    }

                }
            }

            $scope.employees = employees;

        }

        function getCourses() {
            var courses = DataFactory.getCourses();
            $scope.courses = courses;
        }


        init();
        $rootScope.is_finish_loading = true;
        //$scope.is_finish_loading = true



    };

})();