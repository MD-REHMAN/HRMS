app.controller('leaveTypeListCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'leaveTypeService', function ($scope, $rootScope, $location, $http, localStorageService, leaveTypeService) {
    $scope.message = "";
    leaveTypeService.isLeaveTypeEditing = false;

    leaveTypeService.getLeaveType("").then(function (response) {
        $scope.leaveTypeListData = response.data.value;
    }, function (error) {
        $scope.message = $scope.message + "- Invalid roleList -";
    });


    $scope.selectObject = function (selectedObject) {
        leaveTypeService.selectedLeaveType = selectedObject;
        leaveTypeService.isLeaveTypeEditing = true;
        $location.path('/addLeaveType');
    }

}]);