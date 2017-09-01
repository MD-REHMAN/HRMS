app.factory('paySlipService', ['$http', 'baseURL', function ($http, baseURL) {

    var paySlipServiceFactory = {};

    var _getPaySlip = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'PaySlips' + filter).then(function (results) {
            return results;
        });
    };

    var _addPaySlip = function (model) {

        return $http.post(baseURL + 'PaySlips', model).then(function (results) {
            return results;
        });
    };

    var _updatePaySlip = function (model) {

        return $http.put(baseURL + 'PaySlips(' + model.PaySlipID + ')', model).then(function (results) {
            return results;
        });
    };

    paySlipServiceFactory.getPaySlip = _getPaySlip;
    paySlipServiceFactory.addPaySlip = _addPaySlip;
    paySlipServiceFactory.updatePaySlip = _updatePaySlip;

    return paySlipServiceFactory;

}]);