'use strict';

var R6MapsStatsOperatorsData = (function(R6MapsCommonLangTerms, undefined) {
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
    }
  };

  var getFromApiData = function getFromApiData(rawOperatorsData, totalRoundsMap, statsData) {
    return {
      attackers: getOperatorsDataForRole(rawOperatorsData.role.Attacker, totalRoundsMap, statsData.skillRanks, statsData.operators),
      defenders: getOperatorsDataForRole(rawOperatorsData.role.Defender, totalRoundsMap, statsData.skillRanks, statsData.operators)
    };
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

        tempStatsByRank.name = ranks[skillRankKey].name;
        tempStatsByRank.cssClass = ranks[skillRankKey].cssClass;
        tempStatsByRank.order = ranks[skillRankKey].order;

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

    result.sort(function(a, b){
      return (a.name < b.name) ? -1 : 1;
    });

    setTallies(result, totalRoundsMap, totalPlaysByRank, totalPlaysAll);

    return result;
  };

  var setTallies = function setTallies(dataToTally, totalRoundsMap, totalPlaysByRank, totalPlaysAll) {
    dataToTally.forEach(function(operator) {
      setTalliesForRank(operator.statsAllRanks);
      operator.statsAllRanks.pickRate = (!totalRoundsMap) ? 0 : operator.statsAllRanks.totalPlays / totalRoundsMap;
      for(var rankKey in operator.statsByRank) {
        var stats = operator.statsByRank[rankKey];

        setTalliesForRank(stats);
        stats.pickRate = (!totalPlaysByRank[stats.key] || !operator.statsAllRanks.totalPlays || !totalPlaysAll) ? 0 :
          (stats.totalPlays / totalPlaysByRank[stats.key]) / (operator.statsAllRanks.totalPlays / totalPlaysAll) * operator.statsAllRanks.pickRate;
        stats.pickRate = Math.min(0.98, Math.max(0.001, stats.pickRate));
      }
    });
  };

  var setTalliesForRank = function setTalliesForRank(stats) {
    stats.killsPerDeath = (!stats.totalDeaths) ? 0 : stats.totalKills / stats.totalDeaths;
    stats.killsPerRound = (!stats.totalPlays) ? 0 : stats.totalKills / stats.totalPlays;
    stats.survivalRate = (!stats.totalPlays) ? 0 : (stats.totalPlays - stats.totalDeaths) / stats.totalPlays;
    stats.winRate = (!stats.totalPlays) ? 0 : stats.totalWins / stats.totalPlays;
  };

  return  {
    getFromApiData: getFromApiData
  };
})(R6MapsCommonLangTerms);
