'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MapsData);
}(function($, window, document, R6MapsData, undefined) {
  var outputEl;

  $(function() { // equivanelt to $(document).ready() - but a bit faster
    outputEl =   $('#output');
    output(getLangTerms($('#output'), R6MapsData.maps.yacht.roomLabels));
  });

  var getLangTerms = function getLangTerms(outputEl, roomLabels) {
    var html = '';

    roomLabels.forEach(function(label) {
      html += addLine(getLangTermKey(label.description) + ': \'' + label.description + '\',');
    });

    return html;
  };

  var getLangTermKey = function getLangTermKey(previousLabel) {
    return lowerCaseFirstLetter(previousLabel.replace('<br/>','').replace(' ',''));
  };

  var output = function output(html) {
    outputEl.html(html);
  };

  var addLine = function addLine(html) {
    return html + '\n';
  };

  var lowerCaseFirstLetter = function lowerCaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  };
}));
