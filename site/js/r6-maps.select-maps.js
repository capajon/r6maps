'use strict';

var selectMapHeading,
  selectMapGrid,
  langTerms;

var R6MapsSelectMaps = (function($, window, document, R6MapsLangTerms, undefined) {
  var setup = function setup(
    mapData,
    selectMapHeadingEl,
    selectMapGridEl,
    switchToMapCallback,
    closeSelectCallback
  ) {
    langTerms = R6MapsLangTerms.terms.selectMaps;

    selectMapHeadingEl.text(langTerms.selectAMap);
    selectMapGridEl.html(getMapGridHtml(mapData));
    selectMapGridEl.on('click', 'a', function(event) {
      event.preventDefault();
      switchToMapCallback($(event.target).closest('li').data('key'));
    });
    selectMapGridEl.on('click', closeSelectCallback)
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
      html += '<a href="" class="' + map.key + '">'
      html += '<div class="wrapper-absolute">';
      html += '<div class="wrapper-overflow">';
      html += '<div class="thumb"></div>';
      html += '</div>';
      html += '</div>';
      html += '<span class="name">' + map.name + '</span>';
      html += '</a>';
      html += '</li>';
    });

    html += '</ul>';
    return html;
  };

  return  {
    setup: setup
  };
})(window.jQuery, window, document, R6MapsLangTerms);
