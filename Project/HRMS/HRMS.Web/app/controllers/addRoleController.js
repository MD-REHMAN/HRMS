app.controller('addRoleCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'userService', 'roleService', function ($scope, $rootScope, $location, $http, localStorageService, userService, roleService) {

    $scope.addRoleModel = {};
    $scope.isRoleEditing = roleService.isRoleEditing;


    if ($scope.isRoleEditing == true) {

        $scope.heading_titleCase = "Edit Role";
        $scope.heading_upperCase = "EDIT ROLE";
        $scope.addRoleModel.RoleID = roleService.selectedRole.RoleID;
        $scope.addRoleModel.Name = roleService.selectedRole.Name;

        $scope.addOrEditRole = function () {

            roleService.updateRole($scope.addRoleModel).then(function (response) {
                $scope.message = $scope.message + '-Role edited-';
                $location.path('/roleList');
            }, function (error) {
                $scope.message = 'Error';
            })
        }


    } else {
        $scope.heading_titleCase = "Add Role";
        $scope.heading_upperCase = "ADD ROLE";
        
        $scope.addOrEditRole = function () {
            
            $scope.addRoleModel.RoleID = $scope.complexID();
            roleService.addRole($scope.addRoleModel).then(function (response) {
                $scope.message = $scope.message + '-Role added-';
                $location.path('/roleList');
            }, function (error) {
                $scope.message = 'Error';
            })

        }

        $scope.complexID = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }
    }
}]);
