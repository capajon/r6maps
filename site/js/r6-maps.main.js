'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms);
}(function($, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms, undefined) {
  var mapWrappers,
    mapPanelWrapper,
    mapMains,
    mapElements,
    svgElements,
    sessionMarkerElements,
    navLogoEl,
    bodyEl,
    mainNavEl,
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
    tryLoadMenuOptions();

    R6MapsControls.setupPanZoom(mapMains, mapElements);

    if (trySelectBookmarkedMap()) {
      loadMap();
      trySelectBookmarkedObjective();
      trySelectBookmarkedFloor();
      showMap();
    } else {
      showSelectMap();
      document.title = R6MapsLangTerms.terms.general.pageTitleStart;
    }

    R6MapsSessions.setup(
      mapMains,
      sessionMarkerElements,
      isCamera
    );
  });

  var checkIfMapLoaded = function checkIfMapLoaded() {
    return bodyEl.attr('loaded-map');
  };

  var isCamera = function isCamera(element) {
    return element.hasClass('camera');
  };

  var isShowingMap = function isShowingMap() {
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

  var getResetDimensions = function getResetDimensions() {
    var currentMapKey = R6MapsControls.getCurrentlySelectedMap(),
      zoomPoints = {
        topLeft: { top: -180, left: -312 }, // default
        bottomRight: { top: 180, left: 312 }
      };

    if (currentMapKey) {
      zoomPoints = $.extend(
        zoomPoints,
        R6MapsData.getMapData()[currentMapKey].zoomPoints
      );
    }
    var zoomWidth = zoomPoints.bottomRight.left - zoomPoints.topLeft.left,
      zoomHeight = zoomPoints.bottomRight.top - zoomPoints.topLeft.top,
      centerTop = Math.round(zoomPoints.bottomRight.top - (zoomHeight / 2)),
      centerLeft = Math.round(zoomPoints.topLeft.left + (zoomWidth / 2)),
      panelWidth = mapWrappers.width(),
      panelHeight = mapWrappers.height(),
      navHeight = mainNavEl.height(),
      paddingWidth = Math.min(panelHeight * 0.1, navHeight),
      paddingHeight = Math.min(panelHeight * 0.1, navHeight * 2);

    panelWidth = panelWidth - paddingWidth;
    panelHeight = panelHeight - paddingHeight;
    var result = {
      debugZoomWidth: zoomWidth,
      debugZoomHeight: zoomHeight,
      centerTop: centerTop,
      centerLeft: centerLeft,
      debugPanelWidth: panelWidth,
      debugPanelHeight: panelHeight,
      debugPaddingWidth: paddingWidth,
      debugPaddingHeight: paddingHeight,
      zoomValue: Math.max(
        Math.min(
          1,
          panelWidth / zoomWidth,
          panelHeight / zoomHeight
        ),
        0.5
      )
    };

    return result;
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
    var newLang = $(event.target).data('lang');

    event.preventDefault();

    R6MapsLangTerms.tryLoadLanguage(newLang);
    localStorageSetItem('language', newLang);

    setupSelectMap();
    R6MapsControls.populateMapOptions(R6MapsData.getMapData());
    setupMenu();
    setupEvents();
    tryLoadMenuOptions();

    if (checkIfMapLoaded()) {
      loadMap();
    }
  };

  var handleEnableScreenshotsChange = function handleEnableScreenshotsChange(value) {
    localStorageSetItem('enablescreenshots', value);
    R6MapsRender.setEnableScreenshots(mapWrappers, value);
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

  var hideSelectMap = function hideSelectMap() {
    bodyEl.removeClass(SHOW_SELECT_MAP);
  };

  var localStorageSetItem = function localStorageSetItem(index, value) {
    try {
      localStorage.setItem(index, value);
    } catch (e) {
      //guarding against safari in private browsing mode
    }
  };

  var loadMap = function loadMap() {
    var currentlySelectedMap = R6MapsControls.getCurrentlySelectedMap(),
      mapData = R6MapsData.getMapData();

    R6MapsControls.populateObjectiveOptions(mapData[currentlySelectedMap].objectives);
    R6MapsControls.populateFloorOptions(mapData[currentlySelectedMap].floors);
    R6MapsRender.renderMap(mapData[currentlySelectedMap], mapElements, svgElements, getResetDimensions);
    R6MapsControls.resetPan(mapMains, getResetDimensions);
    R6MapsControls.resetZoom(mapMains, getResetDimensions);

    setupCameraScreenshots();
    setupCameraLos();
    showSelectedFloor();
    showSelectedObjective();

    setLoadedMapKey(currentlySelectedMap);
    navLogoEl.addClass('enabled');

    R6MapsSessions.reset(sessionMarkerElements);
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
    localStorageSetItem('lockpanning', value);
    if (value) {
      R6MapsControls.resetPan(mapMains);
    }
  };

  var saveLockZoomingOption = function saveLockZoomingOption(value) {
    localStorageSetItem('lockzooming', value);
    if (value) {
      R6MapsControls.resetZoom(mapMains, getResetDimensions);
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

  var sendMapPanelCountEvent = function sendMapPanelCountEvent(panelCount) {
    sendControlAnalyticsEvent('PanelsCount', panelCount);
  };

  var sendMapSelectAnalyticsEvent = function sendMapSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Map', R6MapsControls.getCurrentlySelectedMap());
  };

  var sendObjectiveSelectAnalyticsEvent = function sendObjectiveSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Objective', R6MapsControls.getCurrentlySelectedObjective());
  };

  var sendRoomLabelEvent = function sendRoomLabelEvent(style) {
    sendControlAnalyticsEvent('RoomLabel', style);
  };

  var setLoadedMapKey = function setLoadedMapKey(mapKey) {
    bodyEl.attr('loaded-map', mapKey);
  };

  var setMapElements = function setMapElements() {
    mapWrappers = $('.map-wrapper');
    mapMains = mapWrappers.find('.map-main');
    mapElements = mapMains.find('.map-elements');
    svgElements = mapMains.find('svg.map g');
    sessionMarkerElements = mapMains.find('svg.session-markers g');
  };

  var setMapPanelCount = function setMapPanelCount(numPanels) {
    localStorageSetItem('mappanelcount', numPanels);
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

    R6MapsControls.resetPan(mapMains, getResetDimensions);
    R6MapsControls.resetZoom(mapMains, getResetDimensions);

    showSelectedFloor();
    sendMapPanelCountEvent(numPanels);
  };

  var setPageElements = function setPageElements() {
    mapPanelWrapper = $('#map-panel-wrapper');
    navLogoEl = $('#nav-logo');
    bodyEl = $('body');
    mainNavEl = $('#main-nav');
  };

  var setRoomLabelStyle = function setRoomLabelStyle(style) {
    R6MapsRender.setRoomLabelStyle(mapElements, style);
    localStorageSetItem('roomlabelstyle', style);
    sendRoomLabelEvent(style);
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
    var closeMenu = getMenuApi().close;

    mapMains.on('click', outputCoordinates);
    R6MapsControls.setupObjectiveChangeEvent(handleObjectiveChange);
    R6MapsControls.setupMapChangeEvent(handleMapChange);
    R6MapsControls.setupFloorChangeEvent(handleFloorChange);
    R6MapsControls.setupFloorHotkeys(showSelectedFloor);
    R6MapsControls.setupRoomLabelStyleChangeEvent(setRoomLabelStyle);
    R6MapsControls.setupMapPanelCountChangeEvent(setMapPanelCount);
    R6MapsControls.setupLockPanningChangeEvent(saveLockPanningOption);
    R6MapsControls.setupLockZoomingChangeEvent(saveLockZoomingOption);
    R6MapsControls.setupEnableScreenshotsChangeEvent(handleEnableScreenshotsChange);
    R6MapsControls.setupMenuSelectMaps(showSelectMap, closeMenu);
    R6MapsControls.setupFullScreenControl();
    navLogoEl.on('click', toggleShowSelectMap);

    $(window).on('orientationchange', function() {
      R6MapsControls.resetPan(mapMains, getResetDimensions);
      R6MapsControls.resetZoom(mapMains, getResetDimensions);
    });
  };

  var showMap = function showMap() {
    hideSelectMap();
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
      mainNavEl,
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
      hideSelectMap();
      setTimeout(function() {
        loadMap();
        showMap();
      },1);
    }
  };

  var toggleShowSelectMap = function toggleShowSelectMap(event) {
    var menuApi = getMenuApi();

    event.preventDefault();
    if (isShowingMap()) {
      showSelectMap();
      menuApi.close();
    } else if (checkIfMapLoaded()) {
      showMap();
      menuApi.close();
    }
  };

  var tryHideMapSelect = function tryHideMapSelect() {
    if (checkIfMapLoaded()) {
      showMap();
    }
  };

  var tryLoadEnableScreenshotsOption = function tryLoadEnableScreenshotsOption() {
    var enableScreenshotsOption = localStorage.getItem('enablescreenshots');

    if (enableScreenshotsOption !== null) {
      R6MapsControls.setEnableScreenshotsOption(enableScreenshotsOption);
      handleEnableScreenshotsChange((enableScreenshotsOption === 'true'));
    }
  };

  var tryLoadLockPanningOption = function tryLoadLockPanningOption() {
    var lockPanningOption = localStorage.getItem('lockpanning');

    if (lockPanningOption !== null) {
      R6MapsControls.setLockPanningOption(lockPanningOption);
    }
  };

  var tryLoadLockZoomingOption = function tryLoadLockZoomingOption() {
    var lockZoomingOption = localStorage.getItem('lockzooming');

    if (lockZoomingOption !== null) {
      R6MapsControls.setLockZoomingOption(lockZoomingOption);
    }
  };

  var tryLoadMapPanelCount = function tryLoadMapPanelCount() {
    var mapPanelCount = localStorage.getItem('mappanelcount');

    if (!mapPanelCount) {
      var windowEl = $(window);

      mapPanelCount = (
        (windowEl.width() > 1000) || (windowEl.height() > 1000)
      ) ? 2 : 1;
    }
    R6MapsControls.trySelectMapPanelCount(mapPanelCount);
    setMapPanelCount(mapPanelCount);
  };

  var tryLoadMenuOptions = function tryLoadMenuOptions() {
    tryEnableChannelFeature();
    tryLoadMapPanelCount();
    tryLoadLockPanningOption();
    tryLoadLockZoomingOption();
    tryLoadRoomLabelStyle();
    tryLoadEnableScreenshotsOption();
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
    if (isShowingMap()) {
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

    localStorageSetItem('cameralosopacity', opacity);
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
    document.title = isShowingMap() ?
      R6MapsLangTerms.terms.general.pageTitle.replace(
        '{mapName}',
        R6MapsData.getMapData()[getLoadedMapKey()].name
      ) :
      R6MapsLangTerms.terms.general.pageTitleSelectMap;
  };
}));
