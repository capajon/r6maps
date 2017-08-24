'use strict';

var R6MStatsOpData = (function(R6MLangTerms, undefined) {
  var WARNING_THRESHOLD = 20,
    opStats = {
      attackers: [],
      defenders: [],
      sortInfo: {
        field: null,
        rank: null,
        isDescending: null
      }
    };

  var getAveragesTotals = function getAveragesTotals(opRoleStats) {
    var count = 0,
      averagesTotals = {};

    for (var opKey in opRoleStats) {
      for (var sarKey in opRoleStats[opKey].statsAllRanks) {
        averagesTotals[sarKey] = averagesTotals[sarKey] || {};
        averagesTotals[sarKey].all = averagesTotals[sarKey].all || { total: 0, avg: 0 };
        averagesTotals[sarKey].all.total += opRoleStats[opKey].statsAllRanks[sarKey];
      }
      for (var sbrKey in opRoleStats[opKey].statsByRank) {
        for (var key in opRoleStats[opKey].statsByRank[sbrKey]) {
          averagesTotals[key] = averagesTotals[key] || {};
          averagesTotals[key][sbrKey] = averagesTotals[key][sbrKey] || { total: 0, avg: 0 };
          averagesTotals[key][sbrKey].total += opRoleStats[opKey].statsByRank[sbrKey][key];
        }
      }
      count++;
    }

    for (var statKey in averagesTotals) {
      for (var operator in averagesTotals[statKey]) {
        averagesTotals[statKey][operator].avg = averagesTotals[statKey][operator].total / count;
      }
    }
    return averagesTotals;
  };

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
      survivalRate: 0,
      warning: false
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
        key: opKey,
        name: opMetaData[opKey].name,
        cssClass: opMetaData[opKey].cssClass,
        statsByRank: {},
        statsAllRanks: getEmptyStatsObject()
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
    setWarnings(opRoleStats);
    return {
      operators: opRoleStats,
      averagesTotals: getAveragesTotals(opRoleStats)
    };
  };

  var set = function set(apiData, totalRounds, opMetaData) {
    opStats.attackers = getOpRoleStats(apiData.role.Attacker, totalRounds, opMetaData);
    opStats.defenders = getOpRoleStats(apiData.role.Defender, totalRounds, opMetaData);
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

  var setWarnings = function setWarnings(opRoleStats) {
    for (var opKey in opRoleStats) {
      if (opRoleStats[opKey].statsAllRanks.totalPlays < WARNING_THRESHOLD) {
        opRoleStats[opKey].statsAllRanks.warning = true;
      }
      for (var rankKey in opRoleStats[opKey].statsByRank) {
        if (opRoleStats[opKey].statsByRank[rankKey].totalPlays < WARNING_THRESHOLD) {
          opRoleStats[opKey].statsByRank[rankKey].warning = true;
        }
      }
    }
  };

  var trySort = function trySort(sortField, isDescending, optionalRank) {
    opStats.sortInfo.field = sortField || 'name';
    opStats.sortInfo.rank = optionalRank;
    opStats.sortInfo.isDescending = isDescending;
    trySortRole(opStats.attackers.operators, sortField, isDescending, optionalRank);
    trySortRole(opStats.defenders.operators, sortField, isDescending, optionalRank);
  };

  var trySortRole = function trySortRole(newOpStats, sortField, isDescending, optionalRank) {
    newOpStats.sort(function(a, b) {
      var aValue = a.name,
        bValue = b.name,
        nameCompare = true;

      if (sortField != 'name') {
        nameCompare = false;
        if (!optionalRank) {
          aValue = a.statsAllRanks[sortField];
          bValue = b.statsAllRanks[sortField];
        } else {
          aValue = (a.statsByRank[optionalRank]) ? a.statsByRank[optionalRank][sortField] : -1;
          bValue = (b.statsByRank[optionalRank]) ? b.statsByRank[optionalRank][sortField] : -1;
        }
        if (aValue == bValue) {
          aValue = a.name;
          bValue = b.name;
          nameCompare = true;
        }
      }
      if (nameCompare) {
        if (aValue > bValue) {
          return 1;
        }
        if (aValue < bValue) {
          return -1;
        }
      } else {
        if (aValue < bValue) {
          return 1;
        }
        if (aValue > bValue) {
          return -1;
        }
      }
      return 0;
    });
    if (isDescending) {
      newOpStats.reverse();
    }
  };

  return  {
    get: getCurrentStats,
    set: set,
    trySort: trySort
  };
})(R6MLangTerms);
