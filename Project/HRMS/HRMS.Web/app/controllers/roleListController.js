app.controller('roleListCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'roleService', function ($scope, $rootScope, $location, $http, localStorageService, roleService) {

    $scope.message = "";
    roleService.isRoleEditing = false;


    roleService.getRole("").then(function (response) {
        $scope.roleListData = response.data.value;
    }, function (error) {
        $scope.message = $scope.message + "- Invalid roleList -";
    });

    $scope.selectObject = function (selectedObject) {
        roleService.selectedRole = selectedObject;
        roleService.isRoleEditing = true;
        $location.path('/addRole');

        //alert(roleService.selectedRole.Name);
    };

}]);
