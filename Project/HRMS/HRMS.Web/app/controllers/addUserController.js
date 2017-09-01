app.controller('addUserCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'userService', 'roleService', 'userRoleService', 'companyBranchService', 'departmentService', 'userDepartmentService', function ($scope, $rootScope, $location, $http, localStorageService, userService, roleService, userRoleService, companyBranchService, departmentService, userDepartmentService) {

    
    $scope.addUserModel = {};
    $scope.addUserRoleModel = {};
    $scope.addUserDepartmentModel = {};

    if (userService.selectedUser.UserID && localStorageService.get('loggedInUser').UserRoles[0].Role.Name != "SuperAdmin" && localStorageService.get('loggedInUser').UserID != userService.selectedUser.UserID) {
        userService.isUserEditing = false;
        $location.path('/unauthorised');
    }


    if (userService.isUserEditing == true) {

        $scope.heading_titleCase = "Edit User";
        $scope.heading_upperCase = "EDIT USER";
        $scope.addUserModel.UserID = userService.selectedUser.UserID;
        $scope.addUserModel.CompanyBranchID = (userService.selectedUser.CompanyBranchID).toString();
        $scope.addUserModel.FirstName = userService.selectedUser.FirstName;
        $scope.addUserModel.MiddleName = userService.selectedUser.MiddleName;
        $scope.addUserModel.LastName = userService.selectedUser.LastName;
        $scope.addUserModel.MobileNumber = userService.selectedUser.MobileNumber;
        $scope.addUserModel.Email = userService.selectedUser.Email;
        $scope.addUserModel.Gender = userService.selectedUser.Gender;
        $scope.addUserModel.AdhaarNumber = userService.selectedUser.AdhaarNumber;
        $scope.addUserModel.PanNumber = userService.selectedUser.PanNumber;
        $scope.addUserModel.BankAccountNumber = userService.selectedUser.BankAccountNumber;
        $scope.addUserModel.ProvidentFundNumber = userService.selectedUser.ProvidentFundNumber;
        $scope.addUserModel.EsicNumber = userService.selectedUser.EsicNumber;
        $scope.addUserModel.Password = userService.selectedUser.Password;
        $scope.addUserModel.DateOfJoining = userService.selectedUser.DateOfJoining;
        $scope.addUserModel.DateOfBirth = userService.selectedUser.DateOfBirth;

        $scope.addUserRoleModel.UserRoleID = userService.selectedUser.UserRoles[0].UserRoleID;
        $scope.addUserRoleModel.UserID = userService.selectedUser.UserID;
        $scope.addUserRoleModel.RoleID = userService.selectedUser.UserRoles[0].Role.RoleID;

        $scope.addUserDepartmentModel.UserDepartmentID = userService.selectedUser.UserDepartments[0].UserDepartmentID;
        $scope.addUserDepartmentModel.UserID = userService.selectedUser.UserID;
        $scope.addUserDepartmentModel.DepartmentID = (userService.selectedUser.UserDepartments[0].Department.DepartmentID).toString();

        
        $scope.addOrEditUser = function () {

            userService.updateUser($scope.addUserModel).then(function (response) {
                $scope.message = $scope.message + '-User added-';


                userRoleService.updateUserRole($scope.addUserRoleModel).then(function (response) {
                    $scope.message = $scope.message + '-UserRole added-';

                    userDepartmentService.updateUserDepartment($scope.addUserDepartmentModel).then(function (response) {
                        $scope.message = $scope.message + '-UserDepartment added-';
                        $location.path('/userList');
                    }, function (error) {
                        $scope.message = 'Error';
                    })
                }, function (error) {
                    $scope.message = 'Error';
                })
            }, function (error) {
                $scope.message = 'Error';
            })

        }

    } else {

        $scope.heading_titleCase = "Add User";
        $scope.heading_upperCase = "ADD USER";


        $scope.addOrEditUser = function () {

            $scope.addUserModel.UserID = $scope.complexID();
            $scope.addUserRoleModel.UserID = $scope.addUserModel.UserID;
            $scope.addUserDepartmentModel.UserID = $scope.addUserModel.UserID;
            $scope.addUserModel.DateOfJoining = new Date();
            $scope.addUserModel.DateOfBirth = new Date('1999-11-11');

            userService.addUser($scope.addUserModel).then(function (response) {
                $scope.message = $scope.message + '-User added-';

                userRoleService.addUserRole($scope.addUserRoleModel).then(function (response) {
                    $scope.message = $scope.message + '-UserRole added-';

                    userDepartmentService.addUserDepartment($scope.addUserDepartmentModel).then(function (response) {
                        $scope.message = $scope.message + '-UserDepartment added-';
                        $location.path('/userList');
                    }, function (error) {
                        $scope.message = 'Error';
                    })
                }, function (error) {
                    $scope.message = 'Error';
                })
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


    roleService.getRole("").then(function (response) {
        $scope.roleData = response.data.value;
        $scope.message = $scope.message + '-Got the roles-';
    }, function (error) {
        $scope.message = "Invalid";
    });

    departmentService.getDepartment("?$filter=IsActive eq true").then(function (response) {
        $scope.departmentData = response.data.value;
        $scope.message = $scope.message + '-Got the departments-';
    }, function (error) {
        $scope.message = "Invalid";
    });

    companyBranchService.getCompanyBranch("").then(function (response) {
        $scope.companyBranchData = response.data.value;
        $scope.message = $scope.message + '-Got the companyBranches-';
    }, function (error) {
        $scope.message = "Invalid";
    });

}]);