'use strict';

var R6MStatsChart = (function(R6MLangTerms, undefined) {
  var updateHeader = function updateHeader($header, metaData, skillKey, roleKey) {
    $header.html(skillKey + ' for ' + R6MLangTerms.terms.stats.tableHeaderAttackers); //TODO needs refactoring to move skills to meta data and do this correctly and translated
    $header.removeClass();
    $header.addClass(roleKey); //TODO should reference .className of meta data, again requires refactoring!  roles should be in meta data
  };

  var updateOpRoleChart = function updateOpRoleChart($opChartEls, opStats, metaData, skillKey, roleKey) {
    updateHeader($opChartEls.header, metaData, skillKey, roleKey);

    var ctx = $opChartEls.canvas;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
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
                        beginAtZero:true
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
