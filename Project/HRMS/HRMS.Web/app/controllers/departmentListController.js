app.controller('departmentListCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'departmentService', function ($scope, $rootScope, $location, $http, localStorageService, departmentService) {
    $scope.message = "";
    departmentService.isDepartmentEditing = false;

    departmentService.getDepartment("").then(function (response) {
        $scope.departmentListData = response.data.value;
    }, function (error) {
        $scope.message = $scope.message + "- Invalid roleList -";
    });


    $scope.selectObject = function (selectedObject) {
        departmentService.selectedDepartment = selectedObject;
        departmentService.isDepartmentEditing = true;
        $location.path('/addDepartment');
    }

}]);