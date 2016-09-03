'use strict';

var R6MapsLangTermsGerman = (function(R6MapsLangTerms, undefined) {
  var name = 'de',
    terms = {
      general: {
        pageTitle: 'Siege Karten - {mapName}',
        pageTitleSelectMap: 'Siege Karten - Wählen Sie eine Karte',
        pageTitleStart: 'Siege Karten',
        cameraViewCaption: 'Überwachungskamera: {floorName}',
        shortcutTip: 'Tastaturkürzel: {shortcut}',
        menu: 'Menü',
        about: 'Über',
        languageHeader: 'Sprache',
        labelLosOpacity: 'Kamera line-of -sight Opazität',
        labelPercent: '{int} %', // according to: (0.12).toLocaleString('de', { style: 'percent' });
        labelLosDefault: '(Standard)',
        labelLos105: '(Huh?)',
        labelLos110: '(Wahnsinn!)'
      },
      selectMaps: {
        selectAMap: 'Wählen Sie eine Karte',
        homeLink: 'Wählen Sie eine Karte'
      },
      languages: {
        en: 'Englisch',
        fr: 'Französisch',
        de: 'Deutsch'
      },
      floorNames: {
        basement: { full: 'K', short: 'K' },
        firstFloor: { full: 'EG', short: 'EG' },
        secondFloor: { full: '1. OG', short: '1. OG' },
        thirdFloor: { full: '2. OG', short: '2. OG' },
        fourthFloor: { full: '3. OG', short: '3. OG' },
        roof: { full: 'AUSSEN', short: 'AUSSEN' }
      },
      objectives: {
        bombShortA: 'A',
        bombShortB: 'B',
        bomb: 'Bombe',
        hostageShort: 'G',
        hostage: 'Geisel',
        secureShort: 'S',
        secure: 'Bereich sichern',
        showAll: 'Alle Missionsziele'
      },
      legend: {
        breakableWalls: 'Zerstörbare Wände',
        breakableFloorTraps: 'Zerstörbare Falltür',
        ceilingHatches: 'Deckenluke',
        lineOfSightWalls: 'Sichtbereich durch zerstörte Wände',
        lineOfSightFloors: 'Sichtbereich Flur',
        droneTunnels: 'Drohnentunnel',
        objectives: 'Missionsziele',
        insertionPoints: 'Einstiegspunkt',
        securityCameras: 'Überwachungskamera',
        skylights: 'Oberlicht',
        onFloorAboveOrBelow: 'Im Stockwerk darüber/darunter',
        cameraLineOfSight: 'Kamerasichtlinie'
      },
      mapNames: {
        bank: 'Bank',
        chalet: 'Chalet',
        club: 'Clubhaus',
        consulate: 'Konsulat',
        hereford: 'Hereford-Basis',
        house: 'Haus',
        kanal: 'Kanal',
        kafe: 'Café Dostojewski',
        oregon: 'Oregon',
        plane: 'Präsidentenflugzeug',
        yacht: 'Jacht'
      },
      mapRooms: {
        bank: {
          spawnBoulevard: 'Parkplatz-Front',
          spawnSewerAccess: 'Juwelier-Front',
          spawnBackAlley: 'Seiteneingang',
          printerRoom: 'Druckerraum',
          parkingLot: 'Parkplatz-Front',
          boulevard: 'Boulevard',
          jewelryFront: 'Juwelier-Front',
          plaza: 'Platz',
          mainEntrance: 'Haupteingang',
          garageRamp: 'Garagenrampe',
          exteriorParking: 'Außenparkplatz',
          garageRoof: 'Garagendach',
          alleyAccess: 'Seiteneingang',
          backAlleyRooftop: 'Seitengassen-Dach',
          backAlley: 'Seitengasse',
          highRoof: 'Oberes Dach',
          lowRoof: 'Unteres Dach',
          vault: 'Tresorraum',
          goldVault: 'Gold-<br/>tresor',
          serverRoomStairs: 'Server-Raum-Treppe',
          serverRoom: 'Server-Raum',
          CCTVRoom: 'Wach-<br/>raum',
          loadingDock: 'Laderampe',
          secureHallway: 'Sicherer<br/>Gang',
          sewer: 'Tunnel | Kanalisation',
          lockers: 'Schließfächer',
          vaultLobby: 'Tresor-Lobby',
          vaultEntrance: 'Tresor-<br/>Eingang',
          mainStairway: 'Haupttreppe',
          bankGarage: 'Bank-Garage',
          elevators: 'Aufzüge',
          tellersOffice: 'Kassier-Büro',
          archives: 'Archiv',
          tellers: 'Schalter',
          loanOffice: 'Kredit-Büro',
          officeHallway: 'Büro-Gang',
          skylightStairwell: 'Oberlicht-Treppe',
          lobby: 'Lobby',
          openArea: 'Großraumbüro',
          staffRoom: 'Personalraum',
          electricalRoom: 'Elektrik',
          adminOffice: 'Verw.-Büro',
          ATMs: 'Geldautomaten',
          executiveHallway: 'Direktoren-<br/>Gang',
          frontDesk: 'Empfang',
          executiveLounge: 'Direktoren-<br/>Lounge',
          CEOOffice: 'CEO-<br/>Büro',
          janitorCloset: 'Hausmeisterschrank',
          hallway: 'Flur',
          terrace: 'Terrasse',
          stockTradingRoom: 'Aktienhandels-<br/>raum',
          conferenceRoom: 'Konferenzraum'
        }
      }
    };

  //R6MapsLangTerms.registerLanguage(name, terms);

  return  {
    name: name,
    terms: terms
  };
})(R6MapsLangTerms);
