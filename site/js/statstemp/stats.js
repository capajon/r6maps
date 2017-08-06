'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MapsCommonLangTerms, R6MapsStatsData, R6MapsStatsControls);
}(function($, window, document, R6MapsCommonLangTerms, R6MapsStatsData, R6MapsStatsControls, undefined) {

  var $mainHeader,
    $mapHeader,
    $mapOutput,
    $mapHeader,
    $mapLoader,
    $operatorsHeader,
    $operatorsOutput,
    $operatorsLoader,
    $seasonsLabel,
    $seasonsSelect,
    $platformsLabel,
    $platformsSelect,
    $mapsLabel,
    $mapsSelect,
    $gameModesLabel,
    $gameModesSelect,
    $objectiveLocationsLabel,
    $objectiveLocationsSelect,
    $loadButton,
    $skillRankLabel,
    $skillRankControl,
    statsData,
    statTerms;

  $(function() { // equivanelt to $(document).ready() - but a bit faster
    R6MapsCommonHelpers.tryLoadStartingLanguage(R6MapsCommonLangTerms.tryLoadLanguage);
    statsData = R6MapsStatsData.getData();
    statTerms = R6MapsCommonLangTerms.terms.stats;
    setPageElements();
    setupStaticElements();
    setupControls();
  });

  var handleLoadButtonClick = function handleLoadButtonClick() {
    disableLoadControl();
  };

  var disableLoadControl = function disableLoadControl() {
    $('body').addClass('disable-load');
  };

  var enableLoadControl = function enableLoadControl() {
    $('body').removeClass('disable-load');
  };

  var handleMapsOrGameModesChange = function handleMapsOrGameModesChange() {
    enableLoadControl();
    R6MapsStatsControls.objectiveLocations.update(
      $objectiveLocationsSelect,
      statsData.mapsGameModeObjectiveLocations,
      R6MapsStatsControls.seasons.get($seasonsSelect),
      R6MapsStatsControls.maps.get($mapsSelect),
      R6MapsStatsControls.gameModes.get($gameModesSelect)
    );
  };

  var queryString = function queryString(key) {
      key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
      var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
      return match && decodeURIComponent(match[1].replace(/\+/g, " "));
  };

  var setPageElements = function setPageElements() {
    $mainHeader = $('#header-main');
    $mapHeader = $('#section-map h2');
    $mapOutput = $('#section-map div.output');
    $mapLoader = $('#section-map div.output');
    $operatorsHeader = $('#section-operators h2');
    $operatorsOutput = $('#section-operators div.output');
    $operatorsLoader = $('#section-operators div.loader');

    $seasonsLabel = $('#seasons-control label'),
    $seasonsSelect = $('#seasons-control select'),
    $platformsLabel = $('#platforms-control label'),
    $platformsSelect = $('#platforms-control select'),
    $mapsLabel = $('#maps-control label'),
    $mapsSelect = $('#maps-control select'),
    $gameModesLabel = $('#game-modes-control label'),
    $gameModesSelect = $('#game-modes-control select'),
    $objectiveLocationsLabel = $('#objective-locations-control label'),
    $objectiveLocationsSelect = $('#objective-locations-control select'),
    $loadButton = $('#load-control'),
    $skillRankLabel = $('#skill-rank-control label');
    $skillRankControl = $('#skill-rank-control select');
  };

  var setupControls = function setupControls() {
    R6MapsStatsControls.seasons.setup($seasonsSelect, $seasonsLabel, statsData.seasons);
    R6MapsStatsControls.trySelect($seasonsSelect, queryString('season'));

    R6MapsStatsControls.platforms.setup($platformsSelect, $platformsLabel, statsData.platforms);
    R6MapsStatsControls.trySelect($platformsSelect, queryString('platform'));

    R6MapsStatsControls.maps.setup(
      $mapsSelect,
      $mapsLabel,
      statsData.mapsGameModeObjectiveLocations,
      R6MapsStatsControls.seasons.get($seasonsSelect),
      handleMapsOrGameModesChange
    );
    R6MapsStatsControls.trySelect($mapsSelect, queryString('map'));

    R6MapsStatsControls.gameModes.setup(
      $gameModesSelect, $gameModesLabel, statsData.gameModes, handleMapsOrGameModesChange
    );
    R6MapsStatsControls.trySelect($gameModesSelect, queryString('mode'));

    R6MapsStatsControls.objectiveLocations.setup(
      $objectiveLocationsSelect,
      $objectiveLocationsLabel,
      statsData.mapsGameModeObjectiveLocations,
      R6MapsStatsControls.seasons.get($seasonsSelect),
      R6MapsStatsControls.maps.get($mapsSelect),
      R6MapsStatsControls.gameModes.get($gameModesSelect),
      enableLoadControl
    );
    R6MapsStatsControls.trySelect($objectiveLocationsSelect, queryString('location'));

    $loadButton.html(statTerms.loadButtonText);
    $loadButton.on('click', handleLoadButtonClick);
  };

  var setupStaticElements = function setupStaticElements() {
    $mainHeader.html(statTerms.headerMain);
    $mapHeader.html(statTerms.headerMap);
    $operatorsHeader.html(statTerms.headerOperators);
  };

}));
    /*var d1 = $.Deferred();
    var d2 = $.Deferred();
    var d3 = $.Deferred();

    $.when(d1).done(function (v1) {
        console.log( "just d1 is done", v1 );
    });

    $.when(d1, d2).done(function (v1, v2) {
        console.log( "d1 and d2 are done", v1, v2  );
    });

    d1.resolve("HI");
    setTimeout(function() {
        d2.resolve("NUMBER2");
    },3000);*/
