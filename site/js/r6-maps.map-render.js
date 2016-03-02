'use strict';

var R6MapsRender = (function($,window,document,undefined) {
  var CAMERA_WIDTH = 40,
    CAMERA_HEIGHT = 40;

  $.fn.removeClassPrefix = function(prefix) {
    this.each(function(i, el) {
      var classes = el.className.split(' ').filter(function(c) {
        return c.lastIndexOf(prefix, 0) !== 0;
      });

      el.className = $.trim(classes.join(' '));
    });
    return this;
  };

  var IMG_URL = 'img/',
    FLOOR_CSS_TEXT = {
      0: 'zero',
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five'
    };

  var renderMap = function renderMap(mapData, mapElements) {
    var html = '';

    html += getFloorsHtml(mapData.floors, mapData.imgUrlPrefix);
    html += getCeilingHatchesHtml(mapData.ceilingHatches);
    html += getSkylightsHtml(mapData.skylights);
    html += getCamerasHtml(mapData.cameras);
    html += getHostageObjectivesHtml(mapData.hostageObjectives);
    html += getBombObjectivesHtml(mapData.bombObjectives);
    html += getSecureObjectivesHtml(mapData.secureObjectives);
    html += getRoomLabelsHtml(mapData.roomLabels);
    html += getLegendHtml();

    mapElements.html(html);

    document.title = 'Siege Maps - ' + mapData.name;
  };

  var getFloorsHtml = function getFloorsHtml(floors, imgUrlPrefix) {
    var html = '',
      prefix,
      imgSrc,
      positionStyle,
      classes;

    floors.forEach(function(floor) {
      prefix = imgUrlPrefix;
      imgSrc = IMG_URL + prefix + '/' + prefix + '-' + floor.index + '.jpg';
      positionStyle = getPositionStyle(floor);
      classes = floor.background ? 'background ' : 'floor ' + FLOOR_CSS_TEXT[floor.index];
      html += '<img src="' + imgSrc + '" style="' + positionStyle + '" class="' + classes + '"></img>';
    });
    return html;
  };

  var getHostageObjectivesHtml = function getHostageObjectivesHtml(hostageObjectives) {
    var html = '',
      positionStyle,
      classes;

    hostageObjectives.forEach(function(hostage) {
      positionStyle = getPositionStyle(hostage);
      classes = 'objective hostage ';
      classes += getCommonClasses(hostage);
      html += '<div style="' + positionStyle + '" class="' + classes + '"><p>H</p><span></span></div>';
    });
    return html;
  };

  var getBombObjectivesHtml = function getBombObjectivesHtml(bombObjectives) {
    var html = '',
      classes,
      positionStyle,
      bombLabel;

    bombObjectives.forEach(function(bomb) {
      positionStyle = getPositionStyle(bomb);
      classes = 'objective bomb ';
      classes += getCommonClasses(bomb);
      bombLabel = bomb.set + bomb.letter;
      html += '<div style="' + positionStyle + '" class="' + classes + '"><span></span><p>' + bombLabel + '</p></div>';
    });
    return html;
  };

  var getSecureObjectivesHtml = function getSecureObjectiveHtml(secureObjectives) {
    var html = '',
      positionStyle,
      classes;

    secureObjectives.forEach(function(secure) {
      positionStyle = getPositionStyle(secure);
      classes = 'objective secure ';
      classes += getCommonClasses(secure);
      html += '<div style="' + positionStyle + '" class="' + classes + '"><p>S</p><span></span></div>';
    });
    return html;
  };

  var getCamerasHtml = function getCamerasHtml(cameras) {
    var html = '',
      positionStyle,
      classes,
      view;

    cameras.forEach(function(camera) {
      positionStyle = getPositionStyle(camera);
      classes = 'camera ';
      classes += getCommonClasses(camera);
      html += '<div style="' + positionStyle + '" class="' + classes + '"><span></span></div>';
    });
    return html;
  };

  var getCeilingHatchesHtml = function getCeilingHatchesHtml(ceilingHatches) {
    var html = '',
      positionStyle,
      classes;

    ceilingHatches.forEach(function(hatch) {
      positionStyle = getPositionStyle(hatch);
      classes = 'ceiling-hatch ';
      classes += getCommonClasses(hatch);
      html += '<div style="' + positionStyle + '" class="' + classes + '"></div>';
    });
    return html;
  };

  var getSkylightsHtml = function getSkylightsHtml(skylights) {
    var html = '',
      positionStyle,
      classes;

    skylights.forEach(function(skylight) {
      positionStyle = getPositionStyle(skylight);
      classes = 'skylight ';
      classes += getCommonClasses(skylight);
      html += '<div style="' + positionStyle + '" class="' + classes + '"><span></span></div>';
    });
    return html;
  };

  var getRoomLabelsHtml = function getRoomLabelsHtml(roomLabels) {
    var html = '',
      positionStyle,
      classes;

    roomLabels.forEach(function(roomLabel) {
      positionStyle = getPositionStyle(roomLabel);
      classes = 'room-label ';
      classes += getCommonClasses(roomLabel);
      html += '<div style="' + positionStyle + '" class="' + classes + '"><p>' + roomLabel.description + '</p></div>';
    });
    return html;
  };

  var getCommonClasses = function getCommonClasses(mapElement) {
    var classes = '';

    if (mapElement.floor != null) {
      classes += FLOOR_CSS_TEXT[mapElement.floor] + ' ';
    }

    if (mapElement.otherFloor != null && !mapElement.alwaysShow) {
      classes += 'other-floor ';
      classes += mapElement.otherFloor == 'up' ? 'up ' : 'down ';
    }

    classes += mapElement.outdoor ? 'outdoor ' : '';
    classes += mapElement.hardToRead ? 'hard-to-read ' : '';

    return classes;
  };

  var getPositionStyle = function getPositionStyle(mapElement) {
    return 'top: ' + mapElement.top + 'px; left: ' + mapElement.left + 'px;';
  };

  var showFloor = function showFloor(floor, mapElements) {
    var floorPrefix = 'show-floor-';

    mapElements.removeClassPrefix(floorPrefix);
    mapElements.addClass(floorPrefix + FLOOR_CSS_TEXT[floor]);
  };

  var showObjective = function showObjective(objective, mapElements) {
    var objectivePrefix = 'show-objective-';

    mapElements.removeClassPrefix(objectivePrefix);
    mapElements.addClass(objectivePrefix + objective);
  };

  var getLegendHtml = function getLegendHtml() {
    return '<img src="img/legend.png" class="legend" style="top: 515px; left: 760px;">';
  };

  return  {
    renderMap: renderMap,
    showFloor: showFloor,
    showObjective: showObjective
  };
})(window.jQuery, window, document);
