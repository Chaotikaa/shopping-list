(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.directive('shoppingList', ShoppingListDirective)

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

  this.addItem = function () {
    console.log(this.name, this.quantity);
    
    ShoppingListService.addItem(this.name, this.quantity);
    this.items = ShoppingListService.getItems();
  }

  this.removeItem = function () {
    ShoppingListService.removeItem();
    this.items = ShoppingListService.getItems();
    
  }
}



})();