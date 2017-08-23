'use strict';

var R6MStatsRender = (function(R6MLangTerms, undefined) {
  var ALL_KEY = 'ALL',
    locales = {
      ch: { thousands: ',', decimal: '.' },
      cs: { thousands: ' ', decimal: ',' },
      de: { thousands: ' ', decimal: ',' },
      es: { thousands: '.', decimal: ',' },
      fr: { thousands: ' ', decimal: ',' },
      it: { thousands: '.', decimal: ',' },
      ja: { thousands: ',', decimal: '.' },
      pt: { thousands: '.', decimal: ',' },
      ru: { thousands: ' ', decimal: ',' }
    },
    localeDefault = {
      thousands: ',', decimal: '.'
    };

  var numberWithCommas = function numberWithCommas(x, separator) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  var getFormattedNumber = function getFormattedNumber(num, displayType, minimal) {
    var locale = R6MLangTerms.getLoadedLang().split('_')[0],
      separator;

    switch (displayType) {
    case 'percent':
      num *= 100;
      num = (num < 10) ? num.toFixed(1) : Math.round(num);
      separator = (locales[locale]) ? locales[locale].decimal : localeDefault.decimal;
      num = ('' + num).replace('.', separator);
      return minimal ? num : R6MLangTerms.terms.stats.percentageFormat.replace('{num}', num);
      break;
    case 'ratio':
      num = num.toFixed(1);
      separator = (locales[locale]) ? locales[locale].decimal : localeDefault.decimal;
      num = ('' + num).replace('.', separator);
      return num;
      break;
    default: // number
      separator = (locales[locale]) ? locales[locale].thousands : localeDefault.thousands;
      return numberWithCommas(num, separator);
    }
  };

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

  var renderLoadInfo = function renderLoadInfo($infoEl, filterInfo, metaData) {
    var statTerms = R6MLangTerms.terms.stats,
      info = statTerms.loadedInfo,
      allText = statTerms.allOption,
      seasonText = (filterInfo.season == ALL_KEY) ? allText : metaData.seasons[filterInfo.season].name,
      platformText = (filterInfo.platform == ALL_KEY) ? allText : metaData.platforms[filterInfo.platform].name,
      mapText = (filterInfo.map == ALL_KEY) ? allText : metaData.mapModeLocations[filterInfo.map].name,
      modeText = (filterInfo.mode == ALL_KEY) ? allText : metaData.modes[filterInfo.mode].name,
      locationText = (filterInfo.location == ALL_KEY) ? allText : metaData.mapModeLocations[filterInfo.map].objectives[filterInfo.mode][filterInfo.location].name;

    info = info.replace('{season}', seasonText);
    info = info.replace('{platform}', platformText);
    info = info.replace('{map}', mapText);
    info = info.replace('{mode}', modeText);
    info = info.replace('{location}', locationText);
    $infoEl.html(info);
  };

  var renderStaticEl = function renderStaticEl($allParagraphs, $instructionParagraphs) {
    $allParagraphs.html(R6MLangTerms.terms.stats.allOption);
    $instructionParagraphs.html(R6MLangTerms.terms.stats.instructions);
  };

  var setPageTitle = function setPageTitle() {
    document.title = R6MLangTerms.terms.stats.titleBeta;
  };

  return  {
    getFormattedNumber: getFormattedNumber,
    renderHeaders: renderHeaders,
    renderStaticEl: renderStaticEl,
    renderLoadError: renderLoadError,
    renderLoadInfo: renderLoadInfo,
    setPageTitle: setPageTitle
  };
})(R6MLangTerms);
