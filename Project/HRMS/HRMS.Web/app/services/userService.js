app.factory('userService', ['$http', 'baseURL', function ($http, baseURL) {

    var userServiceFactory = {};
    var _isUserEditing = false;
    var _selectedUser = {};

    var _getUser = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'Users' + filter).then(function (results) {
            return results;
        });
    };

    var _addUser = function (model) {

        return $http.post(baseURL + 'Users', model).then(function (results) {
            return results;
        });
    };

    var _updateUser = function (model) {

        return $http.put(baseURL + "Users('" + model.UserID + "')", model).then(function (results) {
            return results;
        });
    };

    userServiceFactory.getUser = _getUser;
    userServiceFactory.addUser = _addUser;
    userServiceFactory.updateUser = _updateUser;
    userServiceFactory.isUserEditing = _isUserEditing;
    userServiceFactory.selectedUser = _selectedUser;

    return userServiceFactory;

}]);