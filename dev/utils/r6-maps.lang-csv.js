'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(
    window.jQuery,
    window,
    document,
    R6MLangTerms,
    R6MLangTermsGerman,
    R6MLangTermsFrench,
    R6MLangTermsKorean,
    R6MLangTermsPortBrazil,
    R6MLangTermsRussian,
    R6MLangTermsJapanese,
    R6MLangTermsSimplifiedChinese,
    R6MLangTermsMongolian,
    R6MLangTermsSpanish,
    R6MLangTermsPolish,
    R6MapsMainData
  );
}(function(
  $,
  window,
  document,
  R6MLangTerms,
  R6MLangTermsGerman,
  R6MLangTermsFrench,
  R6MLangTermsKorean,
  R6MLangTermsPortBrazil,
  R6MLangTermsRussian,
  R6MLangTermsJapanese,
  R6MLangTermsSimplifiedChinese,
  R6MLangTermsMongolian,
  R6MLangTermsSpanish,
  R6MLangTermsPolish,
  R6MapsMainData,
  undefined
) {
  $(function() { // equivanelt to $(document).ready() - but a bit faster
    var categoryKeys = [],
      floorKeys = [],
      html = '',
      outputEl = $('#output'),
      defaultTerms = R6MLangTerms.terms,
      translatedTerms = [
        R6MLangTerms.terms,
        R6MLangTermsGerman.terms,
        R6MLangTermsFrench.terms,
        R6MLangTermsKorean.terms,
        R6MLangTermsPortBrazil.terms,
        R6MLangTermsRussian.terms,
        R6MLangTermsJapanese.terms,
        R6MLangTermsSimplifiedChinese.terms,
        R6MLangTermsMongolian.terms,
        R6MLangTermsSpanish.terms,
        R6MLangTermsPolish.terms
      ];

    html += getOutputForTerms(defaultTerms, translatedTerms, ['mapRooms'], null);
    html += getOutputForTerms(defaultTerms, translatedTerms, [], 'mapRooms');

    outputEl.html(html);
  });

  var getOutputForTerms = function getOutputForTerms(terms, translatedTerms, keyExceptions, subKey) {
    var html = '';

    terms = subKey ? terms[subKey] : terms;
    var keys = getFirstLevelKeys(terms, keyExceptions);

    keys.forEach(function(key1) {
      html += '<strong>' + key1 + '</strong><br/>';
      for (var key2 in terms[key1]) {
        if (!terms[key1].hasOwnProperty(key2)) {
          continue;
        }
        html += key2 + ',';
        translatedTerms.forEach(function(translated) {
          var tempTerms = subKey ? translated[subKey] : translated;

          if (tempTerms[key1] && tempTerms[key1][key2]){
            html += escapeHTML(tempTerms[key1][key2]) + ',';
          } else {
            html += ',';
          }
        });
        html += '<br/>';
      };
    });

    return html;
  };

  var getFirstLevelKeys = function getFirstLevelKeys(obj, keyExceptions) {
    var result = [];

    keyExceptions = typeof keyExceptions !== 'undefined' ? keyExceptions : [];

    for (var key in obj){
      if (obj.hasOwnProperty(key)) {
        if (!isInArray(key, keyExceptions)) {
          result.push(key);
        }
      }
    }
    return result;
  };

  var isInArray = function isInArray(value, array) {
    return array.indexOf(value) > -1;
  };

  var escape = document.createElement('textarea');
  var escapeHTML = function escapeHTML(html) {
    escape.textContent = html;
    return escape.innerHTML;
  };
}));
