(function () {
    //debugger;
    "use strict;"

//for delete
angular.module('FD360').controller('ModalDeleteCourseController',
    ['$scope', '$modalInstance', 'NoticeAndLogFactory', 'delete_course', ModalDeleteCourseController]);

function ModalDeleteCourseController($scope, $modalInstance, NoticeAndLogFactory, delete_course) {
    //debugger;   
    $scope.deleteCourse = delete_course
    $scope.isDelete = (delete_course.Employees.length == 0);
    $scope.delete = function () {
        //  debugger;            
        $modalInstance.close($scope.deleteCourse);
        NoticeAndLogFactory.success("Course " + $scope.deleteCourse.Name + " deleted successfully", "Success", "Delete Course");
    };

    $scope.cancel = function () {
        //debugger
        $modalInstance.dismiss('cancel');
    };
}

//for edit
angular.module('FD360').controller('ModalEditCourseController',
    ['$scope', '$modalInstance', 'NoticeAndLogFactory', 'edit_course', ModalEditCourseController]);

function ModalEditCourseController($scope, $modalInstance, NoticeAndLogFactory, edit_course) {
   // debugger;   
    $scope.editCourse = edit_course;
    $scope.submitFailed = false;
    $scope.update = function () {
     //    debugger;
        if ($scope.editCourseForm.$valid) {
            $modalInstance.close($scope.editCourse);
            NoticeAndLogFactory.success("Edit Course " + $scope.editCourse.Name + " updated successfully", "Success", "Edit Course");

        }
        else {
            $scope.submitFailed = true;
            NoticeAndLogFactory.error("Submission failed! Please correct error.", "Error!", "Submission failed! Please correct error.");
        }

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

// for add
angular.module('FD360').controller('ModalAddCourseController',
    ['$scope', '$modalInstance', 'NoticeAndLogFactory', 'new_course', ModalAddCourseController]);

function ModalAddCourseController($scope, $modalInstance, NoticeAndLogFactory, new_course) {
    //debugger;
    $scope.newCourse = new_course;
    $scope.submitFailed = false;
    $scope.save = function () {
      //  debugger;
        if ($scope.addCourseForm.$valid)
        {
            $modalInstance.close($scope.newCourse);
            NoticeAndLogFactory.success("New Course " + $scope.newCourse.Name + " added successfully", "Success", "New Course");
           
        } 
        else {
            $scope.submitFailed = true;
            NoticeAndLogFactory.error("Submission failed! Please correct error.", "Error!", "Submission failed! Please correct error.");
        }

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

})();