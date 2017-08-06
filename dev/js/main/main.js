'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MapsMainData, R6MapsMainRender, R6MapsMainControls, R6MapsMainDrawing, R6MapsMainSelectMaps, R6MapsMainSessions, R6MapsCommonHelpers, R6MapsCommonLangTerms);
}(function($, window, document, R6MapsMainData, R6MapsMainRender, R6MapsMainControls, R6MapsMainDrawing, R6MapsMainSelectMaps, R6MapsMainSessions, R6MapsCommonHelpers, R6MapsCommonLangTerms, undefined) {
  var $mapWrappers,
    $mapPanelWrappers,
    $mapMains,
    $mapElements,
    $svgMapWrappers,
    $mapPanelLabels,
    $drawingMarkerWrappers,
    $navLogo,
    $body,
    $mainNav,
    $sessionsDialog,
    SHOW_MAP = 'show-map',
    SHOW_SELECT_MAP = 'show-select-map',
    HASH_SPLIT_CHAR = '/',
    DEFAULT_LOS_OPACITY = 0.15,
    UPDATE_HIGHLIGHT = {
      LOCALSTORAGE_READ_STRING: 'feb2017updateread', // set in update html page
      CUTOFF_TIME_MS: 1489536000000 //March 15 2017
    };

  $(function() { // equivanelt to $(document).ready() - but a bit faster
    setPageElements();
    R6MapsMainRender.setupMapPanels($mapPanelWrappers, 4);
    setMapElements();
    R6MapsCommonHelpers.tryLoadStartingLanguage(R6MapsCommonLangTerms.tryLoadLanguage);
    setupMenu();
    setupSelectMap();
    R6MapsMainControls.maps.populate(R6MapsMainData.getMapData());

    $sessionsDialog = $('#sessions-dialog');
    R6MapsMainSessions.createJoinDialog.setup($sessionsDialog);

    setupEvents();
    $navLogo.on('click', toggleShowSelectMap);
    tryLoadMenuOptions();

    R6MapsMainControls.setupPanZoom($mapMains, $mapElements);

    if (trySelectBookmarkedMap()) {
      loadMap();
      trySelectBookmarkedObjective();
      trySelectBookmarkedFloor();
      showMap();
    } else {
      showSelectMap();
      document.title = R6MapsCommonLangTerms.terms.general.pageTitleStart;
    }

    setTimeout(function() {
      $body.removeClass('loading');
    }, 10);
  });

  var checkIfMapLoaded = function checkIfMapLoaded() {
    return $body.attr('loaded-map');
  };

  var isCamera = function isCamera(element) {
    return element.hasClass('camera');
  };

  var isShowingMap = function isShowingMap() {
    return $body.hasClass(SHOW_MAP);
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
    var currentMapKey = R6MapsMainControls.maps.get(),
      zoomPoints = {
        topLeft: { top: -180, left: -312 }, // default
        bottomRight: { top: 180, left: 312 }
      };

    if (currentMapKey) {
      zoomPoints = $.extend(
        zoomPoints,
        R6MapsMainData.getMapData()[currentMapKey].zoomPoints
      );
    }
    var zoomWidth = zoomPoints.bottomRight.left - zoomPoints.topLeft.left,
      zoomHeight = zoomPoints.bottomRight.top - zoomPoints.topLeft.top,
      centerTop = Math.round(zoomPoints.bottomRight.top - (zoomHeight / 2)),
      centerLeft = Math.round(zoomPoints.topLeft.left + (zoomWidth / 2)),
      panelWidth = $mapWrappers.width(),
      panelHeight = $mapWrappers.height(),
      navHeight = $mainNav.height(),
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
    R6MapsMainDrawing.refreshPings(); // hacky drawing module for now
  };

  var handleLangChange = function handleLangChange(event) {
    var newLang = $(event.target).data('lang');

    event.preventDefault();

    R6MapsCommonLangTerms.tryLoadLanguage(newLang);
    localStorageSetItem('language', newLang);

    setupSelectMap();
    R6MapsMainControls.maps.populate(R6MapsMainData.getMapData());
    setupMenu();
    setupEvents();
    tryLoadMenuOptions();
    updateTitle();

    if (checkIfMapLoaded()) {
      loadMap();
    }
  };

  var handleEnableScreenshotsChange = function handleEnableScreenshotsChange(value) {
    localStorageSetItem('enablescreenshots', value);
    R6MapsMainRender.setEnableScreenshots($mapWrappers, value);
  };

  var handleMapChange = function handleMapChange() {
    sendMapSelectAnalyticsEvent();
    loadMap();
    updateUrl();
  };

  var handleMapPanelCountChange = function handleMapPanelCountChange(numPanels) {
    sendMapPanelCountEvent(numPanels);
    setMapPanelCount(numPanels);
  };

  var handleMenuClick = function handleMenuClick(e) {
    var menuApi = getMenuApi();

    e.preventDefault();
    menuApi.open();
    R6MapsMainControls.removeLatestUpdateHighlight(200);
  };

  var handleObjectiveChange = function handleObjectiveChange() {
    sendObjectiveSelectAnalyticsEvent();
    showSelectedObjective();
    updateUrl();
  };

  var hideSelectMap = function hideSelectMap() {
    $body.removeClass(SHOW_SELECT_MAP);
  };

  var localStorageSetItem = function localStorageSetItem(index, value) {
    try {
      localStorage.setItem(index, value);
    } catch (e) {
      //guarding against safari in private browsing mode
    }
  };

  var loadMap = function loadMap() {
    var currentlySelectedMap = R6MapsMainControls.maps.get(),
      mapData = R6MapsMainData.getMapData();

    R6MapsMainControls.objectives.populate(mapData[currentlySelectedMap].objectives);
    R6MapsMainControls.floors.populate(mapData[currentlySelectedMap].floors);
    R6MapsMainRender.renderMap(mapData[currentlySelectedMap], $mapWrappers, $mapElements, $svgMapWrappers, $mapPanelLabels);
    if (!DEV_MODE) {
      R6MapsMainControls.pan.reset($mapMains, getResetDimensions);
      R6MapsMainControls.zoom.reset($mapMains, getResetDimensions);
    }

    setupCameraScreenshots();
    setupCameraLos();
    showSelectedFloor();
    showSelectedObjective();

    setLoadedMapKey(currentlySelectedMap);
    $navLogo.addClass('enabled');
    updateTitle();

    R6MapsMainDrawing.setup(
      $mapMains,
      $drawingMarkerWrappers,
      isCamera,
      R6MapsMainRender.SVG_DIM
    );
  };

  var outputCoordinates = function outputCoordinates(e) {
    if (!DEV_MODE) {
      return;
    }

    var warning = R6MapsMainControls.zoom.isZoomed() ? ' Warning, currently zoomed, coordinates are not accurate for CSS.' : '';

    console.log('SINGLE LINE TEXT:');
    console.log(
      'top: ' + Math.round(e.pageY - $mapElements.offset().top + 14) + ', ' +
      'left: ' + Math.round(e.pageX - $mapElements.offset().left)
    );

    console.log('REGULAR/DOUBLE LINE TEXT:');
    console.log(
      'top: ' + Math.round(e.pageY - $mapElements.offset().top) + ', ' +
      'left: ' + Math.round(e.pageX - $mapElements.offset().left) +
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
      R6MapsMainControls.pan.reset($mapMains, getResetDimensions);
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
    sendControlAnalyticsEvent('Floor', R6MapsMainControls.floors.get());
  };

  var sendMapPanelCountEvent = function sendMapPanelCountEvent(panelCount) {
    sendControlAnalyticsEvent('PanelsCount', panelCount);
  };

  var sendMapSelectAnalyticsEvent = function sendMapSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Map', R6MapsMainControls.maps.get());
  };

  var sendObjectiveSelectAnalyticsEvent = function sendObjectiveSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Objective', R6MapsMainControls.objectives.get());
  };

  var sendRoomLabelEvent = function sendRoomLabelEvent(style) {
    sendControlAnalyticsEvent('RoomLabel', style);
  };

  var setLoadedMapKey = function setLoadedMapKey(mapKey) {
    $body.attr('loaded-map', mapKey);
  };

  var setMapElements = function setMapElements() {
    $mapWrappers = $('.map-wrapper');
    $mapMains = $mapWrappers.find('.map-main');
    $mapElements = $mapMains.find('.map-elements');
    $svgMapWrappers = $mapMains.find('.svg-wrapper.map');
    $mapPanelLabels = $('.map-panel-label');
    $drawingMarkerWrappers = $mapMains.find('.svg-wrapper.drawing-markers');
  };

  var setMapPanelCount = function setMapPanelCount(numPanels) {
    localStorageSetItem('mappanelcount', numPanels);
    $mapPanelWrappers.attr('map-panel-count', numPanels);

    $.each($mapMains, function (index, map) {
      if (index < numPanels) {
        $(map).css('display', 'block');
        R6MapsMainControls.zoom.enable($(map));
      } else {
        $(map).css('display', 'none');
        R6MapsMainControls.zoom.disable($(map));
      }
    });

    R6MapsMainControls.pan.reset($mapMains, getResetDimensions);
    R6MapsMainControls.zoom.reset($mapMains, getResetDimensions);

    showSelectedFloor();
  };

  var setPageElements = function setPageElements() {
    $mapPanelWrappers = $('#map-panel-wrapper');
    $navLogo = $('#nav-logo');
    $body = $('body');
    $mainNav = $('#main-nav');
  };

  var setRoomLabelStyle = function setRoomLabelStyle(style) {
    R6MapsMainRender.setRoomLabelStyle($mapElements, style);
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

    $mapMains.on('click', outputCoordinates);
    R6MapsMainControls.objectives.setup(handleObjectiveChange);
    R6MapsMainControls.maps.setup(handleMapChange);
    R6MapsMainControls.floors.setup(handleFloorChange, showSelectedFloor);
    R6MapsMainControls.roomLabelStyles.setup(setRoomLabelStyle);
    R6MapsMainControls.mapPanels.setup(handleMapPanelCountChange);
    R6MapsMainControls.pan.setupLockOption(saveLockPanningOption);
    R6MapsMainControls.enableScreenshots.setup(handleEnableScreenshotsChange);
    R6MapsMainControls.menu.setupSelectMaps(showSelectMap, closeMenu);
    R6MapsMainControls.menu.setupFullScreen();
    R6MapsMainControls.sessions.setup(R6MapsMainSessions.createJoinDialog.getOpenFn($sessionsDialog), closeMenu);

    $(window).on('orientationchange', function() {
      R6MapsMainControls.pan.reset($mapMains, getResetDimensions);
      R6MapsMainControls.zoom.reset($mapMains, getResetDimensions);
    });
  };

  var showMap = function showMap() {
    hideSelectMap();
    $body.addClass(SHOW_MAP);
    updateUrl();
    updateTitle();
  };

  var showSelectMap = function showSelectMap() {
    $body.removeClass(SHOW_MAP);
    $body.addClass(SHOW_SELECT_MAP);
    updateUrl();
    updateTitle();
  };

  var setupMenu = function setupMenu() {
    var $menuLink = $('#mmenu-link');

    R6MapsMainControls.menu.setup(R6MapsMainRender.roomLabelStyles, showUpdateLinkHighlighted);

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

    $menuLink.click(handleMenuClick);
    if (showUpdateLinkHighlighted()) {
      R6MapsMainControls.highlightControl($menuLink);
      R6MapsMainControls.unhighlightControl($menuLink, 1000);
    }

    $('#lang-choices').on('click','button', handleLangChange);

    R6MapsMainControls.setupLosOpacity(updateLosOpacity, getCameraLosOpacity(), DEFAULT_LOS_OPACITY);
  };

  var setupSelectMap = function seteupSelectMap() {
    R6MapsMainSelectMaps.setup(
      $('#select-map-grid'),
      $('#select-map-heading'),
      $mainNav,
      R6MapsMainData.getMapData(),
      switchToMap,
      tryHideMapSelect
    );
  };

  var showUpdateLinkHighlighted = function showUpdateLinkHighlighted() {
    var date = new Date();

    return (
      (!localStorage.getItem(UPDATE_HIGHLIGHT.LOCALSTORAGE_READ_STRING)) &&
      (date.getTime() < UPDATE_HIGHLIGHT.CUTOFF_TIME_MS)
    );
  };

  var showSelectedFloor =  function showSelectedFloor() {
    var minMadFlorIndexes = R6MapsMainControls.floors.getMinMaxIndex();

    R6MapsMainRender.showFloor(
      R6MapsMainControls.floors.get(),
      $mapPanelWrappers,
      $mapWrappers,
      minMadFlorIndexes.min,
      minMadFlorIndexes.max
    );
  };

  var showSelectedObjective =  function showSelectedObjective() {
    R6MapsMainRender.showObjective(R6MapsMainControls.objectives.get(), $mapElements);
  };

  var switchToMap = function switchToMap(mapArg) {
    if (R6MapsMainControls.maps.trySelect(mapArg)) {
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
      R6MapsMainControls.enableScreenshots.set(enableScreenshotsOption);
      handleEnableScreenshotsChange((enableScreenshotsOption === 'true'));
    }
  };

  var tryLoadLockPanningOption = function tryLoadLockPanningOption() {
    var lockPanningOption = localStorage.getItem('lockpanning');

    if (lockPanningOption !== null) {
      R6MapsMainControls.pan.setLockOption(lockPanningOption);
    }
  };

  var tryLoadMapPanelCount = function tryLoadMapPanelCount() {
    var mapPanelCount = localStorage.getItem('mappanelcount');

    if (!mapPanelCount) {
      var $window = $(window);

      mapPanelCount = (
        ($window.width() > 1000) || ($window.height() > 1000)
      ) ? 2 : 1;
    }
    R6MapsMainControls.mapPanels.trySelect(mapPanelCount);
    setMapPanelCount(mapPanelCount);
  };

  var tryLoadMenuOptions = function tryLoadMenuOptions() {
    tryEnableSessionFeature();
    tryLoadMapPanelCount();
    tryLoadLockPanningOption();
    tryLoadRoomLabelStyle();
    tryLoadEnableScreenshotsOption();
  };

  var tryLoadRoomLabelStyle = function tryLoadRoomLabelStyle() {
    var style = localStorage.getItem('roomlabelstyle');

    if (style) {
      R6MapsMainControls.roomLabelStyles.trySelect(style);
      R6MapsMainRender.setRoomLabelStyle($mapElements, style);
    }
  };

  var trySelectBookmarkedMap = function trySelectBookmarkedMap() {
    var hashArgs = getHashArgs(),
      mapArg = hashArgs[0];

    return R6MapsMainControls.maps.trySelect(mapArg);
  };

  var trySelectBookmarkedObjective = function trySelectBookmarkedObjective() {
    var hashArgs = getHashArgs(),
      objectiveArg = hashArgs[2];

    if (R6MapsMainControls.objectives.trySelect(objectiveArg)) {
      showSelectedObjective();
    }
  };

  var trySelectBookmarkedFloor = function trySelectBookmarkedFloor() {
    var hashArgs = getHashArgs(),
      floorArg = hashArgs[1];

    if (R6MapsMainControls.floors.trySelect(floorArg)) {
      showSelectedFloor();
    }
  };

  var tryEnableSessionFeature = function tryEnableSessionFeature() {
    if (queryString('sessions')) {
      R6MapsMainControls.sessions.enable();
    }
  };

  var updateUrl = function updateUrl() {
    if (isShowingMap()) {
      var hashText = '';

      hashText += '' + R6MapsMainControls.maps.get();
      hashText += HASH_SPLIT_CHAR + R6MapsMainControls.floors.get();
      hashText += HASH_SPLIT_CHAR + R6MapsMainControls.objectives.get();
      window.location.hash = hashText;
    } else {
      removeHashFromUrl();
    }
  };

  var updateLosOpacity = function updateLosOpacity(opacity) {
    var $cameraLines = $('.camera-los');

    localStorageSetItem('cameralosopacity', opacity);
    $cameraLines.css('opacity', opacity);
    $cameraLines.removeClass('opacity-105');
    $cameraLines.removeClass('opacity-110');
    if (opacity == 1.05) {
      $cameraLines.addClass('opacity-105');
    } else if (opacity == 1.10) {
      $cameraLines.addClass('opacity-110');
    }
  };

  var updateTitle = function updateTitle() {
    document.title = isShowingMap() ?
      R6MapsCommonLangTerms.terms.general.pageTitle.replace(
        '{mapName}',
        R6MapsMainData.getMapData()[getLoadedMapKey()].name
      ) :
      R6MapsCommonLangTerms.terms.general.pageTitleSelectMap;
  };
}));
