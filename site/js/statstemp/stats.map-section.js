'use strict';

var R6MapsStatsMapSection = (function(R6MapsCommonLangTerms, undefined) {
  var render = function render(mapData, $outputEl) {
    $outputEl.html('Success! Map data will go here.');
    console.log('Map success', mapData);
  };

  return  {
    render: render
  };
})(R6MapsCommonLangTerms);
