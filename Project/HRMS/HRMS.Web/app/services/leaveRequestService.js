app.factory('leaveRequestService', ['$http', 'baseURL', function ($http, baseURL) {

    var leaveRequestServiceFactory = {};
    var _isLeaveRequestEditing = false;
    var _selectedLeaveRequest = {};

    var _getLeaveRequest = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'LeaveRequests' + filter).then(function (results) {
            return results;
        });
    };

    var _addLeaveRequest = function (model) {

        return $http.post(baseURL + 'LeaveRequests', model).then(function (results) {
            return results;
        });
    };

    var _updateLeaveRequest = function (model) {

        return $http.put(baseURL + "LeaveRequests('" + model.LeaveRequestID + "')", model).then(function (results) {
            return results;
        });
    };

    leaveRequestServiceFactory.getLeaveRequest = _getLeaveRequest;
    leaveRequestServiceFactory.addLeaveRequest = _addLeaveRequest;
    leaveRequestServiceFactory.updateLeaveRequest = _updateLeaveRequest;
    leaveRequestServiceFactory.selectedLeaveRequest = _selectedLeaveRequest;
    leaveRequestServiceFactory.isLeaveRequestEditing = _isLeaveRequestEditing;


    return leaveRequestServiceFactory;

}]);