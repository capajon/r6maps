'use strict';

var R6MapsStatsOperatorsRender = (function(R6MapsCommonLangTerms, undefined) {
  var statTerms = R6MapsCommonLangTerms.terms.stats,
    locale = R6MapsCommonLangTerms.name.split('_')[0];

  var getOperatorsHtml = function getOperatorsHtml(operatorsData) {
    var html = '<table style="width: 100%">';

    html += '<tr>';
    html += '<th style="padding:5px;text-align:left;">' + statTerms.tableHeaderName + '</th>';
    html += '<th style="padding:5px">' + statTerms.tableHeaderPickRate + '</th>';
    html += '<th style="padding:5px">' + statTerms.tableHeaderKillsPerDeath + '</th>';
    html += '<th style="padding:5px">' + statTerms.tableHeaderKillsPerRound + '</th>';
    html += '<th style="padding:5px">' + statTerms.tableHeaderSurvivalRate + '</th>';
    html += '<th style="padding:5px">' + statTerms.tableHeaderTotalRounds + '</th>';
    html += '</tr>';

    html += '<tr><td colspan="6" style="background-color:white;color:black; padding:5px">' + R6MapsCommonLangTerms.terms.stats.tableHeaderAttackers + '</td></tr>';
    html += getOperatorsRoleHtml(operatorsData.attackers);

    html += '<tr><td colspan="6" style="background-color:white;color:black; padding:5px">' + R6MapsCommonLangTerms.terms.stats.tableHeaderDefenders + '</td></tr>';
    html += getOperatorsRoleHtml(operatorsData.defenders);

    return html;
  };

  var getNumPercent = function getNumPercent(num) {
    return num.toLocaleString(locale, {style: 'percent'});
  };

  var getNumRatio = function getNumRatio(num) {
    return num.toLocaleString(R6MapsCommonLangTerms.name, {style: 'decimal'});
  };

  var getNumLarge = function getNumLarge(num) {
    return num.toLocaleString(R6MapsCommonLangTerms.name, {style: 'decimal'});
  };

  var getOperatorsRoleHtml = function getOperatorsRoleHtml(operatorsRoleData) {
    var html = '';

    operatorsRoleData.forEach(function(operator) {
      html += '<tr class="' + operator.cssClass + '">';
      html += '<td style="padding:5px;text-align:left;">' + operator.name + '</td>';
      html += '<td style="padding:5px;text-align:center;">' + getNumPercent(operator.pickRateAllSkill) + '</td>';
      html += '<td style="padding:5px;text-align:center;">' + getNumRatio(operator.killsToDeath) + '</td>';
      html += '<td style="padding:5px;text-align:center;">' + getNumRatio(operator.killsPerRound) + '</td>';
      html += '<td style="padding:5px;text-align:center;">' + getNumPercent(operator.survivalRate) + '</td>';
      html += '<td style="padding:5px;text-align:center;">' + getNumLarge(operator.totalRoundsPlayed) + '</td>';
      html += '</tr>'
    });
    return html;
  }

  var render = function render(operatorsData, $outputEl) {
    $outputEl.html(getOperatorsHtml(operatorsData));
    console.log('Operators success', operatorsData);
  };

  return  {
    render: render
  };
})(R6MapsCommonLangTerms);
