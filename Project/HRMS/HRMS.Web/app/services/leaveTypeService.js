app.factory('leaveTypeService', ['$http', 'baseURL', function ($http, baseURL) {

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

    var _updateLeaveType = function (model) {

        return $http.put(baseURL + "LeaveTypes('" + model.LeaveTypeID + "')", model).then(function (results) {
            return results;
        });
    };

    leaveTypeServiceFactory.getLeaveType = _getLeaveType;
    leaveTypeServiceFactory.addLeaveType = _addLeaveType;
    leaveTypeServiceFactory.updateLeaveType = _updateLeaveType;
    leaveTypeServiceFactory.selectedLeaveType = _selectedLeaveType;
    leaveTypeServiceFactory.isLeaveTypeEditing = _isLeaveTypeEditing;


    return leaveTypeServiceFactory;

}]);