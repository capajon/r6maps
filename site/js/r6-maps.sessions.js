'use strict';

var R6MapsSessions = (function($, window, document, R6MapsLangTerms, undefined) {
  var setup = function setup (
    mapMains,
    sessionMarkerElements
  ) {
    populateStartingMarkers(sessionMarkerElements);

    mapMains.each(function(index, main) {
      var mc = new Hammer(main);

      mc.on('press', getHandleTapFn(sessionMarkerElements));
      mc.on('tap', getHandleTapFn(sessionMarkerElements));
    });
  };

  var getCurrentPosition = function getCurrentPosition(pingMarker) {
    return {
      y: parseInt(pingMarker.attr('cy')),
      x: parseInt(pingMarker.attr('cx'))
    };
  };

  var getHandleTapFn = function getHandleTapFn(sessionMarkerElements) {
    return function(event) {
      if (sessionMarkerElements.css('visibility') === 'visible') {
        var mapWrapper =  $(event.target).closest('.map-wrapper'),
          pingPosition = getPingPosition(event.center.x, event.center.y, mapWrapper),
          pingMarker = sessionMarkerElements.find('.ping-marker.tapped'),
          pingMarkerVertical = sessionMarkerElements.find('.ping-marker.vertical'),
          pingMarkerHorizontal = sessionMarkerElements.find('.ping-marker.horizontal'),
          currentPosition = getCurrentPosition(pingMarker),
          newX = pingPosition.x,
          newY = pingPosition.y;

        if (isOnCurrentPing(pingPosition, currentPosition)) {
          newX = -10000;
          newY = -10000;
        }
        movePingMarker(
          pingMarker,
          pingMarkerVertical,
          pingMarkerHorizontal,
          newX,
          newY
        );
      }
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

  var isOnCurrentPing = function isOnCurrentPing(pingPosition, currentPosition) {
    return (
      Math.abs(pingPosition.x - currentPosition.x) < 6 &&
      Math.abs(pingPosition.y - currentPosition.y) < 6
    );
  };

  var movePingMarker = function movePingMarker(
    pingMarker,
    pingMarkerVertical,
    pingMarkerHorizontal,
    x,
    y
  ) {
    pingMarker.attr('cx', x);
    pingMarker.attr('cy', y);
    pingMarkerVertical.attr('x1', x);
    pingMarkerVertical.attr('x2', x);
    pingMarkerHorizontal.attr('y1', y);
    pingMarkerHorizontal.attr('y2', y);
    pingMarkerVertical.addClass('highlight');
    pingMarkerHorizontal.addClass('highlight');
    setTimeout(function() {
      pingMarkerVertical.removeClass('highlight');
      pingMarkerHorizontal.removeClass('highlight');
    }, 1);
  };

  var populateStartingMarkers = function populateStartingMarkers(sessionMarkerElements) {
    var html = '';

    html += '<line class="ping-marker vertical" x1="-9000" y1="-715" x2="-9000" y2="725" stroke-width="2"/>';
    html += '<line class="ping-marker horizontal" x1="-1275" y1="-9000" x2="1285" y2="-9000" stroke-width="2"/>';
    html += '<circle class="ping-marker tapped" cx="-9000" cy="-9000" r="6" stroke-width="2"/>';
    sessionMarkerElements.html(html);
    //future note: if using append: sessionMarkerElements.html(sessionMarkerElements.html());
  };

  var reset = function reset(sessionMarkerElements) {
    populateStartingMarkers(sessionMarkerElements);
  };

  return  {
    reset: reset,
    setup: setup
  };
})(window.jQuery, window, document, R6MapsLangTerms);
