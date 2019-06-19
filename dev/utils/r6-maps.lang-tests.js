'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(
    window.jQuery,
    window,
    document,
    R6MLangTerms,
    R6MLangTermsGerman,
    R6MLangTermsSpanish,
    R6MLangTermsFrench,
    R6MLangTermsHebrew,
    R6MLangTermsJapanese,
    R6MLangTermsKorean,
    R6MLangTermsMongolian,
    R6MLangTermsPolish,
    R6MLangTermsPortBrazil,
    R6MLangTermsRussian,
    R6MLangTermsSimplifiedChinese,
    R6MMainData
  );
}(function(
  $,
  window,
  document,
  R6MLangTerms,
  R6MLangTermsGerman,
  R6MLangTermsSpanish,
  R6MLangTermsFrench,
  R6MLangTermsHebrew,
  R6MLangTermsJapanese,
  R6MLangTermsKorean,
  R6MLangTermsMongolian,
  R6MLangTermsPolish,
  R6MLangTermsPortBrazil,
  R6MLangTermsRussian,
  R6MLangTermsSimplifiedChinese,
  R6MMainData,
  undefined
) {
  $(function() { // equivanelt to $(document).ready() - but a bit faster
    var defaultTerms = {},
      translatedTerms = {},
      categoryKeys = [],
      floorKeys = [],
      html = '',
      outputEl = $('#output');

    defaultTerms = R6MLangTerms.terms;
    translatedTerms.german = R6MLangTermsGerman.terms;
    translatedTerms.spanish = R6MLangTermsSpanish.terms;
    translatedTerms.french = R6MLangTermsFrench.terms;
    translatedTerms.hebrew = R6MLangTermsHebrew.terms;
    translatedTerms.japanese = R6MLangTermsJapanese.terms;
    translatedTerms.korean = R6MLangTermsKorean.terms;
    translatedTerms.mongolian = R6MLangTermsMongolian.terms;
    translatedTerms.polish = R6MLangTermsPolish.terms;
    translatedTerms.portbrazil = R6MLangTermsPortBrazil.terms;
    translatedTerms.russian = R6MLangTermsRussian.terms;
    translatedTerms.simplifiedchinese = R6MLangTermsSimplifiedChinese.terms;
    // add new languages here and to module import above

    categoryKeys = getFirstLevelKeys(defaultTerms, ['mapRooms']);
    floorKeys = getFirstLevelKeys(defaultTerms.mapRooms);

    html += '<h2>General Terms</h2>';
    categoryKeys.forEach(function(key) {
      html += getBlockOutput(key, defaultTerms, translatedTerms);
    });

    html += '<h2>Map Room Terms</h2>';
    floorKeys.forEach(function(key) {
      html += getBlockOutput(key, defaultTerms, translatedTerms, 'mapRooms');
    });

    outputEl.html(html);
  });

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

  var getBlockOutput = function getBlockOutput(sectionKey, defaultTerms, translatedTerms, childKey) {
    var translatedLanguages = [],
      defaultTermsForCompare = {},
      translatedTermsForCompare = {},
      html = '';

    childKey = typeof childKey !== 'undefined' ? childKey : null;

    for (var language in translatedTerms) {
      translatedLanguages.push(language);
      translatedTermsForCompare[language] = (childKey)
        ? translatedTerms[language][childKey]
        : translatedTerms[language];
    }

    defaultTermsForCompare = (childKey)
      ? defaultTerms[childKey]
      : defaultTerms;

    html += '<h3>' + sectionKey + '</h3>';
    html += '<table>';
    html += getBlockHeaderRowHtml(translatedLanguages);
    for (var key in defaultTermsForCompare[sectionKey]) {
      html += getBlockBodyRowHtml(
        key,
        sectionKey,
        defaultTermsForCompare,
        translatedTermsForCompare
      );
    }
    html += '</table>';
    html += getExtraTermsErrorHtml(
      sectionKey,
      defaultTermsForCompare,
      translatedTermsForCompare
    );
    return html;
  };

  var getBlockHeaderRowHtml = function getBlockHeaderRowHtml(translatedLanguages) {
    var html = '<tr>';

    html += '<th>Lang Term Key</th>';
    html += '<th>Default (english)</th>';
    translatedLanguages.forEach(function(language) {
      html += '<th>' + language + '</th>';
    });
    html += '</tr>';
    return html;
  };

  var getBlockBodyRowHtml = function getBlockBodyRowHtml(key, sectionKey, defaultTerms, translatedTerms) {
    var html = '';

    html += '<tr>';
    html += '<td class="key">' + key + '</td>';
    html += '<td>' + defaultTerms[sectionKey][key] + '</td>';
    for (var language in translatedTerms) {
      if (translatedTerms[language][sectionKey] && translatedTerms[language][sectionKey][key]) {
        var cssClass = (defaultTerms[sectionKey][key] === translatedTerms[language][sectionKey][key])
          ? 'identical-warning'
          : '';

        html += '<td class="' + cssClass + '">' + translatedTerms[language][sectionKey][key] + '</td>';
      } else {
        html += '<td class="not-defined">Not defined</td>';
      }
    }
    html += '</tr>';
    return html;
  };

  var getExtraTermsErrorHtml = function getExtraTermsErrorHtml(sectionKey, defaultTerms, translatedTerms) {
    var html = '';

    for (var language in translatedTerms) {
      for (var key in translatedTerms[language][sectionKey]) {
        if (!(defaultTerms[sectionKey][key])){
          html += '<li>language: ' + language + ', section: ' + sectionKey + ', key: <strong>' + key + '</strong>, term: ' + translatedTerms[language][sectionKey][key] + '</li>';
        }
      }
    }
    if (html) {
      html = '<div class="extra-keys"><p>Error: Extra key(s) found:</p><ul>' + html + '</ul></div>';
    }
    return html;
  };

  var isInArray = function isInArray(value, array) {
    return array.indexOf(value) > -1;
  };
}));
