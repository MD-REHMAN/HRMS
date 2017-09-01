var app = angular.module('HRMS', ['ngRoute', 'LocalStorageModule']);

app.constant('baseURL', 'http://localhost/HRMS.Api/odata/')

app.config(function ($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'loginCtrl'
    })


    .when('/dashboard', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/login');
                }
            }
        },
        templateUrl: 'app/views/dashboard.html',
        controller: 'dashboardCtrl'
    })

    .when('/addUser', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/addUser.html',
        controller: 'addUserCtrl'
    })
    .when('/userList', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/userList.html',
        controller: 'userListCtrl'
    })

    .when('/addRole', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/addRole.html',
        controller: 'addRoleCtrl'
    })
    .when('/roleList', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/roleList.html',
        controller: 'roleListCtrl'
    })
    
    .when('/addDepartment', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/addDepartment.html',
        controller: 'addDepartmentCtrl'
    })
    .when('/departmentList', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/departmentList.html',
        controller: 'departmentListCtrl'
    })

    .when('/addCompanyBranch', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/addCompanyBranch.html',
        controller: 'addCompanyBranchCtrl'
    })
    .when('/companyBranchList', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/companyBranchList.html',
        controller: 'companyBranchListCtrl'
    })

    .when('/addSalaryComponent', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/addSalaryComponent.html',
        controller: 'addSalaryComponentCtrl'
    })
    .when('/salaryComponentList', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/salaryComponentList.html',
        controller: 'salaryComponentListCtrl'
    })

    .when('/addPaySlip', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/addPaySlip.html',
        controller: 'addPaySlipCtrl'
    })
    .when('/paySlipList', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/paySlipList.html',
        controller: 'paySlipListCtrl'
    })
    .when('/viewPaySlip', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin" || localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "Admin")) {

                } else {
                    $location.path('/unauthorised');
                }
            }
        },
        templateUrl: 'app/views/viewPaySlip.html',
        controller: 'viewPaySlipCtrl'
    })


    .when('/generalSetting', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin")) {
                    
                } else {
                    $location.path('/unauthorised');
                }
            }
        },
    templateUrl: 'app/views/generalSetting.html'
    })

    .when('/contact', {
        templateUrl: 'app/views/contact.html'
    })
    .when('/followMe', {
    templateUrl: 'app/views/followMe.html'
    })
    .when('/lost', {
        resolve: {
            "check": function ($location, localStorageService) {
                if (localStorageService.get('loggedInUser') && (localStorageService.get('loggedInUser').UserRoles[0].Role.Name == "SuperAdmin")) {

                } else {
                    $location.path('/login');
                }
            }
        },
        templateUrl: 'app/views/lost.html'
    })
    .when('/unauthorised', {
        templateUrl: 'app/views/unauthorised.html'
    })

    .otherwise({
        redirectTo: '/lost'
    })

});