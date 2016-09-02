'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms);
}(function($, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms, undefined) {
  var mapEl,
    mapElements,
    svgElements,
    navLogoEl,
    bodyEl,
    SHOW_MAP = 'show-map',
    SHOW_SELECT_MAP = 'show-select-map',
    HASH_SPLIT_CHAR = '/',
    DEFAULT_LOS_OPACITY = 0.15;

  $(function() { // equivanelt to $(document).ready() - but a bit faster
    mapEl = $('#map');
    mapElements = mapEl.find('#map-elements');
    svgElements = mapEl.find('#svg-elements');
    navLogoEl = $('#nav-logo');
    bodyEl = $('body');

    tryLoadStartingLanguage();
    setupMenu();
    setupSelectMap();
    R6MapsControls.populateMapOptions(R6MapsData.getMapData());

    if (trySelectBookmarkedMap()) {
      loadMap();
      trySelectBookmarkedObjective();
      trySelectBookmarkedFloor();
      showMap();
    } else {
      showSelectMap();
      document.title = R6MapsLangTerms.terms.general.pageTitleStart;
    }

    setupEvents();
    R6MapsControls.setupZoom(mapEl, mapElements);
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
    tryUpdateUrl();
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
    if (checkIfMapLoaded()) {
      loadMap();
    }
    localStorage.setItem('language', newLang);
  };

  var handleMapChange = function handleMapChange() {
    sendMapSelectAnalyticsEvent();
    loadMap();
    tryUpdateUrl();
  };

  var handleMenuClick = function handleMenuClick(e) {
    var menuApi = getMenuApi();

    e.preventDefault();
    menuApi.open();
  };

  var handleObjectiveChange = function handleObjectiveChange() {
    sendObjectiveSelectAnalyticsEvent();
    showSelectedObjective();
    tryUpdateUrl();
  };

  var loadMap = function loadMap() {
    var currentlySelectedMap = R6MapsControls.getCurrentlySelectedMap(),
      mapData = R6MapsData.getMapData();

    R6MapsControls.populateObjectiveOptions(mapData[currentlySelectedMap].objectives);
    R6MapsControls.populateFloorOptions(mapData[currentlySelectedMap].floors);
    R6MapsRender.renderMap(mapData[currentlySelectedMap], mapElements, svgElements);
    R6MapsControls.resetPan(mapEl);

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

  var sendMapSelectAnalyticsEvent = function sendMapSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Map', R6MapsControls.getCurrentlySelectedMap());
  };

  var sendObjectiveSelectAnalyticsEvent = function sendObjectiveSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Objective', R6MapsControls.getCurrentlySelectedObjective());
  };

  var setLoadedMapKey = function setLoadedMapKey(mapKey) {
    bodyEl.attr('loaded-map', mapKey);
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
    mapEl.on('click', outputCoordinates);

    R6MapsControls.setupObjectiveChangeEvent(handleObjectiveChange);
    R6MapsControls.setupMapChangeEvent(handleMapChange);
    R6MapsControls.setupFloorChangeEvent(handleFloorChange);
    R6MapsControls.setupFloorHotkeys(showSelectedFloor);

    navLogoEl.on('click', function(event) {
      event.preventDefault();
      if (checkIfShowingMap()) {
        showSelectMap();
      } else {
        showMap();
      }
    });
  };

  var showMap = function showMap() {
    bodyEl.removeClass(SHOW_SELECT_MAP);
    bodyEl.addClass(SHOW_MAP);
    tryUpdateUrl();
    updateTitle();
  };

  var showSelectMap = function showSelectMap() {
    bodyEl.removeClass(SHOW_MAP);
    bodyEl.addClass(SHOW_SELECT_MAP);
    tryUpdateUrl();
    updateTitle();
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
      tryHideMapSelect
    );
  };

  var showSelectedFloor =  function showSelectedFloor() {
    R6MapsRender.showFloor(R6MapsControls.getCurrentlySelectedFloor(), mapEl);
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

  var tryLoadStartingLanguage = function tryLoadStartingLanguage(){
    var lastChosenLanguage = localStorage.getItem('language'),
      userLang = (navigator.language || navigator.userLanguage).split('-')[0];

    if (lastChosenLanguage) {
      R6MapsLangTerms.tryLoadLanguage(lastChosenLanguage);
    } else if (userLang) {
      R6MapsLangTerms.tryLoadLanguage(userLang);
    };  // default will be English otherwise
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

  var tryUpdateUrl = function tryUpdateUrl() {
    var hashText = '';

    if (checkIfShowingMap()) {
      hashText += '' + R6MapsControls.getCurrentlySelectedMap();
      hashText += HASH_SPLIT_CHAR + R6MapsControls.getCurrentlySelectedFloor();
      hashText += HASH_SPLIT_CHAR + R6MapsControls.getCurrentlySelectedObjective();
    }
    window.location.hash = hashText;
  };

  var updateLosOpacity = function updateLosOpacity(opacity) {
    localStorage.setItem('cameralosopacity', opacity);
    $('.camera-los').css('opacity', opacity);
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
