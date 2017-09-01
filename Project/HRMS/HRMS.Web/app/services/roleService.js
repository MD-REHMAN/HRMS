app.factory('roleService', ['$http', 'baseURL', function ($http, baseURL) {

    var roleServiceFactory = {};
    var _isRoleEditing = false;
    var _selectedRole = {};

    var _getRole = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'Roles' + filter).then(function (results) {
            return results;
        });
    };

    var _addRole = function (model) {

        return $http.post(baseURL + 'Roles', model).then(function (results) {
            return results;
        });
    };

    var _updateRole = function (model) {

        return $http.put(baseURL + "Roles('" + model.RoleID + "')", model).then(function (results) {
            return results;
        });
    };

    roleServiceFactory.getRole = _getRole;
    roleServiceFactory.addRole = _addRole;
    roleServiceFactory.updateRole = _updateRole;
    roleServiceFactory.selectedRole = _selectedRole;
    roleServiceFactory.isRoleEditing = _isRoleEditing;


    return roleServiceFactory;

}]);