app.controller('addPaySlipCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'userService', 'paySlipService', 'salaryComponentService', 'salaryComponentAmountService', function ($scope, $rootScope, $location, $http, localStorageService, userService, paySlipService, salaryComponentService, salaryComponentAmountService) {

    $scope.addPaySlipModel = {};
    $scope.addSalaryComponentAmountModel = [];
    $scope.message = 'Messages: ';
    $scope.count = 0;


    userService.getUser("?$filter=DateOfLeaving eq null").then(function (response) {
        $scope.userData = response.data.value;
        $scope.message = $scope.message + "Got the users";
    }, function (error) {
        $scope.message = "Invalid";
    });
    
    salaryComponentService.getSalaryComponent("?$filter=IsActive eq true").then(function (response) {
        $scope.salaryComponentData = response.data.value;
        $scope.message = $scope.messagee + '-Got the SalaryComponents-';
    }, function (error) {
        $scope.message = "Invalid";
    });

    $scope.addPaySlip = function () {

        $scope.addPaySlipModel.PayDate = new Date();
        $scope.addPaySlipModel.IsActive = true;
        $scope.addPaySlipModel.TotalSalary = "0";
        $scope.addPaySlipModel.CreatedBy = localStorageService.get('loggedInUser').UserID;
        $scope.addPaySlipModel.CreatedDate = new Date();
        $scope.addPaySlipModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
        $scope.addPaySlipModel.UpdatedDate = new Date();


        paySlipService.addPaySlip($scope.addPaySlipModel).then(function (response) {
            $scope.addPaySlipModel = response.data;
            $scope.message = $scope.message + '-PaySlip added-';
            $scope.addSalaryComponentAmountFun();
        }, function (error) {
            $scope.message = 'Error';
        })

    }

    $scope.addSalaryComponentAmountFun = function () {

        angular.forEach($scope.addSalaryComponentAmountModel, function (value, key) {

            value.PaySlipID = $scope.addPaySlipModel.PaySlipID;
            value.IsActive = 'true';
            value.CreatedBy = localStorageService.get('loggedInUser').UserID;
            value.CreatedDate = new Date();
            value.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            value.UpdatedDate = new Date();
            if ($scope.salaryComponentData[key].IsIncremental == true) {
                $scope.addPaySlipModel.TotalSalary = (parseFloat($scope.addPaySlipModel.TotalSalary) + parseFloat(value.Amount)).toString();
            } else {
                $scope.addPaySlipModel.TotalSalary = (parseFloat($scope.addPaySlipModel.TotalSalary) - parseFloat(value.Amount)).toString();
            }

            salaryComponentAmountService.addSalaryComponentAmount(value).then(function (response) {
                $scope.message = $scope.message + '-Salary Component added-';
                $scope.count++;

                if ($scope.count == $scope.addSalaryComponentAmountModel.length) {
                    paySlipService.updatePaySlip($scope.addPaySlipModel).then(function (response) {
                        $scope.message = $scope.message + '-Total Salary added-';
                        $location.path('/paySlipList');
                    }, function (error) {
                        $scope.message = $scope.message + 'Total Salary not added';
                    })
                }
            }, function (error) {
                $scope.message = $scope.message + 'Salary Component not added';
            })
        } );
    }
}]);
