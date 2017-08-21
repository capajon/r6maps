'use strict';

var R6MStatsMapRender = (function(R6MLangTerms, undefined) {
  var statTerms = R6MLangTerms.terms.stats;

  var render = function render(mapStats, $outputEl) {
    var html = '';

    if (!mapStats) {
      html = '<p>' + statTerms.noResults + '</p>';
      $outputEl.html(html);
      return;
    }

    html += 'Success! Map data will go here.';
    $outputEl.html(html);
  };

  return  {
    render: render
  };
})(R6MLangTerms);
