'use strict';

var R6MStatsOpData = (function(R6MLangTerms, undefined) {
  var opStats = { attackers: [], defenders: [] };

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

  var getCurrentStats = function getCurrentStats() {
    return opStats;
  };

  var getOpRoleStats = function getOpRoleStats(apiOpData, totalRounds, opMetaData) {
    var opRoleStats = [],
      totalPlaysByRank = {},
      totalPlaysAllRanks = 0;

    for (var opKey in apiOpData) {
      var newOpStats = {
        name: opMetaData[opKey].name,
        cssClass: opMetaData[opKey].cssClass,
        statsByRank: {},
        statsAllRanks: getEmptyStatsObject(),
        averagesByRank: {},
        averagesAllRanks: getEmptyStatsObject()
      };

      for (var rankKey in apiOpData[opKey]) {
        var opRankStats = getEmptyStatsObject(),
          apiOpRankData = apiOpData[opKey][rankKey];

        ['totalWins', 'totalKills', 'totalDeaths', 'totalPlays'].forEach(function(statKey) {
          opRankStats[statKey] = +apiOpRankData[statKey];
          newOpStats.statsAllRanks[statKey] += opRankStats[statKey];
        });

        totalPlaysByRank[rankKey] = totalPlaysByRank[rankKey] ?
          totalPlaysByRank[rankKey] + opRankStats.totalPlays : opRankStats.totalPlays;
        totalPlaysAllRanks += opRankStats.totalPlays;

        newOpStats.statsByRank[rankKey] = opRankStats;
      }

      opRoleStats.push(newOpStats);
    }
    setTallies(opRoleStats, totalRounds, totalPlaysByRank, totalPlaysAllRanks);
    setAverages(opRoleStats);
    return opRoleStats;
  };

  var set = function set(apiData, totalRounds, opMetaData) {
    opStats = {
      attackers: getOpRoleStats(apiData.role.Attacker, totalRounds, opMetaData),
      defenders: getOpRoleStats(apiData.role.Defender, totalRounds, opMetaData)
    };
  };

  var setAverages = function setAverages(opRoleStats) {
    // TODO
  };

  var setTallies = function setTallies(opRoleStats, totalRounds, totalPlaysByRank, totalPlaysAllRanks) {
    opRoleStats.forEach(function(operator) {
      setTalliesForRank(operator.statsAllRanks);
      operator.statsAllRanks.pickRate = (!totalRounds) ? 0 : operator.statsAllRanks.totalPlays / totalRounds;
      for (var rankKey in operator.statsByRank) {
        var stats = operator.statsByRank[rankKey];

        setTalliesForRank(stats);
        stats.pickRate = (!totalPlaysByRank[rankKey] || !operator.statsAllRanks.totalPlays || !totalPlaysAllRanks) ? 0 :
          (stats.totalPlays / totalPlaysByRank[rankKey]) / (operator.statsAllRanks.totalPlays / totalPlaysAllRanks) * operator.statsAllRanks.pickRate;
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

  var trySort = function trySort(sortField, optionalRank, descending) {
    trySortRole(opStats.attackers, sortField, optionalRank, descending);
    trySortRole(opStats.defenders, sortField, optionalRank, descending);
  };

  var trySortRole = function trySortRole(newOpStats, sortField, optionalRank, descending) {
    newOpStats.sort(function(a, b) {
      var aValue = a.name,
        bValue = b.name;

      if(!optionalRank) {
        aValue = a.statsAllRanks[sortField];
        bValue = b.statsAllRanks[sortField];
      } else {
        aValue = (a.statsByRank[optionalRank]) ? a.statsByRank[optionalRank][sortField] : -1;
        bValue = (b.statsByRank[optionalRank]) ? b.statsByRank[optionalRank][sortField] : -1;
      }

      if (aValue == bValue) {
        aValue = a.name;
        bValue = b.name;
      }

      if (descending) {
        return (aValue < bValue) ? -1 : 1;
      } else {
        return (aValue > bValue) ? -1 : 1;
      }
    });
  };

  return  {
    get: getCurrentStats,
    set: set,
    trySort: trySort
  };
})(R6MLangTerms);
