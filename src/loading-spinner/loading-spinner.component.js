(function () {
'use strict';

angular.module('LoadingSpinner')
.component('loadingSpinner', {
  templateUrl: '../../views//loading-spinner/loading-spinner.html',
  controller: SpinnerController
});

SpinnerController.$inject = ['$rootScope'];
function SpinnerController($rootScope) {
  var $ctrl = this;
  $ctrl.display = false;

  var destroy = $rootScope.$on('shoppinglist:processing', function (event, data) {
    if (data.on){
      $ctrl.display = true;
    } else {
      $ctrl.display = false;
    }
    // console.log("Event: ", event);
    // console.log("Data: ", data);
  });

  $ctrl.$onDestroy = function () {
    console.log('destroyed watch');
    destroy();
  }
};

})();