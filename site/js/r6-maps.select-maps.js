'use strict';

var selectMapHeading,
  selectMapGrid,
  langTerms;

var R6MapsSelectMaps = (function($, window, document, R6MapsLangTerms, undefined) {
  var setup = function setup(mapData, selectMapHeadingEl, selectMapGridEl, switchToMapCallback) {
    langTerms = R6MapsLangTerms.terms.selectMaps;

    selectMapHeadingEl.text(langTerms.selectAMap);
    selectMapGridEl.html(getMapGridHtml(mapData));
    selectMapGridEl.on('click', 'a', function(event) {
      event.preventDefault();
      switchToMapCallback($(event.target).data('key'));
    });
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
      html += '<li class="map-' + map.key + '"><a href="" data-key="' + map.key + '">' + map.name + '</a></li>';
    });

    html += '</ul>';
    return html;
  };

  return  {
    setup: setup
  };
})(window.jQuery, window, document, R6MapsLangTerms);
