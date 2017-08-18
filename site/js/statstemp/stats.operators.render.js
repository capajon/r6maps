'use strict';

var R6MStatsOpRender = (function(R6MLangTerms, undefined) {
  var statTerms = R6MLangTerms.terms.stats,
    locale = R6MLangTerms.name.split('_')[0],
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
      return minimal ? num : R6MLangTerms.terms.stats.percentageFormat.replace('{num}', num);
      break;
    case 'ratio':
      return num.toFixed(1);
      break;
    default: // number
      var locale = R6MLangTerms.name.split('_')[0];

      if (num.toLocaleString) {
        return num.toLocaleString(locale);
      } else {
        return numberWithCommas(num);
      }
    }
  };

  var getOpHtml = function getOpHtml(opStats, ranksMetaData, enabledRanks) {
    var html = '',
      skillColumnCount = enabledRanks.length + 1; // +1 for 'ALL'

    html += '<div class="wrapper">';
    html += '<table>';

    html += getMainHeaderHtml(skillColumnCount, R6MLangTerms.terms.stats.tableHeaderAttackers, 'attackers');
    html += getSubHeaderHtml(ranksMetaData, enabledRanks);
    html += getOpRoleHtml(opStats.attackers, ranksMetaData, enabledRanks, 'attackers');

    html += getMainHeaderHtml(skillColumnCount, R6MLangTerms.terms.stats.tableHeaderDefenders, 'defenders');
    html += getSubHeaderHtml(ranksMetaData, enabledRanks);
    html += getOpRoleHtml(opStats.defenders, ranksMetaData, enabledRanks, 'defenders');

    html += '</table>';
    html += '</div>';

    return html;
  };

  var getMainHeaderHtml = function getMainHeaderHtml(
    skillColumnCount,
    headerText,
    roleCssClass
  ) {
    var html = '';

    html += '<tr class="main ' + roleCssClass + '">';
    html += '<th></th>';
    html += '<th class="op-name">' + headerText + '</th>';
    statColumns.forEach(function(statColumn) {
      html += '<th class="stat-name" colspan="' + skillColumnCount + '">' + statColumn.name + '</th>';
    });
    html += '</tr>';
    return html;
  };

  var getOpRoleHtml = function getOpRoleHtml(
    opStatsForRole,
    ranksMetaData,
    enabledRanks,
    roleCssClass
  ) {
    var html = '';

    opStatsForRole.forEach(function(operator) {
      html += '<tr class="' + roleCssClass + '">';
      html += '<td><div class="op-icon ' + operator.cssClass + '"></div></<td>';
      html += '<td class="op-name">' + operator.name + '</<td>';
      statColumns.forEach(function(statColumn) {
        html += '<td class="all-ranks">' + getFormattedNumber(operator.statsAllRanks[statColumn.key], statColumn.displayType) + '</td>'; // ALL
        enabledRanks.forEach(function(rankKey) {
          html += '<td class="can-hide ' + ranksMetaData[rankKey].cssClass + '"><span>';
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
    ranksMetaData,
    enabledRanks
  ) {
    var html = '',
      srData;

    html += '<tr class="sub">';
    html += '<th></th>';
    html += '<th class="op-name">';
    html += '<div tabindex="0" class="sortable" data-sortfield="name">';
    html += '<p>' + R6MLangTerms.terms.stats.tableHeaderName + '</p>';
    html += '</div>';
    html += '</th>';

    statColumns.forEach(function(statColumn) {

      html += '<th class="all-ranks">';
      html += '<div class="sortable" data-sortfield="' + statColumn.key + '" tabindex="0">';
      html += '<p>' + R6MLangTerms.terms.stats.tableHeaderAllRanks + '</p>';
      html += '</div>';
      html += '</th>';

      enabledRanks.forEach(function(rankKey) {
        srData = ranksMetaData[rankKey];
        html += '<th class="can-hide ' + srData.cssClass + '">';
        html += '<div class="sortable" tabindex="0" data-sortfield="' + statColumn.key + '" data-sortrank="' + rankKey + '" title="' + srData.name + '">';
        html += '<div class="rank-icon ' + srData.cssClass + '"></div>';
        html += '</div>';
        html += '</th>';
      });
    });
    html += '</tr>';
    return html;
  };

  var numberWithCommas = function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  var render = function render(opStats, $outputEl, ranksMetaData, enabledRanks, sortCb) {
    $outputEl.html(getOpHtml(opStats, ranksMetaData, enabledRanks));
    setupSortColumns($outputEl, sortCb);
  };

  var setupSortColumns = function setupSortColumns($outputEl, sortCb) {
    $outputEl.find('.sortable').on('click', function(event) {
      var source = $(event.target);

      if(!source.data('sortfield')){
        source = source.parent(); // maybe too fragile to html structure?
      }
      sortCb(source.data('sortfield'), source.data('sortrank'));
    });
  };

  return  {
    render: render
  };
})(R6MLangTerms);
