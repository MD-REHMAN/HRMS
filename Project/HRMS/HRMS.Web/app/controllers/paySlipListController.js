
app.controller('paySlipListCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'userService', 'paySlipService', function ($scope, $rootScope, $location, $http, localStorageService, userService, paySlipService) {
    $scope.message = "";
    $scope.expand = "?$expand=CompanyBranch,UserDepartments/Department,PaySlips2/SalaryComponentAmounts/SalaryComponent";

    userService.getUser($scope.expand).then(function (response) {
        $scope.paySlipListData = response.data.value;
    }, function (error) {
        $scope.message = $scope.message + "- Invalid List -";
    });
    


    $scope.selectObject = function (selectedUserObject, selectedPaySlipObject) {
        $rootScope.selectedUser = selectedUserObject;
        $rootScope.selectedPaySlip = selectedPaySlipObject;
        $location.path('/viewPaySlip');
    }

}]);
