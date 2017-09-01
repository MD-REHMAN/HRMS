app.factory('departmentService', ['$http', 'baseURL', function ($http, baseURL) {

    var departmentServiceFactory = {};
    var _isDepartmentEditing = false;
    var _selectedDepartment = {};

    var _getDepartment = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'Departments' + filter).then(function (results) {
            return results;
        });
    };

    var _addDepartment = function (model) {

        return $http.post(baseURL + 'Departments', model).then(function (results) {
            return results;
        });
    };

    var _updateDepartment = function (model) {

        return $http.put(baseURL + 'Departments(' + model.DepartmentID + ')', model).then(function (results) {
            return results;
        });
    };

    departmentServiceFactory.getDepartment = _getDepartment;
    departmentServiceFactory.addDepartment = _addDepartment;
    departmentServiceFactory.updateDepartment = _updateDepartment;
    departmentServiceFactory.isDepartmentEditing = _isDepartmentEditing;
    departmentServiceFactory.selectedDepartment = _selectedDepartment;

    return departmentServiceFactory;

}]);