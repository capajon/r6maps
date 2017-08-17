'use strict';

var R6MStatsMapRender = (function(R6MapsCommonLangTerms, undefined) {
  var render = function render(mapData, $outputEl, statsData) {
    $outputEl.html('Success! Map data will go here.');
    console.log('Map success', mapData);
  };

  return  {
    render: render
  };
})(R6MapsCommonLangTerms);
