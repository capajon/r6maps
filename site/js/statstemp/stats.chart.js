'use strict';

var R6MStatsChart = (function(R6MLangTerms, undefined) {
  var ALL_KEY = 'ALL';

  var updateHeader = function updateHeader($header, statKey, roleKey, rolesMetaData, statTypeMetaData) {
    var header = R6MLangTerms.terms.stats.chartHeader;

    header = header.replace('{stat}', statTypeMetaData[statKey].name);
    header = header.replace('{role}', rolesMetaData[roleKey].name);
    $header.html(header);
    $header.removeClass();
    $header.addClass(rolesMetaData[roleKey].cssClass);
  };

  var updateInfo = function updateInfo($info, filterInfo, metaData) {
    var statTerms = R6MLangTerms.terms.stats,
      info = statTerms.chartInfo,
      allText = statTerms.allOption,
      seasonText = (filterInfo.season == ALL_KEY) ? allText : metaData.seasons[filterInfo.season].name,
      platformText = (filterInfo.platform == ALL_KEY) ? allText : metaData.platforms[filterInfo.platform].name,
      mapText = (filterInfo.map == ALL_KEY) ? allText : metaData.mapModeLocations[filterInfo.map].name,
      modeText = (filterInfo.mode == ALL_KEY) ? allText : metaData.modes[filterInfo.mode].name,
      locationText = (filterInfo.location == ALL_KEY) ? allText : metaData.mapModeLocations[filterInfo.map].objectives[filterInfo.mode][filterInfo.location].name;

    info = info.replace('{season}', seasonText);
    info = info.replace('{platform}', platformText);
    info = info.replace('{map}', mapText);
    info = info.replace('{mode}', modeText);
    info = info.replace('{location}', locationText);
    $info.html(info);
  };

  var updateOpRoleChart = function updateOpRoleChart(
    $opChartEls,
    opStats,
    statKey,
    roleKey,
    filterInfo,
    ranks,
    metaData,
    getFormattedNumberFn
  ) {
    updateHeader($opChartEls.header, statKey, roleKey, metaData.roles, metaData.statTypes);
    updateInfo($opChartEls.info, filterInfo, metaData);

    var ctx = $opChartEls.canvas,
      labels = [],
      datasets = [],
      opDataSet,
      data;

    ranks.forEach(function(rank) {
      labels.push(metaData.ranks[rank].name);
    });

    opStats[roleKey].operators.forEach(function(operator) {
      data = [];
      ranks.forEach(function(rank) {
        data.push(
          getFormattedNumberFn(operator.statsByRank[rank][statKey], metaData.statTypes[statKey].displayType, true)
        );
      });
      opDataSet = {
        label: operator.name,
        data: data,
        borderWidth: 3,
        borderColor: metaData.operators[operator.key].color,
        fill: false,
        backgroundColor: metaData.operators[operator.key].color
      }
      datasets.push(opDataSet);
    });

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: metaData.statTypes[statKey].chartBeginAtZero
            }
          }]
        }
      }
    });
  };

  return  {
    updateOpRoleChart: updateOpRoleChart
  };
})(R6MLangTerms);
