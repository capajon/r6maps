'use strict';

var R6MStatsMapRender = (function(R6MLangTerms, undefined) {
  var statTerms = R6MLangTerms.terms.stats;

  var getAdditionalInfoHtml = function getAdditionalInfoHtml(mapStats, metaData, getFormattedNumberFn) {
    var html = '';

    [{
      name: statTerms.averageRoundLength,
      cssClass: 'average-round-length',
      statKey: 'averageRoundLength',
      numFormatFn: function(num) {
        return statTerms.numberSeconds.replace('{num}', '<span class="num">' + Math.round(num) + '</span>');
      }
    },
      {
        name: statTerms.totalRoundsPlayed,
        cssClass: 'total-rounds',
        statKey: 'totalRounds',
        numFormatFn: function(num) {
          return statTerms.numberRounds.replace('{num}', '<span class="num">' + getFormattedNumberFn(num, 'number') + '</span>');
        }
      }].forEach(function(info) {
        html += '<div class="map-info-wrapper">';
        html += '<h3>' + info.name + '</h3>';
        html += '<div class="map-info-wrapper-two">';
        html += '<div class="map-info-icon ' + info.cssClass + '"></div>';
        html += '<p>' + info.numFormatFn(mapStats.overall[info.statKey]) + '</p>';
        html += '</div>';
        html += '</div>';
      });
    return html;
  };

  var getWinRatesHtml = function getWinRatesHtml(mapStats, metaData, getFormattedNumberFn, roles) {
    var html = '';

    html += '<div class="map-win-rate-container">';

    html += '<div class="map-win-rate-row header">';
    roles.forEach(function(roleKey) {
      html += '<div class="map-win-rate-cell header ' + metaData.roles[roleKey].cssClass + '">' + metaData.roles[roleKey].name + '</div>';
    });
    html += '</div>';

    html += '<div class="map-win-rate-row visual-bar">';
    roles.forEach(function(roleKey) {
      html += '<div class="map-win-rate-cell visual-bar ' + metaData.roles[roleKey].cssClass + '" style="width:' + getFormattedNumberFn(mapStats[roleKey].winPercent, 'percent') + '">';
      html += '<div>' + getFormattedNumberFn(mapStats[roleKey].winPercent, 'percent') + '</div>';
      html += '<div class="label">' + metaData.statTypes.winRate.name + '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '</div>'; //map-win-rate-container
    return html;
  };

  var getWinReasonsContainerHtml = function getWinReasonsContainerHtml(mapStats, metaData, roles, getFormattedNumberFn) {
    var html = '';

    html += '<div class="map-win-reasons-container">';
    html += '<div class="map-win-reasons-row">';
    roles.forEach(function(roleKey) {
      html += '<div class="map-win-reasons-cell ' + metaData.roles[roleKey].cssClass + '">';
      html += '<h3>' + statTerms.headerWinReasons.replace('{role}', metaData.roles[roleKey].nameSingular ) + '</h3>';
      html += '<canvas class="' + metaData.roles[roleKey].cssClass + '"></canvas>';

      html += '<div class="legend">';
      mapStats[roleKey].winReasons.forEach(function(winReason) {
        html += '<div class="legend-item">';
        html += '<div class="map-win-reason-icon-wrapper" style="background-color: ' + metaData.winReasons[winReason.key].color + '"><div class="map-win-reason-icon ' + winReason.cssClass + '"></div></div>';
        html += '<p class="name"><span class="description">' + winReason.name + '</span><span class="num">' + getFormattedNumberFn(winReason.percent, 'percent') + '</span></p>';
        html += '</div>';
      });
      html += '</div>';

      html += '</div>';
    });
    html += '</div>';

    html += '</div>';
    return html;
  };

  var render = function render($outputEl, mapStats, metaData, getFormattedNumberFn) {
    var html = '',
      roles = ['attackers','defenders'];

    if (!mapStats) {
      html = '<p>' + statTerms.noResults + '</p>';
      $outputEl.html(html);
      return;
    }

    html += getWinRatesHtml(mapStats, metaData, getFormattedNumberFn, roles);
    html += getWinReasonsContainerHtml(mapStats, metaData, roles, getFormattedNumberFn);
    html += getAdditionalInfoHtml(mapStats, metaData, getFormattedNumberFn);
    $outputEl.html(html);

    updateWinReasonCharts(mapStats, $outputEl, metaData, roles, getFormattedNumberFn);
  };

  var updateWinReasonCharts = function updateWinReasonCharts(mapStats, $outputEl, metaData, roles, getFormattedNumberFn) {
    var $canvas,
      labels,
      backgroundColor;

    roles.forEach(function(roleKey) {
      $canvas = $outputEl.find('canvas.' + metaData.roles[roleKey].cssClass);
      data = [];
      labels = [];
      backgroundColor = [];

      mapStats[roleKey].winReasons.forEach(function(winReason) {
        data.push(winReason.totalRounds);
        labels.push(winReason.name + ' (' + getFormattedNumberFn(winReason.percent, 'percent') + ')');
        backgroundColor.push(metaData.winReasons[winReason.key].color);
      });

      var data = {
        datasets: [{
          data: data,
          backgroundColor: backgroundColor
        }],
        labels: labels
      };

      new Chart($canvas, {
        type: 'pie',
        data: data,
        options: {
          maintainAspectRatio: true,
          responsive: true,
          legend: {
            display: false
          },
          tooltips: {
            titleFontSize: 20,
            titleMarginBottom: 10,
            bodyFontSize: 20
          }
        }
      });
    });
  };

  return  {
    render: render
  };
})(R6MLangTerms);
