app.factory('salaryComponentAmountService', ['$http', 'baseURL', function ($http, baseURL) {

    var salaryComponentAmountServiceFactory = {};

    var _getSalaryComponentAmount = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'SalaryComponentAmounts' + filter).then(function (results) {
            return results;
        });
    };

    var _addSalaryComponentAmount = function (model) {

        return $http.post(baseURL + 'SalaryComponentAmounts', model).then(function (results) {
            return results;
        });
    };

    var _updateSalaryComponentAmount = function (model) {

        return $http.put(baseURL + 'SalaryComponentAmounts(' + model.UserID + ')', model).then(function (results) {
            return results;
        });
    };

    salaryComponentAmountServiceFactory.getSalaryComponentAmount = _getSalaryComponentAmount;
    salaryComponentAmountServiceFactory.addSalaryComponentAmount = _addSalaryComponentAmount;
    salaryComponentAmountServiceFactory.updateSalaryComponentAmount = _updateSalaryComponentAmount;

    return salaryComponentAmountServiceFactory;

}]);