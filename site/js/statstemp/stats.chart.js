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

  var updateOpRoleChart = function updateOpRoleChart($opChartEls, opStats, statKey, roleKey, filterInfo, metaData) {
    updateHeader($opChartEls.header, statKey, roleKey, metaData.roles, metaData.statTypes);
    updateInfo($opChartEls.info, filterInfo, metaData);

    var ctx = $opChartEls.canvas;
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
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
