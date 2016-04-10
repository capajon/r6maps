'use strict';

var R6MapsRender = (function($,window,document,R6MapsLangTerms,undefined) {
  var CAMERA_WIDTH = 40,
    CAMERA_HEIGHT = 40,
    langTerms = R6MapsLangTerms.terms;

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

  var renderMap = function renderMap(mapData, mapElements, svgElement) {
    var html = '';

    html += getFloorsHtml(mapData.floors, mapData.imgUrlPrefix);
    html += getCeilingHatchesHtml(mapData.ceilingHatches);
    html += getSkylightsHtml(mapData.skylights);
    html += getCamerasHtml(mapData.cameras, mapData.imgUrlPrefix);
    html += getHostageObjectivesHtml(mapData.hostageObjectives);
    html += getBombObjectivesHtml(mapData.bombObjectives);
    html += getSecureObjectivesHtml(mapData.secureObjectives);
    html += getRoomLabelsHtml(mapData.roomLabels);
    html += getDroneTunnelsHtml(mapData.droneTunnels);
    html += getSpawnPointsHtml(mapData.spawnPoints);
    html += getLegendHtml();

    mapElements.html(html);
    svgElement.html(getCamerasLosHtml(mapData.cameras));

    document.title = R6MapsLangTerms.terms.general.pageTitle.replace('{mapName}',mapData.name);
  };

  var getCamerasLosHtml = function getCamerasLosHtml(cameras){
    var html = '',
      classes = '';

    cameras.forEach(function(camera) {
      classes = 'camera-los camera-' + camera.id + ' ' + getCommonClasses(camera);
      if (camera.los) {
        camera.los.forEach(function(los) {
          html += '<polyline class="' + classes + '" points="' +  getCameraLosPoints(los) + '"/>';
        });
      }
    });
    return html;
  };

  var getCameraLosPoints = function getCameraLosPoints(losData) {
    var points = '';

    losData.forEach(function(data) {
      points += data.left + ',' + data.top + ' ';
    });
    return points;
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
      html += '<div style="' + positionStyle + '" class="' + classes + '"><p>' + langTerms.objectives.hostageShort + '</p><span></span></div>';
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
      html += '<div style="' + positionStyle + '" class="' + classes + '"><p>' + langTerms.objectives.secureShort + '</p><span></span></div>';
    });
    return html;
  };

  var getCamerasHtml = function getCamerasHtml(cameras, mapimgUrlPrefix) {
    var html = '',
      positionStyle,
      classes,
      data,
      grouping,
      title,
      tagStart,
      tagEnd,
      view;

    cameras.forEach(function(camera) {
      positionStyle = getPositionStyle(camera);
      classes = 'camera ';
      classes += getCommonClasses(camera);
      grouping = (camera.otherFloor)
        ? ''
        : 'data-fancybox-group="camera"';
      title = R6MapsLangTerms.terms.general.cameraViewCaption.replace('{floorName}',camera.location.removeBreakTags());
      tagStart = (camera.id && !camera.otherFloor)
        ? '<a href="' + IMG_URL + mapimgUrlPrefix + '/' + mapimgUrlPrefix + '-camera-' + camera.id + '@2x.jpg" title="' + title + '" ' + grouping + ' data-camera-id="' + camera.id + '"'
        : '<div ';
      tagEnd = (camera.id && !camera.otherFloor)
        ? '</a>'
        : '</div>';
      html += tagStart + 'style="' + positionStyle + '" class="' + classes + '"><span></span>' + tagEnd;
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

  var getDroneTunnelsHtml = function getDroneTunnelsHtml(droneTunnels) {
    var html = '',
      inlineStyle,
      classes;

    droneTunnels.forEach(function(droneTunnel) {
      inlineStyle = getPositionStyle(droneTunnel) +
        'height: ' + droneTunnel.size + 'px; ' +
        'margin-top: -' +  Math.round(droneTunnel.size / 2) + 'px; ' +
        getRotateCssStatements(droneTunnel.rotate);
      classes = 'drone-tunnel ';
      classes += getCommonClasses(droneTunnel);
      classes += (droneTunnel.alternate) ? 'alternate ' : '';
      html += '<div style="' + inlineStyle + '" class="' + classes + '"><span class="entrance"></span><span class="exit"></span></div>';
    });
    return html;
  };

  var getSpawnPointsHtml = function getSpawnPointsHtml(spawnPoints) {
    var html = '',
      inlineStyle = '',
      classes = 'spawn-point ';

    spawnPoints.forEach(function(spawnPoint) {
      inlineStyle = getPositionStyle(spawnPoint);
      html += '<div style="' + inlineStyle + '" class="' + classes + '"><div class="spawn-wrapper"><div class="spawn-letter"><p>' + spawnPoint.letter + '</p></div><div class="spawn-description"><p>' + spawnPoint.description + '</p></div></div></div>';
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

  var getRotateCssStatements = function getRotateCssStatements(degree) {
    var css = '';

    css += 'transform: rotate(' + degree + 'deg); ';
    css += '-webkit-transform: rotate(' + degree + 'deg); ';
    css += '-moz-transform: rotate(' + degree + 'deg); ';
    css += '-o-transform: rotate(' + degree + 'deg); ';
    css += '-ms-transform: rotate(' + degree + 'deg); ';
    return css;
  };

  var getPositionStyle = function getPositionStyle(mapElement) {
    return 'top: ' + mapElement.top + 'px; left: ' + mapElement.left + 'px; ';
  };

  var showFloor = function showFloor(floor, mapElement) {
    var floorPrefix = 'show-floor-';

    mapElement.removeClassPrefix(floorPrefix);
    mapElement.addClass(floorPrefix + FLOOR_CSS_TEXT[floor]);
  };

  var showObjective = function showObjective(objective, mapElements) {
    var objectivePrefix = 'show-objective-';

    mapElements.removeClassPrefix(objectivePrefix);
    mapElements.addClass(objectivePrefix + objective);
  };

  var getLegendHtml = function getLegendHtml() {
    var html = '',
      legendTerms = langTerms.legend,
      CSS_ABBREV = 'legend-',
      legendItems = [
        { class: CSS_ABBREV + 'breakable-floor-traps', description: legendTerms.breakableFloorTraps },
        { class: CSS_ABBREV + 'ceiling-hatch', description: legendTerms.ceilingHatches },
        { class: CSS_ABBREV + 'breakable-walls', description: legendTerms.breakableWalls },
        { class: CSS_ABBREV + 'line-of-sight-walls', description: legendTerms.lineOfSightWalls },
        { class: CSS_ABBREV + 'drone-tunnels', description: legendTerms.droneTunnels },
        { class: CSS_ABBREV + 'lineof-sight-floors', description: legendTerms.lineOfSightFloors },
        { class: CSS_ABBREV + 'objectives', description: legendTerms.objectives },
        { class: CSS_ABBREV + 'insertion-point', description: legendTerms.insertionPoints },
        { class: CSS_ABBREV + 'security-camera', description: legendTerms.securityCameras },
        { class: CSS_ABBREV + 'skylight', description: legendTerms.skylights },
        { class: CSS_ABBREV + 'down-and-up', description: legendTerms.onFloorAboveOrBelow }
      ];

    html += '<ul id="legend">';
    legendItems.forEach(function(item) {
      html += '<li class="' + item.class + '">' + item.description + '</li>';
    });
    html += '</ul>';

    return html;
  };

  return  {
    renderMap: renderMap,
    showFloor: showFloor,
    showObjective: showObjective
  };
})(window.jQuery, window, document, R6MapsLangTerms);
