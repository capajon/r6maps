'use strict';

var R6MapsControls = (function($, window, document, R6MapsLangTerms, undefined) {
  var mapControl = $('#map-control'),
    objectiveControl = $('#objective-control'),
    floorControl = $('#floor-control'),
    zoomControl = $('#zoom-range'),
    menuControl = $('#mmenu-link'),
    lockPanningControl,
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

  var enableScreenshotsSetOption = function enableScreenshotsSetOption(isEnabled) {
    var boolValue = (isEnabled === 'true') ? true : false;

    enableScreenshotsControl.prop('checked', boolValue);
  };

  var enableScreenshotsSetupChangeEvent = function enableScreenshotsSetupChangeEvent(callback) {
    enableScreenshotsControl.change(function(e) {
      callback(getEnableScreenshotValue());
    });
  };

  var floorsGetCurrentIndex = function floorsGetCurrentIndex() {
    return floorControl.find('.selected').data('index');
  };

  var floorsGetMinAndMaxIndex = function floorsGetMinAndMaxIndex() { // TO DO CHANGE TO MAX FLOOR INDEX
    var floorInputs = floorControl.find('button');

    return {
      min: $(floorInputs[0]).data('index'),
      max: $(floorInputs[floorInputs.length - 1]).data('index')
    };
  };

  var floorsPopulate = function floorsPopulate(floors) {
    var buttonsAsString = '',
      classes = '',
      tooltip = '',
      initalFloor = floorsGetCurrentIndex();

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
    floorsTrySelect(initalFloor);
  };

  var floorsSetup = function floorsSetup(handleChangeCallback, showSelectedFloorFn) {
    setupFloorChangeEvent(handleChangeCallback);
    setupFloorHotkeys(showSelectedFloorFn);
  };

  var floorsTrySelect = function floorsTrySelect(floorIndex) {
    var selectedFloor = floorControl.find("[data-index='" + floorIndex + "']");

    if (selectedFloor.length) {
      resetSelectedFloor();
      selectedFloor.addClass(SELECTED_CLASS);
      selectedFloor.trigger('click');
      return true;
    }
    return false;
  };

  var getEnableScreenshotValue = function getEnableScreenshotValue() {
    return enableScreenshotsControl.is(':checked');
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
        if (floorsTrySelect(keyCode - 48)) {
          showSelectedFloorFn();
        }
      } else if (keyCode == 192) { // '`'
        if (floorsTrySelect(0)) {
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

  var getMenuLanguageHtml = function getMenuLanguageHtml() {
    var html = '';

    html += '<div id="lang-choices" class="mmenu-custom-panel">';
    html += '<h2>' + R6MapsLangTerms.terms.general.languageHeader + '</h2>';
    for (var langKey in R6MapsLangTerms.loadedLanguages) {
      html += '<button data-lang="' + langKey + '">' + R6MapsLangTerms.terms.languages[langKey] + '</button>';
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
    html += '<div class="checkbox-wrapper">';
    html += '<input type="checkbox" id="enable-screenshtos" checked>' + R6MapsLangTerms.terms.general.enableScreenshots + '</input>';
    html += '</div>';

    html += '</div>';

    return html;
  };

  var getMenuR6MapsHtml = function getMenuR6MapsHtml() {
    var html = '',
      fullScreenTerm;

    html += '<div class="mmenu-custom-panel">';
    html += '<h2>r6maps.com</h2>';
    html += '<button id="menu-select-maps">' + R6MapsLangTerms.terms.selectMaps.homeLink + '</button>';
    html += '<button id="menu-about">' + R6MapsLangTerms.terms.general.about + '</button>';
    if (isFullScreenAvailable()) {
      html += '<button href="" id="full-screen">' + R6MapsLangTerms.terms.general.fullScreen + '</button>';
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

  var handlePanZoomEnd = function handlePanZoomEnd() {
    zoomControl.trigger('input');
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

  var mapsSetupChangeEvent = function mapsSetupChangeEvent(callback) {
    mapControl.on('change', callback);
  };

  var mapPanelsSetupChangeEvent = function mapPanelsSetupChangeEvent(callback) {
    mapPanelCountControl.on('change', function(event) {
      var panelCount = mapPanelCountControl.val();

      tryShowLockControls(panelCount);
      callback(panelCount);
    });
  };

  var mapsGetCurrentlySelected = function mapsGetCurrentlySelected() {
    return mapControl.val();
  };

  var mapsPopulateOptions = function mapsPopulateOptions(mapData) {
    var optionsAsString = '',
      maps = [],
      currentMap = mapsGetCurrentlySelected();

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
    mapsTrySelect(currentMap);
  };

  var mapsTrySelect = function mapsTrySelect(map) {
    return trySelectOption(mapControl, map);
  };

  var menuSetup = function menuSetup(roomLabelStyles) {
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
    enableScreenshotsControl = $('#enable-screenshtos');
    fullScreenControl = $('#full-screen');
    menuSelectMapsControl = $('#menu-select-maps');
    $('#menu-about').on('click', function() {
      window.location = R6MapsLangTerms.terms.general.linkAbout;
    });
  };

  var menuSetupFullScreen = function menuSetupFullScreen() {
    if (fullScreenControl) {
      fullScreenControl.on('click', toggleFullScreen);
    }
  };

  var menuSetupSelectMaps = function menuSetupSelectMaps(
    showSelectMapCallback,
    closeMenuCallback
  ) {
    menuSelectMapsControl.on('click', function(event) {
      event.preventDefault();
      showSelectMapCallback();
      closeMenuCallback();
    });
  };

  var panReset = function panReset(mapMains, getResetDimensions) {
    var resetDimensions = getResetDimensions();

    mapMains.panzoom(
      'pan',
      -resetDimensions.centerLeft * resetDimensions.zoomValue,
      -resetDimensions.centerTop * resetDimensions.zoomValue
    );
  };

  var panSetLockOption = function panSetLockOption(isChecked) {
    var boolValue = (isChecked === 'true') ? true : false;

    lockPanningControl.prop('checked', boolValue);
  };

  var panSetupLockPanningChangeEvent = function panSetupLockPanningChangeEvent(callback) {
    lockPanningControl.change(function(e) {
      callback(getLockPanningValue());
    });
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

  var resetSelectedFloor = function resetSelectedFloor() {
    floorControl.find('.' + SELECTED_CLASS + '').removeClass(SELECTED_CLASS);
  };

  var roomLabelStylesSetupChangeEvent = function roomLabelStylesSetupChangeEvent(callback) {
    roomLabelStylesControl.on('change', function(event) {
      callback(event.target.value);
    });
  };

  var roomLabelStylesTrySelect = function roomLabelStylesTrySelect(style) {
    return trySelectOption(roomLabelStylesControl, style);
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

  var setupPanZoom = function setupPanZoom(mapMains, mapElements) {
    mapMains.panzoom({
      $zoomRange: zoomControl,
      minScale: 0.3,
      maxScale: 2.5
    });

    mapMains.on('mousewheel', function(event) {
      zoomControl.val(+zoomControl.val() + (event.deltaY * 0.06));
      zoomControl.trigger('input');
      //zoomControl.trigger('change'); // todo: needed??
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

  var toggleFullScreen = function toggleFullScreen() {
    if (isCurrentlyFullScreen()) {
      disableFullScreen();
    } else {
      enableFullScreen();
    }
  };

  var mapPanelsTrySelect = function mapPanelsTrySelect(number) {
    var result = trySelectOption(mapPanelCountControl, number);

    mapPanelCountControl.trigger('change');
    return result;
  };

  var objectivesGetCurrentlySelected = function objectivesGetCurrentlySelected() {
    return objectiveControl.val();
  };

  var objectivesPopulateOptions = function objectivesPopulateOptions(objectives) {
    var options = '',
      objectiveTerms = R6MapsLangTerms.terms.objectives,
      initialObjective = objectivesGetCurrentlySelected();

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
    objectivesTrySelect(initialObjective);
  };

  var objectivesSetupChangeEvent = function objectivesSetupChangeEvent(callback) {
    objectiveControl.on('change', callback);
  };

  var objectivesTrySelect = function objectivesTrySelect(objective) {
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

  var tryShowLockControls = function tryShowLockControls(numberPanels) {
    var lockWrapper = $('#lock-wrapper');

    if (numberPanels > 1) {
      lockWrapper.show(600);
    } else {
      lockWrapper.hide(600);
    }
  };

  var zoomDisable = function zoomDisable(mapElements) {
    mapElements.panzoom('disable');
  };

  var zoomEnable = function zoomEnable(mapElements) {
    mapElements.panzoom('enable');
  };

  var zoomIsZoomed = function zoomIsZoomed() {
    return (zoomControl.val() != 1);
  };

  var zoomReset = function zoomReset(mapMains, getResetDimensions) {
    var resetDimensions = getResetDimensions();

    zoomControl.val(resetDimensions.zoomValue);
    zoomControl.trigger('input');
    //zoomControl.trigger('change'); // todo: needed??
  };

  return  {
    enableScreenshots: {
      set: enableScreenshotsSetOption,
      setup: enableScreenshotsSetupChangeEvent
    },
    floors: {
      get: floorsGetCurrentIndex,
      getMinMaxIndex: floorsGetMinAndMaxIndex,
      populate: floorsPopulate,
      setup: floorsSetup,
      trySelect: floorsTrySelect
    },
    mapPanels: {
      setup: mapPanelsSetupChangeEvent,
      trySelect: mapPanelsTrySelect
    },
    maps: {
      get: mapsGetCurrentlySelected,
      populate: mapsPopulateOptions,
      setup: mapsSetupChangeEvent,
      trySelect: mapsTrySelect
    },
    menu: {
      setup: menuSetup,
      setupFullScreen: menuSetupFullScreen,
      setupSelectMaps: menuSetupSelectMaps
    },
    objectives: {
      get: objectivesGetCurrentlySelected,
      populate: objectivesPopulateOptions,
      setup: objectivesSetupChangeEvent,
      trySelect: objectivesTrySelect
    },
    pan: {
      reset: panReset,
      setLockOption: panSetLockOption,
      setupLockOption: panSetupLockPanningChangeEvent
    },
    roomLabelStyles: {
      setup: roomLabelStylesSetupChangeEvent,
      trySelect: roomLabelStylesTrySelect
    },
    zoom: {
      disable: zoomDisable,
      enable: zoomEnable,
      isZoomed: zoomIsZoomed,
      reset: zoomReset
    },
    enableChannelControl: enableChannelControl, // feature flag temp
    setupLosOpacity: setupLosOpacity,
    setupPanZoom: setupPanZoom
  };
})(window.jQuery, window, document, R6MapsLangTerms);
