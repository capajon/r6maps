'use strict';

var R6MapsCommonHelpers = (function($, window, document, undefined) {
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
    tryLoadStartingLanguage: tryLoadStartingLanguage,
    trySelectOption: trySelectOption
  };
})(window.jQuery, window, document);
