app.controller('companyBranchListCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'companyBranchService', function ($scope, $rootScope, $location, $http, localStorageService, companyBranchService) {
    $scope.message = "";
    companyBranchService.isCompanyBranchEditing = false;

    companyBranchService.getCompanyBranch("").then(function (response) {
        $scope.companyBranchListData = response.data.value;
    }, function (error) {
        $scope.message = $scope.message + "- Invalid roleList -";
    });


    $scope.selectObject = function (selectedObject) {
        companyBranchService.selectedCompanyBranch = selectedObject;
        companyBranchService.isCompanyBranchEditing = true;
        $location.path('/addCompanyBranch');
    }
}]);
