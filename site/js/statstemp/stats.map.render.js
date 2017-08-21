'use strict';

var R6MStatsMapRender = (function(R6MLangTerms, undefined) {
  var statTerms = R6MLangTerms.terms.stats;

  var getWinRatesHtml = function getWinRatesHtml(mapStats, metaData, getFormattedNumberFn) {
    var html = '',
      roles = ['attackers', 'defenders'],
      winReasonsHeader;

    html += '<div class="map-win-rate-container">';

    html += '<div class="map-win-rate-row header">';
    roles.forEach(function(roleKey) {
      html += '<div class="map-win-rate-cell header ' + metaData.roles[roleKey].cssClass + '">' + metaData.roles[roleKey].name + '</div>';
    });
    html += '</div>'

    html += '<div class="map-win-rate-row visual-bar">';
    roles.forEach(function(roleKey) {
      html += '<div class="map-win-rate-cell visual-bar ' + metaData.roles[roleKey].cssClass + '" style="width:' + getFormattedNumberFn(mapStats[roleKey].winPercent, 'percent') + '">';
      html += '<div>' + getFormattedNumberFn(mapStats[roleKey].winPercent, 'percent') + '</div>';
      html += '<div class="label">' + metaData.statTypes.winRate.name + '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '</div>'; // map-win-rate-container

    html += '<div class="map-win-reasons-container">';
    roles.forEach(function(roleKey) {
      html += '<div class="map-win-reasons-canvas-wrapper">';
      winReasonsHeader = statTerms.headerWinReasons.replace('{role}', metaData.roles[roleKey].name);
      html += '<h3>' + winReasonsHeader + '</h3>'
      html += '<canvas width="100%" height="100%" class="' + metaData.roles[roleKey].cssClass + '">'
      html += '</div>';
    });
    html += '</div>'; // map-win-reasons-container

    return html;
  };

  var render = function render($outputEl, mapStats, metaData, getFormattedNumberFn) {
    var html = '';

    if (!mapStats) {
      html = '<p>' + statTerms.noResults + '</p>';
      $outputEl.html(html);
      return;
    }

    html += getWinRatesHtml(mapStats, metaData, getFormattedNumberFn);
    $outputEl.html(html);

    var $canvasTest = $outputEl.find('canvas.attackers');
    console.log('44', $canvasTest);

    var data = {
    datasets: [{
    data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
    'Red',
    'Yellow',
    'Blue'
    ]
    };

    var myChart = new Chart($canvasTest, {
      type: 'doughnut',
      data: data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
      }
    });
  };

  return  {
    render: render
  };
})(R6MLangTerms);
