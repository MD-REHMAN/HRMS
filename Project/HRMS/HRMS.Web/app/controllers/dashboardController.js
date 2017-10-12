app.controller('dashboardCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'userService', 'roleService', 'paySlipService', 'leaveRequestService', 'userLeaveService', function ($scope, $rootScope, $location, $http, localStorageService, userService, roleService, paySlipService, leaveRequestService, userLeaveService) {

    $scope.employeeCount = {};
    $scope.internCount = {};
    $scope.paySlipCount = {};
    $scope.leaveRequest = [];
    $scope.selectedLeaveRequest = {};
    $scope.userLeaveModel = {};
    $scope.loggedInUser = localStorageService.get('loggedInUser');


    $rootScope.$broadcast('loginEvent'); //Here I'm only sending event
    //$scope.$broadcast('loginEvent'); //Here I'm only sending event
    //$scope.$broadcast('loginEvent', localStorageService.get('loggedInUser')); //Here I'm sending event as well as data

    var employeeFilter = "?$expand=UserRoles/User&$filter=Name eq 'Employee'";

    roleService.getRole(employeeFilter).then(function (response) {
        $scope.employeeCount = response.data.value[0];
    }, function (error) {
        $scope.message = "Invalide";
    });


    var internFilter = "?$expand=UserRoles/User&$filter=Name eq 'Intern'";

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


    $scope.leaveRequestRefresher = function () {
        var leaveRequestFilter = "";
        leaveRequestService.getLeaveRequest(leaveRequestFilter).then(function (response) {
            $scope.leaveRequest = response.data.value;
        }, function (error) {
            $scope.message = "Invalide";
        });
    }
    $scope.leaveRequestRefresher();

    $scope.approveLeaveRequest = function (x) {
        $scope.selectedLeaveRequest = x;
        delete $scope.selectedLeaveRequest.$$hashKey;
        $scope.selectedLeaveRequest.IsApproved = true;
        $scope.selectedLeaveRequest.ApprovedBy = $scope.loggedInUser.UserID;
        $scope.selectedLeaveRequest.UpdatedDate = new Date();
        $scope.selectedLeaveRequest.UpdatedBy = $scope.loggedInUser.UserID;

        leaveRequestService.updateLeaveRequest($scope.selectedLeaveRequest).then(function (response) {
            leaveRequestRefresher();
        }, function (error) {
            $scope.message = $scope.message + "Not approved";
        });
    }
    $scope.rejectLeaveRequest = function (x) {
        $scope.selectedLeaveRequest = x;
        delete $scope.selectedLeaveRequest.$$hashKey;
        $scope.selectedLeaveRequest.IsApproved = false;
        $scope.selectedLeaveRequest.ApprovedBy = $scope.loggedInUser.UserID;
        $scope.selectedLeaveRequest.UpdatedDate = new Date();
        $scope.selectedLeaveRequest.UpdatedBy = $scope.loggedInUser.UserID;
        $scope.userLeaveModel.UserID = x.CreatedBy;
        $scope.userLeaveModel.LeaveTypeID = $scope.selectedLeaveRequest.LeaveTypeID;
        $scope.userLeaveModel.NumberOfLeave = $scope.selectedLeaveRequest.NumberOfDays;

        leaveRequestService.updateLeaveRequest($scope.selectedLeaveRequest).then(function (response) {
            leaveRequestRefresher();
            var filter = "?$filter=UserID eq '" + $scope.userLeaveModel.UserID + "' and LeaveTypeID eq " + $scope.userLeaveModel.LeaveTypeID;
            userLeaveService.getUserLeave(filter).then(function (response) {
                $scope.userLeaveModel.UserLeaveID = response.data.value[0].UserLeaveID;
                $scope.userLeaveModel.NumberOfLeave = $scope.userLeaveModel.NumberOfLeave + response.data.value[0].NumberOfLeave;
                userLeaveService.updateUserLeave($scope.userLeaveModel).then(function (response) {
                    leaveRequestRefresher();
                }, function (error) {
                    $scope.message = $scope.message + "Not approved";
                })
            }, function (error) {
                $scope.message = $scope.message + "Not approved";
            })
        }, function (error) {
            $scope.message = $scope.message + "Not approved";
        });
    }


}]);