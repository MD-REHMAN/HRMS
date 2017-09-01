app.factory('salaryComponentService', ['$http', 'baseURL', function ($http, baseURL) {

    var salaryComponentServiceFactory = {};
    var _isSalaryComponentEditing = false;
    var _selectedSalaryComponent = {};

    var _getSalaryComponent = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'SalaryComponents' + filter).then(function (results) {
            return results;
        });
    };

    var _addSalaryComponent = function (model) {

        return $http.post(baseURL + 'SalaryComponents', model).then(function (results) {
            return results;
        });
    };

    var _updateSalaryComponent = function (model) {

        return $http.put(baseURL + 'SalaryComponents(' + model.SalaryComponentID + ')', model).then(function (results) {
            return results;
        });
    };

    salaryComponentServiceFactory.getSalaryComponent = _getSalaryComponent;
    salaryComponentServiceFactory.addSalaryComponent = _addSalaryComponent;
    salaryComponentServiceFactory.updateSalaryComponent = _updateSalaryComponent;
    salaryComponentServiceFactory.isSalaryComponentEditing = _isSalaryComponentEditing;
    salaryComponentServiceFactory.selectedSalaryComponent = _selectedSalaryComponent;

    return salaryComponentServiceFactory;

}]);