'use strict';

var R6MStatsMapRender = (function(R6MLangTerms, undefined) {
  var render = function render(mapStats, $outputEl) {
    $outputEl.html('Success! Map data will go here.');
    console.log('Map success', mapStats);
  };

  return  {
    render: render
  };
})(R6MLangTerms);
