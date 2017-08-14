'use strict';

var R6MapsStatsData = (function(R6MapsCommonLangTerms, undefined){
  var getMapStatsData = function getMapStatsData() {
    var terms = R6MapsCommonLangTerms.terms,
      mapRooms = terms.mapRooms,
      getName = getNameFunction(terms);

    return {
      seasons: [5],
      platforms: {
        PC: { seasonSpan: [5,99], name: terms.platforms.pc },
        XONE: { seasonSpan: [5,99], name: terms.platforms.xboxone },
        PS4: { seasonSpan: [5,99], name: terms.platforms.ps4 }
      },
      gameModes: {
        BOMB: { seasonSpan: [5,99], name: terms.objectives.bomb },
        HOSTAGE: { seasonSpan: [5,99], name: terms.objectives.hostage },
        'SECURE AREA': { seasonSpan: [5,99], name: terms.objectives.secure }
      },
      skillRanks: {
        Unranked: { seasonSpan: [5,99], name: terms.ranks.unranked, cssClass: 'unranked' },
        Copper: { seasonSpan: [5,99], name: terms.ranks.copper, cssClass: 'copper' },
        Bronze: { seasonSpan: [5,99], name: terms.ranks.bronze, cssClass: 'bronze' },
        Silver: { seasonSpan: [5,99], name: terms.ranks.silver, cssClass: 'silver' },
        Gold: { seasonSpan: [5,99], name: terms.ranks.gold, cssClass: 'gold' },
        Platinum: { seasonSpan: [5,99], name: terms.ranks.platinum, cssClass: 'platinum' },
        Diamond: { seasonSpan: [5,99], name: terms.ranks.diamond, cssClass: 'diamond' }
      },
      mapRoundWinReasons: { // no need for season span verification
        allTeamsDead: { name: terms.statsRoundWinReasons.allTeamsDead },
        attackersEliminated: { name: terms.statsRoundWinReasons.attackersEliminated },
        attackersKilledHostage: { name: terms.statsRoundWinReasons.attackersKilledHostage },
        attackersSurrendered: { name: terms.statsRoundWinReasons.attackersSurrendered },
        bombDeactivated_OneBomb: { name: terms.statsRoundWinReasons.bombDeactivated_OneBomb },
        bombExploded: { name: terms.statsRoundWinReasons.bombExploded },
        defendersEliminated: { name: terms.statsRoundWinReasons.defendersEliminated },
        defendersKilledHostage: { name: terms.statsRoundWinReasons.defendersKilledHostage },
        defendersSurrendered: { name: terms.statsRoundWinReasons.defendersSurrendered },
        defuserDeactivated: { name: terms.statsRoundWinReasons.defuserDeactivated },
        hostageExtracted: { name: terms.statsRoundWinReasons.hostageExtracted },
        noEnemies: { name: terms.statsRoundWinReasons.noEnemies },
        objectiveCaptured: { name: terms.statsRoundWinReasons.objectiveCaptured },
        objectiveProtected: { name: terms.statsRoundWinReasons.objectiveProtected },
        timeExpired: { name: terms.statsRoundWinReasons.timeExpired }
      },
      operators: { // probably no need for season span verification
        'BOPE-CAPITAO': { name: terms.operators.capitao, cssClass: 'capitao' },
        'G.E.O.-JACKAL': { name: terms.operators.jackal, cssClass: 'jackal' },
        'GIGN-MONTAGNE': { name: terms.operators.montagne, cssClass: 'montagne' },
        'GIGN-RESERVE': { name: terms.operators.gignRecruit, cssClass: 'montagne' },
        'GIGN-TWITCH': { name: terms.operators.twitch, cssClass: 'twitch' },
        'GSG9-BLITZ': { name: terms.operators.blitz, cssClass: 'blitz' },
        'GSG9-IQ': { name: terms.operators.iq, cssClass: 'iq' },
        'GSG9-RESERVE': { name: terms.operators.gsg9Recruit, cssClass: 'gsg9-recruit' },
        'JTF2-BUCK': { name: terms.operators.buck, cssClass: 'buck' },
        'NAVYSEAL-BLACKBEARD': { name: terms.operators.blackbeard, cssClass: 'blackbeard' },
        'SAS-RESERVE': { name: terms.operators.sasRecruit, cssClass: 'sas-recruit' },
        'SAS-SLEDGE': { name: terms.operators.sledge, cssClass: 'sledge' },
        'SAS-THATCHER': { name: terms.operators.thatcher, cssClass: 'thatcher' },
        'SAT-HIBANA': { name: terms.operators.hibana, cssClass: 'hibana' },
        'SPETSNAZ-FUZE': { name: terms.operators.fuze, cssClass: 'fuze' },
        'SPETSNAZ-GLAZ': { name: terms.operators.glaz, cssClass: 'glaz' },
        'SPETSNAZ-RESERVE': { name: terms.operators.spetsnazRecruit, cssClass: 'spetsnaz-recruit' },
        'SWAT-ASH': { name: terms.operators.ash, cssClass: 'ash' },
        'SWAT-RESERVE': { name: terms.operators.swatRecruit, cssClass: 'swat-recruit' },
        'SWAT-THERMITE': { name: terms.operators.thermite, cssClass: 'thermite' },
        'BOPE-CAVEIRA': { name: terms.operators.caveira, cssClass: 'caveira' },
        'G.E.O.-MIRA': { name: terms.operators.mira, cssClass: 'mira' },
        'GIGN-DOC': { name: terms.operators.doc, cssClass: 'doc' },
        'GIGN-ROOK': { name: terms.operators.rook, cssClass: 'rook' },
        'GSG9-BANDIT': { name: terms.operators.bandit, cssClass: 'bandit' },
        'GSG9-JAGER': { name: terms.operators.jager, cssClass: 'jager' },
        'JTF2-FROST': { name: terms.operators.frost, cssClass: 'frost' },
        'NAVYSEAL-VALKYRIE': { name: terms.operators.valkyrie, cssClass: 'valkyrie' },
        'SAS-MUTE': { name: terms.operators.mute, cssClass: 'mute' },
        'SAS-SMOKE': { name: terms.operators.smoke, cssClass: 'smoke' },
        'SAT-ECHO': { name: terms.operators.echo, cssClass: 'echo' },
        'SPETSNAZ-KAPKAN': { name: terms.operators.kapkan, cssClass: 'kapkan' },
        'SPETSNAZ-TACHANKA': { name: terms.operators.tachanka, cssClass: 'tachanka' },
        'SWAT-CASTLE': { name: terms.operators.castle, cssClass: 'castle' },
        'SWAT-PULSE': { name: terms.operators.pulse, cssClass: 'pulse' }
      },
      mapsGameModeObjectiveLocations: {
        BANK: {
          name: terms.mapNames.bank,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'LOCKERS / CCTV ROOM': { seasonSpan: [5,99], name: getName(mapRooms.bank.lockers, mapRooms.bank.CCTVRoom) },
              'STAFF ROOM / OPEN AREA': { seasonSpan: [5,99], name: getName(mapRooms.bank.staffRoom, mapRooms.bank.openArea) },
              'TELLERS\' OFFICE / ARCHIVES': { seasonSpan: [5,99], name: getName(mapRooms.bank.tellersOffice, mapRooms.bank.archives) }
            },
            HOSTAGE: {
              'CEO OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.bank.CEOOffice) },
              'STAFF ROOM': { seasonSpan: [5,99], name: getName(mapRooms.bank.staffRoom) },
              'TELLER\'S OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.bank.tellersOffice) },
              VAULT: { seasonSpan: [5,99], name: getName(mapRooms.bank.vault) }
            },
            'SECURE AREA': {
              ARCHIVES: { seasonSpan: [5,99], name: getName(mapRooms.bank.archives) },
              'CEO OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.bank.CEOOffice) },
              LOCKERS: { seasonSpan: [5,99], name: getName(mapRooms.bank.lockers) },
              'OPEN AREA': { seasonSpan: [5,99], name: getName(mapRooms.bank.openArea) }
            }
          }
        },
        'BARTLETT U.': {
          name: terms.mapNames.bartlett,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'CLASSROOM / LIBRARY': { seasonSpan: [5,99], name: getName(mapRooms.bartlett.classroom, mapRooms.bartlett.upperLibrary) },
              'KITCHEN / PIANO ROOM': { seasonSpan: [5,99], name: getName(mapRooms.bartlett.kitchen, mapRooms.bartlett.pianoRoom) },
              'READING ROOM / LIBRARY': { seasonSpan: [5,99], name: getName(mapRooms.bartlett.readingRoom, mapRooms.bartlett.lowerLibrary) },
              'ROWING MUSEUM / TROPHY ROOM': { seasonSpan: [5,99], name: getName(mapRooms.bartlett.rowingMuseum, mapRooms.bartlett.trophyRoom) }
            },
            HOSTAGE: {
              KITCHEN: { seasonSpan: [5,99], name: getName(mapRooms.bartlett.kitchen) },
              LIBRARY: { seasonSpan: [5,99], name: getName(mapRooms.bartlett.upperLibrary) },
              'MAIN OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.bartlett.mainOffice) },
              'TROPHY ROOM': { seasonSpan: [5,99], name: getName(mapRooms.bartlett.trophyRoom) }
            },
            'SECURE AREA': {
              CLASSROOM: { seasonSpan: [5,99], name: getName(mapRooms.bartlett.classroom) },
              LIBRARY: { seasonSpan: [5,99], name: getName(mapRooms.bartlett.upperLibrary) },
              LOUNGE: { seasonSpan: [5,99], name: getName(mapRooms.bartlett.lounge) },
              'MODEL HALL': { seasonSpan: [5,99], name: getName(mapRooms.bartlett.modelHall) }
            }
          }
        },
        BORDER: {
          name: terms.mapNames.border,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'ARMORY LOCKERS / ARCHIVES': { seasonSpan: [5,99], name: getName(mapRooms.border.armoryLockers, mapRooms.border.archives) },
              'BATHROOM / TELLERS': { seasonSpan: [5,99], name: getName(mapRooms.border.bathroom, mapRooms.border.tellers) },
              'CUSTOMS INSPECTIONS / SUPPLY ROOM': { seasonSpan: [5,99], name: getName(mapRooms.border.customsInspection, mapRooms.border.supplyRoom) },
              'VENTILATION ROOM / WORKSHOP': { seasonSpan: [5,99], name: getName(mapRooms.border.ventilationRoom, mapRooms.border.workshop) }
            },
            HOSTAGE: {
              'CUSTOMS INSPECTIONS': { seasonSpan: [5,99], name: getName(mapRooms.border.customsInspection) },
              OFFICES: { seasonSpan: [5,99], name: getName(mapRooms.border.offices) },
              'SECURITY ROOM': { seasonSpan: [5,99], name: getName(mapRooms.border.securityRoom) },
              WORKSHOP: { seasonSpan: [5,99], name: getName(mapRooms.border.workshop) }
            },
            'SECURE AREA': {
              'ARMORY LOCKERS': { seasonSpan: [5,99], name: getName(mapRooms.border.armoryLockers) },
              OFFICES: { seasonSpan: [5,99], name: getName(mapRooms.border.offices) },
              TELLERS: { seasonSpan: [5,99], name: getName(mapRooms.border.tellers) },
              WORKSHOP: { seasonSpan: [5,99], name: getName(mapRooms.border.workshop) }
            }
          }
        },
        CHALET: {
          name: terms.mapNames.chalet,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'BAR / GAMING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.chalet.bar, mapRooms.chalet.gamingRoom) },
              'KITCHEN / TROPHY ROOM': { seasonSpan: [5,99], name: getName(mapRooms.chalet.kitchen, mapRooms.chalet.trophyRoom) },
              'MASTER BEDROOM / OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.chalet.masterBedroom, mapRooms.chalet.office) },
              'WINE CELLAR / SNOWMOBILE GARAGE': { seasonSpan: [5,99], name: getName(mapRooms.chalet.wineCellar, mapRooms.chalet.snowmobileGarage) }
            },
            HOSTAGE: {
              KITCHEN: { seasonSpan: [5,99], name: getName(mapRooms.chalet.kitchen) },
              LIBRARY: { seasonSpan: [5,99], name: getName(mapRooms.chalet.library) },
              'MASTER BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.chalet.masterBedroom) },
              'WINE CELLAR': { seasonSpan: [5,99], name: getName(mapRooms.chalet.wineCellar) }
            },
            'SECURE AREA': {
              BAR: { seasonSpan: [5,99], name: getName(mapRooms.chalet.bar) },
              'DINING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.chalet.diningRoom) },
              LIBRARY: { seasonSpan: [5,99], name: getName(mapRooms.chalet.library) },
              'SNOWMOBILE GARAGE': { seasonSpan: [5,99], name: getName(mapRooms.chalet.snowmobileGarage) }
            }
          }
        },
        'CLUB HOUSE': {
          name: terms.mapNames.club,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'BAR / STOCK ROOM': { seasonSpan: [5,99], name: getName(mapRooms.club.bar, mapRooms.club.stockRoom) },
              'CCTV ROOM / CASH ROOM': { seasonSpan: [5,99], name: getName(mapRooms.club.CCTVRoom, mapRooms.club.cashRoom) },
              'CHURCH / ARSENAL ROOM': { seasonSpan: [5,99], name: getName(mapRooms.club.church, mapRooms.club.arsenalRoom) },
              'GYM / BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.club.gym, mapRooms.club.bedroom) }
            },
            HOSTAGE: {
              BEDROOM: { seasonSpan: [5,99], name: getName(mapRooms.club.bedroom) },
              'CASH ROOM': { seasonSpan: [5,99], name: getName(mapRooms.club.cashRoom) },
              CHURCH: { seasonSpan: [5,99], name: getName(mapRooms.club.church) },
              'STRIP CLUB': { seasonSpan: [5,99], name: getName(mapRooms.club.stripClub) }
            },
            'SECURE AREA': {
              'ARSENAL ROOM': { seasonSpan: [5,99], name: getName(mapRooms.club.arsenalRoom) },
              'BAR BACKSTORE': { seasonSpan: [5,99], name: getName(mapRooms.club.bar) },
              BEDROOM: { seasonSpan: [5,99], name: getName(mapRooms.club.bedroom) },
              GARAGE: { seasonSpan: [5,99], name: getName(mapRooms.club.garage) }
            }
          }
        },
        COASTLINE: {
          name: terms.mapNames.coastline,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              '1F BLUE BAR / 1F SUNRISE BAR': { seasonSpan: [5,99], name: getName(mapRooms.coastline.blueBar, mapRooms.coastline.sunriseBar) },
              '1F KITCHEN / 1F SERVICE ENTRANCE': { seasonSpan: [5,99], name: getName(mapRooms.coastline.kitchen, mapRooms.coastline.serviceEntrance) },
              '2F HOOKAH LOUNGE / 2F BILLIARDS ROOM': { seasonSpan: [5,99], name: getName(mapRooms.coastline.hookahLounge, mapRooms.coastline.billiardsRoom) },
              '2F PENTHOUSE / 2F THEATER': { seasonSpan: [5,99], name: getName(mapRooms.coastline.penthouse, mapRooms.coastline.theater) }
            },
            HOSTAGE: {
              '1F BLUE BAR': { seasonSpan: [5,99], name: getName(mapRooms.coastline.blueBar) },
              '1F KITCHEN': { seasonSpan: [5,99], name: getName(mapRooms.coastline.kitchen) },
              '2F THEATER': { seasonSpan: [5,99], name: getName(mapRooms.coastline.theater) },
              '2F VIP LOUNGE': { seasonSpan: [5,99], name: getName(mapRooms.coastline.vipLounge) }
            },
            'SECURE AREA': {
              '1F BLUE BAR': { seasonSpan: [5,99], name: getName(mapRooms.coastline.blueBar) },
              '1F KITCHEN': { seasonSpan: [5,99], name: getName(mapRooms.coastline.kitchen) },
              '2F BILLIARDS ROOM': { seasonSpan: [5,99], name: getName(mapRooms.coastline.billiardsRoom) },
              '2F PENTHOUSE': { seasonSpan: [5,99], name: getName(mapRooms.coastline.penthouse) }
            }
          }
        },
        CONSULATE: {
          name: terms.mapNames.consulate,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'CONSUL OFFICE / MEEETING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.consulate.consulateOffice, mapRooms.consulate.meetingRoom) },
              'GARAGE / CAFETERIA': { seasonSpan: [5,99], name: getName(mapRooms.consulate.garage, mapRooms.consulate.cafeteria) },
              'LOBBY / PRESS ROOM': { seasonSpan: [5,99], name: getName(mapRooms.consulate.lobby, mapRooms.consulate.pressRoom) }
            },
            HOSTAGE: {
              'ADMINISTRATION OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.consulate.administrationOffice) },
              ARCHIVES: { seasonSpan: [5,99], name: getName(mapRooms.consulate.archives) },
              'CONSUL OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.consulate.consulateOffice) },
              TELLERS: { seasonSpan: [5,99], name: getName(mapRooms.consulate.tellers) }
            },
            'SECURE AREA': {
              'ADMINISTRATION OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.consulate.administrationOffice) },
              ARCHIVES: { seasonSpan: [5,99], name: getName(mapRooms.consulate.archives) },
              GARAGE: { seasonSpan: [5,99], name: getName(mapRooms.consulate.garage) },
              'VISA OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.consulate.visaOffice) }
            }
          }
        },
        FAVELAS: {
          name: terms.mapNames.favela,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              '1F BIKER\'S APARTMENT / 1F BIKER\'S BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.favela.bikersApartment, mapRooms.favela.bikersBedroom) },
              '2F AUNT\'S BEDROOM / 1F AUNT\'S APARTMENT': { seasonSpan: [5,99], name: getName(mapRooms.favela.auntsBedroom, mapRooms.favela.auntsApartment) },
              '2F FOOTBALL BEDROOM / 2F FOOTBALL OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.favela.footballBedroom, mapRooms.favela.footballOffice) },
              '3F PACKAGING ROOM / 2F METH LAB': { seasonSpan: [5,99], name: getName(mapRooms.favela.packagingRoom, mapRooms.favela.methLab) }
            },
            HOSTAGE: {
              '1F BIKER\'S APARTMENT': { seasonSpan: [5,99], name: getName(mapRooms.favela.bikersApartment) },
              '2F AUNT\'S BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.favela.auntsBedroom) },
              '2F GROW ROOM': { seasonSpan: [5,99], name: getName(mapRooms.favela.growRoom) },
              '3F PACKAGING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.favela.packagingRoom) }
            },
            'SECURE AREA': {
              '1F ARMORY ROOM': { seasonSpan: [5,99], name: getName(mapRooms.favela.armoryRoom) },
              '1F AUNT\'S APARTMENT': { seasonSpan: [5,99], name: getName(mapRooms.favela.auntsApartment) },
              '2F FOOTBALL APARTMENT': { seasonSpan: [5,99], name: getName(mapRooms.favela.footballApartment) },
              '3F PACKAGING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.favela.packagingRoom) }
            }
          }
        },
        'HEREFORD BASE': {
          name: terms.mapNames.hereford,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'BRIEFING ROOM / ARMORY': { seasonSpan: [5,99], name: getName(mapRooms.hereford.briefingRoom, mapRooms.hereford.armory) },
              'DINING ROOM / KIDS BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.hereford.diningRoom, mapRooms.hereford.kidsBedroom) },
              'DUMMY DEPOT / STORAGE': { seasonSpan: [5,99], name: getName(mapRooms.hereford.dummyDepot, mapRooms.hereford.storage) },
              'TV ROOM / KITCHEN': { seasonSpan: [5,99], name: getName(mapRooms.hereford.TVRoom, mapRooms.hereford.kitchen) }
            },
            HOSTAGE: {
              ARMORY: { seasonSpan: [5,99], name: getName(mapRooms.hereford.armory) },
              KITCHEN: { seasonSpan: [5,99], name: getName(mapRooms.hereford.kitchen) },
              'MASTER BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.hereford.masterBedroom) },
              STORAGE: { seasonSpan: [5,99], name: getName(mapRooms.hereford.storage) }
            },
            'SECURE AREA': {
              ARMORY: { seasonSpan: [5,99], name: getName(mapRooms.hereford.armory) },
              'DINING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.hereford.diningRoom) },
              'MASTER BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.hereford.masterBedroom) },
              WORKSHOP: { seasonSpan: [5,99], name: getName(mapRooms.hereford.workshop) }
            }
          }
        },
        HOUSE: {
          name: terms.mapNames.house,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'KID\'S BEDROOM / WORKSHOP': { seasonSpan: [5,99], name: getName(mapRooms.house.kidsBedroom, mapRooms.house.workshop) },
              'LIVING ROOM / TRAINING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.house.livingRoom, mapRooms.house.trainingRoom) },
              'TRAINING ROOM / GARAGE': { seasonSpan: [5,99], name: getName(mapRooms.house.trainingRoom, mapRooms.house.garage) }
            },
            HOSTAGE: {
              'DINING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.house.diningRoom) },
              'LAUNDRY ROOM': { seasonSpan: [5,99], name: getName(mapRooms.house.laundryRoom) },
              'MASTER BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.house.masterBedroom) },
              WORKSHOP: { seasonSpan: [5,99], name: getName(mapRooms.house.workshop) }
            },
            'SECURE AREA': {
              GARAGE: { seasonSpan: [5,99], name: getName(mapRooms.house.garage) },
              'KID\'S BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.house.kidsBedroom) },
              'LIVING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.house.livingRoom) },
              'MASTER BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.house.masterBedroom) }
            }
          }
        },
        'KAFE DOSTOYEVSKY': {
          name: terms.mapNames.kafe,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'BAR / COCKTAIL LOUNGE': { seasonSpan: [5,99], name: getName(mapRooms.kafe.bar, mapRooms.kafe.cocktailLounge) },
              'FIREPLACE HALL / MINING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.kafe.fireplaceHall, mapRooms.kafe.miningRoom) },
              'KITCHEN PREP / BAKERY': { seasonSpan: [5,99], name: getName(mapRooms.kafe.kitchenPrep, mapRooms.kafe.bakery) }
            },
            HOSTAGE: {
              'BAR BACKSTORE': { seasonSpan: [5,99], name: getName(mapRooms.kafe.barBackstore) },
              'KITCHEN GRILL': { seasonSpan: [5,99], name: getName(mapRooms.kafe.kitchenGrill) },
              'READING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.kafe.readingRoom) },
              'TRAIN MUSEUM': { seasonSpan: [5,99], name: getName(mapRooms.kafe.trainMuseum) }
            },
            'SECURE AREA': {
              'CIGAR LOUNGE': { seasonSpan: [5,99], name: getName(mapRooms.kafe.cigarLounge) },
              'KITCHEN PREP': { seasonSpan: [5,99], name: getName(mapRooms.kafe.kitchenPrep) },
              'READING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.kafe.readingRoom) },
              'TRAIN MUSEUM': { seasonSpan: [5,99], name: getName(mapRooms.kafe.trainMuseum) }
            }
          }
        },
        KANAL: {
          name: terms.mapNames.kanal,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'COAST GUARD OFFICE / HOLDING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.kanal.coastGuardOffice, mapRooms.kanal.holdingRoom) },
              'KITCHEN / PROJECTOR ROOM': { seasonSpan: [5,99], name: getName(mapRooms.kanal.kitchen, mapRooms.kanal.projectorRoom) },
              'SERVER ROOM / CONTROL ROOM': { seasonSpan: [5,99], name: getName(mapRooms.kanal.serverRoom, mapRooms.kanal.controlRoom) }
            },
            HOSTAGE: {
              'BOAT SUPPLIES': { seasonSpan: [5,99], name: getName(mapRooms.kanal.boatSupplies) },
              'COAST GUARD OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.kanal.coastGuardOffice) },
              'CONTROL ROOM': { seasonSpan: [5,99], name: getName(mapRooms.kanal.controlRoom) },
              'MAPS OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.kanal.mapsOffice) }
            },
            'SECURE AREA': {
              'BOAT SUPPLIES': { seasonSpan: [5,99], name: getName(mapRooms.kanal.boatSupplies) },
              'COAST GUARD OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.kanal.coastGuardOffice) },
              'MAPS OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.kanal.mapsOffice) },
              'SERVER ROOM': { seasonSpan: [5,99], name: getName(mapRooms.kanal.serverRoom) }
            }
          }
        },
        OREGON: {
          name: terms.mapNames.oregon,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'KIDS DORMS / DORMS MAIN HALL': { seasonSpan: [5,99], name: getName(mapRooms.oregon.kidsDorm, mapRooms.oregon.dormMainHall) },
              'KITCHEN / DINING HALL': { seasonSpan: [5,99], name: getName(mapRooms.oregon.kitchen, mapRooms.oregon.diningHall) },
              'LAUDRY ROOM / SUPPLY ROOM': { seasonSpan: [5,99], name: getName(mapRooms.oregon.laundryRoom, mapRooms.oregon.supplyRoom) },
              'REAR STAGE / WATCH TOWER': { seasonSpan: [5,99], name: getName(mapRooms.oregon.rearStage, mapRooms.oregon.watchTower) }
            },
            HOSTAGE: {
              'DORMS MAIN HALL': { seasonSpan: [5,99], name: getName(mapRooms.oregon.dormMainHall) },
              KITCHEN: { seasonSpan: [5,99], name: getName(mapRooms.oregon.kitchen) },
              'MEETING HALL': { seasonSpan: [5,99], name: getName(mapRooms.oregon.meetingHall) },
              SUPPLY: { seasonSpan: [5,99], name: getName(mapRooms.oregon.supplyRoom) }
            },
            'SECURE AREA': {
              'DINING HALL': { seasonSpan: [5,99], name: getName(mapRooms.oregon.diningHall) },
              'DORMS MAIN HALL': { seasonSpan: [5,99], name: getName(mapRooms.oregon.dormMainHall) },
              'LAUNDRY ROOM': { seasonSpan: [5,99], name: getName(mapRooms.oregon.laundryRoom) },
              'MEETING HALL': { seasonSpan: [5,99], name: getName(mapRooms.oregon.meetingHall) }
            }
          }
        },
        PLANE: {
          name: terms.mapNames.plane,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'CARGO HOLD / LUGGAGE HOLD': { seasonSpan: [5,99], name: getName(mapRooms.plane.cargoHold, mapRooms.plane.luggageHold) },
              'MEETING ROOM / EXECUTIVE OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.plane.meetingRoom, mapRooms.plane.executiveOffice) },
              'STAFF SECTION / EXECUTIVE BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.plane.staffSection, mapRooms.plane.executiveBedroom) }
            },
            HOSTAGE: {
              'EXECUTIVE BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.plane.executiveBedroom) },
              'LUGGAGE HOLD': { seasonSpan: [5,99], name: getName(mapRooms.plane.luggageHold) },
              'MEETING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.plane.meetingRoom) },
              'PRESS SECTION A': { seasonSpan: [5,99], name: getName(mapRooms.plane.pressSectionA) }
            },
            'SECURE AREA': {
              'EXECUTIVE BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.plane.executiveBedroom) },
              'LUGGAGE HOLD': { seasonSpan: [5,99], name: getName(mapRooms.plane.luggageHold) },
              'MEETING ROOM': { seasonSpan: [5,99], name: getName(mapRooms.plane.meetingRoom) },
              'STAFF SECTION': { seasonSpan: [5,99], name: getName(mapRooms.plane.staffSection) }
            }
          }
        },
        SKYSCRAPER: {
          name: terms.mapNames.skyscraper,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              '1F BBQ / 1F KITCHEN': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.bbq, mapRooms.skyscraper.kitchen) },
              '1F BEDROOM / 1F BATHROOM': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.bedroom, mapRooms.skyscraper.bathroom) },
              '2F EXHIBITION / 2F WORK OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.exhibition, mapRooms.skyscraper.workOffice) },
              '2F KARAOKE / 2F TEA ROOM': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.karaoke , mapRooms.skyscraper.teaRoom) }
            },
            HOSTAGE: {
              '1F BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.bedroom) },
              '1F KITCHEN': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.kitchen) },
              '2F GEISHA ROOM': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.geishaRoom) },
              '2F WORK OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.workOffice) }
            },
            'SECURE AREA': {
              '1F BBQ': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.bbq) },
              '1F BEDROOM': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.bedroom) },
              '2F TEA ROOM': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.teaRoom) },
              '2F WORK OFFICE': { seasonSpan: [5,99], name: getName(mapRooms.skyscraper.workOffice) }
            }
          }
        },
        YACHT: {
          name: terms.mapNames.yacht,
          seasonSpan: [5,99],
          objectives: {
            BOMB: {
              'CAFETERIA / STAFF DORMITORY': { seasonSpan: [5,99], name: getName(mapRooms.yacht.cafeteria, mapRooms.yacht.staffDormitory) },
              'KITCHEN / ENGINE CONTROL': { seasonSpan: [5,99], name: getName(mapRooms.yacht.kitchen, mapRooms.yacht.engineControl) },
              'MAPS ROOM / COCKPIT': { seasonSpan: [5,99], name: getName(mapRooms.yacht.mapsRoom, mapRooms.yacht.cockpit) },
              'SERVER ROOM / ENGINE STORAGE': { seasonSpan: [5,99], name: getName(mapRooms.yacht.serverRoom, mapRooms.yacht.engineStorage) }
            },
            HOSTAGE: {
              CAFETERIA: { seasonSpan: [5,99], name: getName(mapRooms.yacht.cafeteria) },
              CASINO: { seasonSpan: [5,99], name: getName(mapRooms.yacht.casino) },
              ENGINE: { seasonSpan: [5,99], name: getName(mapRooms.yacht.engine) },
              'MAPS ROOM': { seasonSpan: [5,99], name: getName(mapRooms.yacht.mapsRoom) }
            },
            'SECURE AREA': {
              'AKLARK SUB ROOM': { seasonSpan: [5,99], name: getName(mapRooms.yacht.borealSubRoom) },
              CASINO: { seasonSpan: [5,99], name: getName(mapRooms.yacht.casino) },
              COCKPIT: { seasonSpan: [5,99], name: getName(mapRooms.yacht.cockpit) },
              KITCHEN: { seasonSpan: [5,99], name: getName(mapRooms.yacht.kitchen) }
            }
          }
        }
      }
    };
  };

  var getNameFunction = function getNameFunction(terms) {
    var MAX_CHAR_LENGTH = 22,
      BUFFER = 5,
      ellipsisString = terms.stats.ellipsis;

    return function getName(name1, name2) {
      //console.log(name1, name2);
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
})(R6MapsCommonLangTerms);
