myApp.controller('myController', function myController() {

  var vm = this;

  vm.clickState = function() {
    $scope.$apply(function() {
      debugger;
    });
  };

});
