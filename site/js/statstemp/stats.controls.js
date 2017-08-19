'use strict';

var R6MStatsControls = (function(R6MLangTerms, undefined){
  var ALL_KEY = 'ALL';

  var locationsGet = function locationsGet($locationsControl) {
    return $locationsControl.find(':selected').val();
  };

  var locationsPopulateOptions = function locationsPopulateOptions(
      $locationsControls,  mapModeLocationsData, selectedSeason, selectedMap, selectedGameMode
    ) {
    var optionsCount = 1,
      $locationsSelect = $locationsControls.find('select');

    $locationsSelect.append($('<option></option>')
       .attr('value', ALL_KEY).text(R6MLangTerms.terms.stats.allOption));

    if (selectedMap != ALL_KEY && selectedGameMode != ALL_KEY) {
      for (var objectiveLocation in mapModeLocationsData[selectedMap].objectives[selectedGameMode]) {
        var info = mapModeLocationsData[selectedMap].objectives[selectedGameMode][objectiveLocation];

        if (
          (info.seasonSpan[0] <= selectedSeason) &&
          (info.seasonSpan[1] >= selectedSeason)
        ) {
          $locationsSelect.append($('<option></option>')
             .attr('value', objectiveLocation).text(info.name));
          optionsCount++;
        }
      }
    }
    $locationsSelect.attr('size', optionsCount);
    if (optionsCount == 1) {
      $locationsSelect.parent('.control').addClass('only-all');
    } else {
      $locationsSelect.parent('.control').removeClass('only-all');
    }
  };

  var locationsSetup = function locationsSetup(
    $locationsControl, mapModeLocationsData, selectedSeason, selectedMap, selectedGameMode, objectiveLocationChangeCb
  ) {
    var $locationsSelect = $locationsControl.find('select'),
      $locationsLabel = $locationsControl.find('label');

    $locationsLabel.html(R6MLangTerms.terms.stats.labelObjectiveLocation);
    locationsUpdate($locationsControl, mapModeLocationsData, selectedSeason, selectedMap, selectedGameMode);
    $locationsSelect.on('change', function(event) {
      objectiveLocationChangeCb();
    });
  };

  var locationsUpdate = function locationsUpdate(
    $locationsControl, mapModeLocationsData, selectedSeason, selectedMap, selectedGameMode
  ) {
    var $locationsSelect = $locationsControl.find('select'),
      startingValue = locationsGet($locationsSelect);


    $locationsSelect.find('option').remove();
    locationsPopulateOptions($locationsControl, mapModeLocationsData, selectedSeason, selectedMap, selectedGameMode);
    trySelect($locationsControl, startingValue);
  };

  var mapsGet = function mapsGet($mapsControl) {
    return $mapsControl.find(':selected').val();
  };

  var mapsPopulateOptions = function mapsPopulateOptions($mapsControl, mapModeLocationsData, selectedSeason) {
    var mapOptions = [],
      $mapsSelect = $mapsControl.find('select');

    for (var map in mapModeLocationsData) {
      if (
        (mapModeLocationsData[map].seasonSpan[0] <= selectedSeason) &&
        (mapModeLocationsData[map].seasonSpan[1] >= selectedSeason)
      ) {
        mapOptions.push({ value: map, text: mapModeLocationsData[map].name });
      }
    }

    $mapsSelect.append($('<option></option>')
       .attr('value', ALL_KEY).text(R6MLangTerms.terms.stats.allOption));

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
    $mapsControl, mapModeLocationsData, selectedSeason, mapChangeCb
  ) {
    var $mapsSelect = $mapsControl.find('select'),
      $mapsLabel = $mapsControl.find('label');

    $mapsLabel.html(R6MLangTerms.terms.stats.labelMap);
    mapsUpdate($mapsControl, mapModeLocationsData, selectedSeason);
    $mapsSelect.on('change', function() { mapChangeCb(); });
  };

  var mapsUpdate = function mapsUpdate(
    $mapsControl, mapModeLocationsData, selectedSeason
  ) {
    var $mapsSelect = $mapsControl.find('select'),
      startingValue = mapsGet($mapsSelect);

    $mapsSelect.find('option').remove();
    mapsPopulateOptions($mapsControl, mapModeLocationsData, selectedSeason);
    trySelect($mapsControl, startingValue);
  };

  var modesGet = function modesGet($modesControl) {
    return $modesControl.find(':selected').val();
  };

  var modesPopulateOptions = function modesPopulateOptions(
    $modesControl, modesData, mapModeLocationsData, selectedSeason, selectedMap
  ) {
    var optionsCount = 1,
      $modesSelect = $modesControl.find('select');

    $modesSelect.append($('<option></option>')
       .attr('value', ALL_KEY).text(R6MLangTerms.terms.stats.allOption));

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
    $modesControl, modesData, mapModeLocationsData, modeChangeCb, selectedSeason, selectedMap
  ) {
    var $modesSelect = $modesControl.find('select'),
      $modesLabel = $modesControl.find('label');

    $modesLabel.html(R6MLangTerms.terms.stats.labelGameMode);
    modesUpdate($modesControl, modesData, mapModeLocationsData, selectedSeason, selectedMap);
    $modesSelect.on('change', function(event) {
      modeChangeCb();
    });
  };

  var modesUpdate = function modesUpdate(
    $modesControl, modesData, mapModeLocationsData, selectedSeason, selectedMap
  ) {
    var startingValue = modesGet($modesControl),
      $modesSelect = $modesControl.find('select');

    $modesSelect.find('option').remove();
    modesPopulateOptions($modesControl, modesData, mapModeLocationsData, selectedSeason, selectedMap);
    trySelect($modesControl, startingValue);
  };

  var platformsGet = function mapsGet($platformsControl) {
    return $platformsControl.find(':selected').val();
  };

  var platformsPopulateOptions = function platformsPopulateOptions(
    $platformsControl, platformsData, selectedSeason
  ) {
    var $platformsSelect = $platformsControl.find('select');

    $platformsSelect.append($('<option></option>')
       .attr('value', ALL_KEY).text(R6MLangTerms.terms.stats.allOption));

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

  var platformsSetup = function platformsSetup(
    $platformsControl, platformsData, selectedSeason, platformChangeCb
  ) {
    var $platformsSelect = $platformsControl.find('select'),
      $platformsLabel = $platformsControl.find('label');

    $platformsLabel.html(R6MLangTerms.terms.stats.labelPlatform);
    platformsUpdate($platformsControl, platformsData, selectedSeason);
    $platformsSelect.on('change', function() {  platformChangeCb(); });
  };

  var platformsUpdate = function platformsUpdate(
    $platformsControl, platformsData, selectedSeason
  ) {
    var $platformsSelect = $platformsControl.find('select'),
      startingValue = platformsGet($platformsControl);

    $platformsSelect.find('option').remove();
    platformsPopulateOptions($platformsControl, platformsData, selectedSeason);
    trySelect($platformsControl, startingValue);
  };

  var seasonsGet = function seasonsGet($seasonsControl) {
    return $seasonsControl.find(':selected').val();
  };

  var ranksPopulateOptions = function ranksPopulateOptions(
    $ranksControl, ranksData, selectedSeason
  ) {
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
    $ranksHeader, $ranksControl, ranksData, selectedSeason, rankChangeCb
  ) {
    var currentSelectedRanks = ranksGet($ranksControl);

    $ranksHeader.html(R6MLangTerms.terms.stats.labelSkillRanks);
    ranksPopulateOptions($ranksControl, ranksData, selectedSeason);
    $ranksControl.on('change', rankChangeCb);
    ranksTrySelect($ranksControl, currentSelectedRanks);
  };

  var ranksTrySelect = function ranksTrySelect($ranksControl, rankOptions) {
    rankOptions.forEach(function(rank) {
      $ranksControl.find(':checkbox[value=' + rank + ']').prop('checked','true');
    });
  };

  var seasonsPopulateOptions = function seasonsPopulateOptions(
    $seasonsControl, seasonsData
  ) {
    var $seasonsSelect = $seasonsControl.find('select');

    seasonsData.forEach(function(season) {
      $seasonsSelect.append($('<option></option>')
         .attr('value', season).text(R6MLangTerms.terms.seasons[season]));
    });
  };

  var seasonsSetup = function seasonsSetup(
    $seasonsControl, seasonsData, seasonChangeCb
  ) {
    var $seasonsSelect = $seasonsControl.find('select'),
      $seasonsLabel = $seasonsControl.find('label');

    $seasonsLabel.html(R6MLangTerms.terms.stats.labelSeason);
    $seasonsSelect.find('option').remove();
    seasonsPopulateOptions($seasonsControl, seasonsData);
    $seasonsSelect.on('change', function(event) {
      seasonChangeCb();
    });
  };

  var trySelect = function trySelect($controlEl, option) {
    return R6MHelpers.trySelectOption($controlEl.find('select'), option || ALL_KEY);
  };

  return  {
    ALL_KEY: ALL_KEY,
    locations: {
      get: locationsGet,
      setup: locationsSetup,
      trySelect: trySelect,
      update: locationsUpdate
    },
    maps: {
      get: mapsGet,
      setup: mapsSetup,
      trySelect: trySelect,
      update: mapsUpdate
    },
    modes: {
      get: modesGet,
      setup: modesSetup,
      trySelect: trySelect,
      update: modesUpdate
    },
    platforms: {
      get: platformsGet,
      setup: platformsSetup,
      trySelect: trySelect,
      update: platformsUpdate
    },
    ranks: {
      get: ranksGet,
      setup: ranksSetup,
      trySelect: ranksTrySelect
    },
    seasons: {
      get: seasonsGet,
      setup: seasonsSetup,
      trySelect: trySelect
    }
  };
})(R6MLangTerms);
