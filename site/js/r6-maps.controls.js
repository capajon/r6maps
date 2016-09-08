'use strict';

var R6MapsControls = (function($, window, document, R6MapsLangTerms, undefined) {
  var mapControl = $('#map-control'),
    objectiveControl = $('#objective-control'),
    floorControl = $('#floor-control'),
    zoomControl = $('#zoom-range'),
    menuControl = $('#mmenu-link'),
    menuPanel = $('#menu-panel'),
    SELECTED_CLASS = 'selected',
    ZOOMED_IN_FAR_CLASS = 'zoomed-in-far',
    ZOOMED_OUT_FAR_CLASS = 'zoomed-out-far';

  var getCurrentlySelectedFloor = function getCurrentlySelectedFloor() {
    return floorControl.find('.selected').data('index');
  };

  var getCurrentlySelectedMap = function getCurrentlySelectedMap() {
    return mapControl.val();
  };

  var getCurrentlySelectedObjective = function getCurrentlySelectedObjective() {
    return objectiveControl.val();
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

  var getHandleZoomChangeFn = function getHandleZoomChangeFn(mapElements) {
    return function handleZoomChange() {
      var zoomVal = zoomControl.val();

      if ( zoomVal > 1.6) {
        mapElements.addClass(ZOOMED_IN_FAR_CLASS);
      } else if ( zoomVal < 0.8 ) {
        mapElements.addClass(ZOOMED_OUT_FAR_CLASS);
      } else {
        mapElements.removeClass(ZOOMED_IN_FAR_CLASS);
        mapElements.removeClass(ZOOMED_OUT_FAR_CLASS);
      }
    };
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

  var populateMenu = function populateMenu() {
    var html = '';

    html += '<div class="mmenu-custom-panel">';
    html += '<h2>r6maps.com</h2>';
    html += '<a href="">' + R6MapsLangTerms.terms.selectMaps.homeLink + '</a>';
    html += '<a href="' + R6MapsLangTerms.terms.general.linkAbout + '">' + R6MapsLangTerms.terms.general.about + '</a>';
    html += '</div>';

    html += '<div id="lang-choices" class="mmenu-custom-panel">';
    html += '<h2>' + R6MapsLangTerms.terms.general.languageHeader + '</h2>';
    for (var langKey in R6MapsLangTerms.loadedLanguages) {
      html += '<a href="" data-lang="' + langKey + '">' + R6MapsLangTerms.terms.languages[langKey] + '</a>';
    }
    html += '</div>';

    html += '<div id="los-opacity" class="mmenu-custom-panel">';
    html += '<h2>' + R6MapsLangTerms.terms.general.optionsHeader + '</h2>';
    html += '<label>' + R6MapsLangTerms.terms.general.labelRoomLabelStyle + '</label>';
    html += '<select>';
    html += '<option value="DEF">' + R6MapsLangTerms.terms.general.roomLabelStyleDefault + '</option>';
    html += '<option value="DARKER">' + R6MapsLangTerms.terms.general.roomLabelStyleDarker + '</option>';
    html += '<option value="LARGER">' + R6MapsLangTerms.terms.general.roomLabelStyleLarger + '</option>';
    html += '<option value="DARKERLARGER">' + R6MapsLangTerms.terms.general.roomLabelStyleDarkerLarger + '</option>';
    html += '</select>';
    html += '<label>' + R6MapsLangTerms.terms.general.labelLosOpacity + '</label>';
    html += '<div class="zoom controls">';
    html += '<input id="los-opacity-range" type="range" max="1.1" min="0" step="0.05"></input>';
    html += '<p id="camera-los-percent"></p><p id="camera-los-note"></p>';
    html += '</div>';
    html += '</div>';

    html += '<div class="faded-logo"></div>';

    menuPanel.html(html);
    menuControl.html(R6MapsLangTerms.terms.general.menu);
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

  var resetPan = function resetPan(map) {
    map.panzoom('resetPan');
  };

  var resetSelectedFloor = function resetSelectedFloor() {
    floorControl.find('.' + SELECTED_CLASS + '').removeClass(SELECTED_CLASS);
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

  var setupMapChangeEvent = function setupMapChangeEvent(callback) {
    mapControl.on('change', callback);
  };

  var setupObjectiveChangeEvent = function setupObjectiveChangeEvent(callback) {
    objectiveControl.on('change', callback);
  };

  var setupRoomLabelOption = function setupRoomLabelOption(
    addMapClassCallback,
    removeMapClassCallback) {
  };

  var setupZoom = function setupZoom(mapEl, mapElements) {
    mapEl.panzoom({
      $zoomRange: zoomControl,
      minScale: 0.3,
      maxScale: 2.5
    });

    mapEl.on('mousewheel', function(event) {
      zoomControl.val(+zoomControl.val() + (event.deltaY * 0.06));
      zoomControl.trigger('input');
      zoomControl.trigger('change');
    });

    zoomControl.on('change', getHandleZoomChangeFn(mapElements));
    zoomControl.on('input', getHandleZoomChangeFn(mapElements));

    // camera links were not working on touch devices:
    mapEl.on('touchstart','a', function(e) {
      $(this).addClass('hover');
    });

    mapEl.on('touchend','a', function(e) {
      $(this).removeClass('hover');
      this.click();
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

  var trySelectMap = function trySelectMap(map) {
    return trySelectOption(mapControl, map);
  };

  var trySelectObjective = function trySelectObjective(objective) {
    trySelectOption(objectiveControl, objective);
  };

  var trySelectOption = function trySelectOption(selectEl, option) {
    var selectOption = selectEl.find('option[value="' + option + '"]');

    if (selectOption.length) {
      selectOption.prop('selected', true);
      return true;
    }
    return false;
  };

  return  {
    getCurrentlySelectedFloor: getCurrentlySelectedFloor,
    getCurrentlySelectedMap: getCurrentlySelectedMap,
    getCurrentlySelectedObjective: getCurrentlySelectedObjective,
    isZoomed: isZoomed,
    populateFloorOptions: populateFloorOptions,
    populateMapOptions: populateMapOptions,
    populateMenu: populateMenu,
    populateObjectiveOptions: populateObjectiveOptions,
    resetPan: resetPan,
    setupFloorChangeEvent: setupFloorChangeEvent,
    setupFloorHotkeys: setupFloorHotkeys,
    setupLosOpacity: setupLosOpacity,
    setupMapChangeEvent: setupMapChangeEvent,
    setupObjectiveChangeEvent: setupObjectiveChangeEvent,
    setupRoomLabelOption: setupRoomLabelOption,
    setupZoom: setupZoom,
    trySelectFloor: trySelectFloor,
    trySelectMap: trySelectMap,
    trySelectObjective: trySelectObjective
  };
})(window.jQuery, window, document, R6MapsLangTerms);
