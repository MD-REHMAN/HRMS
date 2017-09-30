app.controller('addLeaveRequestCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'leaveTypeService', 'userLeaveService', 'userService', 'leaveRequestService', function ($scope, $rootScope, $location, $http, localStorageService, leaveTypeService, userLeaveService, userService, leaveRequestService) {

    $scope.leaveTypeData = {};
    $scope.userLeaveData = {};
    $scope.addLeaveRequestModel = {};
    $scope.count = 0;

    leaveTypeService.getLeaveType("?$filter=IsActive eq true").then(function (response) {
        $scope.message = $scope.message + '-Got LeaveType-';
        $scope.leaveTypeData = response.data.value;
    }, function (error) {
        $scope.message = 'Error';
    })

    $scope.fillNumberOfLeave = function () {
        userLeaveService.getUserLeave("?$filter=LeaveTypeID eq " + $scope.addLeaveRequestModel.LeaveTypeID + "&UserID eq '" +localStorageService.get('loggedInUser').UserID+ "'").then(function (response) {
            $scope.userLeaveData = response.data.value
        }, function (error) {
            $scope.message = 'Error';
        })
    }

    if (leaveTypeService.isLeaveTypeEditing == true) {

        $scope.heading_titleCase = "Edit Leave Request";
        $scope.heading_upperCase = "EDIT LEAVE REQUEST";
        $scope.addLeaveTypeModel.LeaveTypeID = leaveTypeService.selectedLeaveType.LeaveTypeID;
        $scope.addLeaveTypeModel.Name = leaveTypeService.selectedLeaveType.Name;
        $scope.addLeaveTypeModel.Description = leaveTypeService.selectedLeaveType.Description;
        $scope.addLeaveTypeModel.IsActive = leaveTypeService.selectedLeaveType.IsActive;
        $scope.addLeaveTypeModel.CreatedBy = leaveTypeService.selectedLeaveType.CreatedBy;
        $scope.addLeaveTypeModel.CreatedDate = leaveTypeService.selectedLeaveType.CreatedDate;

        $scope.addOrEditLeaveType = function () {

            $scope.addLeaveTypeModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveTypeModel.UpdatedDate = new Date();

            leaveTypeService.updateLeaveType($scope.addLeaveTypeModel).then(function (response) {
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

            $scope.addLeaveTypeModel.CreatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveTypeModel.CreatedDate = new Date();
            $scope.addLeaveTypeModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveTypeModel.UpdatedDate = new Date();

            leaveTypeService.addLeaveType($scope.addLeaveTypeModel).then(function (response) {
                $scope.message = $scope.message + '-LeaveType added-';
                $scope.addUserLeaveModel.NumberOfLeave = response.data.PerAnnumLeave;
                $scope.addUserLeaveModel.LeaveTypeID = response.data.LeaveTypeID;

                userService.getUser("?$filter=DateOfLeaving eq null").then(function (response) {
                    $scope.userModel = response.data.value;
                    angular.forEach($scope.userModel, function (value, key) {

                        $scope.addUserLeaveModel.UserID = value.UserID;
                        $scope.count++;

                        userLeaveService.addUserLeave($scope.addUserLeaveModel).then(function (response) {
                            $scope.message = $scope.message + '-Users Leaves added-';
                            if ($scope.count == $scope.userModel.length) {
                                $location.path('/leaveTypeList');
                            }
                        }, function (error) {
                            $scope.message = 'Error';
                        })

                    })
                }, function (error) {
                    $scope.message = 'Error';
                })
            }, function (error) {
                $scope.message = 'Error';
            })
        }
    }
}]);
