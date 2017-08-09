'use strict';

var R6MapsStatsApi = (function(undefined) {
  var mapRoundWinReasonKeys = [
    'allTeamsDead',
    'attackersEliminated',
    'attackersKilledHostage',
    'attackersSurrendered',
    'bombDeactivated_OneBomb',
    'bombExploded',
    'defendersEliminated',
    'defendersKilledHostage',
    'defendersSurrendered',
    'defuserDeactivated',
    'hostageExtracted',
    'noEnemies',
    'objectiveCaptured',
    'objectiveProtected',
    'timeExpired'
  ];

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
      url: 'http://www.r6maps.com/api/stats/operators.php?platform=PC' + '?platform=STUFF',// + queryString,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000
    }).fail(operatorErrorCallback);

    $.when(mapCall).then(function (rawMapData) {
      //TODO MASSAGE DATA
      mapSuccessCallback(getMapData(rawMapData));
    });

    $.when(mapCall, operatorsCall).then(function (rawMapData, rawOperatorsData) {
      operatorSuccessCallback(rawOperatorsData);
      allSuccessCallback();
    });
  };

  var getMapData = function getMapData(rawMapData) {
    var result = {};

    if (!rawMapData || !rawMapData.winRole || !rawMapData.winRole.Attacker || !rawMapData.winRole.Defender) {
      console.error('Unexpected rrror encountered while processing map API data.');
      return result;
    }

    result.attackers = getMapDataForRole(rawMapData.winRole.Attacker);
    result.defeders = getMapDataForRole(rawMapData.winRole.Defender);

    //TODO: overall average round length, overal round count, % won per attacker and defender
    return result;
  };

  var getMapDataForRole = function getMapDataForRole(rawMapDataSide) {
    var result = {
      totalRoundsWon: rawMapDataSide.totalRounds,
      averageRoundLength: rawMapDataSide.averageRoundDuration,
      winReasons: []
    };

    mapRoundWinReasonKeys.forEach(function(key) {
      if (rawMapDataSide[key] && (rawMapDataSide[key] != '0')) {
        result.winReasons.push({
          key: key,
          totalRounds: rawMapDataSide[key],
          percent: rawMapDataSide[key] / rawMapDataSide.totalRounds
        });
      }
    });

console.log('result peak', result);
    return result;
  };

  return  {
    getMapAndOperator: getMapAndOperator
  };
})();
