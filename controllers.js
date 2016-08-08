'use strict';

myApp.controller('myController', ['$scope', function($scope) {

  var vm = this;

  vm.blueStates = [];
  vm.redStates = [];
  // vm.blueEV = 0;
  vm.redEV = 0;
  vm.unassignedEV = 538;

  // vm.clickState = function(d, i, state) {
  //
  //   if (state.classList == "neutral") {
  //     d3.select(state)
  //         .classed({"neutral": false, "blue": true});
  //     vm.blueStates.push(d.properties.name);
  //     vm.blueEV += d.ev;
  //     vm.unassignedEV -= d.ev;
  //   } else if (state.classList == "blue") {
  //     d3.select(state)
  //         .classed({"blue": false, "red": true});
  //     vm.blueStates.splice(vm.blueStates.indexOf(d.properties.name),1);
  //     vm.blueEV -= d.ev;
  //     vm.redStates.push(d.properties.name);
  //     vm.redEV += d.ev;
  //   } else {
  //     d3.select(state)
  //         .classed({"red": false, "neutral": true});
  //     vm.redStates.splice(vm.redStates.indexOf(d.properties.name),1);
  //     vm.redEV -= d.ev;
  //     vm.unassignedEV += d.ev;
  //   };
  //
  //
  //
  //   //
  //   // $scope.$apply(function() {
  //   //
  //   // });
  //
  // };

}]);
