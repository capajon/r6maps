'use strict';

var PING_MARKER_RADIUS = 10,
  MIN_PING_MARKER_RADIUS = 5,
  MAX_PING_MARKER_RADIUS = 16,
  PING_MARKER_BORDER_PERCENT = 0.2,
  MIN_PING_MARKER_BORDER = 1;

var R6MapsSessions = (function($, window, document, R6MapsLangTerms, undefined) {
  var getCurrentPosition = function getCurrentPosition(pingMarkers) {
    return {
      y: parseInt(pingMarkers.attr('cy')),
      x: parseInt(pingMarkers.attr('cx'))
    };
  };

  var getHandleTapFn = function getHandleTapFn(
    pingMarkers,
    pingMarkerAccents,
    pingMarkersVertical,
    pingMarkersHorizontal,
    isCameraCallback
  ) {
    return function handleTap(event) {
      var targetEl = $(event.srcEvent.target);

      if (isCameraCallback) {
        var mapWrapper =  $(event.target).closest('.map-wrapper'),
          pingPosition = getPingPosition(event.center.x, event.center.y, mapWrapper),
          currentPosition = getCurrentPosition(pingMarkers),
          newX = pingPosition.x,
          newY = pingPosition.y;

        movePingMarkers(
          pingMarkers,
          pingMarkerAccents,
          pingMarkersVertical,
          pingMarkersHorizontal,
          newX,
          newY
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
    mapMains
  ) {
    return function resizePingMarkers() {
      var scale = $(mapMains[0]).panzoom('getMatrix')[0],
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

  var isOnCurrentPing = function isOnCurrentPing(pingPosition, currentPosition) {
    return (
      Math.abs(pingPosition.x - currentPosition.x) < 6 &&
      Math.abs(pingPosition.y - currentPosition.y) < 6
    );
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

  var populateStartingMarkers = function populateStartingMarkers(sessionMarkerElements) {
    var html = '';

    html += '<line class="ping-marker vertical" x1="-9000" y1="-715" x2="-9000" y2="725" stroke-width="2"/>';
    html += '<line class="ping-marker horizontal" x1="-1275" y1="-9000" x2="1285" y2="-9000" stroke-width="2"/>';
    html += '<circle class="ping-marker accent" cx="-9000" cy="-9000" r="6" stroke-width="2"/>';
    html += '<circle class="ping-marker center" cx="-9000" cy="-9000" r="6" stroke-width="2"/>';
    sessionMarkerElements.html(html);
    //future note: if using append: sessionMarkerElements.html(sessionMarkerElements.html());
  };

  var setup = function setup (
    mapMains,
    sessionMarkerElements,
    isCameraCallback
  ) {
    populateStartingMarkers(sessionMarkerElements);

    var pingMarkers = sessionMarkerElements.find('.ping-marker.center'),
      pingMarkerAccents = sessionMarkerElements.find('.ping-marker.accent'),
      pingMarkersVertical = sessionMarkerElements.find('.ping-marker.vertical'),
      pingMarkersHorizontal = sessionMarkerElements.find('.ping-marker.horizontal'),
      handleTap = getHandleTapFn(pingMarkers, pingMarkerAccents, pingMarkersVertical, pingMarkersHorizontal, isCameraCallback),
      resizePingMarkers = getResizePingMarkersFn(pingMarkers, pingMarkerAccents, mapMains),
      hidePingMarkers = getHidePingMarkersFn(pingMarkers, pingMarkerAccents, pingMarkersVertical, pingMarkersHorizontal);

    mapMains.each(function(index, main) {
      var mc = new Hammer(main),
        mainEl = $(main);

      mc.on('press', handleTap);
      mc.on('tap', handleTap);
    });
    pingMarkers.on('click', hidePingMarkers);
    mapMains.on('panzoomzoom', resizePingMarkers);
    resizePingMarkers();
  };

  return  {
    setup: setup
  };
})(window.jQuery, window, document, R6MapsLangTerms);
