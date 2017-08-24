'use strict';

var R6MStatsApi = (function(undefined) {
  var getMapAndOperators = function getMapAndOperators(
    mapSuccessCb,
    mapErrorCb,
    opSuccessCb,
    opErrorCb,
    allSuccessCb,
    queryString, // a little hacky, relies on UI param names matching API but so much easier :)
    metaData
  ) {
    var mapCall = $.ajax({
      url: 'http://www.r6maps.com/api/stats/maps.php' + queryString,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 20000
    }).fail(function(){
      mapErrorCb();
      opErrorCb();
    });
    var opCall = $.ajax({
      url: 'http://www.r6maps.com/api/stats/operators.php' + queryString,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 20000
    }).fail(opErrorCb);

    $.when(mapCall).then(function (mapApiData) {
      mapSuccessCb(mapApiData);
    });
    $.when(mapCall, opCall).then(function (mapApiData, opApiData) {
      opSuccessCb(opApiData[0], mapApiData[0]);
      allSuccessCb();
    });
  };

  return  {
    getMapAndOperators: getMapAndOperators
  };
})();
