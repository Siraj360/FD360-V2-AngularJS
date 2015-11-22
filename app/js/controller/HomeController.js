(function () {
    //debugger;
    "use strict;"

    angular.module('FD360').controller('HomeController',
                            ['NoticeAndLogFactory', 'DataFactory', HomeController]);

    function HomeController(NoticeAndLogFactory, DataFactory) {
        // debugger;
        var vm = this;

        vm.AllEmployees = 0;
        vm.AllCompleted = 0;
        vm.AllPending = 0;
        vm.AllCourses = 0;

        init();

  // all finctions 
    function init() {
            getCourses();
            getEmployees();
        }

    function getEmployees() {
            //debugger;
            var employees = DataFactory.getEmployees();
            vm.AllEmployees = employees.length;

            for (var i = 0; i < employees.length; i++) {

                employees[i].isAllPending = true;
                employees[i].isAllCompleted = true;

               for (var j = 0; j < employees[i].EmployeeCourses.length; j++) {
                    if (employees[i].EmployeeCourses[j].isComplete) {
                        employees[i].isAllPending = false;
                    } else {
                        employees[i].isAllCompleted = false;
                    }
               }

               if (employees[i].isAllCompleted) {
                   vm.AllCompleted++;
               }

               if (employees[i].isAllPending){
                   vm.AllPending++;
               }

            }

        }

    function getCourses() {
            var courses = DataFactory.getCourses();
            vm.AllCourses = courses.length;
        }

   
        vm.toastr_test =
            function () {
                NoticeAndLogFactory.success("testing of factory", "got success", "log it");

                NoticeAndLogFactory.error("testing of factory", "got error", "log it");

                NoticeAndLogFactory.info("testing of factory", "got info", "log it");

                NoticeAndLogFactory.warning("testing of factory", "got warning", "log it")

                NoticeAndLogFactory.log("testing of factory", "simple log", "log it")

            }
    };

})();