(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.service('CookieFilterService', CookieFilterService)
.directive('shoppingList', ShoppingListDirective)
.component('shopList', {
  templateUrl: '../views/templates/shop-list.html',
  controller: ShopListComponentController,
  bindings: {
    items: '<',
    title: '@',
    onRemove: '&'
  }
}).component('loadingSpinner', {
  templateUrl: '../views/templates/loading-spinner.html',
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

ShopListComponentController.$inject = ['$rootScope', '$element', '$q',
'CookieFilterService'];
function ShopListComponentController ($rootScope, $element, $q, 
CookieFilterService) {
  console.log(this);
  // this.title = `Shopping List #1: ${this.items ? this.items.length : 0} items`;
  // console.log(this);

  this.length = 0;

  // this.cookiesInList = function () {
  //   // if(this.items) {
  //   // console.log('called');
      
  //   for (var i = 0; i < this.items.length; i++) {
  //     var name = this.items[i].name;
  //     if (name.toLowerCase().indexOf("cookie") !== -1) {
  //       // console.log("return true");
  //       return true;
  //     }
  //   }
  //   return false;
  // // }
  // };

  this.remove = function (index) {
    this.onRemove({index});
  };

  this.onInit = function () {
    console.log("We are in $onInit()");
    console.log(this);
  };

  // this.$onChanges = function (changeObj) {
  //   console.log(changeObj);
  // };

  this.$doCheck = function () {
    if (length !== this.items.length) {
      length = this.items.length;

      $rootScope.$broadcast('shoppinglist:processing', {on: true});

      var promises = [];
      for (var i = 0; i < length; i++) {
        promises.push(CookieFilterService.checkName(this.items[i].name));
      }
      $q.all(promises)
      .then(function (result) {
        var warningElem = $element.find('div.error');        
        warningElem.slideUp(900);
        console.log(warningElem);
      })
      .catch(function (err){
        var warningElem = $element.find('div.error');
        console.log(warningElem);
        warningElem.slideDown(900);
      })
      .finally(function () {
        $rootScope.$broadcast('shoppinglist:processing', {on: false});
      });
    
    }
  }

  // this.$postLink = function () {
  //   $scope.$watch('$ctrl.cookiesInList()', function (newValue, oldValue) {
  //     console.log($element);
  //     if (newValue === true) {
  //       var warningElem = $element.find('div.error');
  //       console.log(warningElem);
  //       warningElem.slideDown(900);
  //     }
  //     else {
  //       var warningElem = $element.find('div.error');        
  //       warningElem.slideUp(900);
  //       console.log(warningElem);
        

  //     }
  //   });
  // };
} 

function ShoppingListService () {

  var items = [];

  this.addItem = function (name, quantity) {
    items.push({name, quantity});
  }

  this.removeItem = function (index) {
    items.splice(index, 1);
  }

  this.getItems = function () {
    return items;
  }

}

function ShoppingListDirective () {
  return {
    templateUrl: '../views/templates/shopping-list.html',
    scope: {
      items: '<',
      removeItem: '&onRemove'
    }
  }
}

ShoppingListController.$inject = ['ShoppingListService']
function ShoppingListController (ShoppingListService) {

  this.options = [1, 2, 3, 4, 5];

  this.quantity = 1;

  this.items = [];

  this.addItem = function () {

    // console.log(this.name, this.quantity);
    
    ShoppingListService.addItem(this.name, this.quantity);
    this.items = ShoppingListService.getItems();
  }

  this.removeItem = function () {
    ShoppingListService.removeItem();
    this.items = ShoppingListService.getItems();
    
  }
}

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