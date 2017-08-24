'use strict';

var R6MStatsOpRender = (function(R6MLangTerms, undefined) {
  var statTerms = R6MLangTerms.terms.stats;

  var getAveragesTotalsHtml = function getAveragesTotalsHtml(
    averagesTotals, ranksMetaData, statTypesMetaData, ranksForSeason, roleCssClass, getFormattedNumberFn
  ) {
    var html = '',
      avgTotalKey;

    html += '<tr class="' + roleCssClass + ' average-totals">';
    html += '<td class="sticky ' + roleCssClass + '"></td>';
    html += '<td class="field-name">' + statTerms.averagesAndTotals + '</td>';

    for (var statKey in statTypesMetaData) {
      avgTotalKey = statTypesMetaData[statKey].showTotal ? 'total' : 'avg';

      html += '<td class="all-ranks">' + getFormattedNumberFn(averagesTotals[statKey].all[avgTotalKey], statTypesMetaData[statKey].displayType) + '</td>';
      ranksForSeason.forEach(function(rankKey) {
        html += '<td class="can-hide ' + ranksMetaData[rankKey].cssClass + '">';
        html += '<span>' + getFormattedNumberFn(averagesTotals[statKey][rankKey][avgTotalKey], statTypesMetaData[statKey].displayType, { minimal: true }) + '</span>';
        html += '</td>';
      });
    }

    html += '</tr>';
    return html;
  };

  var getOpHtml = function getOpHtml(
    opStats,
    ranksMetaData,
    rolesMetaData,
    statTypesMetaData,
    ranksForSeason,
    getFormattedNumberFn
  ) {
    var html = '',
      ranksShownCount = ranksForSeason.length + 1; // +1 for 'ALL'

    html += '<div class="wrapper">';
    html += '<div class="scroller">';
    html += '<table>';

    for (var roleKey in rolesMetaData) {
      html += getMainHeaderHtml(
        ranksShownCount,
        (roleKey == 'defenders') ? R6MLangTerms.terms.stats.tableHeaderDefenders : R6MLangTerms.terms.stats.tableHeaderAttackers,
        rolesMetaData[roleKey].cssClass,
        roleKey,
        statTypesMetaData
      );
      html += getSubHeaderHtml(
        ranksMetaData,
        statTypesMetaData,
        ranksForSeason,
        opStats.sortInfo,
        rolesMetaData[roleKey].cssClass
      );
      html += getOpRoleHtml(
        opStats[roleKey].operators,
        ranksMetaData,
        statTypesMetaData,
        ranksForSeason,
        rolesMetaData[roleKey].cssClass,
        getFormattedNumberFn
      );
      html += getAveragesTotalsHtml(
        opStats[roleKey].averagesTotals,
        ranksMetaData,
        statTypesMetaData,
        ranksForSeason,
        rolesMetaData[roleKey].cssClass,
        getFormattedNumberFn
      );
    }

    html += '</table>';
    html += '</div>';
    html += '</div>';

    return html;
  };

  var getMainHeaderHtml = function getMainHeaderHtml(
    ranksShownCount, headerText, roleCssClass, roleKey, statTypesMetaData
  ) {
    var html = '',
      chartClass,
      chartIcon;

    html += '<tr class="main ' + roleCssClass + '">';
    html += '<th class="sticky ' + roleCssClass + '"></th>';
    html += '<th class="op-name">' + headerText + '</th>';
    for (var statKey in statTypesMetaData) {
      chartClass = (statTypesMetaData[statKey].disableChart) ? '' : ' chart-enabled';
      chartIcon = (statTypesMetaData[statKey].disableChart) ? '' : '<span class="graph-icon"></span>';
      html += '<th class="stat-name ' + chartClass + '" colspan="' + ranksShownCount + '" data-rolekey="' + roleKey + '" data-statkey = "' + statKey + '">';
      html += '<span class="stat-name-wrapper">' + statTypesMetaData[statKey].name + chartIcon + '</span>';
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
    html += '</ul>';
    return html;
  };

  var getOpRoleHtml = function getOpRoleHtml(
    opStatsForRole, ranksMetaData,  statTypesMetaData, ranksForSeason, roleCssClass, getFormattedNumberFn
  ) {
    var html = '',
      warningCssClass = false,
      warningTitleTag;

    opStatsForRole.forEach(function(operator) {
      html += '<tr class="' + roleCssClass + '">';
      html += '<td class="sticky ' + roleCssClass + '"><div class="op-icon ' + operator.cssClass + '"></div></td>';
      html += '<td class="op-name">' + operator.name + '</<td>';

      for (var statKey in statTypesMetaData) {
        html += '<td class="all-ranks">' + getFormattedNumberFn(operator.statsAllRanks[statKey], statTypesMetaData[statKey].displayType) + '</td>'; // ALL

        ranksForSeason.forEach(function(rankKey) {
          warningCssClass = (!operator.statsByRank[rankKey] || operator.statsByRank[rankKey].warning) ? 'warning ' : '';
          warningTitleTag = (!operator.statsByRank[rankKey] || operator.statsByRank[rankKey].warning) ? 'title="' + statTerms.tableFewRoundsNote + '" ' : '';

          html += '<td class="can-hide ' + warningCssClass + ranksMetaData[rankKey].cssClass + '"><span ' + warningTitleTag + '>';
          html += (operator.statsByRank[rankKey]) ?
            getFormattedNumberFn(operator.statsByRank[rankKey][statKey], statTypesMetaData[statKey].displayType, { minimal: true }) :
            '-';
          html += '</span></td>';
        });
      }
      html += '</tr>';
    });
    return html;
  };

  var getSubHeaderHtml = function getSubHeaderHtml(
    ranksMetaData, statTypesMetaData, ranksForSeason, sortInfo, roleCssClass
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
    html += '<th class="sticky ' + roleCssClass + '"></th>';
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

  var render = function render(
    opStats,
    $outputEl,
    ranksMetaData,
    rolesMetaData,
    statTypesMetaData,
    ranksForSeason,
    sortCb,
    statGraphCb,
    getFormattedNumberFn
  ) {
    var html = '';

    if (opStats.attackers.operators.length == 0 || opStats.defenders.operators.length == 0) {
      html = '<p>' + statTerms.noResults + '</p>';
      $outputEl.html(html);
      return;
    }

    html += getOpHtml(opStats, ranksMetaData, rolesMetaData, statTypesMetaData, ranksForSeason, getFormattedNumberFn);
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
    $outputEl.find('.stat-name.chart-enabled').on('click', function(event) {
      var $source = $(event.target);

      statGraphCb($source.data('statkey'), $source.data('rolekey'));
    });
  };

  return  {
    render: render
  };
})(R6MLangTerms);
