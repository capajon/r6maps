'use strict';

var R6MMainControls = (function($, window, document, R6MLangTerms, undefined) {
  var $mapControl = $('#map-control'),
    $objectiveControl = $('#objective-control'),
    $floorControl = $('#floor-control'),
    $zoomControl = $('#zoom-range'),
    $menuControl = $('#mmenu-link'),
    $toggleControl = $('#toggle-control'),
    $lockPanningControl,
    $enableScreenshotsControl,
    $roomLabelStylesControl,
    $mapPanelCountControl,
    $fullScreenControl,
    $menuSelectMapsControl,
    $sessionsControl,
    $menuPanel = $('#menu-panel'),
    ROOM_LABEL_STYLE_DEFAULT = 'Light',
    ROOM_LABEL_STYLE_DISPLAY_NONE = 'DisplayNone',
    SELECTED_CLASS = 'selected',
    TOGGLE_TYPE_LABEL = 'label',
    ZOOMED_IN_FAR_CLASS = 'zoomed-in-far',
    ZOOMED_OUT_FAR_CLASS = 'zoomed-out-far',
    CSS_TRANSITION_MS = 1800; // currently in highlighted-item mixin for .highlighted-item-in-transition

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

    $enableScreenshotsControl.prop('checked', boolValue);
  };

  var enableScreenshotsSetupChangeEvent = function enableScreenshotsSetupChangeEvent(callback) {
    $enableScreenshotsControl.change(function(e) {
      callback(getEnableScreenshotValue());
    });
  };

  var floorsGetCurrentIndex = function floorsGetCurrentIndex() {
    return $floorControl.find('.selected').data('index');
  };

  var floorsGetMinAndMaxIndex = function floorsGetMinAndMaxIndex() { // TO DO CHANGE TO MAX FLOOR INDEX
    var $floorInputs = $floorControl.find('button');

    return {
      min: $($floorInputs[0]).data('index'),
      max: $($floorInputs[$floorInputs.length - 1]).data('index')
    };
  };

  var floorsPopulate = function floorsPopulate(floors) {
    var buttonsAsString = '',
      classes = '',
      tooltip = '',
      initalFloor = floorsGetCurrentIndex();

    floors.forEach(function(floor) {
      // allows to have a bg image that can't be selected as a "floor"
      if (floor.dontSelect) {
        return;
      }
      classes = '';
      classes += (floor.default) ? SELECTED_CLASS : '';
      tooltip = getFloorTooltip(floor.index);
      buttonsAsString += '<button data-index="' + floor.index + '" class="' + classes + '" title="' + tooltip + '">';
      buttonsAsString += '<span class="short">' + floor.name.short + '</span>';
      buttonsAsString += '<span class="full">' + floor.name.full + '</span>';
      buttonsAsString += '</button>';
    });
    $floorControl.html(buttonsAsString);
    floorsTrySelect(initalFloor);
  };

  var floorsSetup = function floorsSetup(handleChangeCallback, showSelectedFloorFn) {
    setupFloorChangeEvent(handleChangeCallback);
    setupFloorHotkeys(showSelectedFloorFn);
  };

  var floorsTrySelect = function floorsTrySelect(floorIndex) {
    var $selectedFloor = $floorControl.find("[data-index='" + floorIndex + "']");

    if ($selectedFloor.length) {
      resetSelectedFloor();
      $selectedFloor.addClass(SELECTED_CLASS);
      $selectedFloor.trigger('click');
      return true;
    }
    return false;
  };

  var getEnableScreenshotValue = function getEnableScreenshotValue() {
    return $enableScreenshotsControl.is(':checked');
  };

  var getFloorTooltip = function getFloorTooltip(floorIndex) {
    var shortcutTip = R6MLangTerms.terms.general.shortcutTip;

    if (floorIndex == 0) {
      return shortcutTip.replace('{shortcut}',"'0' or '~'");
    } else {
      return shortcutTip.replace('{shortcut}',floorIndex);
    }
  };

  var getHandleHotkeyFn = function getHandleHotkeyFn(showSelectedFloorFn) {
    return function handleHotKey(e) {
      var keyCode = e.which;
      var keyVal = e.key;

      if (keyCode >= 48 && keyCode <= 53) {  // '0' through '1'
        if (floorsTrySelect(keyCode - 48)) {
          showSelectedFloorFn();
        }
      } else if (keyCode == 192) { // '`'
        if (floorsTrySelect(0)) {
          showSelectedFloorFn();
        }
      } else if (R6MLangTerms.terms.toggle.labels.shortcut.includes(keyVal)) { // Language specific shortcut ex. 't' or 'T' in english
        triggerToggleEvent(TOGGLE_TYPE_LABEL);
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

  var getHandlePanZoomChangeFn = function getHandlePanZoomChangeFn($mapMains) {
    return function handlePanZoomChange(event, panzoom, transform) {
      if (getLockPanningValue()) {
        $mapMains.each(function(index, map) {
          if (map !== event.target) {
            $(map).panzoom('pan', transform[4], transform[5], {silent: true});
          }
        });
      }
    };
  };

  var getHandleZoomChangeFn = function getHandleZoomChangeFn($mapElements) {
    return function handleZoomChange() {
      var zoomVal = $zoomControl.val();

      if ( zoomVal > 1.6) {
        $mapElements.addClass(ZOOMED_IN_FAR_CLASS);
      } else if ( zoomVal < 0.4 ) {
        $mapElements.addClass(ZOOMED_OUT_FAR_CLASS);
      } else {
        $mapElements.removeClass(ZOOMED_IN_FAR_CLASS);
        $mapElements.removeClass(ZOOMED_OUT_FAR_CLASS);
      }
    };
  };

  var getLockPanningValue = function getLockPanningValue() {
    return $lockPanningControl.is(':checked');
  };

  var getMenuContributionsHtml = function getMenuContributionsHtml() {
    var html = '';

    return html;

    html += '<div id="contributions" class="mmenu-custom-panel">';
    html += '<h2>' + R6MLangTerms.terms.general.contributions + '</h2>';
    html += '<p>' + R6MLangTerms.terms.general.supportSiteNote + '</p>';
    html += '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">';
    html += '<input type="hidden" name="cmd" value="_s-xclick">';
    html += '<input type="hidden" name="hosted_button_id" value="4Z2F2PS6VMDLC">';
    html += '<input type="image" src="' + R6MLangTerms.terms.general.donateImg + '" border="0" name="submit" alt="PayPal">';
    html += '<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">';
    html += '</form>';
    html += '</div>';
    return html;
  };

  var getMenuLanguageHtml = function getMenuLanguageHtml() {
    var html = '';

    html += '<div id="lang-choices" class="mmenu-custom-panel">';
    html += '<h2>' + R6MLangTerms.terms.general.languageHeader + '</h2>';
    for (var langKey in R6MLangTerms.loadedLanguages) {
      html += '<button data-lang="' + langKey + '">' + R6MLangTerms.terms.languages[langKey] + '</button>';
    }
    html += '</div>';
    return html;
  };

  var getMenuOptionsHtml = function getMenuOptionsHtml() {
    var html = '';

    html += '<div id="options-wrapper" class="mmenu-custom-panel">';
    html += '<h2>' + R6MLangTerms.terms.general.optionsHeader + '</h2>';

    html += '<div class="map-panel-count-control">';
    html += '<label>' + R6MLangTerms.terms.general.labelNumberFloorsToDisplay + '</label>';
    html += '<select id="map-pane-count">';
    html += '<option value="1">' + R6MLangTerms.terms.floorDisplayOptions.one + '</option>';
    html += '<option value="2">' + R6MLangTerms.terms.floorDisplayOptions.two + '</option>';
    html += '<option value="4">' + R6MLangTerms.terms.floorDisplayOptions.four + '</option>';
    html += '</select>';

    html += '<div id="lock-wrapper">';
    html += '<div class="checkbox-wrapper">';
    html += '<input type="checkbox" checked="checked" id="lock-panning">' + R6MLangTerms.terms.general.lockPanning + '</input>';
    html += '</div>';
    html += '</div>';

    html += '</div>';

    html += '<label>' + R6MLangTerms.terms.general.labelRoomLabelStyle + '</label>';
    html += '<select id="room-label-style"></select>';

    html += '<hr>';

    html += '<div id="los-wrapper">';
    html += '<label id="los-label">' + R6MLangTerms.terms.general.labelLosOpacity + '</label>';
    html += '<div class="zoom controls">';
    html += '<input id="los-opacity-range" type="range" max="1.1" min="0" step="0.05"></input>';
    html += '<p id="camera-los-percent"></p><p id="camera-los-note"></p>';
    html += '</div>';
    html += '</div>';
    html += '<div class="checkbox-wrapper">';
    html += '<input type="checkbox" id="enable-screenshtos" checked>' + R6MLangTerms.terms.general.enableScreenshots + '</input>';
    html += '</div>';

    html += '</div>';

    return html;
  };

  var getMenuR6MapsHtml = function getMenuR6MapsHtml(showUpdateLinkHighlightedFn) {
    var html = '',
      latestUpdateCss = 'menu-item';

    latestUpdateCss += showUpdateLinkHighlightedFn() ? ' highlighted-item' : '';

    html += '<div class="mmenu-custom-panel">';
    html += '<h2>r6maps.com</h2>';
    html += '<button id="menu-select-maps">' + R6MLangTerms.terms.selectMaps.homeLink + '</button>';
    html += '<a class="menu-item" id="menu-about" href="' + R6MLangTerms.terms.general.linkAbout + '">' + R6MLangTerms.terms.general.about + '</a>';
    html += '<a class="menu-item" href="stats.html">' + R6MLangTerms.terms.stats.headerMainBeta + '</a>';
    //html += '<a id="menu-latest-updates" class="' + latestUpdateCss + '" href="' + R6MLangTerms.terms.general.linkLatestUpdate + '">' + R6MLangTerms.terms.general.latestUpdate + '</a>';
    if (isFullScreenAvailable()) {
      html += '<button href="" id="full-screen">' + R6MLangTerms.terms.general.fullScreen + '</button>';
    }
    html += '<button class="feature-flagged" id="menu-sessions-launcher">' + R6MLangTerms.terms.sessions.button + '</button>';
    html += '</div>';
    return html;
  };

  var handlePanZoomEnd = function handlePanZoomEnd() {
    $zoomControl.trigger('input');
  };

  var highlightControl = function highlightControl($el) {
    $el.addClass('highlighted-item');
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
    $mapControl.on('change', callback);
  };

  var mapPanelsSetupChangeEvent = function mapPanelsSetupChangeEvent(callback) {
    $mapPanelCountControl.on('change', function(event) {
      var panelCount = $mapPanelCountControl.val();

      tryShowLockControls(panelCount);
      callback(panelCount);
    });
  };

  var mapsGetCurrentlySelected = function mapsGetCurrentlySelected() {
    return $mapControl.val();
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

    $mapControl.html(optionsAsString);
    mapsTrySelect(currentMap);
  };

  var mapsTrySelect = function mapsTrySelect(map) {
    return R6MHelpers.trySelectOption($mapControl, map);
  };

  var menuSetup = function menuSetup(roomLabelStyles, showUpdateLinkHighlightedFn) {
    var html = '';

    html += getMenuR6MapsHtml(showUpdateLinkHighlightedFn);
    html += getMenuLanguageHtml();
    html += getMenuOptionsHtml();
    html += getMenuContributionsHtml();
    html += '<div class="faded-logo"></div>';
    $menuPanel.html(html);

    $menuControl.find('.menu-text').html(R6MLangTerms.terms.general.menu);
    $roomLabelStylesControl = $('#room-label-style');
    populateRoomLabelStyleOptions($roomLabelStylesControl, roomLabelStyles);
    $mapPanelCountControl = $('#map-pane-count');
    $lockPanningControl = $('#lock-panning');
    $enableScreenshotsControl = $('#enable-screenshtos');
    $fullScreenControl = $('#full-screen');
    $menuSelectMapsControl = $('#menu-select-maps');
    $sessionsControl = $('#menu-sessions-launcher');
  };

  var menuSetupFullScreen = function menuSetupFullScreen() {
    if ($fullScreenControl) {
      $fullScreenControl.on('click', toggleFullScreen);
    }
  };

  var menuSetupSelectMaps = function menuSetupSelectMaps(
    showSelectMapCallback,
    closeMenuCallback
  ) {
    $menuSelectMapsControl.on('click', function(event) {
      event.preventDefault();
      showSelectMapCallback();
      closeMenuCallback();
    });
  };

  var panReset = function panReset($mapMains, getResetDimensions) {
    var resetDimensions = getResetDimensions();

    $mapMains.panzoom(
      'pan',
      -resetDimensions.centerLeft * resetDimensions.zoomValue,
      -resetDimensions.centerTop * resetDimensions.zoomValue
    );
  };

  var panSetLockOption = function panSetLockOption(isChecked) {
    var boolValue = (isChecked === 'true') ? true : false;

    $lockPanningControl.prop('checked', boolValue);
  };

  var panSetupLockPanningChangeEvent = function panSetupLockPanningChangeEvent(callback) {
    $lockPanningControl.change(function(e) {
      callback(getLockPanningValue());
    });
  };

  var populateRoomLabelStyleOptions = function populateRoomLabelStyleOptions(
    $roomLabelStylesControl,
    roomLabelStyles
  ) {
    var html = '';

    roomLabelStyles.forEach(function(roomLabelStyle) {
      html += '<option value="' + roomLabelStyle + '">' +
        R6MLangTerms.terms.roomLabelStyles[roomLabelStyle] +
        '</option>';
    });
    $roomLabelStylesControl.html(html);
  };

  var resetSelectedFloor = function resetSelectedFloor() {
    $floorControl.find('.' + SELECTED_CLASS + '').removeClass(SELECTED_CLASS);
  };

  var roomLabelStylesSetupChangeEvent = function roomLabelStylesSetupChangeEvent(callback) {
    $roomLabelStylesControl.on('change', function(event) {
      callback(event.target.value);
    });
  };

  var roomLabelStylesTrySelect = function roomLabelStylesTrySelect(style) {
    return R6MHelpers.trySelectOption($roomLabelStylesControl, style);
  };

  var sessionsEnable = function sessionsEnable() {
    $sessionsControl.removeClass('feature-flagged');
  };

  var sessionsSetupClickEvent = function sessionsSetupClickEvent(
    sessionsLaunchCallback,
    closeMenuCallback
  ) {
    $sessionsControl.on('click', function(event) {
      event.preventDefault();
      closeMenuCallback();
      sessionsLaunchCallback();
    });
  };

  var setupFloorChangeEvent = function setupFloorChangeEvent(callback) {
    $floorControl.on('click', 'button', function(e) {
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
    var $losNote = $('#camera-los-note');

    $('#camera-los-percent').text(
      R6MLangTerms.terms.general.labelPercent.replace(
        '{int}',
        Math.round(opacity * 100)
      )
    );

    if (opacity == defaultOpacity) {
      $losNote.text(R6MLangTerms.terms.general.labelLosDefault);
    } else if (opacity == 1.05) {
      $losNote.text(R6MLangTerms.terms.general.labelLos105);
    } else if (opacity == 1.10) {
      $losNote.text(R6MLangTerms.terms.general.labelLos110);
    } else {
      $losNote.text('');
    }
  };

  var setupLosOpacity = function setupLosOpacity(updateLosOpacityFn, startingValue, defaultOpacity) {
    var $losOpacityControl = $('#los-opacity-range'),
      handleLosOpacityChangeFn = getHandleLosOpacityChangeFn(
        updateLosOpacityFn,
        defaultOpacity
      );

    $losOpacityControl.val(startingValue);
    setLosLabelsText(startingValue, defaultOpacity);
    $losOpacityControl.on('input', handleLosOpacityChangeFn);
    $losOpacityControl.on('change', handleLosOpacityChangeFn);
  };

  var setupPanZoom = function setupPanZoom($mapMains, $mapElements) {
    $mapMains.panzoom({
      $zoomRange: $zoomControl,
      minScale: 0.3,
      maxScale: 2.5
    });

    $mapMains.on('mousewheel', function(event) {
      $zoomControl.val(+$zoomControl.val() + (event.deltaY * 0.06));
      $zoomControl.trigger('input');
      //$zoomControl.trigger('change'); // todo: needed??
    });

    $zoomControl.on('change', getHandleZoomChangeFn($mapElements));
    $zoomControl.on('input', getHandleZoomChangeFn($mapElements));

    // camera links were not working on touch devices:
    $mapMains.on('touchstart','a', function(e) {
      $(this).addClass('hover');
    });

    $mapMains.on('touchend','a', function(e) {
      $(this).removeClass('hover');
      this.click();
    });

    $mapMains.on('panzoomchange', getHandlePanZoomChangeFn($mapMains));
    $mapMains.on('panzoomend', handlePanZoomEnd);
  };

  var toggleFullScreen = function toggleFullScreen() {
    if (isCurrentlyFullScreen()) {
      disableFullScreen();
    } else {
      enableFullScreen();
    }
  };

  var mapPanelsTrySelect = function mapPanelsTrySelect(number) {
    var result = R6MHelpers.trySelectOption($mapPanelCountControl, number);

    $mapPanelCountControl.trigger('change');
    return result;
  };

  var objectivesGetCurrentlySelected = function objectivesGetCurrentlySelected() {
    return $objectiveControl.val();
  };

  var objectivesPopulateOptions = function objectivesPopulateOptions(objectives) {
    var options = '',
      objectiveTerms = R6MLangTerms.terms.objectives,
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
    $objectiveControl.html(options);
    objectivesTrySelect(initialObjective);
  };

  var objectivesSetupChangeEvent = function objectivesSetupChangeEvent(callback) {
    $objectiveControl.on('change', callback);
  };

  var objectivesTrySelect = function objectivesTrySelect(objective) {
    return R6MHelpers.trySelectOption($objectiveControl, objective);
  };

  var togglePopulate = function togglePopulate() {
    var shortcutTip = R6MLangTerms.terms.general.shortcutTip;
    var toggleLabelLang = R6MLangTerms.terms.toggle.labels;
    var btns = '<button id="toggle-label" title="' + toggleLabelLang.full + ' \n' + R6MLangTerms.terms.general.shortcutTip.replace('{shortcut}','t') + '">'
       + '<span class="short">' + toggleLabelLang.short + '</span>'
       + '<span class="full">' + toggleLabelLang.full + '</span>'
       + '</button>';

    $toggleControl.html(btns);
  };

  var setupToggleClickEvent = function setupToggleClickEvent(callback) {
    $toggleControl.on('click', '#toggle-' + TOGGLE_TYPE_LABEL, function(e) {
      var cur = $roomLabelStylesControl.val();
      var prev = $(this).data('prevRoomStyle') ? $(this).data('prevRoomStyle') : ROOM_LABEL_STYLE_DISPLAY_NONE;

      if (cur == prev){
        prev = cur === ROOM_LABEL_STYLE_DISPLAY_NONE ? ROOM_LABEL_STYLE_DEFAULT : ROOM_LABEL_STYLE_DISPLAY_NONE;
      }

      $roomLabelStylesControl.val(prev).trigger('change');
      $(this).data('prevRoomStyle', cur);
      if (callback && typeof callback === 'function'){
        callback();
      }
    });
  };

  var triggerToggleEvent = function triggerToggleEvent(type){
    // Validate type and default to label
    switch (type){
    case TOGGLE_TYPE_LABEL:
      break;
    default:
      type = TOGGLE_TYPE_LABEL;
    }
    $toggleControl.find('#toggle-' + type).trigger('click');
  };

  var toggleSetup = function toggleSetup(callback) {
    setupToggleClickEvent(callback);
  };

  var removeLatestUpdateHighlight = function removeLatestUpdateHighlight(initialDelayMs) {
    unhighlightControl($('#menu-latest-updates'), initialDelayMs);
  };

  var tryShowLockControls = function tryShowLockControls(numberPanels) {
    var $lockWrapper = $('#lock-wrapper');

    if (numberPanels > 1) {
      $lockWrapper.show(600);
    } else {
      $lockWrapper.hide(600);
    }
  };

  var unhighlightControl = function unhighlightControl($el, initialDelayMs) {
    if ($el.hasClass('highlighted-item')) {
      $el.addClass('highlighted-item-in-transition');
      setTimeout(function() {
        $el.removeClass('highlighted-item');

        setTimeout(function() {
          $el.removeClass('highlighted-item-in-transition');
        }, CSS_TRANSITION_MS);
      }, initialDelayMs);
    }
  };

  var zoomDisable = function zoomDisable($mapElements) {
    $mapElements.panzoom('disable');
  };

  var zoomEnable = function zoomEnable($mapElements) {
    $mapElements.panzoom('enable');
  };

  var zoomIsZoomed = function zoomIsZoomed() {
    return ($zoomControl.val() != 1);
  };

  var zoomReset = function zoomReset($mapMains, getResetDimensions) {
    var resetDimensions = getResetDimensions();

    $zoomControl.val(resetDimensions.zoomValue);
    $zoomControl.trigger('input');
    //$zoomControl.trigger('change'); // todo: needed??
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
    sessions: {
      enable: sessionsEnable,
      setup: sessionsSetupClickEvent
    },
    toggle: {
      populate: togglePopulate,
      setup: toggleSetup
    },
    zoom: {
      disable: zoomDisable,
      enable: zoomEnable,
      isZoomed: zoomIsZoomed,
      reset: zoomReset
    },
    highlightControl: highlightControl,
    removeLatestUpdateHighlight: removeLatestUpdateHighlight,
    setupLosOpacity: setupLosOpacity,
    setupPanZoom: setupPanZoom,
    unhighlightControl: unhighlightControl
  };
})(window.jQuery, window, document, R6MLangTerms);
