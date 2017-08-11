'use strict';

var R6MapsStatsOperatorsData = (function(R6MapsCommonLangTerms, undefined) {
  var operatorTerms = R6MapsCommonLangTerms.terms.operators,
    operators = {
      'BOPE-CAPITAO': {
        description: operatorTerms.capitao,
        cssClass: 'capitao'
      },
      'G.E.O.-JACKAL': {
        description: operatorTerms.jackal,
        cssClass: 'jackal'
      },
      'GIGN-MONTAGNE': {
        description: operatorTerms.montagne,
        cssClass: 'montagne'
      },
      'GIGN-RESERVE': {
        description: operatorTerms.gignRecruit,
        cssClass: 'montagne'
      },
      'GIGN-TWITCH': {
        description: operatorTerms.twitch,
        cssClass: 'twitch'
      },
      'GSG9-BLITZ': {
        description: operatorTerms.blitz,
        cssClass: 'twitch'
      },
      'GSG9-IQ': {
        description: operatorTerms.iq,
        cssClass: 'iq'
      },
      'GSG9-RESERVE': {
        description: operatorTerms.gsg9Recruit,
        cssClass: 'gsg9-recruit'
      },
      'JTF2-BUCK': {
        description: operatorTerms.buck,
        cssClass: 'buck'
      },
      'NAVYSEAL-BLACKBEARD': {
        description: operatorTerms.blackbeard,
        cssClass: 'blackbeard'
      },
      'SAS-RESERVE': {
        description: operatorTerms.sasRecruit,
        cssClass: 'sas-recruit'
      },
      'SAS-SLEDGE': {
        description: operatorTerms.sledge,
        cssClass: 'sledge'
      },
      'SAS-THATCHER': {
        description: operatorTerms.thatcher,
        cssClass: 'thatcher'
      },
      'SAT-HIBANA': {
        description: operatorTerms.hibana,
        cssClass: 'hibana'
      },
      'SPETSNAZ-FUZE': {
        description: operatorTerms.fuze,
        cssClass: 'fuze'
      },
      'SPETSNAZ-GLAZ': {
        description: operatorTerms.glaz,
        cssClass: 'glaz'
      },
      'SPETSNAZ-RESERVE': {
        description: operatorTerms.spetsnazRecruit,
        cssClass: 'spetsnaz-recruit'
      },
      'SWAT-ASH': {
        description: operatorTerms.ash,
        cssClass: 'ash'
      },
      'SWAT-RESERVE': {
        description: operatorTerms.swatRecruit,
        cssClass: 'swat-recruit'
      },
      'SWAT-THERMITE': {
        description: operatorTerms.thermite,
        cssClass: 'thermite'
      },
      'BOPE-CAVEIRA': {
        description: operatorTerms.caveira,
        cssClass: 'caveira'
      },
      'G.E.O.-MIRA': {
        description: operatorTerms.mira,
        cssClass: 'mira'
      },
      'GIGN-DOC': {
        description: operatorTerms.doc,
        cssClass: 'doc'
      },
      'GIGN-ROOK': {
        description: operatorTerms.rook,
        cssClass: 'rook'
      },
      'GSG9-BANDIT': {
        description: operatorTerms.bandit,
        cssClass: 'bandit'
      },
      'GSG9-JAGER': {
        description: operatorTerms.jager,
        cssClass: 'jager'
      },
      'JTF2-FROST': {
        description: operatorTerms.frost,
        cssClass: 'frost'
      },
      'NAVYSEAL-VALKYRIE': {
        description: operatorTerms.valkyrie,
        cssClass: 'valkyrie'
      },
      'SAS-MUTE': {
        description: operatorTerms.mute,
        cssClass: 'mute'
      },
      'SAS-SMOKE': {
        description: operatorTerms.smoke,
        cssClass: 'smoke'
      },
      'SAT-ECHO': {
        description: operatorTerms.echo,
        cssClass: 'echo'
      },
      'SPETSNAZ-KAPKAN': {
        description: operatorTerms.kapkan,
        cssClass: 'kapkan'
      },
      'SPETSNAZ-TACHANKA': {
        description: operatorTerms.tachanka,
        cssClass: 'tachanka'
      },
      'SWAT-CASTLE': {
        description: operatorTerms.castle,
        cssClass: 'castle'
      },
      'SWAT-PULSE': {
        description: operatorTerms.pulse,
        cssClass: 'pulse'
      }
    };

  var getFromApiData = function getFromApiData(rawOperatorsData, totalRoundsMap) {
    return {
      attackers: getOperatorsDataForRole(rawOperatorsData.role.Attacker, totalRoundsMap),
      defenders: getOperatorsDataForRole(rawOperatorsData.role.Defender, totalRoundsMap)
    };
  };

  var getOperatorsDataForRole = function getOperatorsDataForRole(rawOperatorsDataSide, totalRoundsMap) {
    var operatorData,
      result = [],
      sumTotalRoundsPlayedAllSkill = 0,
      sumTotalRoundsPlayedForSkill = 0;

    for (var key in rawOperatorsDataSide) {
      operatorData =  rawOperatorsDataSide[key];
      result.push(
        {
          name: operators[key].description,
          cssClass: operators[key].cssClass,
          killsToDeath: operatorData.totalKills / operatorData.totalDeaths,
          killsPerRound: operatorData.totalKills / operatorData.totalPlays,
          winRate: operatorData.totalWins / operatorData.totalPlays,
          survivalRate: (operatorData.totalPlays - operatorData.totalDeaths) / operatorData.totalPlays * 100,
          pickRateAllSkill: operatorData.totalPlaysAllSkillRank / totalRoundsMap * 100,// TODO improve to be skill
          totalRoundsPlayed: +operatorData.totalPlays,
          totalPlaysAllSkillRank: +operatorData.totalPlaysAllSkillRank
        }
      );
      sumTotalRoundsPlayedForSkill += +operatorData.totalPlays;
      sumTotalRoundsPlayedAllSkill += +operatorData.totalPlaysAllSkillRank;
    }

    result.forEach(function(op) {
      var percentChosenAllSkill = op.totalPlaysAllSkillRank / sumTotalRoundsPlayedAllSkill, // need to check for 0?
        percentChosenForSkill = op.totalRoundsPlayed / sumTotalRoundsPlayedForSkill; // need to check for 0?

      op.pickRateAdjustedForSkill = percentChosenForSkill / percentChosenAllSkill * op.pickRateAllSkill;
    });

    result.sort(function(a, b){
      return (a.name < b.name) ? -1 : 1;
    });
    return result;
  };

  return  {
    getFromApiData: getFromApiData
  };
})(R6MapsCommonLangTerms);
