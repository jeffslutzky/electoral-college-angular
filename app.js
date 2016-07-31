var myApp = angular.module('myApp', []);

myApp.controller('myController', function myController() {

  var vm = this;

});



myApp.directive('d3Visualization', function() {

  var w = 1300;
  var h = 700;

  var blueStates = [];
  var redStates = [];
  var blueEV = 0;
  var redEV = 0;
  var unassignedEV = 538;
  var stateColor = "neutral";

  return {
    restrict: 'E',
    scope: {
      val: '=',

    },
    link: function(scope, element, attrs) {

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
            // .on("click", click)
            // .on("contextmenu", rightClick)
            // .on('mouseover', tip.show)
            // .on('mouseout', tip.hide);
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




    }
  }
});
