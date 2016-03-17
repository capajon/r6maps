'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms);
}(function($, window, document, R6MapsData, R6MapsRender, R6MapsControls, R6MapsLangTerms, undefined) {
  var map,
    mapElements,
    HASH_SPLIT_CHAR = '/';

  $(function() { // equivanelt to $(document).ready() - but a bit faster
    map = $('#map');
    mapElements = map.find('.elements');

    tryLoadStartingLanguage();
    setupMenu();

    R6MapsControls.populateMapOptions(R6MapsData.getMapData());
    trySelectBookmarkedMap();
    loadMap();

    trySelectBookmarkedObjective();
    trySelectBookmarkedFloor();

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

  var loadMap = function loadMap() {
    var currentlySelectedMap = R6MapsControls.getCurrentlySelectedMap(),
      mapData = R6MapsData.getMapData();

    R6MapsControls.populateObjectiveOptions(mapData[currentlySelectedMap].objectives);
    R6MapsControls.populateFloorOptions(mapData[currentlySelectedMap].floors);
    R6MapsRender.renderMap(mapData[currentlySelectedMap], mapElements);
    setupCameraScreenshots();
    showSelectedFloor();
    showSelectedObjective();
  };

  var trySelectBookmarkedMap = function trySelectBookmarkedMap() {
    var hashArgs = getHashArgs(),
      mapArg = hashArgs[0];

    R6MapsControls.trySelectMap(mapArg);
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
    R6MapsControls.populateMapOptions(R6MapsData.getMapData());
    loadMap();

    localStorage.setItem('language', newLang);
  };

  var getMenuApi = function getMenuApi() {
    return $('#mmenu-menu').data( 'mmenu' );
  };

  var showSelectedFloor =  function showSelectedFloor() {
    R6MapsRender.showFloor(R6MapsControls.getCurrentlySelectedFloor(), mapElements);
  };

  var showSelectedObjective =  function showSelectedObjective() {
    R6MapsRender.showObjective(R6MapsControls.getCurrentlySelectedObjective(), mapElements);
  };
}));
