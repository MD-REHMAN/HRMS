app.controller('addLeaveTypeCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'leaveTypeService', function ($scope, $rootScope, $location, $http, localStorageService, leaveTypeService) {

    $scope.addLeaveTypeModel = {};

    if (leaveTypeService.isLeaveTypeEditing == true) {

        $scope.heading_titleCase = "Edit LeaveType";
        $scope.heading_upperCase = "EDIT LEAVE TYPE";
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

        $scope.heading_titleCase = "Add LeaveType";
        $scope.heading_upperCase = "ADD LEAVE TYPE";

        $scope.addOrEditLeaveType = function () {

            $scope.addLeaveTypeModel.CreatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveTypeModel.CreatedDate = new Date();
            $scope.addLeaveTypeModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveTypeModel.UpdatedDate = new Date();

            leaveTypeService.addLeaveType($scope.addLeaveTypeModel).then(function (response) {
                $scope.message = $scope.message + '-LeaveType added-';
                $location.path('/leaveTypeList');
            }, function (error) {
                $scope.message = 'Error';
            })
        }
    }
}]);
