(function () {
    //debugger;
    "use strict;"

    angular.module('FD360')
        .controller('KPIController',
        ['$scope', 'DataFactory', KPIController]);

    function KPIController($scope, DataFactory) {
        //debugger;
       
        $scope.Title = "KPIController  adding verious chart here";

        var emp_data = [];
        var cou_data = [];

        init();

        $scope.isShowCourseDataTable = true;

        $scope.course_data =
        {
            "series": [
                  " Total",
                  " Completed",
                  " Pending"
            ],
            "data": cou_data
        };

        $scope.course_config =
            {
                "labels": false,
                "title": "Courses KPI",
                "legend": {
                    "display": true,
                    "position": "right"
                },
                "innerRadius": 0,
                "lineLegend": "lineEnd"
            };

        $scope.isShowEmployeeDataTable = true;

        $scope.employee_data =
            {
                "series": [
                      " Total emplyees"
                ],
                "data": emp_data
            };

        $scope.employee_config =
            {
                "labels": false,
                "title": "Employees KPI",
                "legend": {
                    "display": true,
                    "position": "right"
                },
                "innerRadius": 0,
                "lineLegend": "lineEnd"
            };
     
        $scope.courses = [];

        //$scope.getCourseNameFromeCode(code)
        //{
        //    for (var i = 0; i < $scope.courses.length; i++) {
        //        if ($scope.courses[i].course.Code == code) {
        //            return $scope.courses[i].Name;
        //        }
        //    }
        //}


        ///////////////////////////////////////////////////////////
     
        function init()
        {
            getEmloyeeData();
            getCourseData();
        }



        function getCourseData()
        {
            var employees = DataFactory.getEmployees();
            var courses = DataFactory.getCourses();
            $scope.courses = courses;
            $scope.total_courses = 0;
            $scope.total_pass = 0;

            var total = 0;
            var pass = 0;
            var course_id;

            for (var i = 0; i < courses.length; i++) {
                course_id = courses[i].CourseID;
                total = 0;
                pass = 0;
                for (var j = 0; j < employees.length; j++) {

                    for (var k = 0; k < employees[j].EmployeeCourses.length; k++) {

                        if (employees[j].EmployeeCourses[k].CourseID == course_id)
                        {
                            total++
                            if( employees[j].EmployeeCourses[k].isComplete == true)
                            {
                                pass++
                            }
                           
                        }

                    }
                }
               

                cou_data.push({
                    x: courses[i].Code,
                    y: [total, pass, total - pass],
                    tooltip: courses[i].Name
                });

                $scope.total_courses += total;
                $scope.total_pass += pass;

            }

        }



        function getEmloyeeData()
        {
           
            var employees = DataFactory.getEmployees();

            $scope.TotalEmployee = employees.length;

            var course_0 = 0;
            var course_1 = 0;
            var course_2 = 0;
            var course_3 = 0;
            var course_4 = 0;
            var size;

            for (var i = 0; i < employees.length; i++) {
                size = employees[i].EmployeeCourses.filter(function (value) { return value.isComplete == true }).length;
               // debugger;
                switch (size) {
                    case 0:
                        course_0++
                        break;
                    case 1:
                        course_1++
                        break;
                    case 3:
                        course_3++
                        break;
                    case 2:
                        course_2++
                        break;
                    case 4:
                        course_4++
                        break;
                    default:
                    //nothing 
                }
            }

            emp_data.push({
                x: "None",
                y: [course_0]
            });

            emp_data.push({
                x: "1 Course",
                y: [course_1]
            });

            emp_data.push({
                x: "2 Courses",
                y: [course_2]
            });

            emp_data.push({
                x: "3 Courses",
                y: [course_3]
            });

            emp_data.push({
                x: "4 Courses",
                y: [course_4]
            });


        }

    };

})();