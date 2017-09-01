app.controller('headerCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'userService', function ($scope, $rootScope, $location, $http, localStorageService, userService) {

    $scope.loggedInUser = {};
    $scope.loggedInUser = localStorageService.get('loggedInUser');

    $scope.$on('loginEvent', function (evt) {
        $scope.loggedInUser = localStorageService.get('loggedInUser');
    });

    $scope.logout = function () {
        localStorage.clear();
        $scope.loggedInUser = {};
        $location.path('/login');
    };

    $scope.editProfile = function () {
        userService.isUserEditing = true;
        $scope.expand = "?$expand=CompanyBranch,UserDepartments/Department,UserRoles/Role&$filter=UserID eq '" + localStorageService.get('loggedInUser').UserID + "'";
        
        userService.getUser($scope.expand).then(function (response) {
            userService.selectedUser = response.data.value[0];
            $location.path('/addUser');
        }, function (error) {
            $scope.message = $scope.message + "- Invalid userList -";
        });
    };


    $(document).ready(function () {
        var trigger = $('.hamburger'),
            overlay = $('.overlay'),
           isClosed = false;

        trigger.click(function () {
            hamburger_cross();
        });

        function hamburger_cross() {

            if (isClosed == true) {
                overlay.hide();
                trigger.removeClass('is-open');
                trigger.addClass('is-closed');
                isClosed = false;
            } else {
                overlay.show();
                trigger.removeClass('is-closed');
                trigger.addClass('is-open');
                isClosed = true;
            }
        }

        $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
        });
    });
}]);
