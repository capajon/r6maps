'use strict';

var R6MStatsOpRender = (function(R6MapsCommonLangTerms, undefined) {
  var statTerms = R6MapsCommonLangTerms.terms.stats,
    locale = R6MapsCommonLangTerms.name.split('_')[0],
    statColumns = [
      { key: 'pickRate', name: statTerms.tableHeaderPickRate, displayType: 'percent', canAverage: true },
      { key: 'winRate', name: statTerms.tableHeaderWinRate, displayType: 'percent', canAverage: true },
      { key: 'survivalRate', name: statTerms.tableHeaderSurvivalRate, displayType: 'percent', canAverage: true },
      { key: 'killsPerDeath', name: statTerms.tableHeaderKillsPerDeath, displayType: 'ratio', canAverage: true },
      { key: 'killsPerRound', name: statTerms.tableHeaderKillsPerRound, displayType: 'ratio', canAverage: true },
      { key: 'totalPlays', name: statTerms.tableHeaderTotalRounds, displayType: 'number', canAverage: false }
    ];

  var getFormattedNumber = function getFormattedNumber(num, displayType, minimal) {
    switch (displayType) {
    case 'percent':
      num *= 100;
      num = (num < 10) ? num.toFixed(1) : Math.round(num);
      return minimal ? num : R6MapsCommonLangTerms.terms.stats.percentageFormat.replace('{num}', num);
      break;
    case 'ratio':
      return num.toFixed(1);
      break;
    default: // number
      var locale = R6MapsCommonLangTerms.name.split('_')[0];

      if (num.toLocaleString) {
        return num.toLocaleString(locale);
      } else {
        return numberWithCommas(num);
      }
    }
  };

  var getOperatorsHtml = function getOperatorsHtml(operatorsData, ranksData, selectedSkillRanks) {
    var html = '',
      numSkillColumns = selectedSkillRanks.length + 1; // +1 for ALL

    html += '<div class="table-container"><table>';

    html += getMainHeaderHtml(numSkillColumns, R6MapsCommonLangTerms.terms.stats.tableHeaderAttackers, 'attackers');
    html += getSubHeaderHtml(ranksData, selectedSkillRanks);
    html += getOperatorsForRoleHtml(operatorsData.attackers, ranksData, selectedSkillRanks, 'attackers');

    html += getMainHeaderHtml(numSkillColumns, R6MapsCommonLangTerms.terms.stats.tableHeaderDefenders, 'defenders');
    html += getSubHeaderHtml(ranksData, selectedSkillRanks);
    html += getOperatorsForRoleHtml(operatorsData.defenders, ranksData, selectedSkillRanks, 'defenders');

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
    ranksData,
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
        selectedSkillRanks.forEach(function(rankKey) {
          html += '<td class="can-hide ' + ranksData[rankKey].cssClass + '"><span>';
          html += (operator.statsByRank[rankKey]) ?
            getFormattedNumber(operator.statsByRank[rankKey][statColumn.key], statColumn.displayType, true) :
            '-';
          html += '</span></td>';
        });
      });
      html += '</tr>';
    });
    return html;
  };

  var getSubHeaderHtml = function getSubHeaderHtml(
    ranksData,
    selectedSkillRanks
  ) {
    var html = '',
      srData;

    html += '<tr class="sub-header">';
    html += '<th class="operator-icon"></th>';
    html += '<th class="name"><span tabindex="0" class="sortable" data-sortfield="name">' + R6MapsCommonLangTerms.terms.stats.tableHeaderName + '</span></th>'; // name column
    statColumns.forEach(function(statColumn) {
      html += '<th class="all"><span class="sortable" data-sortfield="' + statColumn.key + '" tabindex="0">' + R6MapsCommonLangTerms.terms.stats.tableHeaderAllRanks + '</span></th>';
      selectedSkillRanks.forEach(function(rankKey) {
        srData = ranksData[rankKey];
        html += '<th class="can-hide ' + srData.cssClass + '"><span><div tabindex="0" data-sortfield="' + statColumn.key + '" data-sortrank="' + rankKey + '" title="' + srData.name + '" class="sortable rank-icon ' + srData.cssClass + '"></div></span></th>';
      });
    });
    html += '</tr>';
    return html;
  };

  var numberWithCommas = function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  var render = function render(operatorsData, $outputEl, statsData, selectedSkillRanks, sortCallback) {
    $outputEl.html(getOperatorsHtml(operatorsData, statsData.ranks, selectedSkillRanks));
    setupSortColumns($outputEl, sortCallback);
  };

  var setupSortColumns = function setupSortColumns($outputEl, sortCallback) {
    $outputEl.find('.sortable').on('click', function(event) {
      var source = $(event.target);

      sortCallback(source.data('sortfield'), source.data('sortrank'));
    });
  };

  return  {
    render: render
  };
})(R6MapsCommonLangTerms);
