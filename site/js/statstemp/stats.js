'use strict';

(function(pagecode) { //eslint-disable-line wrap-iife
  pagecode(window.jQuery, window, document, R6MLangTerms, R6MStatsMetaData, R6MStatsControls);
}(function($, window, document, R6MLangTerms, R6MStatsMetaData, R6MStatsControls, undefined) {
  var $mainHeader,
    $filtersHeader,
    $mapHeader,
    $mapOutput,
    $mapHeader,
    $mapLoader,
    $sectionMap,
    $sectionOperators,
    $operatorsHeader,
    $operatorsOutput,
    $operatorsLoader,
    $seasonsLabel,
    $seasonsSelect,
    $platformsLabel,
    $platformsSelect,
    $mapsLabel,
    $mapsSelect,
    $modesLabel,
    $modesSelect,
    $objectiveLocationsLabel,
    $objectiveLocationsSelect,
    $loadButton,
    $ranksHeader,
    $ranksControl,
    $ranksShower,
    statsData,
    statTerms,
    QUERY_PARAMS = {
      SEASON: 'season',
      PLATFORM: 'platform',
      MAP: 'map',
      MODE: 'mode',
      LOCATION: 'location'
    };

  $(function() { // equivanelt to $(document).ready() - but a bit faster
    R6MHelpers.tryLoadStartingLanguage(R6MLangTerms.tryLoadLanguage);
    statsData = R6MStatsMetaData.getData();
    statTerms = R6MLangTerms.terms.stats;
    assignPageElements();
    setupStaticElements();
    setupControls();
    window.onpopstate = handleHistoryPop;
  });

  var assignPageElements = function assignPageElements() {
    $mainHeader = $('#header-main');
    $filtersHeader = $('nav h2');
    $sectionMap = $('#section-map');
    $mapHeader = $('#section-map h2');
    $mapOutput = $('#section-map div.output');
    $mapLoader = $('#section-map div.output');
    $sectionOperators = $('#section-operators');
    $operatorsHeader = $('#section-operators h2');
    $operatorsOutput = $('#section-operators div.output');
    $operatorsLoader = $('#section-operators div.loader');

    $seasonsLabel = $('#seasons-control label'),
    $seasonsSelect = $('#seasons-control select'),
    $platformsLabel = $('#platforms-control label'),
    $platformsSelect = $('#platforms-control select'),
    $mapsLabel = $('#maps-control label'),
    $mapsSelect = $('#maps-control select'),
    $modesLabel = $('#game-modes-control label'),
    $modesSelect = $('#game-modes-control select'),
    $objectiveLocationsLabel = $('#objective-locations-control label'),
    $objectiveLocationsSelect = $('#objective-locations-control select'),
    $loadButton = $('#load-control'),
    $ranksHeader = $('#skill-ranks-header');
    $ranksControl = $('#skill-ranks-control');
    $ranksShower = $('#skill-ranks-shower');
  };

  var clearOutputSections = function clearOutputSections() {
    $mapOutput.html('');
    $operatorsOutput.html('');
  };

  var disableLoadControl = function disableLoadControl() {
    $('body').addClass('disable-load');
  };

  var enableLoadControl = function enableLoadControl() {
    $('body').removeClass('disable-load');
  };

  var getSkillRanksForSeason = function getSkillRanksForSeason(selectedSeason) {
    var sd,
      result = [];

    for (var key in statsData.ranks) {
      sd = statsData.ranks[key];
      if ((selectedSeason >= sd.seasonSpan[0]) && (selectedSeason <= sd.seasonSpan[1])) {
        result.push(key);
      }
    }
    return result;
  };

  var handleGameModeChange = function handleGameModeChange() {
    R6MStatsControls.objectiveLocations.update(
      $objectiveLocationsSelect,
      statsData.mapModeLocations,
      R6MStatsControls.seasons.get($seasonsSelect),
      R6MStatsControls.maps.get($mapsSelect),
      R6MStatsControls.modes.get($modesSelect)
    );
    enableLoadControl();
  };

  var handleApiAllSuccess = function handleApiAllSuccess() {
    $('body').removeClass('load-in-progress');
    $mapHeader.focus();
    enableLoadControl();
  };

  var handleApiMapSuccess = function handleApiMapSuccess(mapData) {
    R6MStatsMapRender.render(mapData, $mapOutput, statsData);
    $sectionMap.removeClass('load-in-progress');
  };

  var handleApiMapError = function handleApiMapError(mapData) {
    $('body').removeClass('load-in-progress');
    $sectionMap.removeClass('load-in-progress');
    $mapOutput.html('<p class="error">' + R6MLangTerms.terms.stats.error + '</p>');
  };

  var handleApiOperatorSuccess = function handleApiOperatorSuccess(operatorsData) {
    console.log('Operators success', R6MStatsOpData.get()); // TODO TEMP OR WRAP IN DEV MODE CONFIG SETTING
    tryLoadSavedOperatorsSortField();

    R6MStatsOpRender.render(
      R6MStatsOpData.get(),
      $operatorsOutput,
      statsData,
      getSkillRanksForSeason(R6MStatsControls.seasons.get($seasonsSelect)),
      resortOperators
    );
    $sectionOperators.removeClass('load-in-progress');
  };

  var handleApiOperatorError = function handleApiOperatorError(operatorsData) {
    $sectionOperators.removeClass('load-in-progress');
    $operatorsOutput.html('<p class="error">' + R6MLangTerms.terms.stats.error + '</p>');
  };

  var handleHistoryPop = function handleHistoryPop() {
    setupControls();
    enableLoadControl();
  };

  var handleLoadButtonClick = function handleLoadButtonClick() {
    var possibleParams = [
        { string: QUERY_PARAMS.SEASON, currentValue: R6MStatsControls.seasons.get($seasonsSelect)},
        { string: QUERY_PARAMS.PLATFORM, currentValue: R6MStatsControls.platforms.get($platformsSelect)},
        { string: QUERY_PARAMS.MAP, currentValue: R6MStatsControls.maps.get($mapsSelect)},
        { string: QUERY_PARAMS.MODE, currentValue: R6MStatsControls.modes.get($modesSelect)},
        { string: QUERY_PARAMS.LOCATION, currentValue: R6MStatsControls.objectiveLocations.get($objectiveLocationsSelect)}
      ],
      queryString = '',
      counter = 0;

    possibleParams.forEach(function(param) {
      if (param.currentValue && (param.currentValue != R6MStatsControls.ALL_KEY)) {
        queryString += (counter == 0) ? '?' : '&';
        queryString += param.string + '=' + param.currentValue;
        counter++;
      }
    });
    history.pushState({}, '', [location.protocol, '//', location.host, location.pathname].join('') + queryString);

    $('body').removeClass('not-loaded-yet');
    $sectionMap.addClass('load-in-progress');
    $sectionOperators.addClass('load-in-progress');
    $('body').addClass('load-in-progress');
    disableLoadControl();

    clearOutputSections();
    savePlatformOption(R6MStatsControls.platforms.get($platformsSelect));
    sendLoadStatsAnalyticsEvent(queryString);

    R6MStatsApi.getMapAndOperators(
      handleApiMapSuccess,
      handleApiMapError,
      handleApiOperatorSuccess,
      handleApiOperatorError,
      handleApiAllSuccess,
      queryString,
      statsData
    );
  };

  var handleMapChange = function handleMapChange() {
    var selectedSeason = R6MStatsControls.seasons.get($seasonsSelect),
      selectedMap = R6MStatsControls.maps.get($mapsSelect);

    R6MStatsControls.modes.update(
      $modesSelect,
      statsData.modes,
      statsData.mapModeLocations,
      selectedSeason,
      selectedMap
    );
    R6MStatsControls.objectiveLocations.update(
      $objectiveLocationsSelect,
      statsData.mapModeLocations,
      selectedSeason,
      selectedMap,
      R6MStatsControls.modes.get($modesSelect)
    );
    enableLoadControl();
  };

  var handleSeasonChange = function handleSeasonChange() {
    var selectedSeason = R6MStatsControls.seasons.get($seasonsSelect);

    R6MStatsControls.platforms.update(
      $platformsSelect,
      statsData.platforms,
      selectedSeason
    );

    R6MStatsControls.maps.update(
      $mapsSelect,
      statsData.mapModeLocations,
      selectedSeason
    );
    handleMapChange();

    R6MStatsControls.ranks.setup(
      $ranksHeader,
      $ranksControl,
      statsData.ranks,
      R6MStatsControls.seasons.get($seasonsSelect),
      handleSkillRankChange
    );
    handleSkillRankChange();

    enableLoadControl();
  };

  var handleSkillRankChange = function handleSkillRankChange() {
    var selectedSkillRanks = R6MStatsControls.ranks.get($ranksControl);

    $ranksShower.removeClass();
    selectedSkillRanks.forEach(function(rank) {
      $ranksShower.addClass('show-' + statsData.ranks[rank].cssClass);
    });
    saveSkillRankOptions(selectedSkillRanks);
  };

  var resortOperators = function resortOperators(sortField, sortRank) {
    R6MStatsOpData.trySort(sortField, sortRank);
    R6MStatsOpRender.render(
      R6MStatsOpData.get(),
      $operatorsOutput,
      statsData,
      getSkillRanksForSeason(R6MStatsControls.seasons.get($seasonsSelect)),
      resortOperators
    );
    saveOperatorsSortField(sortField, sortRank);
  };

  var saveOperatorsSortField = function saveOperatorsSortField(sortField, optionalRank) {
    localStorage.setItem('statssortfield', sortField + ',' + optionalRank);
  };

  var savePlatformOption = function savePlatformOption(platformOption) {
    localStorage.setItem('statsplatform', platformOption);
  };

  var saveSkillRankOptions = function saveSkillRankOptions(selectedSkillRanks) {
    localStorage.setItem('statsskillrankoptions', selectedSkillRanks.join());
  };

  var setupControls = function setupControls() {
    R6MStatsControls.seasons.setup(
      $seasonsSelect,
      $seasonsLabel,
      statsData.seasons,
      handleSeasonChange
    );
    R6MStatsControls.seasons.trySelect($seasonsSelect, R6MHelpers.queryString(QUERY_PARAMS.SEASON));

    R6MStatsControls.platforms.setup(
      $platformsSelect,
      $platformsLabel,
      statsData.platforms,
      R6MStatsControls.seasons.get($seasonsSelect),
      enableLoadControl
    );
    tryLoadSavedPlatformOption();
    R6MStatsControls.platforms.trySelect($platformsSelect, R6MHelpers.queryString(QUERY_PARAMS.PLATFORM));

    R6MStatsControls.maps.setup(
      $mapsSelect,
      $mapsLabel,
      statsData.mapModeLocations,
      R6MStatsControls.seasons.get($seasonsSelect),
      handleMapChange
    );
    R6MStatsControls.maps.trySelect($mapsSelect, R6MHelpers.queryString(QUERY_PARAMS.MAP));

    R6MStatsControls.modes.setup(
      $modesSelect,
      $modesLabel,
      statsData.modes,
      statsData.mapModeLocations,
      handleGameModeChange,
      R6MStatsControls.seasons.get($seasonsSelect),
      R6MStatsControls.maps.get($mapsSelect)
    );
    R6MStatsControls.modes.trySelect($modesSelect, R6MHelpers.queryString(QUERY_PARAMS.MODE));

    R6MStatsControls.objectiveLocations.setup(
      $objectiveLocationsSelect,
      $objectiveLocationsLabel,
      statsData.mapModeLocations,
      R6MStatsControls.seasons.get($seasonsSelect),
      R6MStatsControls.maps.get($mapsSelect),
      R6MStatsControls.modes.get($modesSelect),
      enableLoadControl
    );
    R6MStatsControls.objectiveLocations.trySelect($objectiveLocationsSelect, R6MHelpers.queryString(QUERY_PARAMS.LOCATION));

    R6MStatsControls.ranks.setup(
      $ranksHeader,
      $ranksControl,
      statsData.ranks,
      R6MStatsControls.seasons.get($seasonsSelect),
      handleSkillRankChange
    );
    tryLoadSavedSkillRankOptions();
    handleSkillRankChange();

    $loadButton.html(statTerms.loadButtonText);
    $loadButton.on('click', handleLoadButtonClick);
  };

  var sendLoadStatsAnalyticsEvent = function sendLoadStatsAnalyticsEvent(queryString) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Controls',
      eventAction: 'LoadStats',
      eventLabel: queryString
    });
  };

  var setupStaticElements = function setupStaticElements() {
    $mainHeader.find('.page-title').html(statTerms.headerMain);
    $filtersHeader.html(statTerms.headerFilters);
    $mapHeader.html(statTerms.headerMap);
    $operatorsHeader.html(statTerms.headerOperators);
    $('p.all-text').html(statTerms.allOption);
    $('p.instructions').html(statTerms.instructions);
  };

  var tryLoadSavedOperatorsSortField = function tryLoadSavedOperatorsSortField() {
    var sortFieldOptions = localStorage.getItem('statssortfield'),
      sortField,
      optionalRank;

    if (sortFieldOptions) {
      sortField = sortFieldOptions.split(',')[0],
      optionalRank = sortFieldOptions.split(',')[1];
    } else {
      sortField = 'name'; //fallback
    }

    R6MStatsOpData.trySort(sortField, optionalRank);
  };

  var tryLoadSavedPlatformOption = function tryLoadSavedPlatformOption() {
    var platformOption = localStorage.getItem('statsplatform');

    if (platformOption !== null) {
      R6MStatsControls.platforms.trySelect($platformsSelect, platformOption);
    }
  };

  var tryLoadSavedSkillRankOptions = function tryLoadSavedSkillRankOptions() {
    var previouslySelectedSkillRanks = localStorage.getItem('statsskillrankoptions');

    if (previouslySelectedSkillRanks) {
      R6MStatsControls.ranks.trySelect(
        $ranksControl,
        previouslySelectedSkillRanks.split(',')
      );
    }
  };
}));
