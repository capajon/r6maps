'use strict';

var R6MHelpers = (function($, window, document, undefined) {
  var queryString = function queryString(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, '\\$&');
    var match = location.search.match(new RegExp('[?&]' + key + '=([^&]+)(&|$)'));

    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };

  var tryLoadStartingLanguage = function tryLoadStartingLanguage(loadLanguageCallback) {
    var lastChosenLanguage = localStorage.getItem('language'),
      userLang = (navigator.language || navigator.userLanguage).split('-')[0];

    if (lastChosenLanguage) {
      loadLanguageCallback(lastChosenLanguage);
    } else if (userLang) {
      loadLanguageCallback(userLang);
    };  // default will be English otherwise
  };

  var trySelectOption = function trySelectOption($selectEl, option) {
    var $selectOption = $selectEl.find('option[value="' + option + '"]');

    if ($selectOption.length) {
      $selectOption.prop('selected', true);
      return true;
    }
    return false;
  };

  return {
    queryString: queryString,
    tryLoadStartingLanguage: tryLoadStartingLanguage,
    trySelectOption: trySelectOption
  };
})(window.jQuery, window, document);
