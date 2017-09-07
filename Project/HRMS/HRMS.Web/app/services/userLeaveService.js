app.factory('userLeaveService', ['$http', 'baseURL', function ($http, baseURL) {

    var userLeaveServiceFactory = {};
    var _isUserLeaveEditing = false;
    var _selectedUserLeave = {};

    var _getUserLeave = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'UserLeaves' + filter).then(function (results) {
            return results;
        });
    };

    var _addUserLeave = function (model) {

        return $http.post(baseURL + 'UserLeaves', model).then(function (results) {
            return results;
        });
    };

    var _updateUserLeave = function (model) {

        return $http.put(baseURL + "UserLeaves('" + model.UserLeaveID + "')", model).then(function (results) {
            return results;
        });
    };

    userLeaveServiceFactory.getUserLeave = _getUserLeave;
    userLeaveServiceFactory.addUserLeave = _addUserLeave;
    userLeaveServiceFactory.updateUserLeave = _updateUserLeave;
    userLeaveServiceFactory.selectedUserLeave = _selectedUserLeave;
    userLeaveServiceFactory.isUserLeaveEditing = _isUserLeaveEditing;


    return userLeaveServiceFactory;

}]);