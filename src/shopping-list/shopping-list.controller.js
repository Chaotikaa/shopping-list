(function () {
'use strict';

angular.module('ShoppingList')
.controller('ShoppingListController', ShoppingListController);

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController (ShoppingListService) {

  var list = this;

  list.options = [1, 2, 3, 4, 5];

  list.quantity = 1;

  list.items = [];

  list.addItem = function () {
    // console.log(this.name, this.quantity);
    
    ShoppingListService.addItem(list.name, list.quantity);
    list.items = ShoppingListService.getItems();
  };

  list.removeItem = function () {
    ShoppingListService.removeItem();
    list.items = ShoppingListService.getItems();
    
  };
}

})();