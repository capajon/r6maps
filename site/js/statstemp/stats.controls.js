'use strict';

var R6MStatsControls = (function(R6MapsCommonLangTerms, undefined){
  var ALL_KEY = 'ALL';

  var modesGet = function modesGet($modeSelect) {
    return $modeSelect.find(':selected').val();
  };

  var modesPopulateOptions = function modesPopulateOptions(
    $modesSelect,
    modesData,
    mapModeLocationsData,
    selectedSeason,
    selectedMap
  ) {
    var optionsCount = 1;

    $modesSelect.append($('<option></option>')
       .attr('value', ALL_KEY).text(R6MapsCommonLangTerms.terms.stats.allOption));

    for (var mode in modesData) {
      if (
        (modesData[mode].seasonSpan[0] <= selectedSeason) &&
        (modesData[mode].seasonSpan[1] >= selectedSeason) &&
        ((selectedMap == ALL_KEY) || (mapModeLocationsData[selectedMap].objectives[mode]))
      ) {
        $modesSelect.append($('<option></option>')
           .attr('value', mode).text(modesData[mode].name));
        optionsCount++;
      }
    }
    $modesSelect.attr('size', optionsCount);
  };

  var modesSetup = function modesSetup(
    $modesSelect,
    $modesLabel,
    modesData,
    mapModeLocationsData,
    modeChangeCallback,
    selectedSeason,
    selectedMap
  ) {
    $modesLabel.html(R6MapsCommonLangTerms.terms.stats.labelGameMode);
    modesUpdate($modesSelect, modesData, mapModeLocationsData, selectedSeason, selectedMap);
    $modesSelect.on('change', function(event) {
      modeChangeCallback();
    });
  };

  var modesUpdate = function modesUpdate(
    $modesSelect,
    modesData,
    mapModeLocationsData,
    selectedSeason,
    selectedMap
  ) {
    var startingValue = modesGet($modesSelect);

    $modesSelect.find('option').remove();
    modesPopulateOptions($modesSelect, modesData, mapModeLocationsData, selectedSeason, selectedMap);
    trySelect($modesSelect, startingValue);
  };

  var mapsGet = function mapsGet($mapsSelect) {
    return $mapsSelect.find(':selected').val();
  };

  var mapsPopulateOptions = function mapsPopulateOptions($mapsSelect, mapModeLocationsData, selectedSeason) {
    var mapOptions = [];

    for (var map in mapModeLocationsData) {
      if (
        (mapModeLocationsData[map].seasonSpan[0] <= selectedSeason) &&
        (mapModeLocationsData[map].seasonSpan[1] >= selectedSeason)
      ) {
        mapOptions.push({ value: map, text: mapModeLocationsData[map].name });
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
    mapModeLocationsData,
    selectedSeason,
    mapChangeCallback
  ) {
    $mapsLabel.html(R6MapsCommonLangTerms.terms.stats.labelMap);
    mapsUpdate($mapsSelect, mapModeLocationsData, selectedSeason);
    $mapsSelect.on('change', function(event) {
      mapChangeCallback();
    });
  };

  var mapsUpdate = function mapsUpdate(
    $mapsSelect,
    mapModeLocationsData,
    selectedSeason
  ) {
    var startingValue = mapsGet($mapsSelect);

    $mapsSelect.find('option').remove();
    mapsPopulateOptions(
      $mapsSelect,
      mapModeLocationsData,
      selectedSeason
    );
    trySelect($mapsSelect, startingValue);
  };

  var objectiveLocationsGet = function objectiveLocationsGet($objectiveLocationsSelect) {
    return $objectiveLocationsSelect.find(':selected').val();
  };

  var objectiveLocationsPopulateOptions = function objectiveLocationsPopulateOptions(
      $objectiveLocationsSelect,
      mapModeLocationsData,
      selectedSeason,
      selectedMap,
      selectedGameMode
    ) {
    var optionsCount = 1;

    $objectiveLocationsSelect.append($('<option></option>')
       .attr('value', ALL_KEY).text(R6MapsCommonLangTerms.terms.stats.allOption));

    if (selectedMap != 'ALL' && selectedGameMode != 'ALL') {
      for (var objectiveLocation in mapModeLocationsData[selectedMap].objectives[selectedGameMode]) {
        var info = mapModeLocationsData[selectedMap].objectives[selectedGameMode][objectiveLocation];

        if (
          (info.seasonSpan[0] <= selectedSeason) &&
          (info.seasonSpan[1] >= selectedSeason)
        ) {
          $objectiveLocationsSelect.append($('<option></option>')
             .attr('value', objectiveLocation).text(info.name));
          optionsCount++;
        }
      }
    }
    $objectiveLocationsSelect.attr('size', optionsCount);
    if (optionsCount == 1) {
      $objectiveLocationsSelect.parent('.control').addClass('only-all');
    } else {
      $objectiveLocationsSelect.parent('.control').removeClass('only-all');
    }
  };

  var objectiveLocationsSetup = function objectiveLocationsSetup(
    $objectiveLocationsSelect,
    $objectiveLocationsLabel,
    mapModeLocationsData,
    selectedSeason,
    selectedMap,
    selectedGameMode,
    objectiveLocationChangeCallback
  ) {
    $objectiveLocationsLabel.html(R6MapsCommonLangTerms.terms.stats.labelObjectiveLocation);
    objectiveLocationsUpdate(
      $objectiveLocationsSelect,
      mapModeLocationsData,
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
    mapModeLocationsData,
    selectedSeason,
    selectedMap,
    selectedGameMode
  ) {
    var startingValue = objectiveLocationsGet($objectiveLocationsSelect);

    $objectiveLocationsSelect.find('option').remove();
    objectiveLocationsPopulateOptions(
      $objectiveLocationsSelect,
      mapModeLocationsData,
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
    $platformsSelect.append($('<option></option>')
       .attr('value', ALL_KEY).text(R6MapsCommonLangTerms.terms.stats.allOption));

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
    platformsUpdate($platformsSelect, platformsData, selectedSeason);
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
    $seasonsSelect.find('option').remove();
    seasonsPopulateOptions($seasonsSelect, seasonsData);
    $seasonsSelect.on('change', function(event) {
      seasonChangeCallback();
    });
  };

  var ranksPopulateOptions = function ranksPopulateOptions($ranksControl, ranksData, selectedSeason) {
    var html = '',
      srData;

    for (var key in ranksData) {
      srData = ranksData[key];
      if ((selectedSeason >= srData.seasonSpan[0]) && (selectedSeason <= srData.seasonSpan[1])) {
        html += '<div class="skill-rank-input"><input type="checkbox" class="rank-icon ' + srData.cssClass + '" name="skill-rank-group[]" value="' + key + '" /><div>' + srData.name + '</div></div>';
      }
    }
    $ranksControl.html(html);
  };

  var ranksGet = function ranksGet($ranksControl) {
    var result = [];

    $.each($ranksControl.find(':checked'), function(index, input) {
      result.push($(input).val());
    });
    return result;
  };

  var ranksSetup = function ranksSetup(
    $ranksHeader, $ranksControl, ranksData, selectedSeason, rankChangeCallback
  ) {
    var currentSelectedRanks = ranksGet($ranksControl);

    $ranksHeader.html(R6MapsCommonLangTerms.terms.stats.labelSkillRanks);
    ranksPopulateOptions($ranksControl, ranksData, selectedSeason);
    $ranksControl.on('change', rankChangeCallback);
    ranksTrySelect($ranksControl, currentSelectedRanks);
  };

  var ranksTrySelect = function ranksTrySelect($ranksControl, rankOptions) {
    rankOptions.forEach(function(rank) {
      $ranksControl.find(':checkbox[value=' + rank + ']').prop('checked','true');
    });
  };

  var trySelect = function trySelect($selectEl, option) {
    return R6MapsCommonHelpers.trySelectOption($selectEl, option || ALL_KEY);
  };

  return  {
    ALL_KEY: ALL_KEY,
    modes: {
      get: modesGet,
      setup: modesSetup,
      trySelect: trySelect,
      update: modesUpdate
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
    ranks: {
      get: ranksGet,
      setup: ranksSetup,
      trySelect: ranksTrySelect
    }
  };
})(R6MapsCommonLangTerms);
