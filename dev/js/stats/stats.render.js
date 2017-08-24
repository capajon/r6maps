'use strict';

var R6MStatsRender = (function(R6MLangTerms, undefined) {
  var ALL_KEY = 'ALL',
    statTerms = R6MLangTerms.terms.stats,
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

  var getFormattedNumber = function getFormattedNumber(num, displayType, options) {
    var locale = R6MLangTerms.getLoadedLang().split('_')[0],
      separator;

    options = options || {};

    switch (displayType) {
    case 'percent':
      num *= 100;
      num = (num < 10) ? num.toFixed(1) : Math.round(num);
      separator = (locales[locale] && !options.disableLocale) ? locales[locale].decimal : localeDefault.decimal;
      num = ('' + num).replace('.', separator);
      return options.minimal ? num : R6MLangTerms.terms.stats.percentageFormat.replace('{num}', num);
    case 'ratio':
      num = num.toFixed(1);
      separator = (locales[locale] && !options.disableLocale) ? locales[locale].decimal : localeDefault.decimal;
      num = ('' + num).replace('.', separator);
      return num;
    default: // number
      separator = (locales[locale] && !options.disableLocale) ? locales[locale].thousands : localeDefault.thousands;
      return numberWithCommas(num, separator);
    }
  };

  var renderAbout = function renderAbout($aboutEl) {
    var html = '';

    html += '<div class="about-container">';
    html += '<h2>' + statTerms.aboutLinksHeader + '</h2>';
    html += '<div class="link-wrapper">';
    html += '<a href="index.html">' + statTerms.aboutR6MapsHome + '</a>';
    html += '<a href="about/about.html">' + statTerms.aboutR6MapsAbout + '</a>';
    html += '<a class="about-footer" href="https://rainbow6.ubisoft.com/siege/en-us/news/152-293696-16/introduction-to-the-data-peek-velvet-shell-statistics">' + statTerms.aboutBasedOnUbisoft + '</a>';
    html += '</div>';
    html += '</div>';

    $aboutEl.html(html);
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
      infoLine1,
      infoLine2,
      seasonText = (filterInfo.season == ALL_KEY) ? null : metaData.seasons[filterInfo.season].name,
      platformText = (filterInfo.platform == ALL_KEY) ? null : metaData.platforms[filterInfo.platform].name,
      mapText = (filterInfo.map == ALL_KEY) ? null : metaData.mapModeLocations[filterInfo.map].name,
      modeText = (filterInfo.mode == ALL_KEY) ? null : metaData.modes[filterInfo.mode].name,
      locationText = (filterInfo.location == ALL_KEY || filterInfo.map == ALL_KEY || filterInfo.mode == ALL_KEY) ? null : metaData.mapModeLocations[filterInfo.map].objectives[filterInfo.mode][filterInfo.location].name;

    if (platformText) {
      infoLine1 = statTerms.loadedInfoLine1SinglePlatform.replace('{season}', seasonText).replace('{platform}', platformText);
    } else {
      infoLine1 = statTerms.loadedInfoLine1AllPlatforms.replace('{season}', seasonText);
    }

    if (!mapText && !modeText) {
      infoLine2 = statTerms.loadedInfoLine2AllMapsAllModes;
    } else if (mapText && !modeText) {
      infoLine2 = statTerms.loadedInfoLine2SingleMapAllModes.replace('{map}', mapText);
    } else if (!mapText && modeText) {
      infoLine2 = statTerms.loadedInfoLine2AllMapsSingleMode.replace('{mode}', modeText);
    } else if (mapText && modeText && !locationText) {
      infoLine2 = statTerms.loadedInfoLine2SingleMapSingleModeAllLocations.replace('{map}', mapText).replace('{mode}', modeText);
    } else {
      infoLine2 = statTerms.loadedInfoLine2SingleMapSingleModeSingleLocation.replace('{map}', mapText).replace('{mode}', modeText).replace('{location}', locationText);
    }

    $infoEl.html('<span class="main-info">' + infoLine1 + '</span><span class="secondary-info">' + infoLine2 + '</span>');
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
    renderAbout: renderAbout,
    renderHeaders: renderHeaders,
    renderStaticEl: renderStaticEl,
    renderLoadError: renderLoadError,
    renderLoadInfo: renderLoadInfo,
    setPageTitle: setPageTitle
  };
})(R6MLangTerms);
