app.factory('leaveTypeService', ['$http', 'baseURL', 'webApiURL', function ($http, baseURL, webApiURL) {

    var leaveTypeServiceFactory = {};
    var _isLeaveTypeEditing = false;
    var _selectedLeaveType = {};

    var _getLeaveType = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'LeaveTypes' + filter).then(function (results) {
            return results;
        });
    };

    var _addLeaveType = function (model) {

        return $http.post(baseURL + 'LeaveTypes', model).then(function (results) {
            return results;
        });
    };

    var _addLeaveTypeAllUser = function (model) {

        return $http.post(webApiURL + 'api/LeaveTypesWeb/AddLeaveTypeAllUser', model).then(function (results) {
            return results;
        });
    };

    //"http://localhost:55030/"

    var _updateLeaveType = function (model) {

        return $http.put(baseURL + "LeaveTypes('" + model.LeaveTypeID + "')", model).then(function (results) {
            return results;
        });
    };

    leaveTypeServiceFactory.getLeaveType = _getLeaveType;
    leaveTypeServiceFactory.addLeaveType = _addLeaveType;
    leaveTypeServiceFactory.addLeaveTypeAllUser = _addLeaveTypeAllUser;
    leaveTypeServiceFactory.updateLeaveType = _updateLeaveType;
    leaveTypeServiceFactory.selectedLeaveType = _selectedLeaveType;
    leaveTypeServiceFactory.isLeaveTypeEditing = _isLeaveTypeEditing;


    return leaveTypeServiceFactory;

}]);