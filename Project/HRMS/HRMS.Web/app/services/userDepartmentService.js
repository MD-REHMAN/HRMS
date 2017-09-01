app.factory('userDepartmentService', ['$http', 'baseURL', function ($http, baseURL) {

    var userDepartmentServiceFactory = {};

    var _getUserDepartment = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'UserDepartments' + filter).then(function (results) {
            return results;
        });
    };

    var _addUserDepartment = function (model) {

        return $http.post(baseURL + 'UserDepartments', model).then(function (results) {
            return results;
        });
    };

    var _updateUserDepartment = function (model) {

        return $http.put(baseURL + 'UserDepartments(' + model.UserDepartmentID + ')', model).then(function (results) {
            return results;
        });
    };

    userDepartmentServiceFactory.getUserDepartment = _getUserDepartment;
    userDepartmentServiceFactory.addUserDepartment = _addUserDepartment;
    userDepartmentServiceFactory.updateUserDepartment = _updateUserDepartment;

    return userDepartmentServiceFactory;

}]);