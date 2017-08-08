'use strict';

var R6MapsStatsControls = (function(R6MapsCommonLangTerms, undefined){
  var ALL_KEY = 'ALL';

  var gameModesGet = function gameModesGet($gameModeSelect) {
    return $gameModeSelect.find(':selected').val();
  };

  var gameModesPopulateOptions = function gameModesPopulateOptions(
    $gameModesSelect,
    gameModesData,
    mapsGameModeObjectiveLocationsData,
    selectedSeason,
    selectedMap
  ) {
    $gameModesSelect.append($('<option></option>')
       .attr('value', ALL_KEY).text(R6MapsCommonLangTerms.terms.stats.allOption));

    for (var gameMode in gameModesData) {
      if (
        (gameModesData[gameMode].seasonSpan[0] <= selectedSeason) &&
        (gameModesData[gameMode].seasonSpan[1] >= selectedSeason) &&
        ((selectedMap == ALL_KEY) || (mapsGameModeObjectiveLocationsData[selectedMap].objectives[gameMode]))
      ) {
        $gameModesSelect.append($('<option></option>')
           .attr('value', gameMode).text(gameModesData[gameMode].name));
      }
    }
  };

  var gameModesSetup = function gameModesSetup(
    $gameModesSelect,
    $gameModesLabel,
    gameModesData,
    mapsGameModeObjectiveLocationsData,
    gameModeChangeCallback,
    selectedSeason,
    selectedMap
  ) {
    $gameModesLabel.html(R6MapsCommonLangTerms.terms.stats.labelGameMode);
    gameModesPopulateOptions($gameModesSelect, gameModesData, mapsGameModeObjectiveLocationsData, selectedSeason, selectedMap);
    $gameModesSelect.on('change', function(event) {
      gameModeChangeCallback();
    });
  };

  var gameModesUpdate = function gameModesUpdate(
    $gameModesSelect,
    gameModesData,
    mapsGameModeObjectiveLocationsData,
    selectedSeason,
    selectedMap
  ) {
    var startingValue = gameModesGet($gameModesSelect);

    $gameModesSelect.find('option').remove();
    gameModesPopulateOptions($gameModesSelect, gameModesData, mapsGameModeObjectiveLocationsData, selectedSeason, selectedMap);
    trySelect($gameModesSelect, startingValue);
  };

  var mapsGet = function mapsGet($mapsSelect) {
    return $mapsSelect.find(':selected').val();
  };

  var mapsPopulateOptions = function mapsPopulateOptions($mapsSelect, mapsGameModeObjectiveLocationsData, selectedSeason) {
    var mapOptions = [];

    for (var map in mapsGameModeObjectiveLocationsData) {
      if (
        (mapsGameModeObjectiveLocationsData[map].seasonSpan[0] <= selectedSeason) &&
        (mapsGameModeObjectiveLocationsData[map].seasonSpan[1] >= selectedSeason)
      ) {
        mapOptions.push({ value: map, text: mapsGameModeObjectiveLocationsData[map].name });
      }
    }

    $mapsSelect.append($('<option></option>')
       .attr('value', ALL_KEY).text(R6MapsCommonLangTerms.terms.stats.allOption));

    mapOptions.sort(function(x,y) {
      if (x.text > y.text) {
        return 1;
      }
    });

    mapOptions.forEach(function(map) {
      $mapsSelect.append($('<option></option>')
         .attr('value', map.value).text(map.text));
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

  var mapsUpdate = function mapsUpdate(
    $mapsSelect,
    mapsGameModeObjectiveLocationsData,
    selectedSeason
  ) {
    var startingValue = mapsGet($mapsSelect);

    $mapsSelect.find('option').remove();
    mapsPopulateOptions(
      $mapsSelect,
      mapsGameModeObjectiveLocationsData,
      selectedSeason
    );
    trySelect($mapsSelect, startingValue);
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
    $objectiveLocationsSelect.append($('<option></option>')
       .attr('value', ALL_KEY).text(R6MapsCommonLangTerms.terms.stats.allOption));

    if (selectedMap != 'ALL' && selectedGameMode != 'ALL') {
      for (var objectiveLocation in mapsGameModeObjectiveLocationsData[selectedMap].objectives[selectedGameMode]) {
        var info = mapsGameModeObjectiveLocationsData[selectedMap].objectives[selectedGameMode][objectiveLocation];

        if (
          (info.seasonSpan[0] <= selectedSeason) &&
          (info.seasonSpan[1] >= selectedSeason)
        ) {
          $objectiveLocationsSelect.append($('<option></option>')
             .attr('value', objectiveLocation).text(info.name));
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
    $objectiveLocationsSelect.on('change', function(event) {
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

  var platformsPopulateOptions = function platformsPopulateOptions($platformsSelect, platformsData, selectedSeason) {
    for (var platform in platformsData) {
      if (
        (platformsData[platform].seasonSpan[0] <= selectedSeason) &&
        (platformsData[platform].seasonSpan[1] >= selectedSeason)
      ) {
        $platformsSelect.append($('<option></option>')
           .attr('value', platform).text(platformsData[platform].name));
      }
    }
  };

  var platformsSetup = function platformsSetup($platformsSelect, $platformsLabel, platformsData, selectedSeason, platformChangeCallback) {
    $platformsLabel.html(R6MapsCommonLangTerms.terms.stats.labelPlatform);
    platformsPopulateOptions($platformsSelect, platformsData, selectedSeason);
    $platformsSelect.on('change', function(event) {
      platformChangeCallback();
    });
  };

  var platformsUpdate = function platformsUpdate($platformsSelect, platformsData, selectedSeason) {
    var startingValue = platformsGet($platformsSelect);

    $platformsSelect.find('option').remove();
    platformsPopulateOptions(
      $platformsSelect,
      platformsData,
      selectedSeason
    );
    trySelect($platformsSelect, startingValue);
  };

  var seasonsGet = function seasonsGet($seasonsSelect) {
    return $seasonsSelect.find(':selected').val();
  };

  var seasonsPopulateOptions = function seasonsPopulateOptions($seasonsSelect, seasonsData) {
    seasonsData.forEach(function(season) {
      $seasonsSelect.append($('<option></option>')
         .attr('value', season).text(R6MapsCommonLangTerms.terms.seasons[season]));
    });
  };

  var seasonsSetup = function seasonsSetup($seasonsSelect, $seasonsLabel, seasonsData, seasonChangeCallback) {
    $seasonsLabel.html(R6MapsCommonLangTerms.terms.stats.labelSeason);
    seasonsPopulateOptions($seasonsSelect, seasonsData);
    $seasonsSelect.on('change', function(event) {
      seasonChangeCallback();
    });
  };

  var skillRanksGet = function skillRanksGet($skillRanksSelect) {
    return $skillRanksSelect.find(':selected').val();
  };

  var skillRanksPopulateOptions = function skillRanksPopulateOptions($skillRanksSelect, skillRanksData, selectedSeason) {
    $skillRanksSelect.append($('<option></option>')
       .attr('value', ALL_KEY).text(R6MapsCommonLangTerms.terms.stats.allOption));

    for (var skillRanks in skillRanksData) {
      if (
        (skillRanksData[skillRanks].seasonSpan[0] <= selectedSeason) &&
        (skillRanksData[skillRanks].seasonSpan[1] >= selectedSeason)
      ) {
        $skillRanksSelect.append($('<option></option>')
           .attr('value', skillRanks).text(skillRanksData[skillRanks].name));
      }
    }
  };

  var skillRanksSetup = function skillRanksSetup(
    $skillRanksSelect, $skillRanksLabel, skillRanksData, selectedSeason, skillRankChangeCallback
  ) {
    $skillRanksLabel.html(R6MapsCommonLangTerms.terms.stats.labelSkillRanks);
    skillRanksPopulateOptions($skillRanksSelect, skillRanksData, selectedSeason);
    $skillRanksSelect.on('change', function(event) {
      skillRankChangeCallback();
    });
  };

  var skillRanksUpdate = function skillRanksUpdate($skillRanksSelect, skillRanksData, selectedSeason) {
    var startingValue = skillRanksGet($skillRanksSelect);

    $skillRanksSelect.find('option').remove();
    skillRanksPopulateOptions(
      $skillRanksSelect,
      skillRanksData,
      selectedSeason
    );
    trySelect($skillRanksSelect, startingValue);
  };

  var trySelect = function trySelect($selectEl, option) {
    return R6MapsCommonHelpers.trySelectOption($selectEl, option);
  };

  return  {
    gameModes: {
      get: gameModesGet,
      setup: gameModesSetup,
      trySelect: trySelect,
      update: gameModesUpdate
    },
    maps: {
      get: mapsGet,
      setup: mapsSetup,
      trySelect: trySelect,
      update: mapsUpdate
    },
    objectiveLocations: {
      get: objectiveLocationsGet,
      setup: objectiveLocationsSetup,
      trySelect: trySelect,
      update: objectiveLocationsUpdate
    },
    platforms: {
      get: platformsGet,
      setup: platformsSetup,
      trySelect: trySelect,
      update: platformsUpdate
    },
    seasons: {
      get: seasonsGet,
      setup: seasonsSetup,
      trySelect: trySelect
    },
    skillRanks: {
      get: skillRanksGet,
      setup: skillRanksSetup,
      trySelect: trySelect,
      update: skillRanksUpdate
    }
  };
})(R6MapsCommonLangTerms);
