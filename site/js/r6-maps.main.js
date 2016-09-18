'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms);
}(function($, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms, undefined) {
  var mapWrappers,
    mapPanelWrapper,
    mapMains,
    mapElements,
    svgElements,
    navLogoEl,
    bodyEl,
    SHOW_MAP = 'show-map',
    SHOW_SELECT_MAP = 'show-select-map',
    HASH_SPLIT_CHAR = '/',
    DEFAULT_LOS_OPACITY = 0.15;

  $(function() { // equivanelt to $(document).ready() - but a bit faster
    setPageElements();
    R6MapsRender.setupMapPanels(mapPanelWrapper, 4);
    setMapElements();
    tryLoadStartingLanguage();
    setupMenu();
    setupSelectMap();
    R6MapsControls.populateMapOptions(R6MapsData.getMapData());

    setupEvents();
    tryEnableChannelFeature();
    tryLoadMapPanelCount();
    tryLoadLockPanningOption();
    tryLoadRoomLabelStyle();

    if (trySelectBookmarkedMap()) {
      loadMap();
      trySelectBookmarkedObjective();
      trySelectBookmarkedFloor();
      showMap();
    } else {
      showSelectMap();
      document.title = R6MapsLangTerms.terms.general.pageTitleStart;
    }

    R6MapsControls.setupPanZoom(mapMains, mapElements);
  });

  var checkIfMapLoaded = function checkIfMapLoaded() {
    return bodyEl.attr('loaded-map');
  };

  var checkIfShowingMap = function checkIfShowingMap() {
    return bodyEl.hasClass(SHOW_MAP);
  };

  var getCameraIdFromEvent = function getCameraIdFromEvent(event) {
    return $(event.target).data('camera-id');
  };

  var getCameraLosOpacity = function getCameraLosOpacity() {
    var opacity = localStorage.getItem('cameralosopacity');

    if (opacity) {
      return opacity;
    } else {
      return DEFAULT_LOS_OPACITY;
    }
  };

  var getHashArgs = function getHashArgs() {
    return window.location.hash.substr(1).split(HASH_SPLIT_CHAR);
  };

  var getLoadedMapKey = function getLoadedMapKey() {
    return $('body').attr('loaded-map');
  };

  var getMenuApi = function getMenuApi() {
    return $('#mmenu-menu').data( 'mmenu' );
  };

  var handleCameraIn = function handleCameraHoverIn(event) {
    var cameraId = getCameraIdFromEvent(event);

    $('.camera-los.camera-' + cameraId).addClass('show-more');
  };

  var handleCameraOut = function handleCameraHoverOut(event) {
    var cameraId = getCameraIdFromEvent(event);

    $('.camera-los.camera-' + cameraId).removeClass('show-more');
  };

  var handleFloorChange = function handleFloorChange() {
    sendFloorSelectAnalyticsEvent();
    showSelectedFloor();
    updateUrl();
  };

  var handleLangChange = function handleLangChange(event) {
    var menuApi = getMenuApi(),
      newLang = $(event.target).data('lang');

    event.preventDefault();
    menuApi.close();

    R6MapsLangTerms.tryLoadLanguage(newLang);
    setupSelectMap();
    setupMenu();
    R6MapsControls.populateMapOptions(R6MapsData.getMapData());

    tryLoadMapPanelCount();
    R6MapsControls.setupMapPanelCountChangeEvent(setMapPanelCount);

    tryLoadRoomLabelStyle();
    R6MapsControls.setupRoomLabelStyleChangeEvent(setRoomLabelStyle);

    if (checkIfMapLoaded()) {
      loadMap();
    }

    localStorage.setItem('language', newLang);
  };

  var handleMapChange = function handleMapChange() {
    sendMapSelectAnalyticsEvent();
    loadMap();
    updateUrl();
  };

  var handleMenuClick = function handleMenuClick(e) {
    var menuApi = getMenuApi();

    e.preventDefault();
    menuApi.open();
  };

  var handleObjectiveChange = function handleObjectiveChange() {
    sendObjectiveSelectAnalyticsEvent();
    showSelectedObjective();
    updateUrl();
  };

  var loadMap = function loadMap() {
    var currentlySelectedMap = R6MapsControls.getCurrentlySelectedMap(),
      mapData = R6MapsData.getMapData();

    R6MapsControls.populateObjectiveOptions(mapData[currentlySelectedMap].objectives);
    R6MapsControls.populateFloorOptions(mapData[currentlySelectedMap].floors);
    R6MapsRender.renderMap(mapData[currentlySelectedMap], mapElements, svgElements);
    R6MapsControls.resetPan(mapMains);

    setupCameraScreenshots();
    setupCameraLos();
    showSelectedFloor();
    showSelectedObjective();

    setLoadedMapKey(currentlySelectedMap);
    navLogoEl.addClass('enabled');
  };

  var outputCoordinates = function outputCoordinates(e) {
    var warning = R6MapsControls.isZoomed() ? ' Warning, currently zoomed, coordinates are not accurate for CSS.' : '';

    console.log('SINGLE LINE TEXT:');
    console.log(
      'top: ' + Math.round(e.pageY - mapElements.offset().top + 14) + ', ' +
      'left: ' + Math.round(e.pageX - mapElements.offset().left)
    );

    console.log('REGULAR/DOUBLE LINE TEXT:');
    console.log(
      'top: ' + Math.round(e.pageY - mapElements.offset().top) + ', ' +
      'left: ' + Math.round(e.pageX - mapElements.offset().left) +
      warning
    );
  };

  var queryString = function queryString(key) { // for feature flags
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, '\\$&'); // escape RegEx meta chars
    var match = location.search.match(new RegExp('[?&]' + key + '=([^&]+)(&|$)'));

    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };

  var removeHashFromUrl = function removeHashFromUrl() {
    var scrollV, scrollH, loc = window.location;

    if ('pushState' in history) {
      history.pushState('', document.title, loc.pathname + loc.search);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      scrollV = document.body.scrollTop;
      scrollH = document.body.scrollLeft;

      loc.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scrollV;
      document.body.scrollLeft = scrollH;
    }
  };

  var saveLockPanningOption = function saveLockPanningOption(value) {
    localStorage.setItem('lockpanning', value);
    if (value) {
      R6MapsControls.resetPan(mapMains);
    }
  };

  var sendControlAnalyticsEvent = function sendControlAnalyticsEvent(control, value) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Controls',
      eventAction: control,
      eventLabel: value
    });
  };

  var sendFloorSelectAnalyticsEvent = function sendFloorSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Floor', R6MapsControls.getCurrentlySelectedFloor());
  };

  var setMapPanelCount = function setMapPanelCount(numPanels) {
    localStorage.setItem('mappanelcount', numPanels);
    mapPanelWrapper.attr('map-panel-count', numPanels);

    $.each(mapMains, function (index, map) {
      if (index < numPanels) {
        $(map).css('display', 'block');
        R6MapsControls.enableZoom($(map));
      } else {
        $(map).css('display', 'none');
        R6MapsControls.disableZoom($(map));
      }
    });

    R6MapsControls.resetPan(mapMains);
    R6MapsControls.resetZoom(mapMains);

    showSelectedFloor();
  };

  var sendMapSelectAnalyticsEvent = function sendMapSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Map', R6MapsControls.getCurrentlySelectedMap());
  };

  var sendObjectiveSelectAnalyticsEvent = function sendObjectiveSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Objective', R6MapsControls.getCurrentlySelectedObjective());
  };

  var setLoadedMapKey = function setLoadedMapKey(mapKey) {
    bodyEl.attr('loaded-map', mapKey);
  };

  var setMapElements = function setMapElements() {
    mapWrappers = $('.map-wrapper');
    mapMains = mapWrappers.find('.map-main');
    mapElements = mapMains.find('.map-elements');
    svgElements = mapMains.find('.svg-elements');
  };

  var setPageElements = function setPageElements() {
    mapPanelWrapper = $('#map-panel-wrapper');
    navLogoEl = $('#nav-logo');
    bodyEl = $('body');
  };

  var setRoomLabelStyle = function setRoomLabelStyle(style) {
    R6MapsRender.setRoomLabelStyle(mapElements, style);
    localStorage.setItem('roomlabelstyle', style);
  };

  var setupCameraLos = function setupCameraLos() {
    $('.camera').on('mouseenter', handleCameraIn);
    $('.camera').on('mouseleave', handleCameraOut);
    updateLosOpacity(getCameraLosOpacity());
  };

  var setupCameraScreenshots = function setupCameraScreenShots(){
    $('a.camera').fancybox({
      padding: 0,
      helpers: {
        overlay: {
          css: {
            background: 'rgba(48,113,169, 0.3)'
          }
        }
      }
    });
  };

  var setupEvents = function setupEvents() {
    mapMains.on('click', outputCoordinates);

    R6MapsControls.setupObjectiveChangeEvent(handleObjectiveChange);
    R6MapsControls.setupMapChangeEvent(handleMapChange);
    R6MapsControls.setupFloorChangeEvent(handleFloorChange);
    R6MapsControls.setupFloorHotkeys(showSelectedFloor);
    R6MapsControls.setupRoomLabelStyleChangeEvent(setRoomLabelStyle);
    R6MapsControls.setupMapPanelCountChangeEvent(setMapPanelCount);
    R6MapsControls.setupLockPanningChangeEvent(saveLockPanningOption);

    navLogoEl.on('click', function(event) {
      event.preventDefault();
      if (checkIfShowingMap()) {
        showSelectMap();
      } else if (checkIfMapLoaded()) {
        showMap();
      }
    });
  };

  var showMap = function showMap() {
    bodyEl.removeClass(SHOW_SELECT_MAP);
    bodyEl.addClass(SHOW_MAP);
    updateUrl();
    updateTitle();
  };

  var showSelectMap = function showSelectMap() {
    bodyEl.removeClass(SHOW_MAP);
    bodyEl.addClass(SHOW_SELECT_MAP);
    updateUrl();
    updateTitle();
  };

  var setupMenu = function setupMenu() {
    R6MapsControls.setupMenu(R6MapsRender.roomLabelStyles);

    $('#mmenu-menu').mmenu({
      offCanvas: {
        position: 'right'
      },
      extensions: ['pagedim']
    },
      {
        offCanvas: {
          pageSelector: '#mmenu-page'
        }
      });

    $('#mmenu-link').click(handleMenuClick);
    $('#lang-choices').on('click','a', handleLangChange);

    R6MapsControls.setupLosOpacity(updateLosOpacity, getCameraLosOpacity(), DEFAULT_LOS_OPACITY);
  };

  var setupSelectMap = function seteupSelectMap() {
    R6MapsSelectMaps.setup(
      $('#select-map-grid'),
      $('#select-map-heading'),
      $('#main-nav'),
      R6MapsData.getMapData(),
      switchToMap,
      tryHideMapSelect,
      R6MapsRender.getSpinnerHtml
    );
  };

  var showSelectedFloor =  function showSelectedFloor() {
    var minMadFlorIndexes = R6MapsControls.getMinAndMaxFloorIndex();

    R6MapsRender.showFloor(
      R6MapsControls.getCurrentlySelectedFloor(),
      mapPanelWrapper,
      mapWrappers,
      minMadFlorIndexes.min,
      minMadFlorIndexes.max
    );
  };

  var showSelectedObjective =  function showSelectedObjective() {
    R6MapsRender.showObjective(R6MapsControls.getCurrentlySelectedObjective(), mapElements);
  };

  var switchToMap = function switchToMap(mapArg) {
    if (R6MapsControls.trySelectMap(mapArg)) {
      loadMap();
      showMap();
    }
  };

  var tryHideMapSelect = function tryHideMapSelect() {
    if (checkIfMapLoaded()) {
      showMap();
    }
  };

  var tryLoadLockPanningOption = function tryLoadLockPanningOption() {
    var lockPanningOption = localStorage.getItem('lockpanning');

    if (lockPanningOption !== null) {
      R6MapsControls.setLockPanningOption(lockPanningOption);
    }
  };

  var tryLoadMapPanelCount = function tryLoadMapPanelCount() {
    var mapPanelCount = localStorage.getItem('mappanelcount');

    if (mapPanelCount) {
      R6MapsControls.trySelectMapPanelCount(mapPanelCount);
      setMapPanelCount(mapPanelCount);
    }
  };

  var tryLoadStartingLanguage = function tryLoadStartingLanguage() {
    var lastChosenLanguage = localStorage.getItem('language'),
      userLang = (navigator.language || navigator.userLanguage).split('-')[0];

    if (lastChosenLanguage) {
      R6MapsLangTerms.tryLoadLanguage(lastChosenLanguage);
    } else if (userLang) {
      R6MapsLangTerms.tryLoadLanguage(userLang);
    };  // default will be English otherwise
  };

  var tryLoadRoomLabelStyle = function tryLoadRoomLabelStyle() {
    var style = localStorage.getItem('roomlabelstyle');

    if (style) {
      R6MapsControls.trySelectRoomLabelStyle(style);
      R6MapsRender.setRoomLabelStyle(mapElements, style);
    }
  };

  var trySelectBookmarkedMap = function trySelectBookmarkedMap() {
    var hashArgs = getHashArgs(),
      mapArg = hashArgs[0];

    return R6MapsControls.trySelectMap(mapArg);
  };

  var trySelectBookmarkedObjective = function trySelectBookmarkedObjective() {
    var hashArgs = getHashArgs(),
      objectiveArg = hashArgs[2];

    if (R6MapsControls.trySelectObjective(objectiveArg)) {
      showSelectedObjective();
    }
  };

  var trySelectBookmarkedFloor = function trySelectBookmarkedFloor() {
    var hashArgs = getHashArgs(),
      floorArg = hashArgs[1];

    if (R6MapsControls.trySelectFloor(floorArg)) {
      showSelectedFloor();
    }
  };

  var tryEnableChannelFeature = function tryEnableChannelFeature() {
    if (queryString('channels')) {
      R6MapsControls.enableChannelControl();
    }
  };

  var updateUrl = function updateUrl() {
    if (checkIfShowingMap()) {
      var hashText = '';

      hashText += '' + R6MapsControls.getCurrentlySelectedMap();
      hashText += HASH_SPLIT_CHAR + R6MapsControls.getCurrentlySelectedFloor();
      hashText += HASH_SPLIT_CHAR + R6MapsControls.getCurrentlySelectedObjective();
      window.location.hash = hashText;
    } else {
      removeHashFromUrl();
    }
  };

  var updateLosOpacity = function updateLosOpacity(opacity) {
    var cameraLines = $('.camera-los');

    localStorage.setItem('cameralosopacity', opacity);
    cameraLines.css('opacity', opacity);
    cameraLines.removeClass('opacity-105');
    cameraLines.removeClass('opacity-110');
    if (opacity == 1.05) {
      cameraLines.addClass('opacity-105');
    } else if (opacity == 1.10) {
      cameraLines.addClass('opacity-110');
    }
  };

  var updateTitle = function updateTitle() {
    document.title = checkIfShowingMap() ?
      R6MapsLangTerms.terms.general.pageTitle.replace(
        '{mapName}',
        R6MapsData.getMapData()[getLoadedMapKey()].name
      ) :
      R6MapsLangTerms.terms.general.pageTitleSelectMap;
  };
}));
