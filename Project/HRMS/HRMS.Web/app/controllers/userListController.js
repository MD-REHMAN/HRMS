app.controller('userListCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'userService', function ($scope, $rootScope, $location, $http, localStorageService, userService) {
    $scope.message = "";
    userService.isUserEditing = false;
    $scope.filter = {};
    $scope.filter.tops = [10, 20, 50, 100, 200];
    $scope.filter.selectedTop = $scope.filter.tops[0];
    
    $scope.getList = function () {
        $scope.expand = "?$expand=CompanyBranch,UserDepartments/Department,UserRoles/Role&$top=" + $scope.filter.selectedTop;

        userService.getUser($scope.expand).then(function (response) {
            $scope.userListData = response.data.value;
        }, function (error) {
            $scope.message = $scope.message + "- Invalid userList -";
        });
    };
    

    $scope.selectObject = function (selectedObject) {
        userService.selectedUser = selectedObject;
        userService.isUserEditing = true;
        $location.path('/addUser');
    }

    $scope.getList();

}]);
