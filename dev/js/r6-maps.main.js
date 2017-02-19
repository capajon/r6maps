'use strict';
var DEV_MODE = false;

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms, R6MapsDrawing);
}(function($, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms, R6MapsDrawing, undefined) {
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
    DEFAULT_LOS_OPACITY = 0.15;

  $(function() { // equivanelt to $(document).ready() - but a bit faster
    setPageElements();
    R6MapsRender.setupMapPanels($mapPanelWrappers, 4);
    setMapElements();
    tryLoadStartingLanguage();
    setupMenu();
    setupSelectMap();
    R6MapsControls.maps.populate(R6MapsData.getMapData());

    $sessionsDialog = $('#sessions-dialog');
    R6MapsSessions.createJoinDialog.setup($sessionsDialog);

    setupEvents();
    $navLogo.on('click', toggleShowSelectMap);
    tryLoadMenuOptions();

    R6MapsControls.setupPanZoom($mapMains, $mapElements);

    if (trySelectBookmarkedMap()) {
      loadMap();
      trySelectBookmarkedObjective();
      trySelectBookmarkedFloor();
      showMap();
    } else {
      showSelectMap();
      document.title = R6MapsLangTerms.terms.general.pageTitleStart;
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
    var currentMapKey = R6MapsControls.maps.get(),
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
    R6MapsDrawing.refreshPings(); // hacky drawing module for now
  };

  var handleLangChange = function handleLangChange(event) {
    var newLang = $(event.target).data('lang');

    event.preventDefault();

    R6MapsLangTerms.tryLoadLanguage(newLang);
    localStorageSetItem('language', newLang);

    setupSelectMap();
    R6MapsControls.maps.populate(R6MapsData.getMapData());
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
    R6MapsRender.setEnableScreenshots($mapWrappers, value);
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
    var currentlySelectedMap = R6MapsControls.maps.get(),
      mapData = R6MapsData.getMapData();

    R6MapsControls.objectives.populate(mapData[currentlySelectedMap].objectives);
    R6MapsControls.floors.populate(mapData[currentlySelectedMap].floors);
    R6MapsRender.renderMap(mapData[currentlySelectedMap], $mapWrappers, $mapElements, $svgMapWrappers, $mapPanelLabels);
    if (!DEV_MODE) {
      R6MapsControls.pan.reset($mapMains, getResetDimensions);
      R6MapsControls.zoom.reset($mapMains, getResetDimensions);
    }

    setupCameraScreenshots();
    setupCameraLos();
    showSelectedFloor();
    showSelectedObjective();

    setLoadedMapKey(currentlySelectedMap);
    $navLogo.addClass('enabled');
    updateTitle();

    R6MapsDrawing.setup(
      $mapMains,
      $drawingMarkerWrappers,
      isCamera,
      R6MapsRender.SVG_DIM
    );
  };

  var outputCoordinates = function outputCoordinates(e) {
    if (!DEV_MODE) {
      return;
    }

    var warning = R6MapsControls.zoom.isZoomed() ? ' Warning, currently zoomed, coordinates are not accurate for CSS.' : '';

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
      R6MapsControls.pan.reset($mapMains, getResetDimensions);
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
    sendControlAnalyticsEvent('Floor', R6MapsControls.floors.get());
  };

  var sendMapPanelCountEvent = function sendMapPanelCountEvent(panelCount) {
    sendControlAnalyticsEvent('PanelsCount', panelCount);
  };

  var sendMapSelectAnalyticsEvent = function sendMapSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Map', R6MapsControls.maps.get());
  };

  var sendObjectiveSelectAnalyticsEvent = function sendObjectiveSelectAnalyticsEvent() {
    sendControlAnalyticsEvent('Objective', R6MapsControls.objectives.get());
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
        R6MapsControls.zoom.enable($(map));
      } else {
        $(map).css('display', 'none');
        R6MapsControls.zoom.disable($(map));
      }
    });

    R6MapsControls.pan.reset($mapMains, getResetDimensions);
    R6MapsControls.zoom.reset($mapMains, getResetDimensions);

    showSelectedFloor();
  };

  var setPageElements = function setPageElements() {
    $mapPanelWrappers = $('#map-panel-wrapper');
    $navLogo = $('#nav-logo');
    $body = $('body');
    $mainNav = $('#main-nav');
  };

  var setRoomLabelStyle = function setRoomLabelStyle(style) {
    R6MapsRender.setRoomLabelStyle($mapElements, style);
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
    R6MapsControls.objectives.setup(handleObjectiveChange);
    R6MapsControls.maps.setup(handleMapChange);
    R6MapsControls.floors.setup(handleFloorChange, showSelectedFloor);
    R6MapsControls.roomLabelStyles.setup(setRoomLabelStyle);
    R6MapsControls.mapPanels.setup(handleMapPanelCountChange);
    R6MapsControls.pan.setupLockOption(saveLockPanningOption);
    R6MapsControls.enableScreenshots.setup(handleEnableScreenshotsChange);
    R6MapsControls.menu.setupSelectMaps(showSelectMap, closeMenu);
    R6MapsControls.menu.setupFullScreen();
    R6MapsControls.sessions.setup(R6MapsSessions.createJoinDialog.getOpenFn($sessionsDialog), closeMenu);

    $(window).on('orientationchange', function() {
      R6MapsControls.pan.reset($mapMains, getResetDimensions);
      R6MapsControls.zoom.reset($mapMains, getResetDimensions);
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
    R6MapsControls.menu.setup(R6MapsRender.roomLabelStyles);

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
    $('#lang-choices').on('click','button', handleLangChange);

    R6MapsControls.setupLosOpacity(updateLosOpacity, getCameraLosOpacity(), DEFAULT_LOS_OPACITY);
  };

  var setupSelectMap = function seteupSelectMap() {
    R6MapsSelectMaps.setup(
      $('#select-map-grid'),
      $('#select-map-heading'),
      $mainNav,
      R6MapsData.getMapData(),
      switchToMap,
      tryHideMapSelect
    );
  };

  var showSelectedFloor =  function showSelectedFloor() {
    var minMadFlorIndexes = R6MapsControls.floors.getMinMaxIndex();

    R6MapsRender.showFloor(
      R6MapsControls.floors.get(),
      $mapPanelWrappers,
      $mapWrappers,
      minMadFlorIndexes.min,
      minMadFlorIndexes.max
    );
  };

  var showSelectedObjective =  function showSelectedObjective() {
    R6MapsRender.showObjective(R6MapsControls.objectives.get(), $mapElements);
  };

  var switchToMap = function switchToMap(mapArg) {
    if (R6MapsControls.maps.trySelect(mapArg)) {
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
      R6MapsControls.enableScreenshots.set(enableScreenshotsOption);
      handleEnableScreenshotsChange((enableScreenshotsOption === 'true'));
    }
  };

  var tryLoadLockPanningOption = function tryLoadLockPanningOption() {
    var lockPanningOption = localStorage.getItem('lockpanning');

    if (lockPanningOption !== null) {
      R6MapsControls.pan.setLockOption(lockPanningOption);
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
    R6MapsControls.mapPanels.trySelect(mapPanelCount);
    setMapPanelCount(mapPanelCount);
  };

  var tryLoadMenuOptions = function tryLoadMenuOptions() {
    tryEnableSessionFeature();
    tryLoadMapPanelCount();
    tryLoadLockPanningOption();
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
      R6MapsControls.roomLabelStyles.trySelect(style);
      R6MapsRender.setRoomLabelStyle($mapElements, style);
    }
  };

  var trySelectBookmarkedMap = function trySelectBookmarkedMap() {
    var hashArgs = getHashArgs(),
      mapArg = hashArgs[0];

    return R6MapsControls.maps.trySelect(mapArg);
  };

  var trySelectBookmarkedObjective = function trySelectBookmarkedObjective() {
    var hashArgs = getHashArgs(),
      objectiveArg = hashArgs[2];

    if (R6MapsControls.objectives.trySelect(objectiveArg)) {
      showSelectedObjective();
    }
  };

  var trySelectBookmarkedFloor = function trySelectBookmarkedFloor() {
    var hashArgs = getHashArgs(),
      floorArg = hashArgs[1];

    if (R6MapsControls.floors.trySelect(floorArg)) {
      showSelectedFloor();
    }
  };

  var tryEnableSessionFeature = function tryEnableSessionFeature() {
    if (queryString('sessions')) {
      R6MapsControls.sessions.enable();
    }
  };

  var updateUrl = function updateUrl() {
    if (isShowingMap()) {
      var hashText = '';

      hashText += '' + R6MapsControls.maps.get();
      hashText += HASH_SPLIT_CHAR + R6MapsControls.floors.get();
      hashText += HASH_SPLIT_CHAR + R6MapsControls.objectives.get();
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
      R6MapsLangTerms.terms.general.pageTitle.replace(
        '{mapName}',
        R6MapsData.getMapData()[getLoadedMapKey()].name
      ) :
      R6MapsLangTerms.terms.general.pageTitleSelectMap;
  };
}));
