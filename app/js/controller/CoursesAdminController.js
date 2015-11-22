(function () {
    //debugger;
    "use strict;"

    angular.module('FD360').controller('CoursesAdminController', ['$scope', '$compile', '$modal', '$log', 'DataFactory', CoursesAdminController]);

    function CoursesAdminController($scope, $compile, $modal, $log, DataFactory) {

        var vm = this;

        vm.Employees = [];
        vm.Courses = [];

        vm.total_pending = 0;
        vm.total_completed = 0;

        vm.addCourse = function ()
        {
           // debugger;
            var newCourse = {
                "$id": "0",
                "CourseID": "0",
                "Name": "",
                "Code": "",
                "Description": "",
                "EmployeeCourses": [],
                "isSelect": false,
                "isDisable": false
            }; 
            //add
            var modalAddCourse = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modalAddCourse.html',
                controller: 'ModalAddCourseController',
                size: '',
                resolve: {
                    new_course: function () {
                        return newCourse;
                    }
                }
            });
        
            modalAddCourse.result.then(function (newCourse) {
               // debugger;
                var maxId = vm.Courses.length;
                for (var x = 0; x < vm.Courses.length; x++) {
                    if (vm.Courses[x].CourseID > maxId)
                    {
                        maxId = vm.Courses[x].CourseID
                    }
                }

                newCourse.$id = maxId + 1;
                newCourse.CourseID = maxId + 1;
                newCourse.deleteCourse = deleteCourse;

                DataFactory.addCourse(newCourse);

                getCourses();

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            }); 
        
        }

        //delete

        init();

        // all finctions 
        function init() {         
            getEmployees();
            getCourses();
        }

        function getEmployees() {
            //debugger;
            var employees = DataFactory.getEmployees();
        
            vm.Employees = employees;


        }


        function editCourse(event) {
            //   debugger;
            event.stopPropagation();
            var editCourse = this;

            var modalEditCourse = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modalEditCourse.html',
                controller: 'ModalEditCourseController',
                size: '',
                resolve: {
                    edit_course: function () {
                        return angular.copy(editCourse); //editCourse;
                    }
                }
            });

            modalEditCourse.result.then(function (editCourse) {
               // debugger;
                DataFactory.editCourse(editCourse);
                getCourses();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }


        function deleteCourse(event) {
           //   debugger;
            event.stopPropagation();
            var deleteCourse = this;
            //deleteCourse.isDelete = (deleteCourse.Employees.length == 0)

            var modalDeleteCourse = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modalDeleteCourse.html',
                controller: 'ModalDeleteCourseController',
                size: '',
                resolve: {
                    delete_course: function () {
                        return deleteCourse;
                    }
                }
            });

            modalDeleteCourse.result.then(function (deleteCourse) {
                //debugger;
                DataFactory.deleteCourse(deleteCourse);
                getCourses();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }


        function getCourses() {
            var courses = DataFactory.getCourses();
            var employees = vm.Employees;

            //debugger;
            for (var x = 0; x < courses.length; x++) {

                courses[x].Pending = 0;
                courses[x].Completed = 0;
                courses[x].Employees = [];
                courses[x].isShowEmployee = false;
                courses[x].order = 'Name';
                courses[x].reverse = '';

                courses[x].toggleShowEmployee = function()
                {
                    var isShow = this.isShowEmployee
                    for (var i = 0; i < vm.Courses.length; i++)
                    {
                        vm.Courses[i].isShowEmployee = false;
                    }
                    this.isShowEmployee = !isShow;
                }


                var employee = {};

                for (var i = 0; i < employees.length; i++) {

                    for (var j = 0; j < employees[i].EmployeeCourses.length; j++) {

                        if (employees[i].EmployeeCourses[j].CourseID == courses[x].CourseID)
                        {
                            employee = employees[i];
                            employee.CourseID = courses[x].CourseID;
                            employee.TotalCourses = employees[i].EmployeeCourses.length;
                          //  employee.EmployeeCourses = [];                            
                            employee.TotalCompleted = employees[i].EmployeeCourses.filter(
                                                     function (value) {return (value.isComplete == true); }
                                                  ).length;

                            employee.isComplete = employees[i].EmployeeCourses[j].isComplete;

                            //employee.changeComplete = function () {
                            //    debugger;
                            //   // employees[i].EmployeeCourses[j].isComplete = employees[i].EmployeeCourses[j].isComplete
                            //    this.isComplete = !this.isComplete;
                            //    vm.Employees.EmployeeCourses.filter(
                            //                         function (value) { return (value.CourseID == this.CourseID); }
                            //                      ).isComplete = this.isComplete;
                            //}

                            courses[x].Employees.push(employee);

                            if(employees[i].EmployeeCourses[j].isComplete)
                            {   courses[x].Completed++
                                vm.total_completed++
                            } else
                            {
                                courses[x].Pending++
                                vm.total_pending++
                            }


                            courses[x].deleteCourse = deleteCourse;
                            courses[x].editCourse = editCourse;





                        }

                        
                    }

 

                }


            }


            vm.Courses = courses
        }


    };

})();