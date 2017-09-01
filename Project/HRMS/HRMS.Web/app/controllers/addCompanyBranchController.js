app.controller('addCompanyBranchCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'companyBranchService', 'roleService', function ($scope, $rootScope, $location, $http, localStorageService, companyBranchService, roleService) {

    $scope.addCompanyBranchModel = {};

    if (companyBranchService.isCompanyBranchEditing == true) {

        $scope.heading_titleCase = "Edit Branch";
        $scope.heading_upperCase = "EDIT BRANCH";
        $scope.addCompanyBranchModel.CompanyBranchID = companyBranchService.selectedCompanyBranch.CompanyBranchID;
        $scope.addCompanyBranchModel.Name = companyBranchService.selectedCompanyBranch.Name;

        $scope.addOrEditCompanyBranch = function () {
            companyBranchService.updateCompanyBranch($scope.addCompanyBranchModel).then(function (response) {
                $scope.message = $scope.message + '-CompanyBranch edited-';
                $location.path('/companyBranchList');
            }, function (error) {
                $scope.message = 'Error';
            })
        }
    } else {

        $scope.heading_titleCase = "Add Branch";
        $scope.heading_upperCase = "ADD BRANCH";

        $scope.addOrEditCompanyBranch = function () {

            companyBranchService.addCompanyBranch($scope.addCompanyBranchModel).then(function (response) {
                $scope.message = $scope.message + '-CompanyBranch added-';
                $location.path('/companyBranchList');
            }, function (error) {
                $scope.message = 'Error';
            })
        }
    }
}]);
