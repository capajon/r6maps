'use strict';

var R6MStatsOpRender = (function(R6MLangTerms, undefined) {
  var statTerms = R6MLangTerms.terms.stats,
    locale = R6MLangTerms.name.split('_')[0];

  var getAveragesTotalsHtml = function getAveragesTotalsHtml(
    averagesTotals, ranksMetaData, statTypesMetaData, ranksForSeason, roleCssClass
  ) {
    var html = '',
      avgTotalKey;

    html += '<tr class="' + roleCssClass + ' average-totals">';
    html += '<td></td>';
    html += '<td class="field-name">' + statTerms.averagesAndTotals + '</td>';

    for (var statKey in statTypesMetaData) {
      avgTotalKey = statTypesMetaData[statKey].showTotal ? 'total' : 'avg';

      html += '<td class="all-ranks">' + getFormattedNumber(averagesTotals[statKey].all[avgTotalKey], statTypesMetaData[statKey].displayType) + '</td>';
      ranksForSeason.forEach(function(rankKey) {
        html += '<td class="can-hide ' + ranksMetaData[rankKey].cssClass + '">';
        html += '<span>' + getFormattedNumber(averagesTotals[statKey][rankKey][avgTotalKey], statTypesMetaData[statKey].displayType, true) + '</span>';
        html += '</td>';
      });
    }

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

  var getOpHtml = function getOpHtml(opStats, ranksMetaData, rolesMetaData, statTypesMetaData, ranksForSeason) {
    var html = '',
      ranksShownCount = ranksForSeason.length + 1; // +1 for 'ALL'

    html += '<div class="wrapper">';
    html += '<table>';

    html += getMainHeaderHtml(ranksShownCount, R6MLangTerms.terms.stats.tableHeaderAttackers, rolesMetaData.attackers.cssClass, 'attackers', statTypesMetaData);
    html += getSubHeaderHtml(ranksMetaData, statTypesMetaData, ranksForSeason, opStats.sortInfo);
    html += getOpRoleHtml(opStats.attackers.operators, ranksMetaData, statTypesMetaData, ranksForSeason, rolesMetaData.attackers.cssClass);
    html += getAveragesTotalsHtml(opStats.attackers.averagesTotals, ranksMetaData, statTypesMetaData, ranksForSeason, rolesMetaData.attackers.cssClass);

    html += getMainHeaderHtml(ranksShownCount, R6MLangTerms.terms.stats.tableHeaderDefenders, rolesMetaData.defenders.cssClass, 'defenders', statTypesMetaData);
    html += getSubHeaderHtml(ranksMetaData, statTypesMetaData, ranksForSeason, opStats.sortInfo);
    html += getOpRoleHtml(opStats.defenders.operators, ranksMetaData, statTypesMetaData, ranksForSeason, rolesMetaData.defenders.cssClass);
    html += getAveragesTotalsHtml(opStats.defenders.averagesTotals, ranksMetaData, statTypesMetaData, ranksForSeason, rolesMetaData.defenders.cssClass);

    html += '</table>';
    html += '</div>';

    return html;
  };

  var getMainHeaderHtml = function getMainHeaderHtml(
    ranksShownCount, headerText, roleCssClass, roleKey, statTypesMetaData
  ) {
    var html = '';

    html += '<tr class="main ' + roleCssClass + '">';
    html += '<th></th>';
    html += '<th class="op-name">' + headerText + '</th>';
    for (var statKey in statTypesMetaData) {
      html += '<th class="stat-name" colspan="' + ranksShownCount + '" data-rolekey="' + roleKey + '" data-statkey = "' + statKey + '">';
      html += '<span class="stat-name-wrapper">' + statTypesMetaData[statKey].name + '<span class="graph-icon"></span></span>';
      html += '</th>';
    }
    html += '</tr>';
    return html;
  };

  var getNotesHtml = function getNotesHtml() {
    var html = '';

    html += '<h3>' + statTerms.tableNoteHeader + '</h3>';
    html += '<ul>';
    html += '<li>' + statTerms.tableNoteHeaders + '</li>';
    html += '<li>' + statTerms.tableNoteWarningText  + '</li>';
    html += '<li>' + statTerms.tableNotePickRate  + '</li>';
    html += '<li><a href="https://rainbow6.ubisoft.com/siege/en-us/news/152-293696-16/introduction-to-the-data-peek-velvet-shell-statistics">' + statTerms.tableNoteDataDumpRef + '</a></li>';
    html += '</ul>';
    return html;
  };

  var getOpRoleHtml = function getOpRoleHtml(
    opStatsForRole, ranksMetaData,  statTypesMetaData, ranksForSeason, roleCssClass
  ) {
    var html = '',
      warningCssClass = false;

    opStatsForRole.forEach(function(operator) {
      html += '<tr class="' + roleCssClass + '">';
      html += '<td><div class="op-icon ' + operator.cssClass + '"></div></td>';
      html += '<td class="op-name">' + operator.name + '</<td>';

      for (var statKey in statTypesMetaData) {
        html += '<td class="all-ranks">' + getFormattedNumber(operator.statsAllRanks[statKey], statTypesMetaData[statKey].displayType) + '</td>'; // ALL

        ranksForSeason.forEach(function(rankKey) {
          warningCssClass = (!operator.statsByRank[rankKey] || operator.statsByRank[rankKey].warning) ? 'warning ' : '';

          html += '<td class="can-hide ' + warningCssClass + ranksMetaData[rankKey].cssClass + '"><span>';
          html += (operator.statsByRank[rankKey]) ?
            getFormattedNumber(operator.statsByRank[rankKey][statKey], statTypesMetaData[statKey].displayType, true) :
            '-';
          html += '</span></td>';
        });
      }
      html += '</tr>';
    });
    return html;
  };

  var getSubHeaderHtml = function getSubHeaderHtml(
    ranksMetaData, statTypesMetaData, ranksForSeason, sortInfo
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

    for (var statKey in statTypesMetaData) {
      isCurSortCol = ((sortInfo.field == statKey) && !sortInfo.rank);
      sortOrder = (isCurSortCol && !sortInfo.isDescending) ? 'descending' : 'ascending';
      curSortClass = isCurSortCol ? ' current-sort ' + sortOrder : '';
      html += '<th class="all-ranks">';
      html += '<div class="sortable' + curSortClass + '" data-sortfield="' + statKey + '" data-sortorder="' + sortOrder + '" tabindex="0">';
      html += '<p>' + R6MLangTerms.terms.stats.tableHeaderAllRanks + '</p>';
      html += '<div class="sort-order-icon"></div>';
      html += '</div>';
      html += '</th>';

      ranksForSeason.forEach(function(rankKey) {
        srData = ranksMetaData[rankKey];
        isCurSortCol = ((sortInfo.field == statKey) && (sortInfo.rank == rankKey));
        sortOrder = (isCurSortCol && !sortInfo.isDescending) ? 'descending' : 'ascending';
        curSortClass = isCurSortCol ? ' current-sort ' + sortOrder : '';
        html += '<th class="can-hide ' + srData.cssClass + '">';
        html += '<div class="sortable' + curSortClass + '" tabindex="0" data-sortfield="' + statKey + '" data-sortrank="' + rankKey + '" data-sortorder="' + sortOrder + '" title="' + srData.name + '">';
        html += '<div class="rank-icon ' + srData.cssClass + '"></div>';
        html += '<div class="sort-order-icon"></div>';
        html += '</div>';
        html += '</th>';
      });
    }
    html += '</tr>';
    return html;
  };

  var numberWithCommas = function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  var render = function render(opStats, $outputEl, ranksMetaData, rolesMetaData, statTypesMetaData, ranksForSeason, sortCb, statGraphCb) {
    var html = '';

    if (opStats.attackers.operators.length == 0 || opStats.defenders.operators.length == 0) {
      html = '<p>' + statTerms.noResults + '</p>';
      $outputEl.html(html);
      return;
    }

    html += getOpHtml(opStats, ranksMetaData, rolesMetaData, statTypesMetaData, ranksForSeason);
    html += getNotesHtml();
    $outputEl.html(html);
    setupSortColumns($outputEl, sortCb);
    setupStatHeaders($outputEl, statGraphCb);
  };

  var setupSortColumns = function setupSortColumns($outputEl, sortCb) {
    $outputEl.find('.sortable').on('click', function(event) {
      var $source = $(event.target),
        isDescending;

      if (!$source.data('sortfield')){
        $source = $source.parent(); // maybe too fragile to html structure?
      }
      isDescending = ($source.data('sortorder') == 'descending');
      sortCb($source.data('sortfield'), isDescending, $source.data('sortrank'));
    });
  };

  var setupStatHeaders = function setupStatHeaders($outputEl, statGraphCb) {
    $outputEl.find('.stat-name').on('click', function(event) {
      var $source = $(event.target),
        isDescending;

      statGraphCb($source.data('statkey'), $source.data('rolekey'));
    });
  };

  return  {
    render: render,
    getFormattedNumber: getFormattedNumber
  };
})(R6MLangTerms);
