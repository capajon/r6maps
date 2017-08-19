'use strict';

var R6MStatsRender = (function(R6MLangTerms, undefined) {

  var renderHeaders = function renderHeaders($headers) {
    var statTerms = R6MLangTerms.terms.stats;

    $headers.main.find('.page-title').html(statTerms.headerMainBeta);
    $headers.filters.html(statTerms.headerFilters);
    $headers.mapSection.html(statTerms.headerMap);
    $headers.opSection.html(statTerms.headerOperators);
  };

  var renderLoadError = function renderLoadError($outputEl) {
    $outputEl.html('<p class="error">' + R6MLangTerms.terms.stats.error + '</p>');
  };

  var renderStaticEl = function renderStaticEl($allParagraphs, $instructionParagraphs) {
    $allParagraphs.html(R6MLangTerms.terms.stats.allOption);
    $instructionParagraphs.html(R6MLangTerms.terms.stats.instructions);
  };

  var setPageTitle = function setPageTitle() {
    document.title = R6MLangTerms.terms.stats.titleBeta;
  };

  return  {
    renderHeaders: renderHeaders,
    renderStaticEl: renderStaticEl,
    renderLoadError: renderLoadError,
    setPageTitle: setPageTitle
  };
})(R6MLangTerms);
