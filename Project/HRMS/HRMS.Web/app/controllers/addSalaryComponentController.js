app.controller('addSalaryComponentCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'salaryComponentService', function ($scope, $rootScope, $location, $http, localStorageService, salaryComponentService) {

    $scope.addSalaryComponentModel = {};

    if (salaryComponentService.isSalaryComponentEditing == true) {

        $scope.heading_titleCase = "Edit Salary Component";
        $scope.heading_upperCase = "EDIT SALARY COMPONENT";
        $scope.addSalaryComponentModel.SalaryComponentID = salaryComponentService.selectedSalaryComponent.SalaryComponentID;
        $scope.addSalaryComponentModel.Name = salaryComponentService.selectedSalaryComponent.Name;
        $scope.addSalaryComponentModel.Description = salaryComponentService.selectedSalaryComponent.Description;
        $scope.addSalaryComponentModel.IsIncremental = salaryComponentService.selectedSalaryComponent.IsIncremental;
        $scope.addSalaryComponentModel.IsActive = salaryComponentService.selectedSalaryComponent.IsActive;
        $scope.addSalaryComponentModel.CreatedBy = salaryComponentService.selectedSalaryComponent.CreatedBy;
        $scope.addSalaryComponentModel.CreatedDate = salaryComponentService.selectedSalaryComponent.CreatedDate;

        $scope.addOrEditSalaryComponent = function () {

            $scope.addSalaryComponentModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addSalaryComponentModel.UpdatedDate = new Date();

            salaryComponentService.updateSalaryComponent($scope.addSalaryComponentModel).then(function (response) {
                $scope.message = $scope.message + '-SalaryComponent edited-';
                $location.path('/salaryComponentList');
            }, function (error) {
                $scope.message = 'Error';
            })
        }

    } else {

        $scope.heading_titleCase = "Add Salary Component";
        $scope.heading_upperCase = "ADD SALARY COMPONENT";

        $scope.addOrEditSalaryComponent = function () {

            $scope.addSalaryComponentModel.CreatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addSalaryComponentModel.CreatedDate = new Date();
            $scope.addSalaryComponentModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addSalaryComponentModel.UpdatedDate = new Date();

            salaryComponentService.addSalaryComponent($scope.addSalaryComponentModel).then(function (response) {
                $scope.message = $scope.message + '-SalaryComponent added-';
                $location.path('/salaryComponentList');
            }, function (error) {
                $scope.message = 'Error';
            })
        }

    }

    
}]);
