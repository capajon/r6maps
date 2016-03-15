'use strict';

var R6MapsControls = (function($, window, document, R6MapsLangTerms, undefined) {
  var mapControl = $('#map-control'),
    objectiveControl = $('#objective-control'),
    floorControl = $('#floor-control'),
    zoomControl = $('#zoom-range'),
    SELECTED_CLASS = 'selected',
    ZOOMED_IN_FAR_CLASS = 'zoomed-in-far',
    ZOOMED_OUT_FAR_CLASS = 'zoomed-out-far';

  var populateMapOptions = function populateMapOptions(mapData) {
    var optionsAsString = '';

    for (var mapKey in mapData) {
      if (mapData.hasOwnProperty(mapKey)) {
        optionsAsString += '<option value="' + mapKey + '">' + mapData[mapKey].name + '</option>';
      }
    }
    mapControl.html(optionsAsString);
  };

  var getCurrentlySelectedMap = function getCurrentlySelectedMap() {
    return mapControl.val();
  };

  var trySelectMap = function trySelectMap(map) {
    trySelectOption(mapControl, map);
  };

  var setupMapChangeEvent = function setupMapChangeEvent(callback) {
    mapControl.on('change', callback);
  };

  var populateObjectiveOptions = function populateObjectiveOptions(objectives) {
    var options = '',
      objectiveTerms = R6MapsLangTerms.terms.objectives;

    options += '<option value="all">Show All</option>';
    objectives.forEach(function(objective) {
      options += '<option value="' + objective + '">' + objectiveTerms[objective] + '</option>';
    });
    objectiveControl.html(options);
  };

  var getCurrentlySelectedObjective = function getCurrentlySelectedObjective() {
    return objectiveControl.val();
  };

  var trySelectObjective = function trySelectObjective(objective) {
    trySelectOption(objectiveControl, objective);
  };

  var setupObjectiveChangeEvent = function setupObjectiveChangeEvent(callback) {
    objectiveControl.on('change', callback);
  };

  var populateFloorOptions = function populateFloorOptions(floors) {
    var buttonsAsString = '',
      classes = '',
      tooltip = '';

    floors.forEach(function(floor) {
      classes = '';
      classes += (floor.default) ? SELECTED_CLASS : '';
      tooltip = getFloorTooltip(floor.index);
      buttonsAsString += '<button data-index="' + floor.index + '" class="' + classes + '" title="' + tooltip + '">' + floor.name + '</button>';
    });
    floorControl.html(buttonsAsString);
  };

  var getCurrentlySelectedFloor = function getCurrentlySelectedFloor() {
    return floorControl.find('.selected').data('index');
  };

  var trySelectFloor = function trySelectFloor(floorIndex) {
    var selectedFloor = floorControl.find("[data-index='" + floorIndex + "']");

    if (selectedFloor.length) {
      floorControl.find('button').removeClass(SELECTED_CLASS);
      selectedFloor.addClass(SELECTED_CLASS);
      selectedFloor.trigger('click');
      return true;
    }
    return false;
  };

  var setupFloorChangeEvent = function setupFloorChangeEvent(callback) {
    floorControl.on('click', 'button', function(e) {
      floorControl.find('.' + SELECTED_CLASS + '').removeClass(SELECTED_CLASS);
      $(e.target).addClass(SELECTED_CLASS);
      callback();
    });
  };

  var setupFloorHotkeys = function setupFloorHotkeys(showSelectedFloorFn) {
    $(document).on('keydown', getHandleHotkeyFn(showSelectedFloorFn));
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

  var setupZoom = function setupZoom(map, mapElements) {
    map.panzoom({
      $zoomRange: zoomControl,
      minScale: 0.3,
      maxScale: 2.5
    });

    map.on('mousewheel', function(event) {
      zoomControl.val(+zoomControl.val() + (event.deltaY * 0.06));
      zoomControl.trigger('input');
      zoomControl.trigger('change');
    });

    zoomControl.on('change', getHandleZoomChangeFn(mapElements));
    zoomControl.on('input', getHandleZoomChangeFn(mapElements));

    // camera links were not working on touch devices:
    map.on('touchstart','a', function(e) {
      $(this).addClass('hover');
    });

    map.on('touchend','a', function(e) {
      $(this).removeClass('hover');
      this.click();
    });
  };

  var isZoomed = function isZoomed() {
    return (zoomControl.val() != 1);
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

  var trySelectOption = function trySelectOption(selectEl, option) {
    var selectOption = selectEl.find('option[value="' + option + '"]');

    if (selectOption) {
      selectOption.prop('selected', true);
    }
  };

  var getFloorTooltip = function getFloorTooltip(floorIndex) {
    if (floorIndex == 0) {
      return "Shortcuts: '0' or '~'";
    } else {
      return "Shortcut: '" + floorIndex + "'";
    }
  };

  return  {
    populateMapOptions: populateMapOptions,
    getCurrentlySelectedMap: getCurrentlySelectedMap,
    trySelectMap: trySelectMap,
    setupMapChangeEvent: setupMapChangeEvent,

    populateObjectiveOptions: populateObjectiveOptions,
    getCurrentlySelectedObjective: getCurrentlySelectedObjective,
    trySelectObjective: trySelectObjective,
    setupObjectiveChangeEvent: setupObjectiveChangeEvent,

    populateFloorOptions: populateFloorOptions,
    getCurrentlySelectedFloor: getCurrentlySelectedFloor,
    trySelectFloor: trySelectFloor,
    setupFloorChangeEvent: setupFloorChangeEvent,
    setupFloorHotkeys: setupFloorHotkeys,

    setupZoom: setupZoom,
    isZoomed: isZoomed
  };
})(window.jQuery, window, document, R6MapsLangTerms);
