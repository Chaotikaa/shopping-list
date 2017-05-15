(function () {
'use strict';

angular.module('ShoppingList')
.service('ShoppingListService', ShoppingListService);

function ShoppingListService () {

  var service = this;

  var items = [];

  service.addItem = function (name, quantity) {
    items.push({name, quantity});
  };

  service.removeItem = function (index) {
    items.splice(index, 1);
  };

  service.getItems = function () {
    return items;
  };
}

})();