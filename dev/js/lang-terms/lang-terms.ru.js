'use strict';

var R6MLangTermsRussian = (function(R6MLangTerms, undefined) {
  var name = 'ru',
    terms = {
      general: {
        pageTitleSelectMap: 'R6Maps.com - Выберите карту',
        cameraViewCaption: '{floorName} (вид с камеры)',
        shortcutTip: 'Горячая клавиша: {shortcut}',
        menu: 'Меню',
        about: 'О сайте',
        languageHeader: 'Язык',
        optionsHeader: 'Настройки',
        labelLosOpacity: 'Прозрачность угла зрения камер',
        labelPercent: '{int}%', // according to: (0.12).toLocaleString('en', { style: 'percent' });
        labelLosDefault: '(по умолчанию)',
        labelLos105: '(Эээ?)',
        labelLos110: '(Да ладно!)',
        labelRoomLabelStyle: 'Шрифт названий комнат',
        labelNumberFloorsToDisplay: 'Отображаемое число этажей',
        lockPanning: 'Перемещать одновременно',
        lockZooming: 'Заблокировать зум',
        fullScreen: 'Полный экран',
        enableScreenshots: 'Разрешить скриншоты',
        contributions: 'Поддержать',
        supportSiteNote: 'Один из способов оказать поддержку – небольшое пожертвование.',
        donateImg: 'https://www.paypalobjects.com/ru_RU/RU/i/btn/btn_donate_LG.gif',
        latestUpdate: 'Февраль 2017 года Обновления'
      },
      roomLabelStyles: {
        Dark: 'Жирный',
        Light: 'Тонкий (по умолчанию)',
        DarkAndLarge: 'Большой и жирный',
        LightAndLarge: 'Большой и тонкий',
        DarkAndSmall: 'Маленький и тёмный',
        LightAndSmall: 'Маленький и светлый',
        DisplayNone: 'Выключить'
      },
      floorDisplayOptions: {
        one: 'По одному',
        two: 'По два (рядом)',
        four: 'По четыре (сетка)'
      },
      selectMaps: {
        selectAMap: 'Выберите карту',
        homeLink: 'Выберите карту'
      },
      compass: {
        letterN: 'С',
        letterE: 'В',
        letterS: 'Ю',
        letterW: 'З'
      },
      floorNames: {
        basement: { full: 'Подвал', short: 'П' },
        firstFloor: { full: '1 этаж', short: '1' },
        secondFloor: { full: '2 этаж', short: '2' },
        thirdFloor: { full: '3 этаж', short: '3' },
        fourthFloor: { full: '4 этаж', short: '4' },
        roof: { full: 'Крыша', short: 'К' }
      },
      objectives: {
        bombShortA: 'A',
        bombShortB: 'B',
        bomb: 'Бомбы',
        hostageShort: 'З',
        hostage: 'Заложник',
        secureShort: 'К',
        secure: 'Контейнер',
        showAll: 'Показать все'
      },
      legend: {
        breakableWalls: 'Разрушаемые стены',
        breakableFloorTraps: 'Разрушаемые люки',
        ceilingHatches: 'Потолочные люки',
        lineOfSightWalls: 'Простреливаемые стены',
        lineOfSightFloors: 'Простреливаемый пол',
        droneTunnels: 'Проезд для дронов',
        objectives: 'Задания',
        insertionPoints: 'Точки входа',
        securityCameras: 'Камеры наблюдения',
        skylights: 'Застеклённая крыша',
        onFloorAboveOrBelow: 'На этаж выше/ниже',
        cameraLineOfSight: 'Поле зрения камеры',
        ladders: 'Лестницы'
      },
      spawnPoints: {
        a: 'A',
        b: 'B',
        c: 'C',
        d: 'D',
        e: 'E'
      },
      stats: {
        title: 'R6Maps.com - Статистика',
        titleBeta: 'R6Maps.com - Статистика (Бета)',
        headerMain: 'Статистика',
        headerMainBeta: 'Статистика (Бета)',
        headerFilters: 'Фильтры',
        headerMap: 'Статистика карт',
        headerOperators: 'Оперативники',
        headerAboutAndOptions: 'Информация/Настройки',
        headerWinReasons: '{role}: Причина побед',
        labelSeason: 'Сезон',
        labelPlatform: 'Платформа',
        labelMap: 'Карта',
        labelGameMode: 'Режим',
        labelObjectiveLocation: 'Расположение',
        allOption: 'Все',
        seasonWithNumber: 'Сезон {0}',
        objectiveRoomDivider: ' / ',
        ellipsis: '...',
        loadButtonText: 'Загрузить статистику',
        averageRoundLength: 'Средняя продолжительность раунда',
        numberSeconds: '{num} сек.',
        totalRoundsPlayed: 'Всего сыграно раундов',
        numberRounds: '{num} раундов',
        tableHeaderAttackers: 'Штурмотряд',
        tableHeaderAttackersSingular: 'Штурмовик',
        tableHeaderDefenders: 'Защитники',
        tableHeaderDefendersSingular: 'Защитник',
        tableHeaderName: 'Название',
        tableHeaderPickRate: 'Частота выбора',
        tableHeaderWinRate: 'Коэфф. побед',
        tableHeaderSurvivalRate: 'Коэфф. выживания',
        tableHeaderKillsPerDeath: 'Убийства:Смерть',
        tableHeaderKillsPerRound: 'Убийства:Раунд',
        tableHeaderTotalRounds: 'Всего раундов',
        tableHeaderAllRanks: 'Все ранги',
        tableNoteHeader: 'Примечания:',
        tableNotePickRate: 'Коэффициенты выбора персонажей приблизительны и основываются на количестве сыгранных раундов.',
        tableNoteHeaders: 'Нажимайте на заголовки для показа графиков и на подзаголовки для сортировки.',
        tableNoteWarningText: 'Оранжевый текст означает менее точную статистику из-за малого количества сыгранных раундов.',
        tableFewRoundsNote: 'Менее точная (сыграно очень мало раундов)',
        averagesAndTotals: 'Среднее/Всего',
        percentageFormat: '{num}%',
        instructions: 'Выберите нужные фильтры и нажмите \'Загрузить статистику\' для просмотра.',
        noResults: 'Ничего не найдено. Измените фильтры или попробуйте ещё раз позднее.',
        error: 'При загрузке данных произошла ошибка. Попробуйте ещё раз позднее.',
        chartHeader: '{stat} для роли {role}',
        loadedInfoLine1AllPlatforms: 'Показана статистика за {season} для всех платформа',
        loadedInfoLine1SinglePlatform: 'Показана статистика за {season} для {platform}',
        loadedInfoLine2AllMapsAllModes: 'Все карты | Все режимы',
        loadedInfoLine2SingleMapAllModes: '{map} | Все режимы',
        loadedInfoLine2AllMapsSingleMode: 'Все карты | {mode}',
        loadedInfoLine2SingleMapSingleModeAllLocations: '{map} | {mode} | Все регионы',
        loadedInfoLine2SingleMapSingleModeSingleLocation: '{map} | {mode} | {location}',
        aboutLinksHeader: 'Ссылки',
        aboutR6MapsHome: 'Главная страница R6Maps.com',
        aboutR6MapsAbout: 'О R6Maps.com',
        aboutBasedOnUbisoft: 'По данным Ubisoft',
        winRatesForMap: 'Коэфф. побед для карты {map}',
        detailedStatsLink: 'Подробнее'
      },
      statsRoundWinReasons: {
        allTeamsDead: 'Все команды мертвы',
        attackersEliminated: 'Вражеская команда мертва',
        attackersKilledHostage: 'Заложник убит',
        attackersSurrendered: 'Сдались',
        bombDeactivated_OneBomb: 'Заряд обезврежен',
        bombExploded: 'Заряд взорвался',
        defendersEliminated: 'Вражеская команда мертва',
        defendersKilledHostage: 'Заложник убит',
        defendersSurrendered: 'Сдались',
        defuserDeactivated: 'Обезвреживающее устр-во отключено',
        hostageExtracted: 'Заложник освобождён',
        noEnemies: 'Противников нет',
        objectiveCaptured: 'Цель захвачена',
        objectiveProtected: 'Цель защищена',
        timeExpired: 'Время вышло'
      },
      ranks: {
        unranked: 'Без ранга',
        copper: 'Медь',
        bronze: 'Бронза',
        silver: 'Серебро',
        gold: 'Золото',
        platinum: 'Платина',
        diamond: 'Бриллиант'
      },
      platforms: {
        pc: 'PC',
        xboxone: 'Xbox One',
        ps4: 'PS4'
      },
      seasons: {
        1: 'Black Ice',
        2: 'Dust Line',
        3: 'Skull Rain',
        4: 'Red Crow',
        5: 'Velvet Shell',
        6: 'Operation Health',
        7: 'Blood Orchid'
      },
      operators: {
        ash: 'Ash',
        bandit: 'Bandit',
        blackbeard: 'Blackbeard',
        blitz: 'Blitz',
        buck: 'Buck',
        capitao: 'Capitao',
        castle: 'Castle',
        caveira: 'Caveira',
        doc: 'Doc',
        echo: 'Echo',
        ela: 'Ela',
        frost: 'Frost',
        fuze: 'Fuze',
        gignRecruit: 'Рекрут GIGN',
        glaz: 'Glaz',
        gsg9Recruit: 'Рекрут GSG9',
        hibana: 'Hibana',
        iq: 'IQ',
        jackal: 'Jackal',
        jager: 'Jager',
        kapkan: 'Kapkan',
        lesion: 'Lesion',
        mira: 'Mira',
        montagne: 'Montagne',
        mute: 'Mute',
        pulse: 'Pulse',
        rook: 'Rook',
        sasRecruit: 'Рекрут SAS',
        sledge: 'Sledge',
        smoke: 'Smoke',
        spetsnazRecruit: 'Рекрут Спецназа',
        swatRecruit: 'Рекрут SWAT',
        tachanka: 'Lord Tachanka',
        thatcher: 'Thatcher',
        thermite: 'Thermite',
        twitch: 'Twitch',
        valkyrie: 'Valkyrie',
        ying: 'Ying'
      },
      mapNames: {
        bank: 'Банк',
        bartlett: 'Ун. Бартлет',
        border: 'Граница',
        chalet: 'Шале',
        club: 'Клуб',
        consulate: 'Консульство',
        coastline: 'Побережье',
        favela: 'Фавелы',
        hereford: 'База Херефорд',
        house: 'Дом',
        kanal: 'Канал',
        kafe: 'Кафе "Достоевский"',
        oregon: 'Орегон',
        plane: 'Борт номер один',
        skyscraper: 'Небоскрёб',
        themepark: 'Луна-парк',
        tower: 'Башня',
        yacht: 'Яхта'
      },
      mapRooms: {
        bank: {
          spawnBoulevard: 'Парковка<br/>(перед.ч.)',
          spawnBackAlley: 'Проход к переулку',
          printerRoom: 'Оргтехника',
          parkingLot: 'Парковка<br/>(перед. ч.)',
          boulevard: 'Снаружи',
          jewelryFront: 'Ювелирный<br/>(фасад)',
          plaza: 'Открытая площадка',
          mainEntrance: 'Главный вход',
          garageRamp: 'Гараж<br/>Проезд',
          exteriorParking: 'Парковка',
          garageRoof: 'Крыша<br/>гаража',
          alleyAccess: 'Проход к<br/>переулку',
          backAlleyRooftop: 'Переулок<br/>Крыша',
          backAlley: 'Переулок',
          highRoof: 'Верхняя крыша',
          lowRoof: 'Нижняя крыша',
          vault: 'Хранилище',
          goldVault: 'Золотохранилище',
          serverRoomStairs: 'Серверная<br/>Лестница',
          serverRoom: 'Серверная',
          CCTVRoom: 'Центр<br/>наблюдения',
          loadingDock: 'Зона погрузки',
          secureHallway: 'Безопасный<br/>коридор',
          sewer: 'Туннель',
          lockers: 'Раздевалка',
          vaultLobby: 'Хранилище<br/>Холл',
          vaultEntrance: 'Хранилище<br/>Вход',
          mainStairway: 'Главная<br/>лестница',
          bankGarage: 'Гараж',
          elevators: 'Лифты',
          tellersOffice: 'Офис<br/>кассиров',
          archives: 'Архив',
          tellers: 'Касса',
          loanOffice: 'Кредитный отдел',
          officeHallway: 'Коридор',
          skylightStairwell: 'Лестница',
          lobby: 'Холл',
          openArea: 'Открытая зона',
          staffRoom: 'Служебная<br/>комната',
          electricalRoom: 'Щитовая',
          adminOffice: 'Администрация',
          ATMs: 'Банкоматы',
          executiveHallway: 'Коридор',
          frontDesk: 'Приёмная',
          executiveLounge: 'Администрация<br/>Зал',
          CEOOffice: 'Кабинет<br/>директора',
          janitorCloset: 'Чулан',
          hallway: 'Коридор',
          terrace: 'Терраса',
          stockTradingRoom: 'Торговая<br/>площадка',
          conferenceRoom: 'Переговорная'
        },
        bartlett: {
          archwayHall: 'Зал с арками',
          backAlley: 'Переулок',
          bathroom: 'Сан-<br/>узел',
          campusField: 'Парк на<br/>кампусе',
          classroom: 'Аудитория',
          coatRoom: 'Гарде-<br/>роб',
          compassHallway: 'Коридор',
          courtyard: 'Внутренний двор',
          centralHallway: 'Главный<br/>вестибюль',
          diningRoom: 'Столовая',
          eastBalcony: 'Восточный<br/>балкон',
          eastCorridor: 'Восточный<br/>коридор',
          eastStairs: 'Восточная<br/>лестница',
          festival: 'Ярмарка',
          frontEntrance: 'Главный вход',
          frontOffice: 'Канцелярия',
          frontPatio: 'Патио',
          gardenPass: 'Садовая<br/>дорожка',
          kitchen: 'Кухня',
          lobby: 'Холл',
          lounge: 'Зал',
          lowerLibrary: 'Нижняя<br/>библиотека',
          mainGate: 'Главные<br/>ворота',
          mainOffice: 'Главный офис',
          modelHall: 'Зал с<br/>макетом',
          pantry: 'Комната с<br/>продуктами',
          parking: 'Парковка',
          pianoRoom: 'Музкомната',
          readingRoom: 'Читальный зал',
          roof: 'Крыша',
          rowingMuseum: 'Зал<br/>"гребной спорт"',
          serviceRoom: 'Служебное<br/>помещение',
          terrace: 'Терраса',
          trophyRoom: 'Комната<br/>трофеев',
          upperLibrary: 'Верхняя<br/>библиотека',
          vistaHallway: 'Открытый<br/>коридор',
          westBalcony: 'Западный<br/>балкон',
          westCorridor: 'Западный<br/>коридор'
        },
        border: {
          armoryLockers: 'Оружейная<br/>Шкафчики',
          tellers: 'Касса',
          ventilationRoom: 'Вент.<br/>комната',
          exitHallway: 'Выход<br/>Коридор',
          supplyCorridor: 'Снабжение<br/>Коридор',
          detention: 'Комната с<br/>контрабандой',
          customsInspection: 'Таможенный контроль',
          customsDesk: 'Таможенный<br/>пост',
          centralStairs: 'Главная лестница',
          serverRoom: 'Серверная',
          supplyRoom: 'Кладовка',
          workshop: 'Мастер-<br/>ская',
          mainLobby: 'Главный<br/>холл',
          bathroom: 'Санузел',
          waitingRoom: 'Зал<br/>ожидания',
          eastStairs: 'Восточная<br/>лестница',
          passportCheck: 'Паспортный<br/>контроль',
          archives: 'Архив',
          offices: 'Офисы',
          officesHallway: 'Офис<br/>Коридор',
          fountain: 'Фонтан',
          mainHallway: 'Главный<br/>коридор',
          armoryDesk: 'Оружейная',
          securityRoom: 'Комната<br/>охраны',
          breakRoom: 'Комната отдыха',
          spawnEastVehicleEntrance: 'Восток: въезд',
          spawnValley: 'Долина',
          spawnWestVehicleExit: 'Запад: выезд',
          westTower: 'Запад<br/>Вышка',
          pedestrianExit: 'Выход<br/>(пешеходы)',
          valley: 'Долина',
          parkingLotEntrance: 'Парковка<br/>Въезд',
          parkingLot: 'Парковка',
          westRoad: 'Запад<br/>Дорога',
          vehicleCustoms: 'Таможня<br/>Транспорт',
          crashScene: 'Авария',
          eastRoad: 'Восток<br/>Дорога',
          pedestrianEntrance: 'Вход<br/>(пешеходы)',
          pedestrianCustoms: 'Таможня<br/>(пешеходы)',
          watchTower: 'Вышка',
          eastAlley: 'Восток<br/>Переулок',
          parkingLotAlley: 'Парковка<br/>Переулок',
          northBalcony: 'Север<br/>Балкон',
          eastBalcony: 'Восток<br/>Балкон',
          westBalcony: 'Запад<br/>Балкон',
          southBalcony: 'Юг<br/>Балкон',
          roof: 'Крыша'
        },
        chalet: {
          spawnFrontYard: 'Двор',
          spawnCampfire: 'Костёр',
          spawnCliffside: 'Утёс',
          spawnLakeside: 'Берег',
          libraryStairs: 'Библиотека<br/>Лестница',
          snowmobileGarageCorridor: 'Доп. гараж – Коридор',
          snowmobileGarage: 'Доп. гараж',
          greatRoomStairs: 'Гостиная<br/>Лестница',
          storageRoom: 'Кладовая',
          wineCellar: 'Винный<br/>погреб',
          wineStock: 'Погреб',
          basementHallway: 'Подвал<br/>Коридор',
          backyardStairs: 'Задний двор<br/>Лестница',
          mainStairs: 'Главная<br/>лестница',
          mainGarage: 'Главный гараж',
          garageEntrance: 'Главный<br/>гараж<br/>Въезд',
          westEntrance: 'Вход<br/>(запад)',
          gamingRoomHallway: 'Игровая комната<br/>Коридор',
          gamingRoom: 'Игровая<br/>комната',
          bar: 'Бар',
          greatRoom: 'Гостиная',
          diningRoom: 'Столовая',
          mainEntrance: 'Главный<br/>вход',
          trophyRoom: 'Комната трофеев',
          kitchenHallway: 'Кухня<br/>Коридор',
          kitchen: 'Кухня',
          libraryHallway: 'Библиотека – Коридор',
          libraryEntrance: 'Библиотека<br/>Вход',
          library: 'Библиотека',
          bedroomTerrace: 'Спальня<br/>Терраса',
          fireplaceHallway: 'Камин<br/>Коридор',
          bedroomHallway: 'Спальня<br/>Коридор',
          masterBathroom: 'Главный<br/>санузел',
          masterBedroom: 'Главная спальня',
          office: 'Офис',
          woodenTrail: 'Дорога в<br/>лесу',
          campfireWood: 'Дрова для<br/>костра',
          backyard: 'Задний двор',
          gazeebo: 'Беседка',
          cliffsideStairs: 'Утёс<br/>Лестница',
          cliffsideWoods: 'Утёс<br/>Лес',
          backyardPatio: 'Задний двор<br/>Патио',
          officeBalcony: 'Балкон<br/>офиса',
          helipadTrail: 'Верт. площадка<br/>Дорожка',
          helipad: 'Вертолётная<br/>площадка',
          frontYardPatio: 'Двор<br/>Патио',
          frontYard: 'Двор',
          bathroomBalcony: 'Санузел<br/>Балкон',
          libraryBalcony: 'Балкон<br/>библиотеки',
          bedroomBalcony: 'Балкон<br/>спальни',
          snowmobiles: 'Снегоходы'
        },
        club: {
          spawnMainEntrance: 'Главные ворота',
          spawnShippingDocks: 'Зона погрузки',
          spawnWarehouse: 'Склад',
          spawnConstructionSite: 'Стройплощадка',
          easternSubroof: 'Козырёк<br/>(восток)',
          constructionSite: 'Стройплощадка',
          container: 'Контейнер',
          graffitiArea: 'Арт-зона',
          recreationArea: 'Зона<br/>отдыха',
          junkyard: 'Свалка',
          VIPParking: 'VIP-парковка',
          mainGate: 'Главные ворота',
          parking: 'Парковка',
          kennels: 'Будки',
          trash: 'Мусорка',
          centralSubroof: 'Козырёк<br/>(центр)',
          easternRoof: 'Крыша (восток)',
          centralRoof: 'Крыша<br/>(центр)',
          westernRoof: 'Крыша (запад)',
          balcony: 'Балкон',
          escapeTunnel: 'Тайный<br/>ход',
          arsenalRoom: 'Оружейная',
          basementHallway: 'Коридор',
          memorialRoom: 'Комната-музей',
          utilityRoom: 'Бытовка',
          oilPit: 'Маслояма',
          centralStairs: 'Главная<br/>лестница',
          church: 'Часовня',
          frontPorch: 'Козырёк (восток)',
          garage: 'Гараж',
          lobby: 'Холл',
          stockRoom: 'Склад',
          garageStorage: 'Гараж<br/>Кладовая',
          lounge: 'Зал',
          bar: 'Бар',
          centralHallway: 'Главный коридор',
          kitchen: 'Кухня',
          kitchenEntrance: 'Вход в<br/>кухню',
          westernHallway: 'Западный<br/>коридор',
          stripClub: 'Стрип-зал',
          junkyardEntrance: 'Свалка<br/>Вход',
          sideEntrance: 'Боковой вход',
          changingRoom: 'Раздевалка',
          bedroom: 'Спальня',
          bathroom: 'Санузел',
          bedroomHallway: 'Спальня – Коридор',
          logisticOffice: 'Офис<br/>логистов',
          gym: 'Спортзал',
          secretStash: 'Тайник',
          CCTVRoom: 'Центр<br/>наблюдения',
          cashRoom: 'Касса',
          easternStairs: 'Восточная<br/>лестница'
        },
        consulate: {
          spawnRiotBarricade: 'Заграждение',
          spawnPoliceLine: 'Полиция',
          spawnGasStation: 'Заправка',
          spawnSideEntrance: 'Боковой вход',
          exitStairs: 'Выход<br/>Лестница',
          garage: 'Гараж',
          basementCorridor: 'Коридор',
          securityRoom: 'Комната охраны',
          cafeteria: 'Кафетерий',
          mainStairs: 'Главная лестница',
          lockerHallway: 'Раздевалка<br/>Коридор',
          serviceStairs: 'Служебная<br/>лестница',
          electricRoom: 'Щитовая',
          storageRoom: 'Кладовая',
          archives: 'Архив',
          archivesCorridor: 'Архив<br/>Коридор',
          pressRoom: 'Пресс-центр',
          westCorridor: 'Коридор (запад)',
          publicBathroom: 'Санузел',
          antechamber: 'Вестибюль',
          lobby: 'Холл',
          eastCorridor: 'Коридор<br/>(восток)',
          tellers: 'Касса',
          visaOffice: 'Отдел виз',
          visaEntrance: 'Вход в<br/>отдел виз',
          frontDoor: 'Главный<br/>вход',
          balcony: 'Балкон',
          copyRoom: 'Копировальная',
          cabinet: 'Кабинет',
          administrationOffice: 'Администрация',
          breakRoom: 'Комната<br/>отдыха',
          frontOffice: 'Общий отдел',
          meetingRoom: 'Переговорка',
          hallway: 'Коридор',
          consulFrontDesk: 'Приёмная<br/>консула',
          privateBathroom: 'Санузел',
          waitingRoom: 'Приёмная',
          consulateOffice: 'Кабинет<br/>консула',
          garageWay: 'Въезд в гараж',
          courtyard: 'Внутренний двор',
          backCourtyard: 'Задний двор',
          sideEntrance: 'Боковой вход',
          dumpster: 'Мусорка',
          parking: 'Парковка',
          gardens: 'Парк',
          fountain: 'Фонтан',
          emergencyExit: 'Запасный<br/>выход',
          garageRoof: 'Крыша<br/>гаража',
          memorialGarden: 'Парк-мемориал',
          policeLine: 'Полиция',
          riotBarracade: 'Заграждение',
          eastFrontYard: 'Двор (восток)',
          westFrontYard: 'Двор (запад)',
          frontAlley: 'Аллея',
          buildingRoof: 'Крыша'
        },
        coastline: {
          aquarium: 'Аквариум',
          backAlley: 'Пере-<br/>улок',
          balcony: 'Балкон (не отобр.)',
          bathroom: 'Санузел',
          billiardsRoom: 'Бильярдная',
          blueBar: 'Синий бар',
          cantina: 'Служ. окно',
          courtyard: 'Внутренний двор',
          djBooth: 'DJ (не отобр.)',
          garageRoof: 'Гараж – крыша',
          hallOfFame: 'Зал славы',
          hallway: 'Коридор',
          hookahDeck: 'Терраса<br/>Кальяны<br/>(не отобр.)',
          hookahLounge: 'Кальянная',
          kitchen: 'Кухня',
          mainEntrance: 'Главный<br/>вход',
          mainLobby: 'Главный<br/>холл',
          northStairs: 'Северная<br/>лестница',
          office: 'Офис',
          penthouse: 'Пентхаус',
          pool: 'Бассейн',
          poolEntrance: 'Бассейн – вход',
          poolSide: 'У бассейна',
          rooftop: 'Крыша',
          ruins: 'Развалины',
          securityRoom: 'Комната<br/>охраны',
          serviceEntrance: 'Служебный<br/>вход',
          southHallway: 'Коридор – Юг',
          southPromenade: 'Набережная – Юг',
          southStairs: 'Южная<br/>лестница',
          sunriseBar: 'Бар "Восход"',
          sunRoom: 'Зимний сад',
          theater: 'Дом. кинотеатр',
          terrace: 'Терраса',
          toilets: 'Уборные',
          vipLounge: 'VIP-зал',
          walkway: 'Пешеходная зона'
        },
        favela: {
          packagingRoom: 'Комната для<br/>фасовки',
          footballApartment: 'Квартира<br/>футболиста',
          armoryRoom: 'Оружейная',
          auntsApartment: 'Квартира<br/>тёти',
          auntsBedroom: 'Спальня<br/>тёти',
          growRoom: 'Теплица',
          bikersApartment: 'Квартира<br/>байкера',
          methLab: 'Лаборатория',
          footballBedroom: 'Спальня<br/>футболиста',
          footballOffice: 'Офис<br/>футболиста',
          bikersBedroom: 'Спальня<br/>байкера',
          backStairs: 'Задняя<br/>лестница',
          auntsHall: 'Зал',
          kidsRoom: 'Детская',
          mainStairs: 'Главная<br/>лестница',
          stairHall: 'Лестница<br/>Зал',
          roof: 'Крыша',
          laundryRoom: 'Постирочная',
          vaultRoom: 'Храни-<br/>лище',
          bikersGarage: 'Гараж<br/>байкера',
          backAlley: 'Переулок',
          schoolAlley: 'Школа – Переулок',
          footballPitch: 'Площадка (футбол)',
          market: 'Рынок',
          marketAlley: 'Рынок<br/>переулок',
          schoolRooftops: 'Школа – крыша',
          street: 'Улица',
          rooftops: 'Крыша',
          courtyard: 'Двор',
          accessAlley: 'Проход к переулку',
          shop: 'Магазин<br/>(не отобр.)',
          marketRooftops: 'Рынок – Крыша'
        },
        hereford: {
          shootingRange: 'Стрельбище',
          mainStairs: 'Главная<br/>лестница',
          garage: 'Гараж',
          kitchen: 'Кухня',
          diningRoom: 'Столовая',
          masterBedroom: 'Главная спальня',
          laundryRoom: 'Постирочная',
          bathroom: 'Санузел',
          workshop: 'Мастерская',
          rooftop: 'Крыша'
        },
        house: {
          spawnConstructionSite: 'Стройплощадка',
          spawnRiverDocks: 'Причал',
          spawnAPCArea: 'Парковка БМП',
          spawnSideStreet: 'Боковая улица',
          depot: 'Склад',
          trainingRoom: 'Тренажёрная',
          kitchenStairs: 'Лестница<br/>(кухня)',
          sideStairs: 'Чёрная<br/>лестница',
          laundryRoom: 'Постирочная',
          garage: 'Гараж',
          livingRoom: 'Гостиная',
          backEntrance: 'Чёрный вход',
          lobby: 'Холл',
          kitchen: 'Кухня',
          office: 'Офис',
          diningRoom: 'Столовая',
          workshop: 'Мастерская',
          kidsBedroom: 'Детская',
          upperHallway: 'Коридор',
          lobbyStairs: 'Лестница<br/>(холл)',
          walkIn: 'Гардероб',
          masterBedroom: 'Главная спальня',
          bathroom: 'Санузел',
          sideStreet: 'Боковая<br/>улица',
          garageEntrance: 'Въезд в<br/>гараж',
          garden: 'Сад',
          backAlley: 'Переулок',
          patio: 'Патио',
          jacuzzi: 'Джакузи',
          basementStairs: 'Лестница в<br/>подвал',
          treehouseAlley: 'Дорожка',
          frontYard: 'Передний двор',
          frontStreet: 'Улица',
          frontPorch: 'Крыльцо',
          backPorch: 'Заднее крыльцо',
          backPorchTop: 'Козырёк заднего крыльца',
          frontPorchTop: 'Козырёк крыльца',
          rooftop: 'Крыша'
        },
        kanal: {
          floatingDock: 'Плавучий док',
          sailboats: 'Яхты',
          constructionSite: 'Стройплощадка',
          pipes: 'Трубы',
          lockerRoom: 'Раздевалка',
          archives: 'Архив',
          lounge: 'Зал',
          modelRoom: 'Комната с<br/>макетом',
          securityRoom: 'Комната<br/>охраны',
          projectorRoom: 'Комната<br/>с экраном',
          kitchen: 'Кухня',
          controlRoom: 'Диспетческая',
          controlRoomHallway: 'Диспетческая – Коридор',
          serverRoom: 'Серверная',
          lockGate: 'Ворота шлюза',
          quayContainers: 'Причал<br/>Контейнеры',
          lockGateTunnel: 'Ворота шлюза<br/>Туннель',
          constructionEntrance: 'Стройплощадка<br/>Вход',
          parkingAlley: 'Проход к<br/>парковке',
          parkingEntrance: 'Въезд на<br/>парковку',
          middleRoad: 'Дорога',
          forkliftAlley: 'Проход<br/>Погрузчик',
          frontLawn: 'Лужайка',
          coastGuardRoof: 'Берег. охрана<br/>Крыша',
          balcony: 'Балкон',
          parking: 'Парковка'
        },
        kafe: {
          riverDocks: 'Причал',
          christmasMarket: 'Рождественская ярмарка',
          park: 'Аллея',
          laundryRoom: 'Постирочная',
          bakery: 'Пекарня',
          diningRoom: 'Столовая',
          museumEntrance: 'Вход в музей',
          miningRoom: 'Зал "Горное дело"',
          trainMuseum: 'Зал "Железные дороги"',
          mainCorridor: 'Главный<br/>коридор',
          readingRoomCorridor: 'Читальный зал, коридор',
          readingRoom: 'Читальный зал',
          fireplaceHall: 'Зал с камином',
          cigarShop: 'Табачный<br/>магазин',
          cigarLounge: 'Курительная<br/>комната',
          bar: 'Бар',
          barBackstore: 'Подсобка',
          washrooms: 'Уборная',
          cocktailLounge: 'Кокт.<br/>зал',
          cocktailLoungeEntrance: 'Кокт. зал<br/>Вход',
          westMainStreet: 'Центральная улица, запад',
          mainStreet: 'Центральная улица',
          eastMainStreet: 'Центральная улица, восток',
          bakeryParking: 'Парковка у<br/>пекарни',
          bakeryRoof: 'Крыша пекарни',
          cafeRoofTop: 'Крыша кафе',
          terrace: 'Терраса',
          backAlley: 'Переулок',
          garage: 'Гараж'
        },
        oregon: {
          spawnJunkyard: 'Свалка',
          spawnStreet: 'Улица',
          spawnConstructionSite: 'Стройплощадка',
          towerStairs: 'Вышка<br/>(лестница)',
          boilerRoom: 'Котельная',
          electricRoom: 'Щитовая',
          bunkerEntrance: 'Бункер<br/>(вход)',
          bunker: 'Бункер',
          basementCorridor: 'Подвал<br/>Коридор',
          supplyRoom: 'Кладовка',
          laundryRoom: 'Постирочная',
          laundryStorage: 'Постирочная<br/>Кладовая',
          laundryStairs: 'Постирочная<br/>Лестница',
          office: 'Офис',
          diningHall: 'Столовая',
          diningHallCorridor: 'Столовая – Коридор',
          showers: 'Душевые',
          kitchen: 'Кухня',
          bathroom: 'Санузел',
          dormStairs: 'Спальн. комната<br/>Лестница',
          pantry: 'Комната с<br/>продуктами',
          bathroomCorridor: 'Санузел – Коридор',
          classroom: 'Аудитория',
          lobby: 'Холл',
          mainStairs: 'Главная<br/>лестница',
          meetingHall: 'Конференц-зал',
          rearStage: 'Лестница сзади',
          garage: 'Гараж',
          officeStorage: 'Офис<br/>Кладовая',
          kidsDorm: 'Детская',
          dormMainHall: 'Спальня<br/>Главный зал',
          smallDorms: 'Малая спальня',
          armoryCorridor: 'Оружейная<br/>Коридор',
          masterBedroom: 'Главная<br/>спальня',
          armory: 'Оружейная',
          walkIn: 'Вход',
          attic: 'Чердак',
          watchTower: 'Вышка',
          busYard: 'Двор (автобусы)',
          junkyard: 'Свалка',
          farmlands: 'Зона с/х',
          shootingRange: 'Стрельбище',
          constructionSite: 'Стройплощадка',
          parking: 'Парковка',
          mainEntrance: 'Главный вход',
          street: 'Улица',
          balcony: 'Балкон',
          diningHallRoof: 'Крыша<br/>столовой',
          officeRoof: 'Крыша офиса',
          meetingHallEntrance: 'Конференц-зал<br/>Вход',
          garageRoof: 'Крыша гаража',
          dormsRoof: 'Крыша спальн. комнаты',
          meetingHallRoof: 'Крыша<br/>конференц-зала',
          supplyCloset: 'Чулан'
        },
        plane: {
          spawnOfficialEntrance: 'Главный вход',
          spawnReporterEntrance: 'Вход для прессы',
          spawnServiceEntrance: 'Служебный вход',
          pressBathroom: 'Санузел',
          meetingRoom: 'Переговорка',
          frontHallway: 'Передний<br/>коридор',
          executiveOffice: 'Кабинет<br/>президента',
          mainEntrance: 'Главный вход',
          frontStairs: 'Передняя<br/>лестница',
          pantry: 'Комната с<br/>продуктами',
          kitchen: 'Кухня',
          executiveHallway: 'Общий коридор',
          executiveBedroom: 'Спальня<br/>президента',
          changeRoom: 'Раздевалка',
          laund: 'Постир.',
          frontServiceEntrance: 'Служебный вход',
          rightWing: 'Правое крыло',
          backServiceEntrance: 'Доп. служебный<br/>вход',
          reporterEntrance: 'Вход для прессы',
          leftWing: 'Левое крыло',
          staffSection: 'Служебное<br/>помещение',
          securityRoom: 'Комната<br/>охраны',
          pressSectionA: 'Пресс-центр<br/>A',
          pressSectionB: 'Пресс-центр<br/>B',
          backStairs: 'Задняя лестница',
          cargoHold: 'Грузовой отсек',
          serviceCorridor: 'Служебный коридор',
          storage: 'Кладовая',
          luggageHold: 'Багажный<br/>отсек',
          firstAidStation: 'Пункт первой помощи',
          cargoFrontEntrance: 'Грузовой отсек<br/>Вход',
          cockpitStairs: 'Кабина Лестница',
          cabinStaff: 'Экипаж',
          radioCabin: 'Радиорубка',
          cabin: 'Кабина',
          caterer: 'Поставки провизии',
          serverRoomA: 'Серверная A',
          serverRoomB: 'Серверная B',
          technicalSeating: 'Место техника',
          ladderRoom: 'Комн. с<br/>лестницей'
        },
        skyscraper: {
          helipad: 'Верт. площадка',
          tower: 'Вышка',
          ventilationUnits: 'Вентиляция',
          kitchen: 'Кухня',
          pantry: 'Прод. комната',
          deliveryRoom: 'Комната<br/>доставки',
          houseLobby: 'Дом – Холл',
          houseEntrance: 'Вход',
          mainEntrance: 'Главный<br/>вход',
          reception: 'Приёмная',
          bedroom: 'Спальня',
          closet: 'Кладовка',
          bathroom: 'Санузел',
          houseStairs: 'Дом<br/>Лестница',
          restaurant: 'Ресторан',
          toilet: 'Уборная',
          bbq: 'Барбекю',
          backHallway: 'Коридор',
          mainStairs: 'Главная<br/>лестница',
          geishaRoom: 'Комната<br/>гейши',
          hallway: 'Коридор',
          karaoke: 'Караоке',
          teaRoom: 'Чайная<br/>комната',
          taiko: 'Барабан',
          terrace: 'Терраса',
          backStairs: 'Чёрная<br/>лестница',
          houseBalcony: 'Балкон',
          exhibition: 'Выставка',
          lounge: 'Зал',
          workOffice: 'Офис',
          clearance: 'Офис',
          peacefullTree: 'Дерево',
          contemplationGarden: 'Японский<br/>сад',
          westGarden: 'Сад – Запад',
          bridge: 'Мост',
          gazeebo: 'Беседка',
          restBalcony: 'Балкон<br/>ресторана',
          northGarden: 'Сад – Север',
          eastGarden: 'Сад – Восток',
          sandGarden: 'Сад на<br/>песке',
          sidePath: 'Дорожка',
          sideStairs: 'Боковая<br/>лестница',
          dragonStatue: 'Статуя<br/>дракона',
          coveredWalkway: 'Крытый<br/>проход'
        },
        themepark: {
          arcadeEntrance: 'Автоматы<br/>Вход',
          arcadeStairs: 'Автоматы<br/>Лестница',
          arcadeToilet: 'Автоматы<br/>Туалет',
          barrelRoom: 'Комната с<br/>бочками',
          backAlley: 'Переулок',
          bumperCars: 'Электромобили',
          bunk: 'Комната с диваном',
          cafe: 'Кафе',
          cafeCorridor: 'Кафе - Коридор',
          cafeTerrace: 'Кафе<br/>Терраса',
          cashStash: 'Хранилище',
          controlRoom: 'Диспетчерская',
          dayCare: 'Ясли',
          guestInfo: 'Объявления',
          initiationRoom: 'Комната<br/>посвящения',
          jointCorridor: 'Общий<br/>коридор',
          lockerRoom: 'Раздевалка',
          mainEntrance: 'Главный вход',
          office: 'Офис',
          palms: 'Пальмы',
          roboCircuit: 'Ринг для роботов',
          sweetShop: 'Кондитерская',
          teacups: 'Карусель',
          upperArcade: 'Автоматы',
          village: 'Деревня'
        },
        tower: {
          // EXT/Spawn
          northRoof: 'Крыша (Север)',
          northRoofNotShown: 'Крыша (Север)<br/>(не отобр.)',
          southRoof: 'Крыша (Юг)',
          southRoofNotShown: 'Крыша (Юг)<br/>(не отобр.)',
          roofAccess: 'Доступ<br/>с крыши',
          northRappel: 'Трос<br/>(север)',
          southRappel: 'Трос<br/>(юг)',
          // 3F
          mezzanine: 'Внутр. балкон',
          ventilation: 'Вентиляция',
          // 2F
          centerAtrium: 'Центральный<br/>атриум',
          infoBooth: 'Справочная',
          eastAtrium: 'Восточный<br/>атриум',
          westAtrium: 'Западный<br/>атриум',
          eastBalcony: 'Восточный<br/>балкон',
          westBalcony: 'Западный<br/>балкон',
          galleryMain: 'Галерея<br/>Глав.зал',
          mediaCenter: 'Медиа-<br/>центр',
          galleryAnnex: 'Галерея<br/>Доп.зал',
          giftShop: 'Сувенирный<br/>магазин',
          exhibitRoom: 'Экспонат',
          lanternRoom: 'Зал<br/>с лампами',
          elevator: 'Лифт',
          officesHallway: 'Офисы – коридор',
          exhibitHallway: 'Экспонат – коридор',
          offices: 'Офисы',
          companyReception: 'Приёмная',
          supplyRoom: 'Кладовая',
          meetingRoom: 'Переговорка',
          ceoOffice: 'Офис<br/>директора',
          bathroom: 'Санузел',
          serverRoom: 'Серверная',
          // 2F to 1F Stairs
          northStairs: 'Северная лестница',
          westStairs: 'Западная<br/>лестница',
          eastStairs: 'Восточная<br/>лестница',
          // 1F
          mainReception: 'Главная<br/>приёмная',
          centerHallway: 'Центральный<br/>коридор',
          teaRoom: 'Чайная комната',
          lounge: 'Зал',
          bar: 'Бар',
          kitchen: 'Кухня',
          restaurant: 'Ресторан',
          birdRoom: 'Комната<br/>с картиной',
          restaurantReception: 'Ресторан<br/>вход',
          restaurantHallway: 'Ресторан – коридор',
          barHallway: 'Бар – коридор',
          westObservatory: 'Обсерватория<br/>Запад',
          bonsaiRoom: 'Комната<br/>(бонсаи)',
          traditionalHall: 'Зал в трад. стиле',
          gameRoom: 'Игровая<br/>комната',
          eastObservatory: 'Обсерватория<br/>ВОсток',
          fountain: 'Фонтан',
          //Air Ducts:
          northAirDuct: 'Воздуховод<br/>(Север)',
          eastAirDuct: 'Воздуховод<br/>(Восток)',
          westAirDuct: 'Воздуховод<br/>(Запад)'
        },
        yacht: {
          spawnSubmarine: 'Подлодка',
          spawnZodiak: 'Шлюпка',
          spawnSnowMobile: 'Аэросани',
          mapsRoom: 'Комната карт',
          cockpit: 'Кабина',
          cockpitHallway: 'Кабина – Коридор',
          captainsOffice: 'Каюта<br/>капитана',
          cockpitBalcony: 'Кабина<br/>Балкон',
          topDeckStairs: 'Верхняя<br/>палуба<br/>Лестница',
          helipadEntrance: 'Верт. площадка<br/>Вход',
          helipad: 'Вертолётная<br/>площадка',
          spaDeck: 'Гидромассажная<br/>ванна',
          eastDeck: 'Палуба (восток)',
          westDeck: 'Палуба (запад)',
          frontDeck: 'Палуба<br/>Передняя<br/>часть',
          masterBedroom: 'Главная<br/>спальня',
          casino: 'Казино',
          pokerRoom: 'Зал для<br/>покера',
          bathroom: 'Сан-<br/>узел',
          bedroomHallway: 'Спальня – Коридор',
          casinoHallway: 'Казино – Коридор',
          globeHallway: 'Глобус<br/>Коридор',
          lounge: 'Зал',
          cafeteria: 'Кафетерий',
          engine: 'Машинное<br/>отделение',
          backEntrance: 'Машин. отдел.<br/>Чёрный вход',
          rearDeck: 'Задняя<br/>часть',
          serverRoom: 'Серверная',
          engineStorage: 'Машин.отдел.<br/>Кладовая',
          engineControl: 'Управление<br/>двигателем',
          backStairs: 'Задняя<br/>лестница',
          emergencyExit: 'Аварийн. выход',
          engineHallway: 'Машин.отдел.<br/>Коридор',
          frontStairs: 'Передняя<br/>лестница',
          kitchen: 'Кухня',
          staffDormitory: 'Экипаж<br/>Комната отдыха',
          westBalcony: 'Балкон (запад)',
          eastBalcony: 'Балкон (восток)',
          kitchenHallway: 'Кухня – Коридор',
          kitchenStairs: 'Кухня – Лестница',
          kitchenPantry: 'Кухня<br/>Комната с прод.',
          infirmary: 'Лазарет',
          borealSubRoom: 'Aklark<br/>Комната с подл.',
          cafeteriaHallway: 'Кафетерий – Коридор',
          engineUtility: 'Машин.<br/>отдел.<br/>Щитки',
          submarine: 'Подлодка',
          westGlacier: 'Запад<br/>Ледник',
          eastHullBreach: 'Восточная часть<br/>Брешь',
          eastGlacier: 'Восток<br/>Ледник',
          frozenRiver: 'Замёрзшая река',
          zodiac: 'Шлюпка',
          westHullBreach: 'Западная часть<br/>Брешь',
          kingOfTheWorld: 'Король<br/>мира',
          roof: 'Крыша',
          anchorName: 'Якорь',
          aklarkSubEntrance: 'Aklark: вход<br/>в комн. с подл.'
        }
      }
    };

  R6MLangTerms.registerLanguage(name, terms);

  return  {
    name: name,
    terms: terms
  };
})(R6MLangTerms);
