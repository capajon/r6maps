'use strict';

var R6MapsStatsMapData = (function(R6MapsCommonLangTerms, undefined) {
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

  var checkEmptyData = function checkEmptyData(rawMapData) {
    if (!rawMapData || !rawMapData.winRole || !rawMapData.winRole.Attacker || !rawMapData.winRole.Defender) {
      console.error('Unexpected error encountered while processing map API data.', rawMapData);
      return true;
    }
    return false;
  };

  var getFromApiData = function getFromApiData(rawMapData) {
    var result = {};

    if (checkEmptyData(rawMapData)) {
      return null;
    }

    result.attackers = getMapDataForRole(rawMapData.winRole.Attacker);
    result.defenders = getMapDataForRole(rawMapData.winRole.Defender);

    result.overall = {};
    result.overall.totalRounds = result.attackers.totalRoundsWon + result.defenders.totalRoundsWon;
    result.overall.averageRoundLength =
      ((result.attackers.totalRoundsWon * result.attackers.averageRoundLength) + (result.defenders.totalRoundsWon * result.defenders.averageRoundLength)) / result.overall.totalRounds;
    result.attackers.winPercent = result.attackers.totalRoundsWon / result.overall.totalRounds * 100;
    result.defenders.winPercent = result.defenders.totalRoundsWon / result.overall.totalRounds * 100;

    return result;
  };

  var getMapDataForRole = function getMapDataForRole(rawMapDataSide) {
    var result = {
      totalRoundsWon: +rawMapDataSide.totalRounds,
      averageRoundLength: +rawMapDataSide.averageRoundDuration,
      winReasons: []
    };

    mapRoundWinReasonKeys.forEach(function(key) {
      if (rawMapDataSide[key] && (rawMapDataSide[key] != '0')) {
        result.winReasons.push({
          description: R6MapsCommonLangTerms.terms.statsRoundWinReasons[key],
          totalRounds: +rawMapDataSide[key],
          percent: +rawMapDataSide[key] / +rawMapDataSide.totalRounds * 100
        });
      }
    });

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
})(R6MapsCommonLangTerms);
