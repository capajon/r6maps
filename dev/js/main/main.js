'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MMainData, R6MMainRender, R6MMainControls, R6MMainDrawing, R6MMainSelectMaps, R6MMainSessions, R6MHelpers, R6MLangTerms);
}(function($, window, document, R6MMainData, R6MMainRender, R6MMainControls, R6MMainDrawing, R6MMainSelectMaps, R6MMainSessions, R6MHelpers, R6MLangTerms, undefined) {
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
    R6MMainRender.setupMapPanels($mapPanelWrappers, 4);
    setMapElements();
    R6MHelpers.tryLoadStartingLanguage(R6MLangTerms.tryLoadLanguage);
    R6MHelpers.tryChangeDirection(R6MLangTerms.getLoadedDirection());
    setupMenu();
    setupSelectMap();
    R6MMainControls.maps.populate(R6MMainData.getMapData());

    $sessionsDialog = $('#sessions-dialog');
    R6MMainSessions.createJoinDialog.setup($sessionsDialog);

    setupEvents();
    $navLogo.on('click', toggleShowSelectMap);
    tryLoadMenuOptions();

    R6MMainControls.setupPanZoom($mapMains, $mapElements);

    if (trySelectBookmarkedMap()) {
      loadMap();
      trySelectBookmarkedObjective();
      trySelectBookmarkedFloor();
      showMap();
    } else {
      showSelectMap();
      document.title = R6MLangTerms.terms.general.pageTitleStart;
    }

    setTimeout(function() {
      $body.removeClass('loading');
    }, 10);
  });

  var checkIfMapLoaded = function checkIfMapLoaded() {
    return $body.attr('loaded-map');
  };

  var closeMenu = function closeMenu() {
    getMenuApi().close();
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
    var currentMapKey = R6MMainControls.maps.get(),
      zoomPoints = {
        topLeft: { top: -180, left: -312 }, // default
        bottomRight: { top: 180, left: 312 }
      };

    if (currentMapKey) {
      zoomPoints = $.extend(
        zoomPoints,
        R6MMainData.getMapData()[currentMapKey].zoomPoints
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
    R6MMainDrawing.refreshPings(); // hacky drawing module for now
  };

  var handleLangChange = function handleLangChange(event) {
    var newLang = $(event.target).data('lang');

    event.preventDefault();

    R6MLangTerms.tryLoadLanguage(newLang);
    localStorageSetItem('language', newLang);

    if (R6MHelpers.tryChangeDirection(R6MLangTerms.getLoadedDirection())) {
      location.reload();
    }

    setupSelectMap();
    R6MMainControls.maps.populate(R6MMainData.getMapData());
    setupEvents();
    tryLoadMenuOptions();
    updateTitle();
    setupMenu();

    if (checkIfMapLoaded()) {
      loadMap();
    }
  };

  var handleEnableScreenshotsChange = function handleEnableScreenshotsChange(value) {
    localStorageSetItem('enablescreenshots', value);
    R6MMainRender.setEnableScreenshots($mapWrappers, value);
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
    R6MMainControls.removeLatestUpdateHighlight(200);
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
    var currentlySelectedMap = R6MMainControls.maps.get(),
      mapData = R6MMainData.getMapData();

    R6MMainControls.objectives.populate(mapData[currentlySelectedMap].objectives);
    R6MMainControls.floors.populate(mapData[currentlySelectedMap].floors);
    R6MMainControls.toggle.populate();
    R6MMainRender.renderMap(mapData[currentlySelectedMap], $mapWrappers, $mapElements, $svgMapWrappers, $mapPanelLabels);
    if (!DEV_MODE) {
      R6MMainControls.pan.reset($mapMains, getResetDimensions);
      R6MMainControls.zoom.reset($mapMains, getResetDimensions);
    }

    setupCameraScreenshots();
    setupCameraLos();
    showSelectedFloor();
    showSelectedObjective();

    setLoadedMapKey(currentlySelectedMap);
    $navLogo.addClass('enabled');
    updateTitle();

    R6MMainDrawing.setup(
      $mapMains,
      $drawingMarkerWrappers,
      isCamera,
      R6MMainRender.SVG_DIM
    );
  };

  var outputCoordinates = function outputCoordinates(e) {
    if (!DEV_MODE) {
      return;
    }

    var warning = R6MMainControls.zoom.isZoomed() ? ' Warning, currently zoomed, coordinates are not accurate for CSS.' : '';

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
      R6MMainControls.pan.reset($mapMains, getResetDimensions);
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
    sendControlAnalyticsEvent('Floor', R6MMainControls.floors.get());
  };

  var sendMapPanelCountEvent = function sendMapPanelCountEvent(panelCount) {
    sendControlAnalyticsEvent('PanelsCount', panelCount);
  };

  var sendMapSelectAnalyticsEvent = function sendMapSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Map', R6MMainControls.maps.get());
  };

  var sendObjectiveSelectAnalyticsEvent = function sendObjectiveSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Objective', R6MMainControls.objectives.get());
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
        R6MMainControls.zoom.enable($(map));
      } else {
        $(map).css('display', 'none');
        R6MMainControls.zoom.disable($(map));
      }
    });

    R6MMainControls.pan.reset($mapMains, getResetDimensions);
    R6MMainControls.zoom.reset($mapMains, getResetDimensions);

    showSelectedFloor();
  };

  var setPageElements = function setPageElements() {
    $mapPanelWrappers = $('#map-panel-wrapper');
    $navLogo = $('#nav-logo');
    $body = $('body');
    $mainNav = $('#main-nav');
  };

  var setRoomLabelStyle = function setRoomLabelStyle(style) {
    R6MMainRender.setRoomLabelStyle($mapElements, style);
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
    $mapMains.on('click', outputCoordinates);
    R6MMainControls.objectives.setup(handleObjectiveChange);
    R6MMainControls.toggle.setup();
    R6MMainControls.maps.setup(handleMapChange);
    R6MMainControls.floors.setup(handleFloorChange, showSelectedFloor);
    R6MMainControls.roomLabelStyles.setup(setRoomLabelStyle);
    R6MMainControls.mapPanels.setup(handleMapPanelCountChange);
    R6MMainControls.pan.setupLockOption(saveLockPanningOption);
    R6MMainControls.enableScreenshots.setup(handleEnableScreenshotsChange);
    R6MMainControls.menu.setupSelectMaps(showSelectMap, closeMenu);
    R6MMainControls.menu.setupFullScreen();
    R6MMainControls.sessions.setup(R6MMainSessions.createJoinDialog.getOpenFn($sessionsDialog), closeMenu);

    $(window).on('orientationchange', function() {
      R6MMainControls.pan.reset($mapMains, getResetDimensions);
      R6MMainControls.zoom.reset($mapMains, getResetDimensions);
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
    var $menuLink = $('#mmenu-link'),
      useRtl = (R6MLangTerms.getLoadedDirection() === 'RTL');

    R6MMainControls.menu.setup(R6MMainRender.roomLabelStyles, showUpdateLinkHighlighted);

    var foo = $('#mmenu-menu').mmenu({
      offCanvas: {
        position: useRtl ? 'left' : 'right',
        pageSelector: '#mmenu-page'
      },
      extensions: ['pagedim'],
      rtl: {
        use: useRtl
      }
    });

    $menuLink.click(handleMenuClick);
    if (showUpdateLinkHighlighted()) {
      R6MMainControls.highlightControl($menuLink);
      R6MMainControls.unhighlightControl($menuLink, 1000);
    }

    $('#lang-choices').on('click','button', handleLangChange);

    R6MMainControls.setupLosOpacity(updateLosOpacity, getCameraLosOpacity(), DEFAULT_LOS_OPACITY);
  };

  var setupSelectMap = function setupSelectMap() {
    R6MMainSelectMaps.setup(
      $('#select-map-grid'),
      $('#select-map-heading'),
      $mainNav,
      R6MMainData.getMapData(),
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
    var minMadFlorIndexes = R6MMainControls.floors.getMinMaxIndex();

    R6MMainRender.showFloor(
      R6MMainControls.floors.get(),
      $mapPanelWrappers,
      $mapWrappers,
      minMadFlorIndexes.min,
      minMadFlorIndexes.max
    );
  };

  var showSelectedObjective =  function showSelectedObjective() {
    R6MMainRender.showObjective(R6MMainControls.objectives.get(), $mapElements);
  };

  var switchToMap = function switchToMap(mapArg) {
    if (R6MMainControls.maps.trySelect(mapArg)) {
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
      R6MMainControls.enableScreenshots.set(enableScreenshotsOption);
      handleEnableScreenshotsChange((enableScreenshotsOption === 'true'));
    }
  };

  var tryLoadLockPanningOption = function tryLoadLockPanningOption() {
    var lockPanningOption = localStorage.getItem('lockpanning');

    if (lockPanningOption !== null) {
      R6MMainControls.pan.setLockOption(lockPanningOption);
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
    R6MMainControls.mapPanels.trySelect(mapPanelCount);
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
      R6MMainControls.roomLabelStyles.trySelect(style);
      R6MMainRender.setRoomLabelStyle($mapElements, style);
    }
  };

  var trySelectBookmarkedMap = function trySelectBookmarkedMap() {
    var hashArgs = getHashArgs(),
      mapArg = hashArgs[0];

    return R6MMainControls.maps.trySelect(mapArg);
  };

  var trySelectBookmarkedObjective = function trySelectBookmarkedObjective() {
    var hashArgs = getHashArgs(),
      objectiveArg = hashArgs[2];

    if (R6MMainControls.objectives.trySelect(objectiveArg)) {
      showSelectedObjective();
    }
  };

  var trySelectBookmarkedFloor = function trySelectBookmarkedFloor() {
    var hashArgs = getHashArgs(),
      floorArg = hashArgs[1];

    if (R6MMainControls.floors.trySelect(floorArg)) {
      showSelectedFloor();
    }
  };

  var tryEnableSessionFeature = function tryEnableSessionFeature() {
    if (R6MHelpers.queryString('sessions')) {
      R6MMainControls.sessions.enable();
    }
  };

  var updateUrl = function updateUrl() {
    if (isShowingMap()) {
      var hashText = '';

      hashText += '' + R6MMainControls.maps.get();
      hashText += HASH_SPLIT_CHAR + R6MMainControls.floors.get();
      hashText += HASH_SPLIT_CHAR + R6MMainControls.objectives.get();
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
      R6MLangTerms.terms.general.pageTitle.replace(
        '{mapName}',
        R6MMainData.getMapData()[getLoadedMapKey()].name
      ) :
      R6MLangTerms.terms.general.pageTitleSelectMap;
  };
}));
