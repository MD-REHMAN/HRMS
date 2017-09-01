app.factory('companyBranchService', ['$http', 'baseURL', function ($http, baseURL) {

    var companyBranchServiceFactory = {};
    var _isCompanyBranchEditing = false;
    var _selectedCompanyBranch = {};

    var _getCompanyBranch = function (filter) {
        if (!filter)
            filter = "";
        return $http.get(baseURL + 'CompanyBranches' + filter).then(function (results) {
            return results;
        });
    };


    var _addCompanyBranch = function (model) {

        return $http.post(baseURL + 'CompanyBranches', model).then(function (results) {
            return results;
        });
    };
    var _updateCompanyBranch = function (model) {

        return $http.put(baseURL + 'CompanyBranches(' + model.CompanyBranchID + ')', model).then(function (results) {
            return results;
        });
    };
    companyBranchServiceFactory.getCompanyBranch = _getCompanyBranch;
    companyBranchServiceFactory.addCompanyBranch = _addCompanyBranch;
    companyBranchServiceFactory.updateCompanyBranch = _updateCompanyBranch;
    companyBranchServiceFactory.isCompanyBranchEditing = _isCompanyBranchEditing;
    companyBranchServiceFactory.selectedCompanyBranch = _selectedCompanyBranch;


    return companyBranchServiceFactory;

}]);