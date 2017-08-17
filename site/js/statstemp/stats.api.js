'use strict';

var R6MStatsApi = (function(undefined) {
  var getMapAndOperators = function getMapAndOperators(
    mapSuccessCallback,
    mapErrorCallback,
    operatorSuccessCallback,
    operatorErrorCallback,
    allSuccessCallback,
    queryString, // a little hacky, relies on UI param names matching API
    metaData
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
      mapSuccessCallback(R6MStatsMapData.getFromApiData(rawMapData, metaData));
    });
    $.when(mapCall, operatorsCall).then(function (rawMapData, opApiData) {
      R6MStatsOpData.update(
        opApiData[0],
        R6MStatsMapData.getTotalRoundsFromApiData(rawMapData[0]),
        metaData.operators
      );
      operatorSuccessCallback();
      allSuccessCallback();
    });
  };

  return  {
    getMapAndOperators: getMapAndOperators
  };
})();
