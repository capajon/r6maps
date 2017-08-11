'use strict';

var R6MapsStatsApi = (function(undefined) {
  var getMapAndOperator = function getMapAndOperator(
    mapSuccessCallback,
    mapErrorCallback,
    operatorSuccessCallback,
    operatorErrorCallback,
    allSuccessCallback,
    queryString // a little hacky, relies on UI param names matching API
  ) {
    var mapCall = $.ajax({
      url: 'http://www.r6maps.com/api/stats/maps.php' + queryString,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000
    }).fail(function(){
      mapErrorCallback();
      operatorErrorCallback();
    });
    var operatorsCall = $.ajax({
      url: 'http://www.r6maps.com/api/stats/operators.php' + queryString,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000
    }).fail(operatorErrorCallback);

    $.when(mapCall).then(function (rawMapData) {
      mapSuccessCallback(R6MapsStatsMapData.getFromApiData(rawMapData));
    });
    $.when(mapCall, operatorsCall).then(function (rawMapData, rawOperatorsData) {
      operatorSuccessCallback(
        R6MapsStatsOperatorsData.getFromApiData(
          rawOperatorsData[0],
          R6MapsStatsMapData.getTotalRoundsFromApiData(rawMapData[0])
        )
      );
      allSuccessCallback();
    });
  };

  return  {
    getMapAndOperator: getMapAndOperator
  };
})();
