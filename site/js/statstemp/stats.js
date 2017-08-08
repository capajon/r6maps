'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MapsCommonLangTerms, R6MapsStatsData, R6MapsStatsControls);
}(function($, window, document, R6MapsCommonLangTerms, R6MapsStatsData, R6MapsStatsControls, undefined) {
  var $mainHeader,
    $filtersHeader,
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
    $skillRanksLabel,
    $skillRanksSelect,
    statsData,
    statTerms,
    QUERY_PARAMS = {
      SEASON: 'season',
      PLATFORM: 'platform',
      MAP: 'map',
      MODE: 'mode',
      LOCATION: 'location',
      RANK: 'rank'
    }

  $(function() { // equivanelt to $(document).ready() - but a bit faster
    R6MapsCommonHelpers.tryLoadStartingLanguage(R6MapsCommonLangTerms.tryLoadLanguage);
    statsData = R6MapsStatsData.getData();
    statTerms = R6MapsCommonLangTerms.terms.stats;
    setPageElements();
    setupStaticElements();
    setupControls();
  });

  var disableLoadControl = function disableLoadControl() {
    $('body').addClass('disable-load');
  };

  var enableLoadControl = function enableLoadControl() {
    $('body').removeClass('disable-load');
  };

  var handleGameModeChange = function handleGameModeChange() {
    R6MapsStatsControls.objectiveLocations.update(
      $objectiveLocationsSelect,
      statsData.mapsGameModeObjectiveLocations,
      R6MapsStatsControls.seasons.get($seasonsSelect),
      R6MapsStatsControls.maps.get($mapsSelect),
      R6MapsStatsControls.gameModes.get($gameModesSelect)
    );
    enableLoadControl();
  };

  var handleLoadButtonClick = function handleLoadButtonClick() {
    /*var season = {
        current: R6MapsStatsControls.seasons.get($seasonsSelect),
        param: QUERY_PARAMS.SEASON
      currentPlatform = R6MapsStatsControls.platforms.get($platformsSelect),
      currentMap = R6MapsStatsControls.maps.get($mapsSelect),
      currentGameMode = R6MapsStatsControls.gameModes.get($gameModesSelect),
      currentObjectiveLocation = R6MapsStatsControls.objectiveLocations($objectiveLocationsSelect),
      currentSkillRank = R6MapsStatsControls.skillRanks.get($skillRanksSelect),
      queryParams = {};

    if()
    disableLoadControl();*/
    disableLoadControl();
  };

  var handleMapChange = function handleMapChange() {
    var selectedSeason = R6MapsStatsControls.seasons.get($seasonsSelect),
      selectedMap = R6MapsStatsControls.maps.get($mapsSelect);

    R6MapsStatsControls.gameModes.update(
      $gameModesSelect,
      statsData.gameModes,
      statsData.mapsGameModeObjectiveLocations,
      selectedSeason,
      selectedMap
    );
    R6MapsStatsControls.objectiveLocations.update(
      $objectiveLocationsSelect,
      statsData.mapsGameModeObjectiveLocations,
      selectedSeason,
      selectedMap,
      R6MapsStatsControls.gameModes.get($gameModesSelect)
    );
    enableLoadControl();
  };

  var handleSeasonChange = function handleSeasonChange() {
    var selectedSeason = R6MapsStatsControls.seasons.get($seasonsSelect);

    R6MapsStatsControls.platforms.update(
      $platformsSelect,
      statsData.platforms,
      selectedSeason
    );
    R6MapsStatsControls.maps.update(
      $mapsSelect,
      statsData.mapsGameModeObjectiveLocations,
      selectedSeason
    );
    handleMapChange();
    R6MapsStatsControls.skillRanks.update(
      $skillRanksSelect,
      statsData.skillRanks,
      selectedSeason
    );
    enableLoadControl();
  };

  var handleSkillRankChange = function handleSkillRankChange() {
    console.log('TODO: implement handleSkillRankChange');
  };

  var setPageElements = function setPageElements() {
    $mainHeader = $('#header-main');
    $filtersHeader = $('nav h2');
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
    $skillRanksLabel = $('#skill-rank-control label');
    $skillRanksSelect = $('#skill-rank-control select');
  };

  var setupControls = function setupControls() {
    R6MapsStatsControls.seasons.setup(
      $seasonsSelect,
      $seasonsLabel,
      statsData.seasons,
      handleSeasonChange
    );
    R6MapsStatsControls.seasons.trySelect($seasonsSelect, R6MapsCommonHelpers.queryString(QUERY_PARAMS.SEASON));

    R6MapsStatsControls.platforms.setup(
      $platformsSelect,
      $platformsLabel,
      statsData.platforms,
      R6MapsStatsControls.seasons.get($seasonsSelect),
      enableLoadControl
    );
    R6MapsStatsControls.platforms.trySelect($platformsSelect, R6MapsCommonHelpers.queryString(QUERY_PARAMS.PLATFORM));

    R6MapsStatsControls.maps.setup(
      $mapsSelect,
      $mapsLabel,
      statsData.mapsGameModeObjectiveLocations,
      R6MapsStatsControls.seasons.get($seasonsSelect),
      handleMapChange
    );
    R6MapsStatsControls.maps.trySelect($mapsSelect, R6MapsCommonHelpers.queryString(QUERY_PARAMS.MAP));

    R6MapsStatsControls.gameModes.setup(
      $gameModesSelect,
      $gameModesLabel,
      statsData.gameModes,
      statsData.mapsGameModeObjectiveLocations,
      handleGameModeChange,
      R6MapsStatsControls.seasons.get($seasonsSelect),
      R6MapsStatsControls.maps.get($mapsSelect)
    );
    R6MapsStatsControls.gameModes.trySelect($gameModesSelect, R6MapsCommonHelpers.queryString(QUERY_PARAMS.MODE));

    R6MapsStatsControls.objectiveLocations.setup(
      $objectiveLocationsSelect,
      $objectiveLocationsLabel,
      statsData.mapsGameModeObjectiveLocations,
      R6MapsStatsControls.seasons.get($seasonsSelect),
      R6MapsStatsControls.maps.get($mapsSelect),
      R6MapsStatsControls.gameModes.get($gameModesSelect),
      enableLoadControl
    );
    R6MapsStatsControls.objectiveLocations.trySelect($objectiveLocationsSelect, R6MapsCommonHelpers.queryString(QUERY_PARAMS.LOCATION));

    R6MapsStatsControls.skillRanks.setup(
      $skillRanksSelect,
      $skillRanksLabel,
      statsData.skillRanks,
      R6MapsStatsControls.seasons.get($seasonsSelect),
      handleSkillRankChange
    );
    R6MapsStatsControls.skillRanks.trySelect($skillRanksSelect, R6MapsCommonHelpers.queryString(QUERY_PARAMS.RANK));

    $loadButton.html(statTerms.loadButtonText);
    $loadButton.on('click', handleLoadButtonClick);
  };

  var setupStaticElements = function setupStaticElements() {
    $mainHeader.html(
      statTerms.headerMain.replace('{link}', '<a href="index.html">' + statTerms.headerLinkText + '</a>')
    );
    $filtersHeader.html(statTerms.headerFilters);
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
