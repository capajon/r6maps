'use strict';

var R6MapsStatsOperatorsSection = (function(R6MapsCommonLangTerms, undefined) {
  var render = function render(operatorsData, $outputEl) {
    $outputEl.html('Success! Operators data will go here.');
    console.log('Operators success', operatorsData);
  };

  return  {
    render: render
  };
})(R6MapsCommonLangTerms);
