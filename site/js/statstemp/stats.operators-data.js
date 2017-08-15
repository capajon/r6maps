'use strict';

var R6MapsStatsOperatorsData = (function(R6MapsCommonLangTerms, undefined) {
  var operatorsData = { attackers: [], defenders: [] };

  var getEmptyStatsObject = function getEmptyStatsObject() {
    return {
      totalKills: 0,
      totalDeaths: 0,
      totalPlays: 0,
      totalWins: 0,
      killsPerRound: 0,
      killsPerDeath: 0,
      pickRate: 0,
      winRate: 0,
      survivalRate: 0
    };
  };

  var getCurrentData = function getCurrentData() {
    return operatorsData;
  };

  var getOperatorsDataForRole = function getOperatorsDataForRole(rawOperatorsDataForRole, totalRoundsMap, ranks, operators) {
    var result = [],
      totalPlaysByRank = {},
      totalPlaysAll = 0;

    for (var operatorKey in rawOperatorsDataForRole) {
      var operatorData = {
        name: operators[operatorKey].name,
        cssClass: operators[operatorKey].cssClass,
        statsByRank: {},
        statsAllRanks: getEmptyStatsObject()
      };

      for (var skillRankKey in rawOperatorsDataForRole[operatorKey]) {
        var tempStatsByRank = getEmptyStatsObject();

        tempStatsByRank.totalWins = +rawOperatorsDataForRole[operatorKey][skillRankKey].totalWins;
        operatorData.statsAllRanks.totalWins += tempStatsByRank.totalWins;

        tempStatsByRank.totalKills = +rawOperatorsDataForRole[operatorKey][skillRankKey].totalKills;
        operatorData.statsAllRanks.totalKills += tempStatsByRank.totalKills;

        tempStatsByRank.totalDeaths = +rawOperatorsDataForRole[operatorKey][skillRankKey].totalDeaths;
        operatorData.statsAllRanks.totalDeaths += tempStatsByRank.totalDeaths;

        tempStatsByRank.totalPlays = +rawOperatorsDataForRole[operatorKey][skillRankKey].totalPlays;
        operatorData.statsAllRanks.totalPlays += tempStatsByRank.totalPlays;

        totalPlaysByRank[skillRankKey] = totalPlaysByRank[skillRankKey] ?
          totalPlaysByRank[skillRankKey] + tempStatsByRank.totalPlays : tempStatsByRank.totalPlays;
        totalPlaysAll += tempStatsByRank.totalPlays;

        operatorData.statsByRank[skillRankKey] = tempStatsByRank;
      }

      result.push(operatorData);
    }
    setTallies(result, totalRoundsMap, totalPlaysByRank, totalPlaysAll);
    return result;
  };

  var saveFromApiData = function saveFromApiData(rawOperatorsData, totalRoundsMap, statsData) {
    operatorsData = {
      attackers: getOperatorsDataForRole(rawOperatorsData.role.Attacker, totalRoundsMap, statsData.skillRanks, statsData.operators),
      defenders: getOperatorsDataForRole(rawOperatorsData.role.Defender, totalRoundsMap, statsData.skillRanks, statsData.operators)
    };
  };

  var setTallies = function setTallies(dataToTally, totalRoundsMap, totalPlaysByRank, totalPlaysAll) {
    dataToTally.forEach(function(operator) {
      setTalliesForRank(operator.statsAllRanks);
      operator.statsAllRanks.pickRate = (!totalRoundsMap) ? 0 : operator.statsAllRanks.totalPlays / totalRoundsMap;
      for (var rankKey in operator.statsByRank) {
        var stats = operator.statsByRank[rankKey];

        setTalliesForRank(stats);
        stats.pickRate = (!totalPlaysByRank[rankKey] || !operator.statsAllRanks.totalPlays || !totalPlaysAll) ? 0 :
          (stats.totalPlays / totalPlaysByRank[rankKey]) / (operator.statsAllRanks.totalPlays / totalPlaysAll) * operator.statsAllRanks.pickRate;
        stats.pickRate = Math.min(0.99, Math.max(0.001, stats.pickRate));
      }
    });
  };

  var setTalliesForRank = function setTalliesForRank(stats) {
    stats.killsPerDeath = (!stats.totalDeaths) ? 0 : stats.totalKills / stats.totalDeaths;
    stats.killsPerRound = (!stats.totalPlays) ? 0 : stats.totalKills / stats.totalPlays;
    stats.survivalRate = (!stats.totalPlays) ? 0 : (stats.totalPlays - stats.totalDeaths) / stats.totalPlays;
    stats.winRate = (!stats.totalPlays) ? 0 : stats.totalWins / stats.totalPlays;
  };

  var trySort = function trySort(sortField, optionalRank) {
    trySortForRole(operatorsData.attackers, sortField, optionalRank);
    trySortForRole(operatorsData.defenders, sortField, optionalRank);
  };

  var trySortForRole = function trySortForRole(operators, sortField, optionalRank) {
    if (operators[0] && (!operators[0].statsAllRanks[sortField])) {
      sortField = 'name'; //fallback
    }
    if (operators[0] && (!operators[0].statsByRank[optionalRank])) {
      optionalRank = null;
    }

    operators.sort(function(a, b) {
      if (sortField == 'name') {
        return (a.name < b.name) ? -1 : 1;
      } else if (optionalRank) {
        return (a.statsByRank[optionalRank][sortField] > b.statsByRank[optionalRank][sortField]) ? -1 : 1;
      } else {
        return (a.statsAllRanks[sortField] > b.statsAllRanks[sortField]) ? -1 : 1;
      }
    });
  };

  return  {
    saveFromApiData: saveFromApiData,
    get: getCurrentData,
    trySort: trySort
  };
})(R6MapsCommonLangTerms);
