app.controller('dashboardCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'userService', 'roleService', 'paySlipService', function ($scope, $rootScope, $location, $http, localStorageService, userService, roleService, paySlipService) {

    $scope.employeeCount = {};
    $scope.internCount = {};
    $scope.paySlipCount = {};


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

}]);