'use strict';

var R6MapsStatsControls = (function(R6MapsCommonLangTerms, undefined){

  var ALL_KEY = 'ALL';

  var gameModesGet = function gameModesGet($gameModeSelect) {
    return $gameModeSelect.find(':selected').val();
  };

  var gameModesPopulateOptions = function gameModesPopulateOptions($gameModesSelect, gameModesData) {
    $gameModesSelect.append($("<option></option>")
       .attr("value", ALL_KEY).text(R6MapsCommonLangTerms.terms.stats.allOption));

    for (var gameMode in gameModesData) {
      $gameModesSelect.append($("<option></option>")
         .attr("value", gameMode).text(gameModesData[gameMode]));
    }
  };

  var gameModesSetup = function gameModesSetup($gameModesSelect, $gameModesLabel, gameModesData, gameModeChangeCallback) {
    $gameModesLabel.html(R6MapsCommonLangTerms.terms.stats.labelGameMode);
    gameModesPopulateOptions($gameModesSelect, gameModesData);
    $gameModesSelect.on('change', function(event) {
      gameModeChangeCallback();
    });
  };

  var mapsGet = function mapsGet($mapsSelect) {
    return $mapsSelect.find(':selected').val();
  };

  var mapsPopulateOptions = function mapsPopulateOptions($mapsSelect, mapsGameModeObjectiveLocationsData, selectedSeason) {
    var mapOptions = [];

    for (var map in mapsGameModeObjectiveLocationsData) {
      if(
        (mapsGameModeObjectiveLocationsData[map].seasonSpan[0] <= selectedSeason) &&
        (mapsGameModeObjectiveLocationsData[map].seasonSpan[1] >= selectedSeason)
      ) {
        mapOptions.push({ value: map, text: mapsGameModeObjectiveLocationsData[map].name });
      }
    }

    $mapsSelect.append($("<option></option>")
       .attr("value", ALL_KEY).text(R6MapsCommonLangTerms.terms.stats.allOption));

    mapOptions.sort(function(x,y) {
      if(x.text > y.text) return 1;
    });

    mapOptions.forEach(function(map) {
      $mapsSelect.append($("<option></option>")
         .attr("value", map.value).text(map.text));
    });
  };

  var mapsSetup = function mapsSetup(
    $mapsSelect,
    $mapsLabel,
    mapsGameModeObjectiveLocationsData,
    selectedSeason,
    mapChangeCallback
  ) {
    $mapsLabel.html(R6MapsCommonLangTerms.terms.stats.labelMap);
    mapsPopulateOptions($mapsSelect, mapsGameModeObjectiveLocationsData, selectedSeason);
    $mapsSelect.on('change', function(event) {
      mapChangeCallback();
    });
  };

  var objectiveLocationsGet = function objectiveLocationsGet($objectiveLocationsSelect) {
    return $objectiveLocationsSelect.find(':selected').val();
  };

  var objectiveLocationsPopulateOptions = function objectiveLocationsPopulateOptions(
      $objectiveLocationsSelect,
      mapsGameModeObjectiveLocationsData,
      selectedSeason,
      selectedMap,
      selectedGameMode
    ) {
    $objectiveLocationsSelect.append($("<option></option>")
       .attr("value", ALL_KEY).text(R6MapsCommonLangTerms.terms.stats.allOption));

    if(selectedMap != 'ALL' && selectedGameMode !='ALL') {
      for (var objectiveLocation in mapsGameModeObjectiveLocationsData[selectedMap].objectives[selectedGameMode]) {
        var info = mapsGameModeObjectiveLocationsData[selectedMap].objectives[selectedGameMode][objectiveLocation];
        if(
          (info.seasonSpan[0] <= selectedSeason) &&
          (info.seasonSpan[1] >= selectedSeason)
        ) {
          $objectiveLocationsSelect.append($("<option></option>")
             .attr("value", objectiveLocation).text(info.name));
        }
      }
    }
  };

  var objectiveLocationsSetup = function objectiveLocationsSetup(
    $objectiveLocationsSelect,
    $objectiveLocationsLabel,
    mapsGameModeObjectiveLocationsData,
    selectedSeason,
    selectedMap,
    selectedGameMode,
    objectiveLocationChangeCallback
  ) {
    $objectiveLocationsLabel.html(R6MapsCommonLangTerms.terms.stats.labelObjectiveLocation);
    objectiveLocationsPopulateOptions(
      $objectiveLocationsSelect,
      mapsGameModeObjectiveLocationsData,
      selectedSeason,
      selectedMap,
      selectedGameMode
    );
    $objectiveLocationsLabel.on('change', function(event) {
      objectiveLocationChangeCallback();
    });
  };

  var objectiveLocationsUpdate = function objectiveLocationsUpdate(
    $objectiveLocationsSelect,
    mapsGameModeObjectiveLocationsData,
    selectedSeason,
    selectedMap,
    selectedGameMode
  ) {
    var startingValue = objectiveLocationsGet($objectiveLocationsSelect);

    $objectiveLocationsSelect.find('option').remove();
    objectiveLocationsPopulateOptions(
      $objectiveLocationsSelect,
      mapsGameModeObjectiveLocationsData,
      selectedSeason,
      selectedMap,
      selectedGameMode
    );
    trySelect($objectiveLocationsSelect, startingValue);
  };

  var platformsGet = function mapsGet($platformsSelect) {
    return $platformsSelect.find(':selected').val();
  };

  var platformsPopulateOptions = function platformsPopulateOptions($platformsSelect, platformsData) {
    for (var platform in platformsData) {
      $platformsSelect.append($("<option></option>")
         .attr("value", platform).text(platformsData[platform]));
    }
  };

  var platformsSetup = function platformsSetup($platformsSelect, $platformsLabel, platformsData) {
    $platformsLabel.html(R6MapsCommonLangTerms.terms.stats.labelPlatform);
    platformsPopulateOptions($platformsSelect, platformsData);
  };

  var seasonsGet = function seasonsGet($seasonsSelect) {
    return $seasonsSelect.find(':selected').val();
  };

  var seasonsPopulateOptions = function seasonsPopulateOptions($seasonsSelect, seasonsData) {
    seasonsData.forEach(function(season) {
      $seasonsSelect.append($("<option></option>")
         .attr("value", season).text(R6MapsCommonLangTerms.terms.seasons[season]));
    });
  };

  var seasonsSetup = function seasonsSetup($seasonsSelect, $seasonsLabel, seasonsData) {
    $seasonsLabel.html(R6MapsCommonLangTerms.terms.stats.labelSeason);
    seasonsPopulateOptions($seasonsSelect, seasonsData);
  };

  var trySelect = function trySelect($selectEl, option) {
    return R6MapsCommonHelpers.trySelectOption($selectEl, option);
  };

  return  {
    gameModes: {
      get: gameModesGet,
      setup: gameModesSetup
    },
    maps: {
      get: mapsGet,
      setup: mapsSetup
    },
    objectiveLocations: {
      get: objectiveLocationsGet,
      setup: objectiveLocationsSetup,
      update: objectiveLocationsUpdate
    },
    platforms: {
      get: platformsGet,
      setup: platformsSetup
    },
    seasons: {
      get: seasonsGet,
      setup: seasonsSetup
    },
    trySelect: trySelect
  };
})(R6MapsCommonLangTerms);
