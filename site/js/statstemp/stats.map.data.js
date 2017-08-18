'use strict';

var R6MStatsMapData = (function(undefined) {
  var mapStats = {};

  var checkEmptyData = function checkEmptyData(mapApiData) {
    if (!mapApiData || !mapApiData.winRole || !mapApiData.winRole.Attacker || !mapApiData.winRole.Defender) {
      console.error('Unexpected error encountered while processing map API data.', mapApiData);
      return true;
    }
    return false;
  };

  var getMapRoleStats = function getMapRoleStats(mapRoleApiData, winReasonsMetaData) {
    var mapRoleStats = {
        totalRoundsWon: +mapRoleApiData.totalRounds,
        averageRoundLength: +mapRoleApiData.averageRoundDuration,
        winReasons: []
      },
      winReason,
      winReasonMeta;

    for (var winReasonKey in winReasonsMetaData) {
      winReasonMeta = winReasonsMetaData[winReasonKey];
      winReason = mapRoleApiData[winReasonKey];

      if (winReason && (winReason != '0')) {
        mapRoleStats.winReasons.push({
          description: winReasonMeta.name,
          cssClass: winReasonMeta.cssClass,
          totalRounds: +winReason,
          percent: (!mapRoleApiData.totalRounds) ? 0 : +winReason / +mapRoleApiData.totalRounds
        });
      }
    }

    mapRoleStats.winReasons.sort(function(x,y) {
      if (x.totalRounds < y.totalRounds) {
        return 1;
      }
    });
    return mapRoleStats;
  };

  var getOverallMapStats = function getOverallMapStats(mapApiData) {
    var overallStats = {};

    overallStats.totalRounds = mapStats.attackers.totalRoundsWon + mapStats.defenders.totalRoundsWon;
    overallStats.averageRoundLength = (!overallStats.totalRounds) ? 0 : ((mapStats.attackers.totalRoundsWon * mapStats.attackers.averageRoundLength) + (mapStats.defenders.totalRoundsWon * mapStats.defenders.averageRoundLength)) / overallStats.totalRounds;
    mapStats.attackers.winPercent = (!overallStats.totalRounds) ? 0 : mapStats.attackers.totalRoundsWon / overallStats.totalRounds;
    mapStats.defenders.winPercent = (!overallStats.totalRounds) ? 0 : mapStats.defenders.totalRoundsWon / overallStats.totalRounds, 5;
    return overallStats;
  };

  var getSavedStats = function getSavedStats() {
    return mapStats;
  };

  var getTotalRoundsFromApiData = function getTotalRoundsFromApiData(mapApiData) {
    if (checkEmptyData(mapApiData)) {
      return null;
    }
    return +mapApiData.winRole.Attacker.totalRounds + +mapApiData.winRole.Defender.totalRounds;
  };

  var setFromApiData = function getFromApiData(mapApiData, winReasonsMetaData) {
    if (checkEmptyData(mapApiData)) {
      mapStats = null;
      return;
    }

    mapStats.attackers = getMapRoleStats(mapApiData.winRole.Attacker, winReasonsMetaData);
    mapStats.defenders = getMapRoleStats(mapApiData.winRole.Defender, winReasonsMetaData);
    mapStats.overall = getOverallMapStats(mapApiData);
  };

  return  {
    set: setFromApiData,
    get: getSavedStats,
    getTotalRoundsFromApiData: getTotalRoundsFromApiData
  };
})();
