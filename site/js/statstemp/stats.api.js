'use strict';

var R6MapsStatsApi = (function(undefined) {
  var getMapAndOperators = function getMapAndOperators(
    mapSuccessCallback,
    mapErrorCallback,
    operatorSuccessCallback,
    operatorErrorCallback,
    allSuccessCallback,
    queryString, // a little hacky, relies on UI param names matching API
    statsData
  ) {
    var mapCall = $.ajax({
      url: 'http://www.r6maps.com/api/stats/maps.php' + queryString,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 20000
    }).fail(function(){
      mapErrorCallback();
      operatorErrorCallback();
    });
    var operatorsCall = $.ajax({
      url: 'http://www.r6maps.com/api/stats/operators.php' + queryString,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 20000
    }).fail(operatorErrorCallback);

    $.when(mapCall).then(function (rawMapData) {
      mapSuccessCallback(R6MapsStatsMapData.getFromApiData(rawMapData, statsData));
    });
    $.when(mapCall, operatorsCall).then(function (rawMapData, rawOperatorsData) {
      operatorSuccessCallback(
        R6MapsStatsOperatorsData.getFromApiData(
          rawOperatorsData[0],
          R6MapsStatsMapData.getTotalRoundsFromApiData(rawMapData[0]),
          statsData
        )
      );
      allSuccessCallback();
    });
  };

  return  {
    getMapAndOperators: getMapAndOperators
  };
})();
