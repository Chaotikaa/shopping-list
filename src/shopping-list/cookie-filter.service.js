(function () {
'use strict';

angular.module('ShoppingList')
.service('CookieFilterService', CookieFilterService);

CookieFilterService.$inject = ['$q', '$timeout'];
function CookieFilterService($q, $timeout) {
  var service = this;

  service.checkName = function (name) {
    var deferred = $q.defer();

    var result = {
      message:""
    };

    $timeout(function (){
      if (name.toLowerCase().indexOf('cookie') === -1) {
        deferred.resolve(result);
      } else {
        result.message = "Stay away from cookies!";
        deferred.reject(result);
      }
    }, 3000);

    return deferred.promise;

  }
}

})();