'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(
    window.jQuery,
    window,
    document,
    R6MapsLangTerms,
    R6MapsLangTermsGerman,
    R6MapsLangTermsFrench,
    R6MapsLangTermsKorean,
    R6MapsLangTermsPortBrazil,
    R6MapsLangTermsRussian,
    R6MapsLangTermsJapanese,
    R6MapsLangTermsSimplifiedChinese,
    R6MapsData
  );
}(function(
  $,
  window,
  document,
  R6MapsLangTerms,
  R6MapsLangTermsGerman,
  R6MapsLangTermsFrench,
  R6MapsLangTermsKorean,
  R6MapsLangTermsPortBrazil,
  R6MapsLangTermsRussian,
  R6MapsLangTermsJapanese,
  R6MapsLangTermsSimplifiedChinese,
  R6MapsData,
  undefined
) {
  $(function() { // equivanelt to $(document).ready() - but a bit faster
    var categoryKeys = [],
      floorKeys = [],
      html = '',
      outputEl = $('#output'),
      defaultTerms = R6MapsLangTerms.terms,
      translatedTerms = [
        R6MapsLangTerms.terms,
        R6MapsLangTermsGerman.terms,
        R6MapsLangTermsFrench.terms,
        R6MapsLangTermsKorean.terms,
        R6MapsLangTermsPortBrazil.terms,
        R6MapsLangTermsRussian.terms,
        R6MapsLangTermsJapanese.terms,
        R6MapsLangTermsSimplifiedChinese.terms
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
