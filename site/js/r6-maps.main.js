'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms);
}(function($, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms, undefined) {
  var map,
    mapElements,
    svgElements,
    firstMapLoaded = false,
    DISPLAY = {
      SHOW_MAP: 'show-map',
      SELECT_MAP: 'show-select-map'
    },
    currentDisplay = DISPLAY.SELECT_MAP,
    HASH_SPLIT_CHAR = '/',
    DEFAULT_LOS_OPACITY = 0.15;

  $(function() { // equivanelt to $(document).ready() - but a bit faster
    map = $('#map');
    mapElements = map.find('#map-elements');
    svgElements = map.find('#svg-elements');

    tryLoadStartingLanguage();
    setupMenu();
    setupSelectMap();

    R6MapsControls.populateMapOptions(R6MapsData.getMapData());
    if (trySelectBookmarkedMap()) {
      loadMap();
      trySelectBookmarkedObjective();
      trySelectBookmarkedFloor();
      showOnlyMap();
    } else {
      showOnlySelectMap();
      setTitleStart();
    }

    setupEvents();
    R6MapsControls.setupZoom(map, mapElements);
  });

  var tryLoadStartingLanguage = function tryLoadStartingLanguage(){
    var lastChosenLanguage = localStorage.getItem('language'),
      userLang = (navigator.language || navigator.userLanguage).split('-')[0];

    if (lastChosenLanguage) {
      R6MapsLangTerms.tryLoadLanguage(lastChosenLanguage);
    } else if (userLang) {
      R6MapsLangTerms.tryLoadLanguage(userLang);
    };  // default will be English otherwise
  };

  var setTitleSelectMap = function setTitleSelectMap() {
    document.title = R6MapsLangTerms.terms.general.pageTitleSelectMap;
  };

  var setTitleStart = function setTitleStart() {
    document.title = R6MapsLangTerms.terms.general.pageTitleStart;
  };

  var loadMap = function loadMap() {
    var currentlySelectedMap = R6MapsControls.getCurrentlySelectedMap(),
      mapData = R6MapsData.getMapData();

    R6MapsControls.populateObjectiveOptions(mapData[currentlySelectedMap].objectives);
    R6MapsControls.populateFloorOptions(mapData[currentlySelectedMap].floors);
    R6MapsRender.renderMap(mapData[currentlySelectedMap], mapElements, svgElements);
    setupCameraScreenshots();
    setupCameraLos();
    showSelectedFloor();
    showSelectedObjective();
    R6MapsControls.resetPan(map);

    if (!firstMapLoaded) {
      firstTimeMapLoad();
    }
  };

  var switchToMap = function switchToMap(mapArg) {
    if (R6MapsControls.trySelectMap(mapArg)) {
      showOnlyMap();
      loadMap();
      updateUrl();
    }
  };

  var firstTimeMapLoad = function firstTimeMapLoad() {
    var navLogo = $('#nav-logo');

    firstMapLoaded = true;
    navLogo.on('click', function(event) {
      event.preventDefault();
      toggleShowMapAndSelectMap();
    });
    navLogo.addClass('enabled');
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

  var getHashArgs = function getHashArgs() {
    return window.location.hash.substr(1).split(HASH_SPLIT_CHAR);
  };

  var setupEvents = function setupEvents() {
    map.on('click', outputCoordinates);

    R6MapsControls.setupObjectiveChangeEvent(handleObjectiveChange);
    R6MapsControls.setupMapChangeEvent(handleMapChange);
    R6MapsControls.setupFloorChangeEvent(handleFloorChange);
    R6MapsControls.setupFloorHotkeys(showSelectedFloor);
  };

  var setupCameraLos = function setupCameraLos() {
    $('.camera').on('mouseenter', handleCameraIn);
    $('.camera').on('mouseleave', handleCameraOut);
    updateLosOpacity(getCameraLosOpacity());
  };

  var getCameraLosOpacity = function getCameraLosOpacity() {
    var opacity = localStorage.getItem('cameralosopacity');

    if (opacity) {
      return opacity;
    } else {
      return DEFAULT_LOS_OPACITY;
    }
  };

  var handleCameraIn = function handleCameraHoverIn(event) {
    var cameraId = getCameraIdFromEvent(event);

    $('.camera-los.camera-' + cameraId).addClass('show-more');
  };

  var handleCameraOut = function handleCameraHoverOut(event) {
    var cameraId = getCameraIdFromEvent(event);

    $('.camera-los.camera-' + cameraId).removeClass('show-more');
  };

  var getCameraIdFromEvent = function getCameraIdFromEvent(event) {
    return $(event.target).data('camera-id');
  };

  var handleMapChange = function handleMapChange() {
    sendMapSelectAnalyticsEvent();
    loadMap();
    updateUrl();
  };

  var handleObjectiveChange = function handleObjectiveChange() {
    sendObjectiveSelectAnalyticsEvent();
    showSelectedObjective();
    updateUrl();
  };

  var handleFloorChange = function handleFloorChange() {
    sendFloorSelectAnalyticsEvent();
    showSelectedFloor();
    updateUrl();
  };

  var sendMapSelectAnalyticsEvent = function sendMapSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Map', R6MapsControls.getCurrentlySelectedMap());
  };

  var sendObjectiveSelectAnalyticsEvent = function sendObjectiveSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Objective', R6MapsControls.getCurrentlySelectedObjective());
  };

  var sendFloorSelectAnalyticsEvent = function sendFloorSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Floor', R6MapsControls.getCurrentlySelectedFloor());
  };

  var sendControlAnalyticsEvent = function sendControlAnalyticsEvent(control, value) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Controls',
      eventAction: control,
      eventLabel: value
    });
  };

  var updateUrl = function updateUrl() {
    var hashText = '';

    hashText += '' + R6MapsControls.getCurrentlySelectedMap();
    hashText += HASH_SPLIT_CHAR + R6MapsControls.getCurrentlySelectedFloor();
    hashText += HASH_SPLIT_CHAR + R6MapsControls.getCurrentlySelectedObjective();
    window.location.hash = hashText;
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

  var setupMenu = function setupMenu() {
    R6MapsControls.populateMenu();

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
    $('#lang-choices').on('click','a',handleLangChange);

    R6MapsControls.setupLosOpacity(updateLosOpacity, getCameraLosOpacity(), DEFAULT_LOS_OPACITY);
  };

  var setupSelectMap = function seteupSelectMap() {
    R6MapsSelectMaps.setup(
      $('#select-map-grid'),
      $('#select-map-heading'),
      $('#main-nav'),
      R6MapsData.getMapData(),
      switchToMap,
      closeMapSelect
    );
  };

  var updateLosOpacity = function updateLosOpacity(opacity) {
    localStorage.setItem('cameralosopacity', opacity);
    $('.camera-los').css('opacity', opacity);
  };

  var handleMenuClick = function handleMenuClick(e) {
    var menuApi = getMenuApi();

    e.preventDefault();
    menuApi.open();
  };

  var handleLangChange = function handleLangChange(event) {
    var menuApi = getMenuApi(),
      newLang = $(event.target).data('lang');

    event.preventDefault();
    menuApi.close();

    R6MapsLangTerms.tryLoadLanguage(newLang);

    setupMenu();
    setupSelectMap();

    R6MapsControls.populateMapOptions(R6MapsData.getMapData());
    if (firstMapLoaded) {
      loadMap();
    }

    localStorage.setItem('language', newLang);
  };

  var getMenuApi = function getMenuApi() {
    return $('#mmenu-menu').data( 'mmenu' );
  };

  var showSelectedFloor =  function showSelectedFloor() {
    R6MapsRender.showFloor(R6MapsControls.getCurrentlySelectedFloor(), map);
  };

  var showSelectedObjective =  function showSelectedObjective() {
    R6MapsRender.showObjective(R6MapsControls.getCurrentlySelectedObjective(), mapElements);
  };

  var toggleShowMapAndSelectMap = function toggleShowMapAndSelectMap() {
    switch (currentDisplay) {

    case DISPLAY.SHOW_MAP:
      showOnlySelectMap();
      break;

    case DISPLAY.SELECT_MAP:
      showOnlyMap();
      break;
    }
  };

  var closeMapSelect = function closeMapSelect() {
    if(firstMapLoaded) {
      showOnlyMap();
    }
  };

  var showOnlySelectMap = function showSelectMap() {
    var bodyEl = $('body');

    setTitleSelectMap();
    hideCurrent();
    bodyEl.addClass(DISPLAY.SELECT_MAP);
    currentDisplay = DISPLAY.SELECT_MAP;
  };

  var showOnlyMap = function showSelectMap() {
    var bodyEl = $('body');

    R6MapsRender.setTitle(
      R6MapsData.getMapData()[R6MapsControls.getCurrentlySelectedMap()].name
    );
    hideCurrent();
    bodyEl.addClass(DISPLAY.SHOW_MAP);
    currentDisplay = DISPLAY.SHOW_MAP;
  };

  var hideCurrent = function hideCurrent() {
    var bodyEl = $('body');

    switch (currentDisplay) {

    case DISPLAY.SHOW_MAP:
      bodyEl.removeClass(DISPLAY.SHOW_MAP);
      break;

    case DISPLAY.SELECT_MAP:
      bodyEl.removeClass(DISPLAY.SELECT_MAP);
      break;
    }
  };
}));
