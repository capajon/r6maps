'use strict';

var R6MMainRender = (function($,window,document,R6MLangTerms,undefined) {
  var SVG_WIDTH = 2560,
    SVG_HEIGHT = 1474,
    RETINA_WIDTH_CUTOFF = 1280,
    RETINA_HEIGHT_CUTOFF = 720,
    SVG_DIM = {
      WIDTH: SVG_WIDTH,
      HEIGHT: SVG_HEIGHT,
      TOP_OFFSET: (SVG_HEIGHT / 2) + 12,
      LEFT_OFFSET: (SVG_WIDTH / 2) - 5
    },
    langTerms = R6MLangTerms.terms;

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
    },
    ROOM_LABEL_STYLES = ['Light', 'Dark', 'LightAndLarge', 'DarkAndLarge', 'LightAndSmall', 'DarkAndSmall', 'DisplayNone'],
    ROOM_LABEL_CSS_TEXT = {
      Dark: 'room-label-dark',
      Light: 'room-label-light',
      DarkAndLarge: 'room-label-dark room-label-large',
      LightAndLarge: 'room-label-light room-label-large',
      DarkAndSmall: 'room-label-dark room-label-small',
      LightAndSmall: 'room-label-light room-label-small',
      DisplayNone: 'room-label-display-none'
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

  var getCamerasHtml = function getCamerasHtml(cameras, mapimgUrlPrefix) {
    var html = '',
      positionStyle,
      classes,
      grouping,
      title,
      tagStart,
      tagEnd,
      retinaUrl = (
          window.innerWidth > RETINA_WIDTH_CUTOFF
          && window.innerHeight > RETINA_HEIGHT_CUTOFF
        ) ? '@2x' : '';

    cameras.forEach(function(camera) {
      positionStyle = getPositionStyle(camera);
      classes = 'camera ';
      classes += getCommonClasses(camera);
      grouping = (camera.otherFloor)
        ? ''
        : 'data-fancybox-group="camera"';
      title = R6MLangTerms.terms.general.cameraViewCaption.replace('{floorName}',camera.location.removeBreakTags());
      tagStart = (camera.id && !camera.otherFloor)
        ? '<a href="' + IMG_URL + mapimgUrlPrefix + '/' + mapimgUrlPrefix + '-camera-' + camera.id + retinaUrl + '.jpg" title="' + title + '" ' + grouping + ' data-camera-id="' + camera.id + '"'
        : '<div ';
      tagEnd = (camera.id && !camera.otherFloor)
        ? '</a>'
        : '</div>';
      html += tagStart + 'style="' + positionStyle + '" class="' + classes + '"><span class="other-floor"></span><span class="cam-num">' + camera.id + '</span>' + tagEnd;
    });
    return html;
  };

  var getCamerasLosHtml = function getCamerasLosHtml(cameras){
    var html = '',
      classes = '';

    html += '<svg class="svg-elements map" style="width: ' + SVG_DIM.WIDTH + 'px; left: -' + SVG_DIM.LEFT_OFFSET + 'px; height: ' + SVG_DIM.HEIGHT + 'px; top: -' + SVG_DIM.TOP_OFFSET + 'px;">';
    html += '<g>';

    cameras.forEach(function(camera) {
      classes = 'camera-los camera-' + camera.id + ' ' + getCommonClasses(camera);
      if (camera.los) {
        camera.los.forEach(function(los) {
          html += '<polyline class="' + classes + '" points="' +  getCameraLosPoints(los) + '"/>';
        });
      }
    });

    html += '</g>';
    html += '</svg>';

    return html;
  };

  var getCameraLosPoints = function getCameraLosPoints(losData) {
    var points = '';

    losData.forEach(function(data) {
      points += (data.left + SVG_DIM.LEFT_OFFSET) + ',' + (data.top + SVG_DIM.TOP_OFFSET) + ' ';
    });
    return points;
  };

  var getCeilingHatchesHtml = function getCeilingHatchesHtml(ceilingHatches) {
    var html = '',
      positionStyle,
      dimensionStyle,
      classes;

    ceilingHatches.forEach(function(hatch) {
      positionStyle = getPositionStyle(hatch);
      dimensionStyle = getDimensionStyle(hatch);
      classes = 'ceiling-hatch ';
      classes += getCommonClasses(hatch);
      html += '<div style="' + positionStyle + dimensionStyle + '" class="' + classes + '"></div>';
    });
    return html;
  };

  var getCommonClasses = function getCommonClasses(element) {
    var classes = '';

    if (element.floor != null) {
      classes += FLOOR_CSS_TEXT[element.floor] + ' ';
    }

    if (element.otherFloor != null && !element.alwaysShow) {
      classes += 'other-floor ';
      classes += element.otherFloor;
    }

    classes += element.outdoor ? 'outdoor ' : '';
    classes += element.hardToRead ? 'hard-to-read ' : '';
    classes += element.veryHardToRead ? 'very-hard-to-read ' : '';
    classes += element.smaller ? 'smaller ' : '';

    return classes;
  };

  var getCompassHtml = function getCompassHtml(compassPoints) {
    var html = '',
      positionPoints,
      positionStyle;

    positionPoints = { top: 448, left: 550 }; // default if none provided
    positionPoints = $.extend(
        positionPoints,
        compassPoints
      );
    positionStyle = getPositionStyle(positionPoints);

    html += '<div id="compass" style="' + positionStyle + '">';
    html += '<div class="compass-background"></div>';
    html += '<p class="letter-n"><span>' + langTerms.compass.letterN + '</span></p>';
    html += '<p class="letter-e"><span>' + langTerms.compass.letterE + '</span></p>';
    html += '<p class="letter-s"><span>' + langTerms.compass.letterS + '</span></p>';
    html += '<p class="letter-w"><span>' + langTerms.compass.letterW + '</span></p>';
    html += '</div>';
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
      html += '<div style="' + inlineStyle + '" class="' + classes + '"><span class="other-floor"></span></div>';
    });
    return html;
  };

  var getMaxFloorIndexHtml = function getMaxFloorIndexHtml($mapWrappers, floors, imgUrlPrefix) {
    var html = '',
      prefix,
      imgSrc,
      positionStyle,
      classes,
      deferrs = [];

    $mapWrappers.addClass('loading');

    floors.forEach(function(floor) {
      var currentDeferr = $.Deferred();

      prefix = imgUrlPrefix;
      imgSrc = IMG_URL + prefix + '/' + prefix + '-' + floor.index + '.jpg';
      positionStyle = getPositionStyle(floor);
      classes = floor.background ? 'background ' : 'floor ' + FLOOR_CSS_TEXT[floor.index];
      html += '<img src="' + imgSrc + '" style="' + positionStyle + '" class="' + classes + '"></img>';

      $('<img/>').attr('src', imgSrc).load(function() {
        $(this).remove(); // prevent memory leaks
        currentDeferr.resolve();
      });
      deferrs.push(currentDeferr);
    });

    $.when.apply($, deferrs).then(function() {
      $mapWrappers.removeClass('loading');
    });

    $('<img/>').attr('src', 'http://picture.de/image.png').load(function() {
      $(this).remove(); // prevent memory leaks as @benweet suggested
      $('body').css('background-image', 'url(http://picture.de/image.png)');
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

  var getLaddersHtml = function getLaddersHtml(ladders) {
    var html = '',
      positionStyle,
      classes;

    if (ladders) {
      ladders.forEach(function(ladder) {
        positionStyle = getPositionStyle(ladder);
        classes = 'ladder ';
        classes += getCommonClasses(ladder);
        html += '<div style="' + positionStyle + '" class="' + classes + '"><span class="other-floor"></span></div>';
      });
    }
    return html;
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
        { class: CSS_ABBREV + 'down-and-up', description: legendTerms.onFloorAboveOrBelow },
        { class: CSS_ABBREV + 'camera-line-of-sight', description: legendTerms.cameraLineOfSight },
        { class: CSS_ABBREV + 'ladder', description: legendTerms.ladders }
      ];

    html += '<ul id="legend">';
    legendItems.forEach(function(item) {
      html += '<li class="' + item.class + '">' + item.description + '</li>';
    });
    html += '</ul>';

    return html;
  };

  var getPanelLabelsHtml = function getPanelLabelsHtml(floors) {
    var html = '',
      cssClass = '';

    floors.forEach(function(floor) {
      // allows to have a bg image that can't be selected as a "floor"
      if (floor.dontSelect) {
        return;
      }
      cssClass = FLOOR_CSS_TEXT[floor.index];
      html += '<span class="' + cssClass + '">' + floor.name.full + '</span>';
    });
    return html;
  };

  var getPositionStyle = function getPositionStyle(element) {
    return 'top: ' + element.top + 'px; left: ' + element.left + 'px; ';
  };

  var getDimensionStyle = function getDimensionStyle(element) {
    if ('width' in element && 'height' in element) {
      return ' width: ' + element.width + 'px; height: ' + element.height + 'px; background-size: ' + element.width + 'px, ' + element.height + 'px;';
    } else {
      return '';
    }
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

  var getRotateCssStatements = function getRotateCssStatements(degree) {
    var css = '';

    css += 'transform: rotate(' + degree + 'deg); ';
    css += '-webkit-transform: rotate(' + degree + 'deg); ';
    css += '-moz-transform: rotate(' + degree + 'deg); ';
    css += '-o-transform: rotate(' + degree + 'deg); ';
    css += '-ms-transform: rotate(' + degree + 'deg); ';
    return css;
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

  var getSpawnPointsHtml = function getSpawnPointsHtml(spawnPoints) {
    var html = '',
      inlineStyle = '',
      classes;

    spawnPoints.forEach(function(spawnPoint) {
      inlineStyle = getPositionStyle(spawnPoint);
      classes = 'spawn-point ' + getCommonClasses(spawnPoint);
      html += '<div style="' + inlineStyle + '" class="' + classes + '"><div class="spawn-wrapper"><div class="spawn-letter"><p>' + spawnPoint.letter + '</p></div><div class="spawn-description"><p>' + spawnPoint.description + '</p></div></div></div>';
    });
    return html;
  };

  var renderMap = function renderMap(mapData, $mapWrappers, $mapElements, $svgMapWrappers, $mapPanelLabels) {
    var html = '';

    html += getMaxFloorIndexHtml($mapWrappers, mapData.floors, mapData.imgUrlPrefix);
    html += getCeilingHatchesHtml(mapData.ceilingHatches);
    html += getSkylightsHtml(mapData.skylights);
    html += getCamerasHtml(mapData.cameras, mapData.imgUrlPrefix);
    html += getHostageObjectivesHtml(mapData.hostageObjectives);
    html += getBombObjectivesHtml(mapData.bombObjectives);
    html += getSecureObjectivesHtml(mapData.secureObjectives);
    html += getRoomLabelsHtml(mapData.roomLabels);
    html += getDroneTunnelsHtml(mapData.droneTunnels);
    html += getSpawnPointsHtml(mapData.spawnPoints);
    html += getCompassHtml(mapData.compassPoints);
    html += getLaddersHtml(mapData.ladders);
    html += getLegendHtml();

    $mapElements.html(html);
    $mapPanelLabels.html(getPanelLabelsHtml(mapData.floors));
    $svgMapWrappers.html(getCamerasLosHtml(mapData.cameras));
  };

  var setEnableScreenshots = function setEnableScreenshots($mapWrappers, isEnabled) {
    if (isEnabled) {
      $mapWrappers.removeClass('disable-cameras');
    } else {
      $mapWrappers.addClass('disable-cameras');
    }
  };

  var setRoomLabelStyle = function setRoomLabelStyle($mapElements, style) {
    ROOM_LABEL_STYLES.forEach(function(roomLabelStyle) {
      $mapElements.removeClass(ROOM_LABEL_CSS_TEXT[roomLabelStyle]);
    });
    $mapElements.addClass(ROOM_LABEL_CSS_TEXT[style]);
  };

  var setupMapPanels = function setupMapPanels($mapPanelWrappers, numPanels) {
    var html;

    for (var x = 0; x < numPanels; x++) {
      html = '';
      html += '<div class="map-wrapper">';
      html += '<div class="helper-border vertical"></div>';
      html += '<div class="helper-border horizontal"></div>';
      html += '<p class="map-panel-label"></p>';
      html += '<div class="map-main">';
      html += '<div class="center-helper">';
      html += '<div class="map-elements"></div>';
      html += '<div class="svg-wrapper drawing-markers"></div>';
      html += '<div class="svg-wrapper map"></div>';
      html += '</div>'; // end center-helper
      html += '</div>'; // end map-main
      html += '</div>'; // end map-wrapper
      $mapPanelWrappers.append(html);
    }
  };

  var showFloor = function showFloor(
    selectedFloorIndex,
    $mapPanelWrappers,
    $mapWrappers,
    minFloorIndex,
    maxFloorIndex
  ) {
    $mapPanelWrappers.attr('selected-floor-index', selectedFloorIndex);
    var numPanels = $mapPanelWrappers.attr('map-panel-count');

    if (numPanels > 2)  {
      selectedFloorIndex = Math.max(minFloorIndex, selectedFloorIndex - 1);
    }
    var tempMinIndex = Math.max(minFloorIndex, maxFloorIndex - numPanels + 1),
      startingIndex = Math.min(tempMinIndex, selectedFloorIndex);

    $mapWrappers.each(function(index, map) {
      $(map).attr('show-floor-index', Math.min(startingIndex, maxFloorIndex));
      startingIndex++;
    });
  };

  var showObjective = function showObjective(objective, $mapElements) {
    var objectivePrefix = 'show-objective-';

    $mapElements.removeClassPrefix(objectivePrefix);
    $mapElements.addClass(objectivePrefix + objective);
  };

  return  {
    renderMap: renderMap,
    roomLabelStyles: ROOM_LABEL_STYLES,
    setEnableScreenshots: setEnableScreenshots,
    setRoomLabelStyle: setRoomLabelStyle,
    setupMapPanels: setupMapPanels,
    showFloor: showFloor,
    showObjective: showObjective,
    SVG_DIM: SVG_DIM
  };
})(window.jQuery, window, document, R6MLangTerms);
