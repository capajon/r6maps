'use strict';

var R6MapsStatsOperatorsRender = (function(R6MapsCommonLangTerms, undefined) {
  var statTerms = R6MapsCommonLangTerms.terms.stats,
    locale = R6MapsCommonLangTerms.name.split('_')[0],
    statColumns = [
      { key: 'pickRate', name: statTerms.tableHeaderPickRate, displayType: 'percent' },
      { key: 'killsPerDeath', name: statTerms.tableHeaderKillsPerDeath, displayType: 'ratio' },
      { key: 'killsPerRound', name: statTerms.tableHeaderKillsPerRound, displayType: 'ratio' },
      { key: 'survivalRate', name: statTerms.tableHeaderSurvivalRate, displayType: 'percent' },
      { key: 'totalPlays', name: statTerms.tableHeaderTotalRounds, displayType: 'number' }
    ];

  var getFormattedNumber = function getFormattedNumber(num, displayType) {
    switch (displayType) {
    case 'percent':
      num *= 100;
      num = (num < 10) ? num.toFixed(1) : Math.round(num);
      return R6MapsCommonLangTerms.terms.stats.percentageFormat.replace('{num}', num);
      break;
    case 'ratio':
      return num.toFixed(2);
      break;
    default: // number
      var locale = R6MapsCommonLangTerms.name.split('_')[0];

      if (num.toLocaleString(locale)) {
        return num.toLocaleString(locale);
      } else {
        return num;
      }
    }
  };

  var getOperatorsHtml = function getOperatorsHtml(operatorsData, skillRanksData, selectedSkillRanks) {
    var html = '',
      numSkillColumns = selectedSkillRanks.length + 1; // +1 for ALL

    html += '<div class="table-container"><table>';

    html += getMainHeaderHtml(numSkillColumns, R6MapsCommonLangTerms.terms.stats.tableHeaderAttackers, 'attackers');
    html += getSubHeaderHtml(skillRanksData, selectedSkillRanks, statColumns.length);
    html += getOperatorsForRoleHtml(operatorsData.attackers, skillRanksData, selectedSkillRanks, 'attackers');

    html += getMainHeaderHtml(numSkillColumns, R6MapsCommonLangTerms.terms.stats.tableHeaderDefenders, 'defenders');
    html += getSubHeaderHtml(skillRanksData, selectedSkillRanks, statColumns.length);
    html += getOperatorsForRoleHtml(operatorsData.defenders, skillRanksData, selectedSkillRanks, 'defenders');

    html += '</table></div>';

    return html;
  };

  var getMainHeaderHtml = function getMainHeaderHtml(
    numSkillColumns,
    headerText,
    roleCssClass
  ) {
    var html = '';

    html += '<tr class="main-header ' + roleCssClass + '">';
    html += '<th class="operator-icon"></th>';
    html += '<th class="name">' + headerText + '</th>';
    statColumns.forEach(function(statColumn) {
      html += '<th colspan="' + numSkillColumns + '">' + statColumn.name + '</th>';
    });
    html += '</tr>';
    return html;
  };

  var getOperatorsForRoleHtml = function getOperatorsForRoleHtml(
    operatorsDataForRole,
    skillRanksData,
    selectedSkillRanks,
    roleCssClass
  ) {
    var html = '';

    operatorsDataForRole.forEach(function(operator) {
      html += '<tr class="' + roleCssClass + '">';
      html += '<td class="operator-icon"><div class="' + operator.cssClass + '"></div></<td>';
      html += '<td class="name">' + operator.name + '</<td>';
      statColumns.forEach(function(statColumn) {
        html += '<td class="all">' + getFormattedNumber(operator.statsAllRanks[statColumn.key], statColumn.displayType) + '</td>'; // ALL
        selectedSkillRanks.forEach(function(skillRankKey) {
          html += '<td class="can-hide ' + skillRanksData[skillRankKey].cssClass + '"><span>';
          html += (operator.statsByRank[skillRankKey]) ?
            getFormattedNumber(operator.statsByRank[skillRankKey][statColumn.key], statColumn.displayType) :
            '-';
          html += '</span></td>';
        });
      });
      html += '</tr>';
    });
    return html;
  };

  var getSubHeaderHtml = function getSubHeaderHtml(
    skillRanksData,
    selectedSkillRanks,
    numMainColumns
  ) {
    var html = '',
      srData,
      x;

    html += '<tr class="sub-header">';
    html += '<th class="operator-icon"></th>';
    html += '<th></th>'; // name column
    for (x = 0; x < numMainColumns; x++) {
      html += '<th class="all">' + R6MapsCommonLangTerms.terms.stats.tableHeaderAllRanks + '</th>';
      selectedSkillRanks.forEach(function(skillRankKey) {
        srData = skillRanksData[skillRankKey];
        html += '<th class="can-hide ' + srData.cssClass + '"><span><div class="rank-icon ' + srData.cssClass + '"></span></div></th>';
      });
    }
    html += '</tr>';
    return html;
  };

  var render = function render(operatorsData, $outputEl, statsData, selectedSkillRanks) {
    $outputEl.html(getOperatorsHtml(operatorsData, statsData.skillRanks, selectedSkillRanks));
    console.log('Operators success', operatorsData);
  };

  return  {
    render: render
  };
})(R6MapsCommonLangTerms);
