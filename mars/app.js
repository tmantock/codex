var app = angular.module("codexApp",[]);

app.factory("marsData",["$http","$log",function($http,$log){
  return $http.get('mars.php').success(function(data){$log.log(data); return data;}).error(function(err){$log.warn(err);});
}]);

app.controller("marsController",["marsData","$log","$scope",function(marsData,$log,$scope){
  var self = this;

  marsData.success(function(data){
    self.mars = data;
  });

  self.randomPosition = function (id) {
    var h = $(id).height() + 1000;
    var w = $(id).width();

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];
  };

  self.starScroll = function (id) {
    if(!self.isMobile()) {
      var starSmall;
      var starBig;

      for (i = 0; i < 25; i++) {
        var newPosition = self.randomPosition(id);
        starBig = $('<div>').addClass('big_star').css({top: newPosition[0], left: newPosition[1]});
        $(id).append(starBig);
        for (x = 0; x < 5; x++) {
          newPosition = self.randomPosition(id);
          starSmall = $('<div>').addClass('small_star').css({top: newPosition[0], left: newPosition[1]});
          $(id).append(starSmall);
        }
      }
    }
  };

  self.isMobile = function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  angular.element(document).ready(function () {
       self.starScroll($("#body"));
   });
}]);
