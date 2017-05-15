(function () {
'use strict';

angular.module('ShoppingList')
.component('shoppingList', {
  templateUrl: "/shopping-list/views/shopping-list/shop-list.html", 
  controller: ShoppingListComponentController,
  bindings: {
    items: '<',
    title: '@',
    onRemove: '&'
  }
});

ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q',
'CookieFilterService'];
function ShoppingListComponentController ($rootScope, $element, $q, 
CookieFilterService) {
  this.length = 0;

  this.remove = function (index) {
    this.onRemove({index});
  };

  this.onInit = function () {
    console.log("We are in $onInit()");
    console.log(this);
  };

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
  };

}



})();

