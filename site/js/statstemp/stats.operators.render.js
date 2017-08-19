'use strict';

var R6MStatsOpRender = (function(R6MLangTerms, undefined) {
  var statTerms = R6MLangTerms.terms.stats,
    locale = R6MLangTerms.name.split('_')[0],
    statColumns = [
      { key: 'pickRate', name: statTerms.tableHeaderPickRate, displayType: 'percent' },
      { key: 'winRate', name: statTerms.tableHeaderWinRate, displayType: 'percent' },
      { key: 'survivalRate', name: statTerms.tableHeaderSurvivalRate, displayType: 'percent' },
      { key: 'killsPerDeath', name: statTerms.tableHeaderKillsPerDeath, displayType: 'ratio' },
      { key: 'killsPerRound', name: statTerms.tableHeaderKillsPerRound, displayType: 'ratio' },
      { key: 'totalPlays', name: statTerms.tableHeaderTotalRounds, displayType: 'number', showTotal: true }
    ];

  var getAveragesTotalsHtml = function getAveragesTotalsHtml(
    averagesTotals, ranksMetaData, enabledRanks, roleCssClass
  ) {
    var html = '',
      avgTotalKey;

    html += '<tr class="' + roleCssClass + ' average-totals">';
    html += '<td></td>';
    html += '<td class="field-name">' + statTerms.averagesAndTotals + '</td>';

    statColumns.forEach(function(statColumn) {
      avgTotalKey = statColumn.showTotal ? 'total' : 'avg';

      html += '<td class="all-ranks">' + getFormattedNumber(averagesTotals[statColumn.key].all[avgTotalKey], statColumn.displayType) + '</td>';
      enabledRanks.forEach(function(rankKey) {
        html += '<td class="can-hide ' + ranksMetaData[rankKey].cssClass + '">';
        html += '<span>' + getFormattedNumber(averagesTotals[statColumn.key][rankKey][avgTotalKey], statColumn.displayType, true) + '</span>';
        html += '</td>';
      });
    });

    html += '</tr>';
    return html;
  };

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
    html += getSubHeaderHtml(ranksMetaData, enabledRanks, opStats.sortInfo);
    html += getOpRoleHtml(opStats.attackers.operators, ranksMetaData, enabledRanks, 'attackers');
    html += getAveragesTotalsHtml(opStats.attackers.averagesTotals, ranksMetaData, enabledRanks, 'attackers');

    html += getMainHeaderHtml(skillColumnCount, R6MLangTerms.terms.stats.tableHeaderDefenders, 'defenders');
    html += getSubHeaderHtml(ranksMetaData, enabledRanks, opStats.sortInfo);
    html += getOpRoleHtml(opStats.defenders.operators, ranksMetaData, enabledRanks, 'defenders');
    html += getAveragesTotalsHtml(opStats.defenders.averagesTotals, ranksMetaData, enabledRanks, 'defenders');

    html += '</table>';
    html += '</div>';

    return html;
  };

  var getMainHeaderHtml = function getMainHeaderHtml(
    skillColumnCount, headerText, roleCssClass
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
    opStatsForRole, ranksMetaData,  enabledRanks, roleCssClass
  ) {
    var html = '',
      warningCssClass = false;

    opStatsForRole.forEach(function(operator) {
      html += '<tr class="' + roleCssClass + '">';
      html += '<td><div class="op-icon ' + operator.cssClass + '"></div></td>';
      html += '<td class="op-name">' + operator.name + '</<td>';

      statColumns.forEach(function(statColumn) {
        html += '<td class="all-ranks">' + getFormattedNumber(operator.statsAllRanks[statColumn.key], statColumn.displayType) + '</td>'; // ALL

        enabledRanks.forEach(function(rankKey) {
          warningCssClass = (!operator.statsByRank[rankKey] || operator.statsByRank[rankKey].warning) ? 'warning ' : '';

          html += '<td class="can-hide ' + warningCssClass + ranksMetaData[rankKey].cssClass + '"><span>';
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
    ranksMetaData, enabledRanks, sortInfo
  ) {
    var html = '',
      srData,
      sortOrder,
      curSortClass,
      isCurSortCol;


    isCurSortCol = (sortInfo.field == 'name');
    sortOrder = (isCurSortCol && !sortInfo.isDescending) ? 'descending' : 'ascending';
    curSortClass = isCurSortCol ? ' current-sort ' + sortOrder : '';
    html += '<tr class="sub">';
    html += '<th></th>';
    html += '<th class="op-name">';
    html += '<div tabindex="0" class="sortable ' + curSortClass + '" data-sortfield="name" data-sortorder="' + sortOrder + '">';
    html += '<p>' + R6MLangTerms.terms.stats.tableHeaderName + '</p>';
    html += '<div class="sort-order-icon"></div>';
    html += '</div>';
    html += '</th>';

    statColumns.forEach(function(statColumn) {
      isCurSortCol = ((sortInfo.field == statColumn.key) && !sortInfo.rank);
      sortOrder = (isCurSortCol && !sortInfo.isDescending) ? 'descending' : 'ascending';
      curSortClass = isCurSortCol ? ' current-sort ' + sortOrder : '';
      html += '<th class="all-ranks">';
      html += '<div class="sortable' + curSortClass + '" data-sortfield="' + statColumn.key + '" data-sortorder="' + sortOrder + '" tabindex="0">';
      html += '<p>' + R6MLangTerms.terms.stats.tableHeaderAllRanks + '</p>';
      html += '<div class="sort-order-icon"></div>';
      html += '</div>';
      html += '</th>';

      enabledRanks.forEach(function(rankKey) {
        srData = ranksMetaData[rankKey];
        isCurSortCol = ((sortInfo.field == statColumn.key) && (sortInfo.rank == rankKey));
        sortOrder = (isCurSortCol && !sortInfo.isDescending) ? 'descending' : 'ascending';
        curSortClass = isCurSortCol ? ' current-sort ' + sortOrder : '';
        html += '<th class="can-hide ' + srData.cssClass + '">';
        html += '<div class="sortable' + curSortClass + '" tabindex="0" data-sortfield="' + statColumn.key + '" data-sortrank="' + rankKey + '" data-sortorder="' + sortOrder + '" title="' + srData.name + '">';
        html += '<div class="rank-icon ' + srData.cssClass + '"></div>';
        html += '<div class="sort-order-icon"></div>';
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
      var source = $(event.target),
        isDescending;

      if (!source.data('sortfield')){
        source = source.parent(); // maybe too fragile to html structure?
      }
      isDescending = (source.data('sortorder') == 'descending');
      sortCb(source.data('sortfield'), isDescending, source.data('sortrank'));
    });
  };

  return  {
    render: render
  };
})(R6MLangTerms);
