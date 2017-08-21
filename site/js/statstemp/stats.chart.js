'use strict';

var R6MStatsChart = (function(R6MLangTerms, undefined) {
  var updateHeader = function updateHeader($header, statKey, roleKey, rolesMetaData, statTypeMetaData) {
    var header = R6MLangTerms.terms.stats.chartHeader;

    header = header.replace('{stat}', statTypeMetaData[statKey].name);
    header = header.replace('{role}', rolesMetaData[roleKey].name);
    $header.html(header);
    $header.removeClass();
    $header.addClass(rolesMetaData[roleKey].cssClass);
  };

  var updateOpRoleChart = function updateOpRoleChart(
    $opChartEls,
    opStats,
    statKey,
    roleKey,
    filterInfo,
    ranks,
    metaData,
    getFormattedNumberFn,
    renderLoadInfoFn
  ) {
    updateHeader($opChartEls.header, statKey, roleKey, metaData.roles, metaData.statTypes);
    renderLoadInfoFn($opChartEls.info, filterInfo, metaData);
    $opChartEls.output.find('canvas').remove();

    var newCanvas = $('<canvas/>').prop({ width: '100%', height: '100%' }),
      ctx = newCanvas,
      labels = [],
      datasets = [],
      opDataSet,
      data,
      num;

    $opChartEls.output.append(newCanvas);

    ranks.forEach(function(rank) {
      labels.push(metaData.ranks[rank].name);
    });

    opStats[roleKey].operators.forEach(function(operator) {
      data = [];
      ranks.forEach(function(rank) {
        num = (operator.statsByRank[rank]) ? operator.statsByRank[rank][statKey] : 0;
        data.push(
          getFormattedNumberFn(num, metaData.statTypes[statKey].displayType, true)
        );
      });
      opDataSet = {
        label: operator.name,
        data: data,
        borderWidth: 2,
        borderColor: metaData.operators[operator.key].color,
        fill: false,
        backgroundColor: metaData.operators[operator.key].color,
        pointRadius: 5
      };
      datasets.push(opDataSet);
    });

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        legend: {
          labels: {
            fontSize: 15
          }
        },
        tooltips: {
          titleFontSize: 20,
          titleMarginBottom: 10,
          bodyFontSize: 20
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: metaData.statTypes[statKey].chartBeginAtZero,
              fontSize: 15
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 15
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
