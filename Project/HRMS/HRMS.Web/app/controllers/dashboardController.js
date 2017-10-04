app.controller('dashboardCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'userService', 'roleService', 'paySlipService', 'leaveRequestService', function ($scope, $rootScope, $location, $http, localStorageService, userService, roleService, paySlipService, leaveRequestService) {

    $scope.employeeCount = {};
    $scope.internCount = {};
    $scope.paySlipCount = {};
    $scope.leaveRequest = [];
    $scope.selectedLeaveRequest = {};
    $scope.loggedInUser = localStorageService.get('loggedInUser');


    $rootScope.$broadcast('loginEvent'); //Here I'm only sending event
    //$scope.$broadcast('loginEvent'); //Here I'm only sending event
    //$scope.$broadcast('loginEvent', localStorageService.get('loggedInUser')); //Here I'm sending event as well as data

    var employeeFilter = "?$expand=UserRoles/User&$filter=Name eq 'Employee'&$inlinecount=allpages";

    roleService.getRole(employeeFilter).then(function (response) {
        $scope.employeeCount = response.data.value[0];
    }, function (error) {
        $scope.message = "Invalide";
    });


    var internFilter = "?$expand=UserRoles/User&$filter=Name eq 'Intern'&$inlinecount=allpages";

    roleService.getRole(internFilter).then(function (response) {
        $scope.internCount = response.data.value[0];
    }, function (error) {
        $scope.message = "Invalide";
    });

    paySlipService.getPaySlip("").then(function (response) {
        $scope.paySlipCount = response.data.value;
    }, function (error) {
        $scope.message = "Invalide";
    });

    var leaveRequestFilter = "?$filter=CreatedBy eq '" + $scope.loggedInUser.UserID + "'";

    leaveRequestService.getLeaveRequest(leaveRequestFilter).then(function (response) {
        $scope.leaveRequest = response.data.value;
    }, function (error) {
        $scope.message = "Invalide";
    });

    $scope.approveLeaveRequest = function (selectedLeaveRequest) {
        delete $scope.selectedLeaveRequest.$$hashKey;
        $scope.selectedLeaveRequest.IsApproved = true;
        $scope.selectedLeaveRequest.ApprovedBy = $scope.loggedInUser.UserID;
        $scope.selectedLeaveRequest.UpdatedDate = new Date();
        $scope.selectedLeaveRequest.UpdatedBy = $scope.loggedInUser.UserID;

        leaveRequestService.updateLeaveRequest($scope.selectedLeaveRequest).then(function (response) {

        }, function (error) {
            $scope.message = $scope.message + "Not approved";
        });
    }
    $scope.rejectLeaveRequest = function (selectedUser) {
        Blah;
    }


}]);