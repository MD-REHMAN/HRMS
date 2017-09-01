app.controller('addDepartmentCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'departmentService', function ($scope, $rootScope, $location, $http, localStorageService, departmentService) {

    $scope.addDepartmentModel = {};

    if (departmentService.isDepartmentEditing == true) {

        $scope.heading_titleCase = "Edit Department";
        $scope.heading_upperCase = "EDIT DEPARTMENT";
        $scope.addDepartmentModel.DepartmentID = departmentService.selectedDepartment.DepartmentID;
        $scope.addDepartmentModel.Name = departmentService.selectedDepartment.Name;
        $scope.addDepartmentModel.Description = departmentService.selectedDepartment.Description;
        $scope.addDepartmentModel.IsActive = departmentService.selectedDepartment.IsActive;
        $scope.addDepartmentModel.CreatedBy = departmentService.selectedDepartment.CreatedBy;
        $scope.addDepartmentModel.CreatedDate = departmentService.selectedDepartment.CreatedDate;

        $scope.addOrEditDepartment = function () {

            $scope.addDepartmentModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addDepartmentModel.UpdatedDate = new Date();

            departmentService.updateDepartment($scope.addDepartmentModel).then(function (response) {
                $scope.message = $scope.message + '-Department edited-';
                $location.path('/departmentList');
            }, function (error) {
                $scope.message = 'Error';
            })
        }
    } else {

        $scope.heading_titleCase = "Add Department";
        $scope.heading_upperCase = "ADD DEPARTMENT";

        $scope.addOrEditDepartment = function () {

            $scope.addDepartmentModel.CreatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addDepartmentModel.CreatedDate = new Date();
            $scope.addDepartmentModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addDepartmentModel.UpdatedDate = new Date();

            departmentService.addDepartment($scope.addDepartmentModel).then(function (response) {
                $scope.message = $scope.message + '-Department added-';
                $location.path('/departmentList');
            }, function (error) {
                $scope.message = 'Error';
            })
        }
    }
}]);
