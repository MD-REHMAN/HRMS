app.controller('addLeaveRequestCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'leaveTypeService', 'userLeaveService', 'userService', 'leaveRequestService', function ($scope, $rootScope, $location, $http, localStorageService, leaveTypeService, userLeaveService, userService, leaveRequestService) {

    $scope.leaveTypeData = {};
    $scope.userLeaveData = {};
    $scope.addLeaveRequestModel = {};
    $scope.updateUserLeaveModel = {};
    $scope.count = 0;

    leaveTypeService.getLeaveType("?$filter=IsActive eq true").then(function (response) {
        $scope.message = $scope.message + '-Got LeaveType-';
        $scope.leaveTypeData = response.data.value;
    }, function (error) {
        $scope.message = 'Error';
    })

    $scope.fillNumberOfLeave = function () {
        userLeaveService.getUserLeave("?$filter=LeaveTypeID eq " + $scope.addLeaveRequestModel.LeaveTypeID + " and UserID eq '" +localStorageService.get('loggedInUser').UserID+ "'").then(function (response) {
            $scope.userLeaveData = response.data.value[0];
            $scope.range = function (min, max, step) {
                step = step || 1;
                var input = [];
                for (var i = min; i <= $scope.userLeaveData.NumberOfLeave; i += step) {
                    input.push(i);
                }
                return input;
            };
        }, function (error) {
            $scope.message = 'Error';
        })
    }

    if (leaveTypeService.isLeaveTypeEditing == true) {

        $scope.heading_titleCase = "Edit Leave Request";
        $scope.heading_upperCase = "EDIT LEAVE REQUEST";
        $scope.addLeaveRequestModel.LeaveTypeID = leaveTypeService.selectedLeaveType.LeaveTypeID;
        $scope.addLeaveRequestModel.Name = leaveTypeService.selectedLeaveType.Name;
        $scope.addLeaveRequestModel.Description = leaveTypeService.selectedLeaveType.Description;
        $scope.addLeaveRequestModel.IsActive = leaveTypeService.selectedLeaveType.IsActive;
        $scope.addLeaveRequestModel.CreatedBy = leaveTypeService.selectedLeaveType.CreatedBy;
        $scope.addLeaveRequestModel.CreatedDate = leaveTypeService.selectedLeaveType.CreatedDate;

        $scope.addOrEditLeaveType = function () {

            $scope.addLeaveRequestModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveRequestModel.UpdatedDate = new Date();

            leaveTypeService.updateLeaveType($scope.addLeaveRequestModel).then(function (response) {
                $scope.message = $scope.message + '-LeaveType edited-';
                $location.path('/leaveTypeList');
            }, function (error) {
                $scope.message = 'Error';
            })
        }
    } else {

        $scope.heading_titleCase = "Add Leave Request";
        $scope.heading_upperCase = "ADD LEAVE REQUEST";

        $scope.addOrEditLeaveType = function () {

            $scope.addLeaveRequestModel.ApprovedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveRequestModel.IsApproved = false;
            $scope.addLeaveRequestModel.CreatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveRequestModel.CreatedDate = new Date();
            $scope.addLeaveRequestModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveRequestModel.UpdatedDate = new Date();

            leaveRequestService.addLeaveRequest($scope.addLeaveRequestModel).then(function (response) {
                $scope.message = $scope.message + '-LeaveType added-';
                $scope.addLeaveRequestModel = response.data;
                $scope.updateUserLeaveModel.UserLeaveID = $scope.userLeaveData.UserLeaveID;
                $scope.updateUserLeaveModel.UserID = localStorageService.get('loggedInUser').UserID;
                $scope.updateUserLeaveModel.LeaveTypeID = $scope.addLeaveRequestModel.LeaveTypeID;
                $scope.updateUserLeaveModel.NumberOfLeave = $scope.userLeaveData.NumberOfLeave - $scope.addLeaveRequestModel.NumberOfDays;
                userLeaveService.updateUserLeave($scope.updateUserLeaveModel).then(function (response) {
                    $scope.message = $scope.message + '-LeaveType added-';
                    $location.path('/dashboard');
                }, function (error) {
                    $scope.message = 'Error';
                })
                
            }, function (error) {
                $scope.message = 'Error';
            })
        }
    }
}]);
