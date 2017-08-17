'use strict';

var MIN_COLUMN_NUM = 2,
  MAX_COLUMN_NUM = 10,
  NATIVE_THUMB_IMG_WIDTH = 495,
  NATIVE_THUMB_IMG_HEIGHT = 278,
  NATIVE_THUMB_IMG_RATIO = NATIVE_THUMB_IMG_WIDTH / NATIVE_THUMB_IMG_HEIGHT,
  VIEWPORT_PADDING_HEIGHT = 10,
  VIEWPORT_PADDING_WIDTH = 15,
  MAP_LINK_TOTAL_BORDER_SIZE = 2,
  MIN_MAP_LINK_WIDTH = 100,
  THUMB_SCALE_ZOOMED_IN_FACTOR = 1.25;

var R6MapsMainSelectMaps = (function($, window, document, R6MLangTerms, undefined) {
  var getBackgroundImgScale = function getBackgroundImgScale(thumbDimensions) {
    return Math.max(
      thumbDimensions.height / (NATIVE_THUMB_IMG_HEIGHT - 1),
      thumbDimensions.width / (NATIVE_THUMB_IMG_WIDTH - 1) // -1 helps ensure rounding doesn't lose a pixel
    );
  };

  var getColumnCounts = function getColumnCounts(numThumbs){
    var result = [],
      numThumbsLastRow;

    for (var columnCount = MIN_COLUMN_NUM; columnCount <= MAX_COLUMN_NUM; columnCount++) {
      numThumbsLastRow = (numThumbs % columnCount);
      if (
          ((numThumbsLastRow * 2) >= columnCount) ||
          ((columnCount - numThumbsLastRow) < 3 )
        ) {
        result.push(columnCount);
      }
    }
    return result;
  };

  var getMapGridHtml = function getMapGridHtml(mapData) {
    var maps = [],
      html = '<ul>';

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
      html += '<li data-key="' + map.key + '">';
      html += '<a href="" class="' + map.key + '">';
      html += '<div class="wrapper absolute thumb"><div class="image thumb"></div></div>';
      html += '<div class="wrapper absolute spinner loading"><div>';
      html += '</div></div>';
      html += '<p>' + map.name + '</p>';
      html += '</a>';
      html += '</li>';
    });

    html += '</ul>';
    return html;
  };

  var getMapLinkMarginVertical = function getMapLinkMarginVertical(availableWidth) {
    return Math.max(Math.min(Math.floor(availableWidth / 100), 10), 20);
  };

  var getOptimalDimensions = function getOptimalDimensions(
    columnCountsToConsider,
    mapLinkCount,
    availableWidth,
    availableHeight
  ) {
    var results = {};

    columnCountsToConsider.forEach(function(columnCount) {
      var rowCount = Math.ceil(mapLinkCount / columnCount),
        mapLinkWidth = Math.floor(availableWidth / columnCount),
        mapLinkHeight = Math.floor(availableHeight / rowCount),
        mapLinkRatio = mapLinkWidth / mapLinkHeight;

      if (
        (
          !results.ratio
          || (Math.abs(NATIVE_THUMB_IMG_RATIO - results.ratio) > Math.abs(NATIVE_THUMB_IMG_RATIO - mapLinkRatio))
        ) &&
        mapLinkWidth >= MIN_MAP_LINK_WIDTH
      ) {
        var mapLinkMarginVertical = getMapLinkMarginVertical(availableWidth), // determined experimentally
          mapLinkMarginHorizontal = Math.round(mapLinkMarginVertical / 2);

        $.extend(results, {
          _debugColumnCount: columnCount,
          _debugRowCount: rowCount,
          _debugAvailableWidth: availableWidth,
          _debugAvailableHeight: availableHeight,
          ratio: mapLinkRatio,
          width: mapLinkWidth - MAP_LINK_TOTAL_BORDER_SIZE - (mapLinkMarginHorizontal * 2),
          height: mapLinkHeight - MAP_LINK_TOTAL_BORDER_SIZE - (mapLinkMarginVertical),
          marginVertical: mapLinkMarginVertical,
          marginHorizontal: mapLinkMarginHorizontal
        });
      }
    });
    return results;
  };

  var getViewportDimensions = function getViewportDimensions() {
    return {
      height: $(window).height(),
      width: $(window).width()
    };
  };

  var checkIe11orLess = function checkIe11orLess() {
    return (navigator && (
      (navigator.appName == 'Microsoft Internet Explorer') || // IE <= 10
      ((navigator.appName == 'Netscape') && (navigator.appVersion.indexOf('Trident') > 0))  // IE = 11 and not Edge
    ));
  };

  var resizeMapLinks = function resizeMapLinks(
    $selectMapGrid,
    $mapLinks,
    $mainNav,
    $mapLinksContainer
  ) {
    var viewportDimensions = getViewportDimensions(),
      navHeight = $mainNav.height(),
      mapLinkCount = $mapLinks.length,
      columnCounts = getColumnCounts(mapLinkCount),
      availableHeight = viewportDimensions.height - navHeight - VIEWPORT_PADDING_HEIGHT,
      availableWidth = viewportDimensions.width - VIEWPORT_PADDING_WIDTH,
      mapLinkDimensions = getOptimalDimensions(
        columnCounts,
        mapLinkCount,
        availableWidth,
        availableHeight
      ),
      thumbImgScale = getBackgroundImgScale(mapLinkDimensions),
      $spinners = $mapLinks.find('.spinner'),
      isIe11OrLess;

    $selectMapGrid.css('padding-top', (navHeight + VIEWPORT_PADDING_HEIGHT) + 'px');
    $mapLinks.height(mapLinkDimensions.height);
    $mapLinks.width(mapLinkDimensions.width);
    $mapLinks.css(
      'margin',
      '0 ' + mapLinkDimensions.marginHorizontal + 'px ' + mapLinkDimensions.marginVertical + 'px ' + mapLinkDimensions.marginHorizontal + 'px'
    );
    $spinners.css('background-size', (Math.min(mapLinkDimensions.height, mapLinkDimensions.width) - 20) + 'px');

    isIe11OrLess = checkIe11orLess();
    // IE11 had an issue with transform scale that caused thumbnails to not center and look awkward
    // This is a workaround that seems fine given the scale/zoom effect is just nice-to-have and it doesn't look awkward now
    if (!isIe11OrLess) {
      setTransformScale(
        $mapLinks.find('div.image.thumb'),
        thumbImgScale
      );
    }
    $mapLinks.hover(function(event) {
      if (!isIe11OrLess) {
        setTransformScale(
          $(event.target).closest('li').find('div.image.thumb'),
          thumbImgScale * THUMB_SCALE_ZOOMED_IN_FACTOR
        );
      }
    }, function(event) {
      if (!isIe11OrLess) {
        setTransformScale(
          $(event.target).closest('li').find('div.image.thumb'),
          thumbImgScale
        );
      }
    });
  };

  var setTransformScale = function setTransformScale(element, scale) {
    element.css('-ms-transform', 'scale(' + scale + ')');
    element.css('-webkit-transform', 'scale(' + scale + ')');
    element.css('transform', 'scale(' + scale + ')');
  };

  var setup = function setup(
    $selectMapGrid,
    $heading,
    $mainNav,
    mapData,
    switchToMapCallback,
    closeSelectCallback
  ) {
    $heading.text(R6MLangTerms.terms.selectMaps.selectAMap);
    $selectMapGrid.html(getMapGridHtml(mapData));
    $selectMapGrid.on('click', 'a', function(event) {
      event.preventDefault();
      switchToMapCallback($(event.target).closest('li').data('key'));
    });
    $selectMapGrid.on('click', closeSelectCallback);

    var handleResize = function handleResize() {
      resizeMapLinks(
        $selectMapGrid,
        $selectMapGrid.find('a'),
        $mainNav,
        $selectMapGrid.find('ul')
      );
    };

    handleResize();
    $(window).on('resize', handleResize);
    setTimeout(function() {
      $selectMapGrid.addClass('enable-thumb-transition');
    }, 1);

    $('<img/>').attr('src', 'img/map-thumbs.jpg').load(function() {
      $(this).remove(); // prevent memory leaks
      $selectMapGrid.find('.spinner').removeClass('loading');
    });
  };

  return  {
    setup: setup
  };
})(window.jQuery, window, document, R6MLangTerms);
