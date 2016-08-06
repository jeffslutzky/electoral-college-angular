// var myController = function() {
//
//   var vm = this;
//   vm.clickState = function() {
//     debugger;
//     $scope.$apply(function() {
//       debugger;
//     });
//   };
//
// };

myApp.controller('myController', ['$scope', function($scope) {

  var vm = this;

  vm.clickState = function() {

    $scope.$apply(function() {

    });
  };

}]);
