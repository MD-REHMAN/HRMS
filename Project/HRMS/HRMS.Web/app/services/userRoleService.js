app.factory('userRoleService', ['$http', 'baseURL', function ($http, baseURL) {

    var userRoleServiceFactory = {};

    var _getUserRole = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'UserRoles' + filter).then(function (results) {
            return results;
        });
    };


    var _addUserRole = function (model) {

        return $http.post(baseURL + 'UserRoles', model).then(function (results) {
            return results;
        });
    };
    var _updateUserRole = function (model) {

        return $http.put(baseURL + 'UserRoles(' + model.UserRoleID + ')', model).then(function (results) {
            return results;
        });
    };
    userRoleServiceFactory.getUserRole = _getUserRole;
    userRoleServiceFactory.addUserRole = _addUserRole;
    userRoleServiceFactory.updateUserRole = _updateUserRole;


    return userRoleServiceFactory;

}]);