app.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'userService', function ($scope, $rootScope, $location, $http, localStorageService, userService) {

    $scope.loginModel = {};
    
    //$rootScope.activeGID = localStorageService.get('loggedInUser').activeGroupID;

    $scope.login = function () {
        var filter = "?$expand=UserRoles/Role&$filter=Email eq '" + $scope.loginModel.Email + "'";

        userService.getUser(filter).then(function (response) {
            $scope.userData = response.data.value[0];
            $scope.checkValue();
            $scope.message = "Login Success";
        }, function(error) {
            $scope.message = "Invalid";
        });
        
        /*
        $http.get(filter)
        .then(function mySucces(response) {
            $scope.userData = response.data.value[0];
            $scope.checkValue();
        }, function myError(response) {
            alert(response.statusText);
        });
        */
    }
        
    $scope.checkValue = function () {

        if ($scope.loginModel.Email == $scope.userData.Email) {
            if ($scope.loginModel.Password == $scope.userData.Password) {

                localStorageService.set('loggedInUser', $scope.userData);
                $location.path('/dashboard');
            } else {
                alert('Worng Password');
            }
        } else {
            alert('Username Does not exist');
        }

    };
}]);


