'use strict';

var R6MapsStatsMapData = (function(undefined) {
  var checkEmptyData = function checkEmptyData(rawMapData) {
    if (!rawMapData || !rawMapData.winRole || !rawMapData.winRole.Attacker || !rawMapData.winRole.Defender) {
      console.error('Unexpected error encountered while processing map API data.', rawMapData);
      return true;
    }
    return false;
  };

  var getFromApiData = function getFromApiData(rawMapData, statsData) {
    var result = {};

    if (checkEmptyData(rawMapData)) {
      return null;
    }

    result.attackers = getMapDataForRole(rawMapData.winRole.Attacker, statsData.mapRoundWinReasons);
    result.defenders = getMapDataForRole(rawMapData.winRole.Defender, statsData.mapRoundWinReasons);

    result.overall = {};
    result.overall.totalRounds = result.attackers.totalRoundsWon + result.defenders.totalRoundsWon;
    result.overall.averageRoundLength = (!result.overall.totalRounds) ? 0 :
      ((result.attackers.totalRoundsWon * result.attackers.averageRoundLength) + (result.defenders.totalRoundsWon * result.defenders.averageRoundLength)) / result.overall.totalRounds;
    result.attackers.winPercent = (!result.overall.totalRounds) ? 0 :
      result.attackers.totalRoundsWon / result.overall.totalRounds;
    result.defenders.winPercent = (!result.overall.totalRounds) ? 0 :
      result.defenders.totalRoundsWon / result.overall.totalRounds, 5;

    return result;
  };

  var getMapDataForRole = function getMapDataForRole(rawMapDataForRole, mapRoundWinReasons) {
    var result = {
      totalRoundsWon: +rawMapDataForRole.totalRounds,
      averageRoundLength: +rawMapDataForRole.averageRoundDuration,
      winReasons: []
    };

    for (var key in mapRoundWinReasons) {
      if (rawMapDataForRole[key] && (rawMapDataForRole[key] != '0')) {
        result.winReasons.push({
          description: mapRoundWinReasons[key].name,
          totalRounds: +rawMapDataForRole[key],
          percent: (!rawMapDataForRole.totalRounds) ? 0 : +rawMapDataForRole[key] / +rawMapDataForRole.totalRounds
        });
      }
    }

    result.winReasons.sort(function(x,y) {
      if (x.totalRounds < y.totalRounds) {
        return 1;
      }
    });

    return result;
  };

  var getTotalRoundsFromApiData = function getTotalRoundsFromApiData(rawMapData) {
    if (checkEmptyData(rawMapData)) {
      return null;
    }
    return +rawMapData.winRole.Attacker.totalRounds + +rawMapData.winRole.Defender.totalRounds;
  };

  return  {
    getFromApiData: getFromApiData,
    getTotalRoundsFromApiData: getTotalRoundsFromApiData
  };
})();
