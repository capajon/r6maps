'use strict';

var R6MapsControls = (function($, window, document, R6MapsLangTerms, undefined) {
  var mapControl = $('#map-control'),
    objectiveControl = $('#objective-control'),
    floorControl = $('#floor-control'),
    zoomControl = $('#zoom-range'),
    menuControl = $('#mmenu-link'),
    lockPanningControl,
    lockZoomingControl,
    enableScreenshotsControl,
    roomLabelStylesControl,
    mapPanelCountControl,
    fullScreenControl,
    channelControl,
    menuSelectMapsControl,
    menuPanel = $('#menu-panel'),
    SELECTED_CLASS = 'selected',
    ZOOMED_IN_FAR_CLASS = 'zoomed-in-far',
    ZOOMED_OUT_FAR_CLASS = 'zoomed-out-far';

  var disableFullScreen = function disableFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  var disableZoom = function disableZoom(mapElements) {
    mapElements.panzoom('disable');
  };

  var enableChannelControl = function enableChannelControl() {
    $('.feature-flagged.channel-control').css('display', 'block');
  };

  var enableFullScreen = function enableFunctionScreen() {
    var rootEl = document.documentElement;

    if (rootEl.requestFullscreen) {
      rootEl.requestFullscreen();
    } else if (rootEl.webkitRequestFullscreen) {
      rootEl.webkitRequestFullscreen();
    } else if (rootEl.webkitEnterFullscreen) {
      rootEl.webkitEnterFullscreen();
    } else if (rootEl.mozRequestFullScreen) {
      rootEl.mozRequestFullScreen();
    } else if (rootEl.msRequestFullscreen) {
      rootEl.msRequestFullscreen();
    }
  };

  var enableZoom = function enableZoom(mapElements) {
    mapElements.panzoom('enable');
  };

  var getCurrentlySelectedFloor = function getCurrentlySelectedFloor() {
    return floorControl.find('.selected').data('index');
  };

  var getCurrentlySelectedMap = function getCurrentlySelectedMap() {
    return mapControl.val();
  };

  var getCurrentlySelectedObjective = function getCurrentlySelectedObjective() {
    return objectiveControl.val();
  };

  var getMinAndMaxFloorIndex = function getMinAndMaxFloorIndex() { // TO DO CHANGE TO MAX FLOOR INDEX
    var floorInputs = floorControl.find('button');

    return {
      min: $(floorInputs[0]).data('index'),
      max: $(floorInputs[floorInputs.length - 1]).data('index')
    };
  };

  var getFloorTooltip = function getFloorTooltip(floorIndex) {
    var shortcutTip = R6MapsLangTerms.terms.general.shortcutTip;

    if (floorIndex == 0) {
      return shortcutTip.replace('{shortcut}',"'0' or '~'");
    } else {
      return shortcutTip.replace('{shortcut}',floorIndex);
    }
  };

  var getHandleHotkeyFn = function getHandleHotkeyFn(showSelectedFloorFn) {
    return function handleHotKey(e) {
      var keyCode = e.which;

      if (keyCode >= 48 && keyCode <= 53) {  // '0' through '1'
        if (trySelectFloor(keyCode - 48)) {
          showSelectedFloorFn();
        }
      } else if (keyCode == 192) { // '`'
        if (trySelectFloor(0)) {
          showSelectedFloorFn();
        }
      }
    };
  };

  var getHandleLosOpacityChangeFn = function getHandleLosOpacityChangeFn(updateLosOpacityFn, defaultOpacity) {
    return function handleLosOpacityFn(event) {
      var opacity = event.target.value;

      updateLosOpacityFn(opacity);
      setLosLabelsText(opacity, defaultOpacity);
    };
  };

  var getHandlePanZoomChangeFn = function getHandlePanZoomChangeFn(mapMains) {
    return function handlePanZoomChange(event, panzoom, transform) {
      if (getLockPanningValue()) {
        mapMains.each(function(index, map) {
          if (map !== event.target) {
            $(map).panzoom('pan', transform[4], transform[5], {silent: true});
          }
        });
      }
    };
  };

  var handlePanZoomEnd = function handlePanZoomEnd() {
    zoomControl.trigger('input');
  };

  var getEnableScreenshotValue = function getEnableScreenshotValue() {
    return enableScreenshotsControl.is(':checked');
  };

  var getHandleZoomChangeFn = function getHandleZoomChangeFn(mapElements) {
    return function handleZoomChange() {
      var zoomVal = zoomControl.val();

      if ( zoomVal > 1.6) {
        mapElements.addClass(ZOOMED_IN_FAR_CLASS);
      } else if ( zoomVal < 0.4 ) {
        mapElements.addClass(ZOOMED_OUT_FAR_CLASS);
      } else {
        mapElements.removeClass(ZOOMED_IN_FAR_CLASS);
        mapElements.removeClass(ZOOMED_OUT_FAR_CLASS);
      }
    };
  };

  var getLockPanningValue = function getLockPanningValue() {
    return lockPanningControl.is(':checked');
  };

  var getLockZoomingValue = function getLockZoomingValue() {
    return lockZoomingControl.is(':checked');
  };

  var getMenuLanguageHtml = function getMenuLanguageHtml() {
    var html = '';

    html += '<div id="lang-choices" class="mmenu-custom-panel">';
    html += '<h2>' + R6MapsLangTerms.terms.general.languageHeader + '</h2>';
    for (var langKey in R6MapsLangTerms.loadedLanguages) {
      html += '<a href="" data-lang="' + langKey + '">' + R6MapsLangTerms.terms.languages[langKey] + '</a>';
    }
    html += '</div>';
    return html;
  };

  var getMenuOptionsHtml = function getMenuOptionsHtml() {
    var html = '';

    html += '<div id="options-wrapper" class="mmenu-custom-panel">';
    html += '<h2>' + R6MapsLangTerms.terms.general.optionsHeader + '</h2>';

    html += '<div class="map-panel-count-control">';
    html += '<label>' + R6MapsLangTerms.terms.general.labelNumberFloorsToDisplay + '</label>';
    html += '<select id="map-pane-count">';
    html += '<option value="1">' + R6MapsLangTerms.terms.floorDisplayOptions.one + '</option>';
    html += '<option value="2">' + R6MapsLangTerms.terms.floorDisplayOptions.two + '</option>';
    html += '<option value="4">' + R6MapsLangTerms.terms.floorDisplayOptions.four + '</option>';
    html += '</select>';

    html += '<div id="lock-wrapper">';
    html += '<div class="checkbox-wrapper">';
    html += '<input type="checkbox" checked="checked" id="lock-panning">' + R6MapsLangTerms.terms.general.lockPanning + '</input>';
    html += '</div>';
    html += '<div style="display: none" class="checkbox-wrapper">';
    html += '<input type="checkbox" checked="checked" id="lock-zooming">' + R6MapsLangTerms.terms.general.lockZooming + '</input>';
    html += '</div>';
    html += '</div>';

    html += '</div>';

    html += '<label>' + R6MapsLangTerms.terms.general.labelRoomLabelStyle + '</label>';
    html += '<select id="room-label-style"></select>';

    html += '<hr>';

    html += '<div id="los-wrapper">';
    html += '<label id="los-label">' + R6MapsLangTerms.terms.general.labelLosOpacity + '</label>';
    html += '<div class="zoom controls">';
    html += '<input id="los-opacity-range" type="range" max="1.1" min="0" step="0.05"></input>';
    html += '<p id="camera-los-percent"></p><p id="camera-los-note"></p>';
    html += '</div>';
    html += '</div>';

    html += '<label>' + R6MapsLangTerms.terms.general.labelCameraScreenshots + '</label>';
    html += '<div class="checkbox-wrapper">';
    html += '<input type="checkbox" id="enable-screenshtos" checked>Enable screen shots</input>';
    html += '</div>';

    html += '</div>';

    return html;
  };

  var getMenuR6MapsHtml = function getMenuR6MapsHtml() {
    var html = '',
      fullScreenTerm;

    html += '<div class="mmenu-custom-panel">';
    html += '<h2>r6maps.com</h2>';
    html += '<button id="menu-select-maps" class="menu-link">' + R6MapsLangTerms.terms.selectMaps.homeLink + '</button>';
    html += '<a href="' + R6MapsLangTerms.terms.general.linkAbout + '">' + R6MapsLangTerms.terms.general.about + '</a>';
    if (isFullScreenAvailable()) {
      html += '<button class="menu-link" href="" id="full-screen">' + R6MapsLangTerms.terms.general.fullScreen + '</button>';
    }
    html += '</div>';
    return html;
  };

  var getMenuSessionHtml = function getMenuSessionHtml() {
    var html = '';

    html += '<div class="feature-flagged channel-control">';
    html += '<div class="mmenu-custom-panel">';
    html += '<h2>' + R6MapsLangTerms.terms.channels.title + '</h2>';
    html += '<div class="channel-input-wrapper">';
    html += '<input id="channel-name" placeholder="' + R6MapsLangTerms.terms.channels.name + '"></input>';
    html += '<button>' + R6MapsLangTerms.terms.channels.button + '</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
  };

  var isCurrentlyFullScreen = function isCurrentlyFullScreen() {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.webkitCurrentFullScreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  };

  var isFullScreenAvailable = function isFullScreenAvailable() {
    return (
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.webkitCancelFullScreen ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
  };

  var isZoomed = function isZoomed() {
    return (zoomControl.val() != 1);
  };

  var populateFloorOptions = function populateFloorOptions(floors) {
    var buttonsAsString = '',
      classes = '',
      tooltip = '',
      initalFloor = getCurrentlySelectedFloor();

    floors.forEach(function(floor) {
      classes = '';
      classes += (floor.default) ? SELECTED_CLASS : '';
      tooltip = getFloorTooltip(floor.index);
      buttonsAsString += '<button data-index="' + floor.index + '" class="' + classes + '" title="' + tooltip + '">';
      buttonsAsString += '<span class="short">' + floor.name.short + '</span>';
      buttonsAsString += '<span class="full">' + floor.name.full + '</span>';
      buttonsAsString += '</button>';
    });
    floorControl.html(buttonsAsString);
    trySelectFloor(initalFloor);
  };

  var populateMapOptions = function populateMapOptions(mapData) {
    var optionsAsString = '',
      maps = [],
      currentMap = getCurrentlySelectedMap();

    for (var mapKey in mapData) {
      if (mapData.hasOwnProperty(mapKey)) {
        maps.push({ key: mapKey, name: mapData[mapKey].name });
      }
    }

    maps.sort(function(a,b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    maps.forEach(function(map) {
      optionsAsString += '<option value="' + map.key + '">' + map.name + '</option>';
    });

    mapControl.html(optionsAsString);
    trySelectMap(currentMap);
  };

  var populateObjectiveOptions = function populateObjectiveOptions(objectives) {
    var options = '',
      objectiveTerms = R6MapsLangTerms.terms.objectives,
      initialObjective = getCurrentlySelectedObjective();

    objectives.sort(function(a,b) {
      if (objectiveTerms[a] < objectiveTerms[b]) {
        return -1;
      }
      if (objectiveTerms[a] > objectiveTerms[b]) {
        return 1;
      }
      return 0;
    });

    options += '<option value="all">' + objectiveTerms.showAll + '</option>';
    objectives.forEach(function(objective) {
      options += '<option value="' + objective + '">' + objectiveTerms[objective] + '</option>';
    });
    objectiveControl.html(options);
    trySelectObjective(initialObjective);
  };

  var populateRoomLabelStyleOptions = function populateRoomLabelStyleOptions(
    roomLabelStylesControl,
    roomLabelStyles
  ) {
    var html = '';

    roomLabelStyles.forEach(function(roomLabelStyle) {
      html += '<option value="' + roomLabelStyle + '">' +
        R6MapsLangTerms.terms.roomLabelStyles[roomLabelStyle] +
        '</option>';
    });
    roomLabelStylesControl.html(html);
  };

  var resetPan = function resetPan(mapMains) {
    mapMains.panzoom('resetPan');
    // todo: per map option
  };

  var resetSelectedFloor = function resetSelectedFloor() {
    floorControl.find('.' + SELECTED_CLASS + '').removeClass(SELECTED_CLASS);
  };

  var resetZoom = function resetZoom(mapMains) {
    mapMains.panzoom('resetZoom');
    // todo: per map option
  };

  var setEnableScreenshotsOption = function setEnableScreenshotsOption(isEnabled) {
    var boolValue = (isEnabled === 'true') ? true : false;

    enableScreenshotsControl.prop('checked', boolValue);
  };

  var setLockPanningOption = function setLockPanningOption(isChecked) {
    var boolValue = (isChecked === 'true') ? true : false;

    lockPanningControl.prop('checked', boolValue);
  };

  var setLockZoomingOption = function setLockZoomingOption(isChecked) {
    var boolValue = (isChecked === 'true') ? true : false;

    lockZoomingControl.prop('checked', boolValue);
  };

  var setupEnableScreenshotsChangeEvent = function setupEnableScreenshotsChangeEvent(callback) {
    enableScreenshotsControl.change(function(e) {
      callback(getEnableScreenshotValue());
    });
  };

  var setupFloorChangeEvent = function setupFloorChangeEvent(callback) {
    floorControl.on('click', 'button', function(e) {
      var floorButton =  (e.target.tagName == 'SPAN')
        ? $(e.target).parent()
        : $(e.target);

      resetSelectedFloor();
      floorButton.addClass(SELECTED_CLASS);
      callback();
    });
  };

  var setupFloorHotkeys = function setupFloorHotkeys(showSelectedFloorFn) {
    $(document).on('keydown', getHandleHotkeyFn(showSelectedFloorFn));
  };

  var setupLockPanningChangeEvent = function setupLockPanningChangeEvent(callback) {
    lockPanningControl.change(function(e) {
      callback(getLockPanningValue());
    });
  };

  var setupLockZoomingChangeEvent = function setupLockZoomingChangeEvent(callback) {
    lockZoomingControl.change(function(e) {
      callback(getLockZoomingValue());
    });
  };

  var setLosLabelsText = function setLosLabelsText(opacity, defaultOpacity) {
    var losNote = $('#camera-los-note');

    $('#camera-los-percent').text(
      R6MapsLangTerms.terms.general.labelPercent.replace(
        '{int}',
        Math.round(opacity * 100)
      )
    );

    if (opacity == defaultOpacity) {
      losNote.text(R6MapsLangTerms.terms.general.labelLosDefault);
    } else if (opacity == 1.05) {
      losNote.text(R6MapsLangTerms.terms.general.labelLos105);
    } else if (opacity == 1.10) {
      losNote.text(R6MapsLangTerms.terms.general.labelLos110);
    } else {
      losNote.text('');
    }
  };

  var setupFullScreenControl = function setupFullScreenControl(closeMenuCallback) {
    if (fullScreenControl) {
      fullScreenControl.on('click', toggleFullScreen);
    }
  };

  var setupLosOpacity = function setupLosOpacity(updateLosOpacityFn, startingValue, defaultOpacity) {
    var losOpacityControl = $('#los-opacity-range'),
      handleLosOpacityChangeFn = getHandleLosOpacityChangeFn(
        updateLosOpacityFn,
        defaultOpacity
      );

    losOpacityControl.val(startingValue);
    setLosLabelsText(startingValue, defaultOpacity);
    losOpacityControl.on('input', handleLosOpacityChangeFn);
    losOpacityControl.on('change', handleLosOpacityChangeFn);
  };

  var setupMapChangeEvent = function setupMapChangeEvent(callback) {
    mapControl.on('change', callback);
  };

  var setupMapPanelCountChangeEvent = function setupMapPanelCountChangeEvent(callback) {
    mapPanelCountControl.on('change', function(event) {
      var panelCount = mapPanelCountControl.val();

      tryShowLockControls(panelCount);
      callback(panelCount);
    });
  };

  var setupMenu = function setupMenu(roomLabelStyles) {
    var html = '';

    html += getMenuR6MapsHtml();
    html += getMenuLanguageHtml();
    html += getMenuSessionHtml();
    html += getMenuOptionsHtml();
    html += '<div class="faded-logo"></div>';
    menuPanel.html(html);

    menuControl.html(R6MapsLangTerms.terms.general.menu);
    roomLabelStylesControl = $('#room-label-style');
    populateRoomLabelStyleOptions(roomLabelStylesControl, roomLabelStyles);
    mapPanelCountControl = $('#map-pane-count');
    lockPanningControl = $('#lock-panning');
    lockZoomingControl = $('#lock-zooming');
    enableScreenshotsControl = $('#enable-screenshtos');
    fullScreenControl = $('#full-screen');
    menuSelectMapsControl = $('#menu-select-maps');
  };

  var setupObjectiveChangeEvent = function setupObjectiveChangeEvent(callback) {
    objectiveControl.on('change', callback);
  };

  var setupPanZoom = function setupPanZoom(mapMains, mapElements) {
    mapMains.panzoom({
      $zoomRange: zoomControl,
      minScale: 0.3,
      maxScale: 2.5
    });

    mapMains.on('mousewheel', function(event) {
      zoomControl.val(+zoomControl.val() + (event.deltaY * 0.06));
      zoomControl.trigger('input');
      zoomControl.trigger('change'); // todo: needed??
    });

    zoomControl.on('change', getHandleZoomChangeFn(mapElements));
    zoomControl.on('input', getHandleZoomChangeFn(mapElements));

    // camera links were not working on touch devices:
    mapMains.on('touchstart','a', function(e) {
      $(this).addClass('hover');
    });

    mapMains.on('touchend','a', function(e) {
      $(this).removeClass('hover');
      this.click();
    });

    mapMains.on('panzoomchange', getHandlePanZoomChangeFn(mapMains));
    mapMains.on('panzoomend', handlePanZoomEnd);
  };

  var setupMenuSelectMaps = function setupMenuSelectMaps(
    showSelectMapCallback,
    closeMenuCallback
  ) {
    menuSelectMapsControl.on('click', function(event) {
      event.preventDefault();
      showSelectMapCallback();
      closeMenuCallback();
    });
  };

  var setupRoomLabelStyleChangeEvent = function setupRoomLabelStyleChangeEvent(callback) {
    roomLabelStylesControl.on('change', function(event) {
      callback(event.target.value);
    });
  };

  var trySelectFloor = function trySelectFloor(floorIndex) {
    var selectedFloor = floorControl.find("[data-index='" + floorIndex + "']");

    if (selectedFloor.length) {
      resetSelectedFloor();
      selectedFloor.addClass(SELECTED_CLASS);
      selectedFloor.trigger('click');
      return true;
    }
    return false;
  };

  var toggleFullScreen = function toggleFullScreen() {
    if (isCurrentlyFullScreen()) {
      disableFullScreen();
    } else {
      enableFullScreen();
    }
  };

  var trySelectMapPanelCount = function trySelectMapPanelCount(number) {
    var result = trySelectOption(mapPanelCountControl, number);

    mapPanelCountControl.trigger('change');
    return result;
  };

  var trySelectMap = function trySelectMap(map) {
    return trySelectOption(mapControl, map);
  };

  var trySelectObjective = function trySelectObjective(objective) {
    return trySelectOption(objectiveControl, objective);
  };

  var trySelectOption = function trySelectOption(selectEl, option) {
    var selectOption = selectEl.find('option[value="' + option + '"]');

    if (selectOption.length) {
      selectOption.prop('selected', true);
      return true;
    }
    return false;
  };

  var trySelectRoomLabelStyle = function trySelectRoomLabelStyle(style) {
    return trySelectOption(roomLabelStylesControl, style);
  };

  var tryShowLockControls = function tryShowLockControls(numberPanels) {
    var lockWrapper = $('#lock-wrapper');

    if (numberPanels > 1) {
      lockWrapper.show(600);
    } else {
      lockWrapper.hide(600);
    }
  };

  return  {
    disableZoom: disableZoom,
    enableChannelControl: enableChannelControl,
    enableZoom: enableZoom,
    getCurrentlySelectedFloor: getCurrentlySelectedFloor,
    getCurrentlySelectedMap: getCurrentlySelectedMap,
    getCurrentlySelectedObjective: getCurrentlySelectedObjective,
    getMinAndMaxFloorIndex: getMinAndMaxFloorIndex,
    isZoomed: isZoomed,
    populateFloorOptions: populateFloorOptions,
    populateMapOptions: populateMapOptions,
    setupMenu: setupMenu,
    populateObjectiveOptions: populateObjectiveOptions,
    resetPan: resetPan,
    resetZoom: resetZoom,
    setEnableScreenshotsOption: setEnableScreenshotsOption,
    setLockPanningOption: setLockPanningOption,
    setLockZoomingOption: setLockZoomingOption,
    setupEnableScreenshotsChangeEvent: setupEnableScreenshotsChangeEvent,
    setupFloorChangeEvent: setupFloorChangeEvent,
    setupFloorHotkeys: setupFloorHotkeys,
    setupFullScreenControl: setupFullScreenControl,
    setupLockPanningChangeEvent: setupLockPanningChangeEvent,
    setupLockZoomingChangeEvent: setupLockZoomingChangeEvent,
    setupLosOpacity: setupLosOpacity,
    setupMapChangeEvent: setupMapChangeEvent,
    setupMapPanelCountChangeEvent: setupMapPanelCountChangeEvent,
    setupMenuSelectMaps: setupMenuSelectMaps,
    setupObjectiveChangeEvent: setupObjectiveChangeEvent,
    setupPanZoom: setupPanZoom,
    setupRoomLabelStyleChangeEvent: setupRoomLabelStyleChangeEvent,
    trySelectFloor: trySelectFloor,
    trySelectMapPanelCount: trySelectMapPanelCount,
    trySelectMap: trySelectMap,
    trySelectObjective: trySelectObjective,
    trySelectRoomLabelStyle: trySelectRoomLabelStyle
  };
})(window.jQuery, window, document, R6MapsLangTerms);
