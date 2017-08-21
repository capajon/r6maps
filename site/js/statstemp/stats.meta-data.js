'use strict';

var R6MStatsMetaData = (function(R6MLangTerms, undefined){
  var getMapStatsData = function getMapStatsData() {
    var terms = R6MLangTerms.terms,
      mapRooms = terms.mapRooms,
      getDesc = getDescriptionFn(terms);

    return {
      seasons: {
        5: { name: terms.seasons['5'] }
      },
      roles: {
        attackers: { name: terms.stats.tableHeaderAttackers, cssClass: 'attackers' },
        defenders: { name: terms.stats.tableHeaderDefenders, cssClass: 'defenders' }
      },
      statTypes: {
        pickRate: { name: terms.stats.tableHeaderPickRate, displayType: 'percent', chartBeginAtZero: true },
        winRate: { name: terms.stats.tableHeaderWinRate, displayType: 'percent', chartBeginAtZero: false },
        survivalRate: { name: terms.stats.tableHeaderSurvivalRate, displayType: 'percent', chartBeginAtZero: false },
        killsPerDeath: { name: terms.stats.tableHeaderKillsPerDeath, displayType: 'ratio', chartBeginAtZero: false },
        killsPerRound: { name: terms.stats.tableHeaderKillsPerRound, displayType: 'ratio', chartBeginAtZero: false },
        totalPlays: { name: terms.stats.tableHeaderTotalRounds, displayType: 'number', showTotal: true, chartBeginAtZero: false }
      },
      platforms: {
        PC: { seasonSpan: [5,99], name: terms.platforms.pc },
        XONE: { seasonSpan: [5,99], name: terms.platforms.xboxone },
        PS4: { seasonSpan: [5,99], name: terms.platforms.ps4 }
      },
      modes: {
        BOMB: { seasonSpan: [5,99], name: terms.objectives.bomb },
        HOSTAGE: { seasonSpan: [5,99], name: terms.objectives.hostage },
        'SECURE AREA': { seasonSpan: [5,99], name: terms.objectives.secure }
      },
      ranks: {
        Unranked: { seasonSpan: [5,99], name: terms.ranks.unranked, cssClass: 'unranked' },
        Copper: { seasonSpan: [5,99], name: terms.ranks.copper, cssClass: 'copper' },
        Bronze: { seasonSpan: [5,99], name: terms.ranks.bronze, cssClass: 'bronze' },
        Silver: { seasonSpan: [5,99], name: terms.ranks.silver, cssClass: 'silver' },
        Gold: { seasonSpan: [5,99], name: terms.ranks.gold, cssClass: 'gold' },
        Platinum: { seasonSpan: [5,99], name: terms.ranks.platinum, cssClass: 'platinum' },
        Diamond: { seasonSpan: [5,99], name: terms.ranks.diamond, cssClass: 'diamond' }
      },
      winReasons: { // no need for season span verification
        allTeamsDead: { name: terms.statsRoundWinReasons.allTeamsDead, cssClass: 'all-dead' },
        attackersEliminated: { name: terms.statsRoundWinReasons.attackersEliminated, cssClass: 'eliminated' },
        attackersKilledHostage: { name: terms.statsRoundWinReasons.attackersKilledHostage, cssClass: 'hostage-killed' },
        attackersSurrendered: { name: terms.statsRoundWinReasons.attackersSurrendered, cssClass: 'surrendered' },
        bombDeactivated_OneBomb: { name: terms.statsRoundWinReasons.bombDeactivated_OneBomb, cssClass: 'bomb-deactivated' },
        bombExploded: { name: terms.statsRoundWinReasons.bombExploded, cssClass: 'bomb-exploded' },
        defendersEliminated: { name: terms.statsRoundWinReasons.defendersEliminated, cssClass: 'eliminated' },
        defendersKilledHostage: { name: terms.statsRoundWinReasons.defendersKilledHostage, cssClass: 'hostage-killed' },
        defendersSurrendered: { name: terms.statsRoundWinReasons.defendersSurrendered, cssClass: 'surrendered' },
        defuserDeactivated: { name: terms.statsRoundWinReasons.defuserDeactivated, cssClass: 'defuser-deactivated' },
        hostageExtracted: { name: terms.statsRoundWinReasons.hostageExtracted, cssClass: 'hostage-rescued' },
        noEnemies: { name: terms.statsRoundWinReasons.noEnemies },
        objectiveCaptured: { name: terms.statsRoundWinReasons.objectiveCaptured, cssClass: 'secured' },
        objectiveProtected: { name: terms.statsRoundWinReasons.objectiveProtected, cssClass: 'defended' },
        timeExpired: { name: terms.statsRoundWinReasons.timeExpired, cssClass: 'time' }
      },
      operators: { // probably no need for season span verification
        'BOPE-CAPITAO': { name: terms.operators.capitao, cssClass: 'capitao', color: '#4f8c41', secondaryColor: '#4f8c41' },
        'G.E.O.-JACKAL': { name: terms.operators.jackal, cssClass: 'jackal', color: '#521a7f', secondaryColor: '#521a7f' },
        'GIGN-MONTAGNE': { name: terms.operators.montagne, cssClass: 'montagne', color: '#406282', secondaryColor: '#406282' },
        'GIGN-RESERVE': { name: terms.operators.gignRecruit, cssClass: 'gign-recruit', color: '#000', secondaryColor: '#406282' },
        'GIGN-TWITCH': { name: terms.operators.twitch, cssClass: 'twitch', color: '#406282', secondaryColor: '#000' },
        'GSG9-BLITZ': { name: terms.operators.blitz, cssClass: 'blitz', color: '#f2c438', secondaryColor: '#f2c438' },
        'GSG9-IQ': { name: terms.operators.iq, cssClass: 'iq', color: '#f2c438', secondaryColor: '#000' },
        'GSG9-RESERVE': { name: terms.operators.gsg9Recruit, cssClass: 'gsg9-recruit', color: '#000', secondaryColor: '#f2c438' },
        'JTF2-BUCK': { name: terms.operators.buck, cssClass: 'buck', color: '#257b9f', secondaryColor: '#257b9f' },
        'NAVYSEAL-BLACKBEARD': { name: terms.operators.blackbeard, cssClass: 'blackbeard', color: '#bf9632', secondaryColor: '#bf9632' },
        'SAS-RESERVE': { name: terms.operators.sasRecruit, cssClass: 'sas-recruit', color: '#000', secondaryColor: '#90717b' },
        'SAS-SLEDGE': { name: terms.operators.sledge, cssClass: 'sledge', color: '#90717b', secondaryColor: '#90717b' },
        'SAS-THATCHER': { name: terms.operators.thatcher, cssClass: 'thatcher', color: '#90717b', secondaryColor: '#000' },
        'SAT-HIBANA': { name: terms.operators.hibana, cssClass: 'hibana', color: '#942a43', secondaryColor: '#942a43' },
        'SPETSNAZ-FUZE': { name: terms.operators.fuze, cssClass: 'fuze', color: '#a12128', secondaryColor: '#a12128' },
        'SPETSNAZ-GLAZ': { name: terms.operators.glaz, cssClass: 'glaz', color: '#a12128', secondaryColor: '#000' },
        'SPETSNAZ-RESERVE': { name: terms.operators.spetsnazRecruit, cssClass: 'spetsnaz-recruit', color: '#000', secondaryColor: '#a12128' },
        'SWAT-ASH': { name: terms.operators.ash, cssClass: 'ash', color: '#d15f33', secondaryColor: '#d15f33' },
        'SWAT-RESERVE': { name: terms.operators.swatRecruit, cssClass: 'swat-recruit', color: '#000', secondaryColor: '#d15f33' },
        'SWAT-THERMITE': { name: terms.operators.thermite, cssClass: 'thermite', color: '#d15f33', secondaryColor: '#000' },
        'BOPE-CAVEIRA': { name: terms.operators.caveira, cssClass: 'caveira', color: '#4f8c41', secondaryColor: '#4f8c41' },
        'G.E.O.-MIRA': { name: terms.operators.mira, cssClass: 'mira', color: '#521a7f', secondaryColor: '#521a7f' },
        'GIGN-DOC': { name: terms.operators.doc, cssClass: 'doc', color: '#406282', secondaryColor: '#406282' },
        'GIGN-ROOK': { name: terms.operators.rook, cssClass: 'rook', color: '#406282', secondaryColor: '#000' },
        'GSG9-BANDIT': { name: terms.operators.bandit, cssClass: 'bandit', color: '#f2c438', secondaryColor: '#f2c438' },
        'GSG9-JAGER': { name: terms.operators.jager, cssClass: 'jager', color: '#f2c438', secondaryColor: '#000' },
        'JTF2-FROST': { name: terms.operators.frost, cssClass: 'frost', color: '#257b9f', secondaryColor: '#257b9f' },
        'NAVYSEAL-VALKYRIE': { name: terms.operators.valkyrie, cssClass: 'valkyrie', color: '#bf9632', secondaryColor: '#bf9632' },
        'SAS-MUTE': { name: terms.operators.mute, cssClass: 'mute', color: '#90717b', secondaryColor: '#90717b' },
        'SAS-SMOKE': { name: terms.operators.smoke, cssClass: 'smoke', color: '#90717b', secondaryColor: '#000' },
        'SAT-ECHO': { name: terms.operators.echo, cssClass: 'echo', color: '#942a43', secondaryColor: '#942a43' },
        'SPETSNAZ-KAPKAN': { name: terms.operators.kapkan, cssClass: 'kapkan', color: '#a12128', secondaryColor: '#a12128' },
        'SPETSNAZ-TACHANKA': { name: terms.operators.tachanka, cssClass: 'tachanka', color: '#a12128', secondaryColor: '#000' },
        'SWAT-CASTLE': { name: terms.operators.castle, cssClass: 'castle', color: '#d15f33', secondaryColor: '#d15f33' },
        'SWAT-PULSE': { name: terms.operators.pulse, cssClass: 'pulse', color: '#d15f33', secondaryColor: '#000' }
      },
      mapModeLocations: {
        BANK: {
          name: terms.mapNames.bank,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'LOCKERS / CCTV ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.bank.lockers, mapRooms.bank.CCTVRoom) },
              'STAFF ROOM / OPEN AREA': { seasonSpan: [5,99], name: getDesc(mapRooms.bank.staffRoom, mapRooms.bank.openArea) },
              'TELLERS\' OFFICE / ARCHIVES': { seasonSpan: [5,99], name: getDesc(mapRooms.bank.tellersOffice, mapRooms.bank.archives) }
            },
            HOSTAGE: {
              'CEO OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.bank.CEOOffice) },
              'STAFF ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.bank.staffRoom) },
              'TELLER\'S OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.bank.tellersOffice) },
              VAULT: { seasonSpan: [5,99], name: getDesc(mapRooms.bank.vault) }
            },
            'SECURE AREA': {
              ARCHIVES: { seasonSpan: [5,99], name: getDesc(mapRooms.bank.archives) },
              'CEO OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.bank.CEOOffice) },
              LOCKERS: { seasonSpan: [5,99], name: getDesc(mapRooms.bank.lockers) },
              'OPEN AREA': { seasonSpan: [5,99], name: getDesc(mapRooms.bank.openArea) }
            }
          }
        },
        'BARTLETT U.': {
          name: terms.mapNames.bartlett,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'CLASSROOM / LIBRARY': { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.classroom, mapRooms.bartlett.upperLibrary) },
              'KITCHEN / PIANO ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.kitchen, mapRooms.bartlett.pianoRoom) },
              'READING ROOM / LIBRARY': { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.readingRoom, mapRooms.bartlett.lowerLibrary) },
              'ROWING MUSEUM / TROPHY ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.rowingMuseum, mapRooms.bartlett.trophyRoom) }
            },
            HOSTAGE: {
              KITCHEN: { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.kitchen) },
              LIBRARY: { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.upperLibrary) },
              'MAIN OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.mainOffice) },
              'TROPHY ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.trophyRoom) }
            },
            'SECURE AREA': {
              CLASSROOM: { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.classroom) },
              LIBRARY: { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.upperLibrary) },
              LOUNGE: { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.lounge) },
              'MODEL HALL': { seasonSpan: [5,99], name: getDesc(mapRooms.bartlett.modelHall) }
            }
          }
        },
        BORDER: {
          name: terms.mapNames.border,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'ARMORY LOCKERS / ARCHIVES': { seasonSpan: [5,99], name: getDesc(mapRooms.border.armoryLockers, mapRooms.border.archives) },
              'BATHROOM / TELLERS': { seasonSpan: [5,99], name: getDesc(mapRooms.border.bathroom, mapRooms.border.tellers) },
              'CUSTOMS INSPECTIONS / SUPPLY ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.border.customsInspection, mapRooms.border.supplyRoom) },
              'VENTILATION ROOM / WORKSHOP': { seasonSpan: [5,99], name: getDesc(mapRooms.border.ventilationRoom, mapRooms.border.workshop) }
            },
            HOSTAGE: {
              'CUSTOMS INSPECTIONS': { seasonSpan: [5,99], name: getDesc(mapRooms.border.customsInspection) },
              OFFICES: { seasonSpan: [5,99], name: getDesc(mapRooms.border.offices) },
              'SECURITY ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.border.securityRoom) },
              WORKSHOP: { seasonSpan: [5,99], name: getDesc(mapRooms.border.workshop) }
            },
            'SECURE AREA': {
              'ARMORY LOCKERS': { seasonSpan: [5,99], name: getDesc(mapRooms.border.armoryLockers) },
              OFFICES: { seasonSpan: [5,99], name: getDesc(mapRooms.border.offices) },
              TELLERS: { seasonSpan: [5,99], name: getDesc(mapRooms.border.tellers) },
              WORKSHOP: { seasonSpan: [5,99], name: getDesc(mapRooms.border.workshop) }
            }
          }
        },
        CHALET: {
          name: terms.mapNames.chalet,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'BAR / GAMING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.bar, mapRooms.chalet.gamingRoom) },
              'KITCHEN / TROPHY ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.kitchen, mapRooms.chalet.trophyRoom) },
              'MASTER BEDROOM / OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.masterBedroom, mapRooms.chalet.office) },
              'WINE CELLAR / SNOWMOBILE GARAGE': { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.wineCellar, mapRooms.chalet.snowmobileGarage) }
            },
            HOSTAGE: {
              KITCHEN: { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.kitchen) },
              LIBRARY: { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.library) },
              'MASTER BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.masterBedroom) },
              'WINE CELLAR': { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.wineCellar) }
            },
            'SECURE AREA': {
              BAR: { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.bar) },
              'DINING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.diningRoom) },
              LIBRARY: { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.library) },
              'SNOWMOBILE GARAGE': { seasonSpan: [5,99], name: getDesc(mapRooms.chalet.snowmobileGarage) }
            }
          }
        },
        'CLUB HOUSE': {
          name: terms.mapNames.club,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'BAR / STOCK ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.club.bar, mapRooms.club.stockRoom) },
              'CCTV ROOM / CASH ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.club.CCTVRoom, mapRooms.club.cashRoom) },
              'CHURCH / ARSENAL ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.club.church, mapRooms.club.arsenalRoom) },
              'GYM / BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.club.gym, mapRooms.club.bedroom) }
            },
            HOSTAGE: {
              BEDROOM: { seasonSpan: [5,99], name: getDesc(mapRooms.club.bedroom) },
              'CASH ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.club.cashRoom) },
              CHURCH: { seasonSpan: [5,99], name: getDesc(mapRooms.club.church) },
              'STRIP CLUB': { seasonSpan: [5,99], name: getDesc(mapRooms.club.stripClub) }
            },
            'SECURE AREA': {
              'ARSENAL ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.club.arsenalRoom) },
              'BAR BACKSTORE': { seasonSpan: [5,99], name: getDesc(mapRooms.club.bar) },
              BEDROOM: { seasonSpan: [5,99], name: getDesc(mapRooms.club.bedroom) },
              GARAGE: { seasonSpan: [5,99], name: getDesc(mapRooms.club.garage) }
            }
          }
        },
        COASTLINE: {
          name: terms.mapNames.coastline,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              '1F BLUE BAR / 1F SUNRISE BAR': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.blueBar, mapRooms.coastline.sunriseBar) },
              '1F KITCHEN / 1F SERVICE ENTRANCE': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.kitchen, mapRooms.coastline.serviceEntrance) },
              '2F HOOKAH LOUNGE / 2F BILLIARDS ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.hookahLounge, mapRooms.coastline.billiardsRoom) },
              '2F PENTHOUSE / 2F THEATER': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.penthouse, mapRooms.coastline.theater) }
            },
            HOSTAGE: {
              '1F BLUE BAR': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.blueBar) },
              '1F KITCHEN': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.kitchen) },
              '2F THEATER': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.theater) },
              '2F VIP LOUNGE': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.vipLounge) }
            },
            'SECURE AREA': {
              '1F BLUE BAR': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.blueBar) },
              '1F KITCHEN': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.kitchen) },
              '2F BILLIARDS ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.billiardsRoom) },
              '2F PENTHOUSE': { seasonSpan: [5,99], name: getDesc(mapRooms.coastline.penthouse) }
            }
          }
        },
        CONSULATE: {
          name: terms.mapNames.consulate,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'CONSUL OFFICE / MEEETING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.consulate.consulateOffice, mapRooms.consulate.meetingRoom) },
              'GARAGE / CAFETERIA': { seasonSpan: [5,99], name: getDesc(mapRooms.consulate.garage, mapRooms.consulate.cafeteria) },
              'LOBBY / PRESS ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.consulate.lobby, mapRooms.consulate.pressRoom) }
            },
            HOSTAGE: {
              'ADMINISTRATION OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.consulate.administrationOffice) },
              ARCHIVES: { seasonSpan: [5,99], name: getDesc(mapRooms.consulate.archives) },
              'CONSUL OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.consulate.consulateOffice) },
              TELLERS: { seasonSpan: [5,99], name: getDesc(mapRooms.consulate.tellers) }
            },
            'SECURE AREA': {
              'ADMINISTRATION OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.consulate.administrationOffice) },
              ARCHIVES: { seasonSpan: [5,99], name: getDesc(mapRooms.consulate.archives) },
              GARAGE: { seasonSpan: [5,99], name: getDesc(mapRooms.consulate.garage) },
              'VISA OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.consulate.visaOffice) }
            }
          }
        },
        FAVELAS: {
          name: terms.mapNames.favela,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              '1F BIKER\'S APARTMENT / 1F BIKER\'S BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.bikersApartment, mapRooms.favela.bikersBedroom) },
              '2F AUNT\'S BEDROOM / 1F AUNT\'S APARTMENT': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.auntsBedroom, mapRooms.favela.auntsApartment) },
              '2F FOOTBALL BEDROOM / 2F FOOTBALL OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.footballBedroom, mapRooms.favela.footballOffice) },
              '3F PACKAGING ROOM / 2F METH LAB': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.packagingRoom, mapRooms.favela.methLab) }
            },
            HOSTAGE: {
              '1F BIKER\'S APARTMENT': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.bikersApartment) },
              '2F AUNT\'S BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.auntsBedroom) },
              '2F GROW ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.growRoom) },
              '3F PACKAGING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.packagingRoom) }
            },
            'SECURE AREA': {
              '1F ARMORY ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.armoryRoom) },
              '1F AUNT\'S APARTMENT': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.auntsApartment) },
              '2F FOOTBALL APARTMENT': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.footballApartment) },
              '3F PACKAGING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.favela.packagingRoom) }
            }
          }
        },
        'HEREFORD BASE': {
          name: terms.mapNames.hereford,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'BRIEFING ROOM / ARMORY': { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.briefingRoom, mapRooms.hereford.armory) },
              'DINING ROOM / KIDS BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.diningRoom, mapRooms.hereford.kidsBedroom) },
              'DUMMY DEPOT / STORAGE': { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.dummyDepot, mapRooms.hereford.storage) },
              'TV ROOM / KITCHEN': { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.TVRoom, mapRooms.hereford.kitchen) }
            },
            HOSTAGE: {
              ARMORY: { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.armory) },
              KITCHEN: { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.kitchen) },
              'MASTER BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.masterBedroom) },
              STORAGE: { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.storage) }
            },
            'SECURE AREA': {
              ARMORY: { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.armory) },
              'DINING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.diningRoom) },
              'MASTER BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.masterBedroom) },
              WORKSHOP: { seasonSpan: [5,99], name: getDesc(mapRooms.hereford.workshop) }
            }
          }
        },
        HOUSE: {
          name: terms.mapNames.house,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'KID\'S BEDROOM / WORKSHOP': { seasonSpan: [5,99], name: getDesc(mapRooms.house.kidsBedroom, mapRooms.house.workshop) },
              'LIVING ROOM / TRAINING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.house.livingRoom, mapRooms.house.trainingRoom) },
              'TRAINING ROOM / GARAGE': { seasonSpan: [5,99], name: getDesc(mapRooms.house.trainingRoom, mapRooms.house.garage) }
            },
            HOSTAGE: {
              'DINING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.house.diningRoom) },
              'LAUNDRY ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.house.laundryRoom) },
              'MASTER BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.house.masterBedroom) },
              WORKSHOP: { seasonSpan: [5,99], name: getDesc(mapRooms.house.workshop) }
            },
            'SECURE AREA': {
              GARAGE: { seasonSpan: [5,99], name: getDesc(mapRooms.house.garage) },
              'KID\'S BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.house.kidsBedroom) },
              'LIVING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.house.livingRoom) },
              'MASTER BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.house.masterBedroom) }
            }
          }
        },
        'KAFE DOSTOYEVSKY': {
          name: terms.mapNames.kafe,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'BAR / COCKTAIL LOUNGE': { seasonSpan: [5,99], name: getDesc(mapRooms.kafe.bar, mapRooms.kafe.cocktailLounge) },
              'FIREPLACE HALL / MINING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.kafe.fireplaceHall, mapRooms.kafe.miningRoom) },
              'KITCHEN PREP / BAKERY': { seasonSpan: [5,99], name: getDesc(mapRooms.kafe.kitchenPrep, mapRooms.kafe.bakery) }
            },
            HOSTAGE: {
              'BAR BACKSTORE': { seasonSpan: [5,99], name: getDesc(mapRooms.kafe.barBackstore) },
              'KITCHEN GRILL': { seasonSpan: [5,99], name: getDesc(mapRooms.kafe.kitchenGrill) },
              'READING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.kafe.readingRoom) },
              'TRAIN MUSEUM': { seasonSpan: [5,99], name: getDesc(mapRooms.kafe.trainMuseum) }
            },
            'SECURE AREA': {
              'CIGAR LOUNGE': { seasonSpan: [5,99], name: getDesc(mapRooms.kafe.cigarLounge) },
              'KITCHEN PREP': { seasonSpan: [5,99], name: getDesc(mapRooms.kafe.kitchenPrep) },
              'READING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.kafe.readingRoom) },
              'TRAIN MUSEUM': { seasonSpan: [5,99], name: getDesc(mapRooms.kafe.trainMuseum) }
            }
          }
        },
        KANAL: {
          name: terms.mapNames.kanal,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'COAST GUARD OFFICE / HOLDING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.kanal.coastGuardOffice, mapRooms.kanal.holdingRoom) },
              'KITCHEN / PROJECTOR ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.kanal.kitchen, mapRooms.kanal.projectorRoom) },
              'SERVER ROOM / CONTROL ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.kanal.serverRoom, mapRooms.kanal.controlRoom) }
            },
            HOSTAGE: {
              'BOAT SUPPLIES': { seasonSpan: [5,99], name: getDesc(mapRooms.kanal.boatSupplies) },
              'COAST GUARD OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.kanal.coastGuardOffice) },
              'CONTROL ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.kanal.controlRoom) },
              'MAPS OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.kanal.mapsOffice) }
            },
            'SECURE AREA': {
              'BOAT SUPPLIES': { seasonSpan: [5,99], name: getDesc(mapRooms.kanal.boatSupplies) },
              'COAST GUARD OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.kanal.coastGuardOffice) },
              'MAPS OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.kanal.mapsOffice) },
              'SERVER ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.kanal.serverRoom) }
            }
          }
        },
        OREGON: {
          name: terms.mapNames.oregon,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'KIDS DORMS / DORMS MAIN HALL': { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.kidsDorm, mapRooms.oregon.dormMainHall) },
              'KITCHEN / DINING HALL': { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.kitchen, mapRooms.oregon.diningHall) },
              'LAUDRY ROOM / SUPPLY ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.laundryRoom, mapRooms.oregon.supplyRoom) },
              'REAR STAGE / WATCH TOWER': { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.rearStage, mapRooms.oregon.watchTower) }
            },
            HOSTAGE: {
              'DORMS MAIN HALL': { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.dormMainHall) },
              KITCHEN: { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.kitchen) },
              'MEETING HALL': { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.meetingHall) },
              SUPPLY: { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.supplyRoom) }
            },
            'SECURE AREA': {
              'DINING HALL': { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.diningHall) },
              'DORMS MAIN HALL': { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.dormMainHall) },
              'LAUNDRY ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.laundryRoom) },
              'MEETING HALL': { seasonSpan: [5,99], name: getDesc(mapRooms.oregon.meetingHall) }
            }
          }
        },
        PLANE: {
          name: terms.mapNames.plane,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'CARGO HOLD / LUGGAGE HOLD': { seasonSpan: [5,99], name: getDesc(mapRooms.plane.cargoHold, mapRooms.plane.luggageHold) },
              'MEETING ROOM / EXECUTIVE OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.plane.meetingRoom, mapRooms.plane.executiveOffice) },
              'STAFF SECTION / EXECUTIVE BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.plane.staffSection, mapRooms.plane.executiveBedroom) }
            },
            HOSTAGE: {
              'EXECUTIVE BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.plane.executiveBedroom) },
              'LUGGAGE HOLD': { seasonSpan: [5,99], name: getDesc(mapRooms.plane.luggageHold) },
              'MEETING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.plane.meetingRoom) },
              'PRESS SECTION A': { seasonSpan: [5,99], name: getDesc(mapRooms.plane.pressSectionA) }
            },
            'SECURE AREA': {
              'EXECUTIVE BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.plane.executiveBedroom) },
              'LUGGAGE HOLD': { seasonSpan: [5,99], name: getDesc(mapRooms.plane.luggageHold) },
              'MEETING ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.plane.meetingRoom) },
              'STAFF SECTION': { seasonSpan: [5,99], name: getDesc(mapRooms.plane.staffSection) }
            }
          }
        },
        SKYSCRAPER: {
          name: terms.mapNames.skyscraper,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              '1F BBQ / 1F KITCHEN': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.bbq, mapRooms.skyscraper.kitchen) },
              '1F BEDROOM / 1F BATHROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.bedroom, mapRooms.skyscraper.bathroom) },
              '2F EXHIBITION / 2F WORK OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.exhibition, mapRooms.skyscraper.workOffice) },
              '2F KARAOKE / 2F TEA ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.karaoke , mapRooms.skyscraper.teaRoom) }
            },
            HOSTAGE: {
              '1F BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.bedroom) },
              '1F KITCHEN': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.kitchen) },
              '2F GEISHA ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.geishaRoom) },
              '2F WORK OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.workOffice) }
            },
            'SECURE AREA': {
              '1F BBQ': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.bbq) },
              '1F BEDROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.bedroom) },
              '2F TEA ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.teaRoom) },
              '2F WORK OFFICE': { seasonSpan: [5,99], name: getDesc(mapRooms.skyscraper.workOffice) }
            }
          }
        },
        YACHT: {
          name: terms.mapNames.yacht,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'CAFETERIA / STAFF DORMITORY': { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.cafeteria, mapRooms.yacht.staffDormitory) },
              'KITCHEN / ENGINE CONTROL': { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.kitchen, mapRooms.yacht.engineControl) },
              'MAPS ROOM / COCKPIT': { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.mapsRoom, mapRooms.yacht.cockpit) },
              'SERVER ROOM / ENGINE STORAGE': { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.serverRoom, mapRooms.yacht.engineStorage) }
            },
            HOSTAGE: {
              CAFETERIA: { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.cafeteria) },
              CASINO: { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.casino) },
              ENGINE: { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.engine) },
              'MAPS ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.mapsRoom) }
            },
            'SECURE AREA': {
              'AKLARK SUB ROOM': { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.borealSubRoom) },
              CASINO: { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.casino) },
              COCKPIT: { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.cockpit) },
              KITCHEN: { seasonSpan: [5,99], name: getDesc(mapRooms.yacht.kitchen) }
            }
          }
        }
      }
    };
  };

  var getDescriptionFn = function getDescriptionFn(terms) {
    var MAX_CHAR_LENGTH = 22,
      BUFFER = 5,
      ellipsisString = terms.stats.ellipsis;

    return function getDesc(name1, name2) {
      if (DEV_MODE && !name1) {
        console.error('First room name is not defined.', name1, name2);
      }

      var result = name2 ? name1 + terms.stats.objectiveRoomDivider + name2 : name1;

      result = result.removeBreakTags();

      if (result && (result.length > MAX_CHAR_LENGTH + BUFFER)) {
        result = result.substring(0, MAX_CHAR_LENGTH - 1) + ellipsisString;
      }

      return result;
    };
  };

  return  {
    getData: getMapStatsData
  };
})(R6MLangTerms);
