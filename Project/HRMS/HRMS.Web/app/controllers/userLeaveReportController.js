
app.controller('userLeaveReportCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'userService', 'userLeaveService', function ($scope, $rootScope, $location, $http, localStorageService, userService, userLeaveService) {
    $scope.message = "";
    $scope.expand = "?$expand=UserLeaves/LeaveType";

    userService.getUser($scope.expand).then(function (response) {
        $scope.userLeaveReportData = response.data.value;
        //$scope.
    }, function (error) {
        $scope.message = $scope.message + "- Invalid List -";
    });
    


    $scope.selectObject = function (selectedUserObject, selectedPaySlipObject) {
        //$rootScope.selectedUser = selectedUserObject;
        //$rootScope.selectedPaySlip = selectedPaySlipObject;
        //$location.path('/viewPaySlip');
    }

}]);
