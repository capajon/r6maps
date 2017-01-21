'use strict';

var PING_MARKER_RADIUS = 10,
  MIN_PING_MARKER_RADIUS = 5,
  MAX_PING_MARKER_RADIUS = 16,
  PING_MARKER_BORDER_PERCENT = 0.2,
  MIN_PING_MARKER_BORDER = 1;

var R6MapsSessions = (function($, window, document, R6MapsLangTerms, undefined) {
  var getHandleTapFn = function getHandleTapFn(
    pingMarkers,
    pingMarkerAccents,
    pingMarkersVertical,
    pingMarkersHorizontal,
    isCameraCallback,
    SVG_DIM
  ) {
    return function handleTap(event) {
      var targetEl = $(event.srcEvent.target);

      if (!isCameraCallback(targetEl)) {
        var mapWrapper =  $(event.target).closest('.map-wrapper'),
          pingPosition = getPingPosition(event.center.x, event.center.y, mapWrapper),
          newX = pingPosition.x,
          newY = pingPosition.y;

        movePingMarkers(
          pingMarkers,
          pingMarkerAccents,
          pingMarkersVertical,
          pingMarkersHorizontal,
          newX + SVG_DIM.LEFT_OFFSET,
          newY + SVG_DIM.TOP_OFFSET
        );
      }
    };
  };

  var getHidePingMarkersFn = function getHidePingMarkersFn(
    pingMarkers,
    pingMarkerAccents,
    pingMarkersVertical,
    pingMarkersHorizontal
  ) {
    return function hidePingMarkers() {
      movePingMarkers(
        pingMarkers,
        pingMarkerAccents,
        pingMarkersVertical,
        pingMarkersHorizontal,
        -10000,
        -10000
      );
    };
  };

  var getPingPosition = function getPingPosition(x, y, mapWrapper) {
    var centerX = mapWrapper.offset().left + (mapWrapper.width() / 2),
      centerY = mapWrapper.offset().top + (mapWrapper.height() / 2),
      mapMain = mapWrapper.find('.map-main'),
      transforms = mapMain.panzoom('getMatrix'),
      transformX = parseInt(transforms[4]),
      transformY = parseInt(transforms[5]),
      scale = transforms[0];

    return {
      x: Math.round((x - centerX - transformX) / scale),
      y: Math.round((y - centerY - transformY) / scale)
    };
  };

  var getResizePingMarkersFn = function getResizePingMarkersFn(
    pingMarkers,
    pingMarkerAccents,
    $mapMains
  ) {
    return function resizePingMarkers() {
      var scale = $($mapMains[0]).panzoom('getMatrix')[0],
        radius = Math.round(PING_MARKER_RADIUS / scale),
        radius = Math.max(MIN_PING_MARKER_RADIUS, radius),
        radius = Math.min(MAX_PING_MARKER_RADIUS, radius),
        strokeWidth = Math.max(MIN_PING_MARKER_BORDER, Math.floor(radius * PING_MARKER_BORDER_PERCENT));

      radius -= strokeWidth;
      pingMarkers.attr('r', radius);
      pingMarkerAccents.attr('r', radius * 2);
      pingMarkers.attr('stroke-width', strokeWidth);
    };
  };

  var movePingMarkers = function movePingMarkers(
    pingMarkers,
    pingMarkerAccents,
    pingMarkersVertical,
    pingMarkersHorizontal,
    x,
    y
  ) {
    pingMarkers.attr('cx', x);
    pingMarkers.attr('cy', y);
    pingMarkerAccents.attr('cx', x);
    pingMarkerAccents.attr('cy', y);
    pingMarkersVertical.attr('x1', x);
    pingMarkersVertical.attr('x2', x);
    pingMarkersHorizontal.attr('y1', y);
    pingMarkersHorizontal.attr('y2', y);
    pingMarkerAccents.addClass('highlight');
    pingMarkersVertical.addClass('highlight');
    pingMarkersHorizontal.addClass('highlight');
    setTimeout(function() {
      pingMarkerAccents.removeClass('highlight');
      pingMarkersVertical.removeClass('highlight');
      pingMarkersHorizontal.removeClass('highlight');
    }, 1);
  };

  var populateStartingMarkers = function populateStartingMarkers($sessionMarkerWrappers, SVG_DIM) {
    var html = '';

    html += '<svg class="svg-elements session-markers" style="width: ' + SVG_DIM.WIDTH + 'px; left: -' + SVG_DIM.LEFT_OFFSET + 'px; height: ' + SVG_DIM.HEIGHT + 'px; top: -' + SVG_DIM.TOP_OFFSET + 'px;">';
    html += '<g>';
    html += '<line class="ping-marker vertical" x1="-9000" y1="35" x2="-10000" y2="' + (SVG_DIM.HEIGHT + 35) + '" stroke-width="2"/>';
    html += '<line class="ping-marker horizontal" x1="-25" y1="-10000" x2="' + (SVG_DIM.WIDTH - 25) + '" y2="-9000" stroke-width="2"/>';
    html += '<circle class="ping-marker accent" cx="-10000" cy="-10000" r="6" stroke-width="2"/>';
    html += '<circle class="ping-marker center" cx="-10000" cy="-10000" r="6" stroke-width="2"/>';
    html += '</g>';
    html += '</svg>';
    $sessionMarkerWrappers.html(html);
  };

  var setup = function setup (
    $mapMains,
    $sessionMarkerWrappers,
    isCameraCallback,
    SVG_DIM
  ) {
    populateStartingMarkers($sessionMarkerWrappers, SVG_DIM);

    var pingMarkers = $sessionMarkerWrappers.find('.ping-marker.center'),
      pingMarkerAccents = $sessionMarkerWrappers.find('.ping-marker.accent'),
      pingMarkersVertical = $sessionMarkerWrappers.find('.ping-marker.vertical'),
      pingMarkersHorizontal = $sessionMarkerWrappers.find('.ping-marker.horizontal'),
      handleTap = getHandleTapFn(pingMarkers, pingMarkerAccents, pingMarkersVertical, pingMarkersHorizontal, isCameraCallback, SVG_DIM),
      resizePingMarkers = getResizePingMarkersFn(pingMarkers, pingMarkerAccents, $mapMains),
      hidePingMarkers = getHidePingMarkersFn(pingMarkers, pingMarkerAccents, pingMarkersVertical, pingMarkersHorizontal);

    $mapMains.each(function(index, main) {
      var mc = new Hammer(main);

      mc.on('press', handleTap);
      mc.on('tap', handleTap);
    });
    pingMarkers.on('click', hidePingMarkers);
    $mapMains.on('panzoomzoom', resizePingMarkers);
    resizePingMarkers();
  };

  return  {
    setup: setup
  };
})(window.jQuery, window, document, R6MapsLangTerms);
