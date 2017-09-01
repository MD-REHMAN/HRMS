app.controller('salaryComponentListCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'salaryComponentService', function ($scope, $rootScope, $location, $http, localStorageService, salaryComponentService) {
    $scope.message = "";
    salaryComponentService.isSalaryComponentEditing = false;

    salaryComponentService.getSalaryComponent("").then(function (response) {
        $scope.salaryComponentListData = response.data.value;
    }, function (error) {
        $scope.message = $scope.message + "- Invalid roleList -";
    });

    $scope.selectObject = function (selectedObject) {
        salaryComponentService.selectedSalaryComponent = selectedObject;
        salaryComponentService.isSalaryComponentEditing = true;
        $location.path('/addSalaryComponent');
    }
}]);