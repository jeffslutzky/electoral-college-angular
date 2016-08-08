'use strict';

myApp.directive('d3map', function() {

  var w = 1300;
  var h = 700;

  var stateColor = "neutral";

  return {
    restrict: 'E',
    scope: {
      // clicktate: '&',
    },
    controller: 'myController',
    controllerAs: 'vm',
    bindToController: true,
    link: function(scope, element, attrs) {

      var vm = scope.vm;
      scope.blueEV = 0;

      var projection = d3.geo.albersUsa()
          .translate([w/2, h/2])
          .scale([1500]);

      var path = d3.geo.path()
          .projection(projection);

      var svg = d3.select(element[0])
          .append("svg")
          .attr("width", w)
          .attr("height", h);

      var tip = d3.tip()
          .attr("class", "d3-tip")
          .offset(function (d) {
            if (d.abbr === "DC") {
              return [20,100]
            } else if (d.abbr === "NJ") {
              return [-5,0]
            } else if (d.abbr === "RI") {
              return [20,80]
            } else { return [10,0] }
          })
          .html(function(d){
            return d.properties.name + ": " + d.ev;
          });

      svg.call(tip);

      d3.json("public/us-states.json", function(json) {
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "neutral")

            // .attr("class", function(d) {
            //   if (userMapData) {
            //     getStateColor(d);
            //   } else {
            //     stateColor = "neutral";
            //   }
            //   return stateColor;
            // })

            .attr("id", "states")

            .on('click', function(d, i) {
              vm.blueEV += d.ev;
              vm.unassignedEV -= d.ev;
              return vm.clickState(d, i, this);
            })

            // .on("contextmenu", rightClick)

            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
        svg.selectAll("text")
            .data(json.features)
            .enter()
            .append("text")
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .attr("dx", function (d) {
              return d.dx
            })
            .attr("dy", function (d) {
              return d.dy
            })
            .attr("class", "ev")
            .attr("style", function (d) {
                if (d.abbr === "DE" || d.abbr === "HI" || d.abbr === "RI") {
                  return "fill: black"
                } else {
                  return "fill: white"
                }
            })
            .text(function(d) { return d.ev; });
      });

      var click = function(d) {

        if (this.classList == "neutral") {
          d3.select(this)
              .classed({"neutral": false, "blue": true});
          blueStates.push(d.properties.name);
          blueEV += d.ev;
          unassignedEV -= d.ev;
        } else if (this.classList == "blue") {
          d3.select(this)
              .classed({"blue": false, "red": true});
          blueStates.splice($.inArray(d.properties.name, blueStates),1);
          blueEV -= d.ev;
          redStates.push(d.properties.name);
          redEV += d.ev;
        } else {
          d3.select(this)
              .classed({"red": false, "neutral": true});
          redStates.splice($.inArray(d.properties.name, redStates),1);
          redEV -= d.ev;
          unassignedEV += d.ev;
        };

        updateTally();
        updateHiddenForm();
        checkForWinner();
      };

    }
  }
});
