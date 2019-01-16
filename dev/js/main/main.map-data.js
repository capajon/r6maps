'use strict';

var R6MMainData = (function(R6MLangTerms, undefined){
  var DRONE_MED = 18,
    DRONE_SMALL = 14,
    mapRoomTerms = R6MLangTerms.terms.mapRooms,
    mapNameTerms = R6MLangTerms.terms.mapNames,
    objectiveTerms = R6MLangTerms.terms.objectives,
    floorTerms = R6MLangTerms.terms.floorNames,
    spawnTerms = R6MLangTerms.terms.spawnPoints,
    bankTerms = mapRoomTerms.bank,
    borderTerms = mapRoomTerms.border,
    chaletTerms = mapRoomTerms.chalet,
    clubTerms = mapRoomTerms.club,
    consulateTerms = mapRoomTerms.consulate,
    favelaTerms = mapRoomTerms.favela,
    fortressTerms = mapRoomTerms.fortress,
    herefordTerms = mapRoomTerms.hereford,
    houseTerms = mapRoomTerms.house,
    kanalTerms = mapRoomTerms.kanal,
    kafeTerms = mapRoomTerms.kafe,
    oregonTerms = mapRoomTerms.oregon,
    planeTerms = mapRoomTerms.plane,
    skyscraperTerms = mapRoomTerms.skyscraper,
    bartlettTerms = mapRoomTerms.bartlett,
    coastlineTerms = mapRoomTerms.coastline,
    themeparkTerms = mapRoomTerms.themepark,
    towerTerms = mapRoomTerms.tower,
    yachtTerms = mapRoomTerms.yacht,
    villaTerms = mapRoomTerms.villa;

  var getMapData = function getMapData() {
    return {
      bank: {
        name: mapNameTerms.bank,
        imgUrlPrefix: 'bank',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 0, top: -715, left: -1275, background: true, name: floorTerms.basement },
          { index: 1, top: -537, left: -601, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -537, left: -601, name: floorTerms.secondFloor },
          { index: 3, top: -537, left: -601, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 0, top: -160, left: -69 },
          { floor: 1, top: -26, left: -15 },
          { floor: 1, top: 65, left: 281 },
          { floor: 2, top: -102, left: 138 }
        ],
        bombObjectives: [
          { floor: 0, top: 8, left: 193, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 0, top: 34, left: -31, set: 4, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -26, left: 26, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -100, left: 169, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 1, top: 160, left: 97, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 100, left: 345, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -52, left: -13, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -151, left: 138, set: 1, letter: objectiveTerms.bombShortA }
        ],
        secureObjectives: [
          { floor: 0, top: 10, left: -67 },
          { floor: 1, top: 209, left: 113 },
          { floor: 1, top: -100, left: 125 },
          { floor: 2, top: -52, left: 138 }
        ],
        zoomPoints: {
          topLeft: { top: -368, left: -483 },
          bottomRight: { top: 310, left: 397 }
        },
        compassPoints: {
          top: 316, left: 741
        },
        ladders: [
          { floor: 1, top: -440, left: 554, otherFloor: 'down' },
          { floor: 0, top: -440, left: 554, otherFloor: 'up' },
          { floor: 1, top: -415, left: -711, otherFloor: 'up' },
          { floor: 2, top: -415, left: -711, otherFloor: 'down' },
          { floor: 1, top: 542, left: 588, otherFloor: 'up' },
          { floor: 2, top: 542, left: 588, otherFloor: 'down' }
        ],
        cameras: [
          { floor: 1, otherFloor: 'up', top: -157, left: -392, id: 1, location: bankTerms.lobby },
          {
            floor: 2, top: -157, left: -392, id: 1, location: bankTerms.lobby,
            los: [[{top: -278, left: -414}, {top: -163, left: -434}, {top: 61, left: -413}]]
          },
          {
            floor: 1, top: 100, left: 42, id: 2, location: bankTerms.officeHallway,
            los: [[{top: 85, left: -211},{top: 85, left: 61},{top: 136, left: 61}]]
          },
          {
            floor: 2, top: -171, left: 244, id: 3, location: bankTerms.skylightStairwell,
            los: [[{top: 91, left: 227},{top: -185, left: 227},{top: -185, left: 420}]]
          },
          {
            floor: 0, top: 119, left: -203, id: 4, location: bankTerms.vaultLobby,
            los: [[{top: 51, left: -220}, {top: 135, left: -220}, {top: 135, left: -12}]]
          },
          {
            outdoor: true, top: -431, left: 5, id: 5, location: bankTerms.plaza,
            los: [[{top: -490, left: -977},{top: -503, left: 36},{top: -302, left: 457}]]
          },
          {
            floor: 0, top: 148, left: -518, id: 6, location: bankTerms.garageRamp,
            los: [[{top: -363, left: -515},{top: 82, left: -538},{top: 212, left: -538},{top: 241, left: -530},{top: 269, left: -516},{top: 292, left: -494},{top: 312, left: -461},{top: 322, left: -427},{top: 324, left: -303}]]
          },
          { floor: 1, otherFloor: 'down', top: 148, left: -518, id: 6, location: bankTerms.garageRamp },
          {
            outdoor: true, top: 115, left: 562, id: 7, location: bankTerms.backAlley,
            los: [[{top: 49, left: 577}, {top: 115, left: 584}, {top: 288, left: 571}]]
          }
        ],
        ceilingHatches: [
          { floor: 0, top: 10, left: -138 },
          { floor: 0, top: 197, left: -190 },
          { floor: 0, top: 112, left: 88 },
          { floor: 0, top: 50, left: 169 },
          { floor: 0, top: -101, left: 320 },
          { floor: 1, top: 196, left: -123 },
          { floor: 1, top: 258, left: 55 },
          { floor: 1, top: 139, left: 139 },
          { floor: 1, top: 52, left: 134 }
        ],
        skylights: [
          { floor: 1, otherFloor: 'up', top: -102, left: 320 },
          { floor: 1, otherFloor: 'up', top: -176, left: -314 },
          { floor: 1, otherFloor: 'up', top: 32, left: -314 },
          { floor: 1, otherFloor: 'up', top: 201, left: -36 },
          { floor: 2, top: -102, left: 320 },
          { floor: 2, top: -176, left: -314 },
          { floor: 2, top: 40, left: -314 },
          { floor: 2, top: 201, left: -36 },
          { floor: 3, otherFloor: 'down', top: -102, left: 320 },
          { floor: 3, otherFloor: 'down', top: -176, left: -314 },
          { floor: 3, otherFloor: 'down', top: 40, left: -314 },
          { floor: 3, otherFloor: 'down', top: 201, left: -36 }
        ],
        droneTunnels: [
          { floor: 0, top: -190, left: -422, rotate: 116, size: 22 },
          { floor: 0, top: 59, left: -223, rotate: 116, size: DRONE_MED },
          { floor: 1, top: 80, left: -101, rotate: 0, size: DRONE_SMALL },
          { floor: 1, top: 5, left: 84, rotate: 0, size: DRONE_MED },
          { floor: 2, top: -6, left: 90, rotate: 0, size: DRONE_MED },
          { floor: 2, top: 89, left: 95, rotate: 0, size: DRONE_MED },
          { floor: 1, top: 277, left: 321, rotate: 90, size: DRONE_MED }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -590, left: -888, description: bankTerms.spawnBoulevard },
          { letter: spawnTerms.b, top: -446, left: 641, description: bankTerms.jewelryFront },
          { letter: spawnTerms.c, top: 534, left: 652, description: bankTerms.spawnBackAlley }
        ],
        roomLabels: [
          { outdoor: true, description: bankTerms.parkingLot, top: -575, left: -661 },
          { outdoor: true, description: bankTerms.boulevard, top: -575, left: -156 },
          { outdoor: true, description: bankTerms.jewelryFront, top: -575, left: 538 },
          { outdoor: true, description: bankTerms.plaza, top: -295, left: 239 },
          { outdoor: true, description: bankTerms.mainEntrance, top: -448, left: -225 },
          { outdoor: true, alwasyShow: true, description: bankTerms.garageRamp, top: -143, left: -486 },
          { outdoor: true, description: bankTerms.exteriorParking, top: -216, left: -720 },
          { floor: 1, description: bankTerms.garageRoof, top: 236, left: -274 },
          { floor: 2, description: bankTerms.garageRoof, top: 236, left: -274 },
          { floor: 3, description: bankTerms.garageRoof, top: 236, left: -274 },
          { outdoor: true, description: bankTerms.alleyAccess, top: 648, left: 647 },
          { outdoor: true, description: bankTerms.backAlleyRooftop, top: 495, left: 360 },
          { outdoor: true, description: bankTerms.backAlley, top: 336, left: 647 },
          { outdoor: true, floor: 3, description: bankTerms.highRoof, top: -13, left: -136 },
          { outdoor: true, floor: 3, description: bankTerms.lowRoof, top: 56, left: 129 },
          { floor: 0, description: bankTerms.vault, top: -150, left: -151 },
          { floor: 0, description: bankTerms.goldVault, top: -128, left: 100 },
          { floor: 0, description: bankTerms.serverRoomStairs, top: -161, left: 278 },
          { floor: 0, description: bankTerms.serverRoom, top: -59, left: 321 },
          { floor: 0, description: bankTerms.CCTVRoom, top: 53, left: 208 },
          { floor: 0, description: bankTerms.loadingDock, top: 167, left: 56 },
          { floor: 0, description: bankTerms.secureHallway, top: 53, left: 101 },
          { floor: 0, description: bankTerms.secureHallway, top: 114, left: 32 },
          { floor: 0, description: bankTerms.sewer, top: -255, left: 455 },
          { floor: 0, description: bankTerms.lockers, top: 4, left: 2 },
          { floor: 0, description: bankTerms.vaultLobby, top: 94, left: -128 },
          { floor: 0, description: bankTerms.vaultEntrance, top: 13, left: -189 },
          { floor: 0, description: bankTerms.mainStairway, top: 237, left: -34 },
          { floor: 0, description: bankTerms.bankGarage, top: 315, left: -137 },
          { floor: 0, smaller: true, description: bankTerms.elevators, top: 170, left: -183 },
          { floor: 1, description: bankTerms.printerRoom, top: 255, left: 265 },
          { floor: 1, description: bankTerms.tellersOffice, top: -92, left: 27 },
          { floor: 1, description: bankTerms.archives, top: -56, left: 153 },
          { floor: 1, description: bankTerms.tellers, top: -70, left: -90 },
          { floor: 1, description: bankTerms.loanOffice, top: 132, left: -328 },
          { floor: 1, description: bankTerms.officeHallway, top: 123, left: -81 },
          { floor: 1, description: bankTerms.mainStairway, top: 237, left: -34 },
          { floor: 1, description: bankTerms.skylightStairwell, top: -61, left: 318 },
          { floor: 1, description: bankTerms.lobby, top: -141, left: -234 },
          { floor: 2, description: bankTerms.lobby, top: -141, left: -234 },
          { floor: 1, description: bankTerms.openArea, top: 183, left: 162 },
          { floor: 1, description: bankTerms.staffRoom, top: 145, left: 283 },
          { floor: 1, description: bankTerms.electricalRoom, top: 18, left: 441 },
          { floor: 1, description: bankTerms.adminOffice, top: 34, left: 143 },
          { floor: 1, description: bankTerms.ATMs, top: -318, left: -223 },
          { floor: 1, smaller: true, description: bankTerms.elevators, top: 170, left: -118 },
          { floor: 1, smaller: true, description: bankTerms.elevators, top: 170, left: -183 },
          { floor: 2, hardToRead: true, description: bankTerms.executiveHallway, top: -166, left: 22 },
          { floor: 2, description: bankTerms.frontDesk, top: -41, left: -138 },
          { floor: 2, hardToRead: true, description: bankTerms.executiveLounge, top: -75, left: 39 },
          { floor: 2, hardToRead: true, description: bankTerms.CEOOffice, top: -32, left: 175 },
          { floor: 2, hardToRead: true, description: bankTerms.skylightStairwell, top: -8, left: 319 },
          { floor: 2, hardToRead: true, description: bankTerms.janitorCloset, top: 22, left: 149 },
          { floor: 2, description: bankTerms.hallway, top: 127, left: -20 },
          { floor: 2, description: bankTerms.mainStairway, top: 237, left: -34 },
          { floor: 2, description: bankTerms.terrace, top: 147, left: 320 },
          { floor: 2, hardToRead: true, description: bankTerms.stockTradingRoom, top: 235, left: 117 },
          { floor: 2, hardToRead: true, description: bankTerms.conferenceRoom, top: 22, left: -32 },
          { floor: 2, smaller: true, description: bankTerms.elevators, top: 170, left: -118 }
        ]
      },
      bartlett: {
        name: mapNameTerms.bartlett,
        imgUrlPrefix: 'bartlett',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 1, top: -715, left: -1275, background: true, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -465, left: -451, name: floorTerms.secondFloor },
          { index: 3, top: -465, left: -451, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 1, top: -96, left: -296 },
          { floor: 1, top: -199, left: 643 },
          { floor: 2, top: 265, left: 336 },
          { floor: 2, top: -171, left: 577 }
        ],
        bombObjectives: [
          { floor: 2, top: -116, left: 577, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 92, left: 596, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 1, top: 102, left: 524, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -199, left: 573, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -63, left: -255, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 293, left: -255, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 2, top: 148, left: -265, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 2, top: -18, left: -298, set: 4, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 1, top: -172, left: -353, otherFloor: 'up' },
          { floor: 2, top: -172, left: -353, otherFloor: 'down' },
          { floor: 1, top: 125, left: 312 },
          { floor: 2, top: 193, left: -265 },
          { floor: 2, top: -17, left: 388 }
        ],
        zoomPoints: {
          topLeft: { top: -426, left: -389 },
          bottomRight: { top: 330, left: 731 }
        },
        compassPoints: {
          top: 392, left: 699
        },
        cameras: [
          {
            floor: 2, top: 175, left: 67, id: 1, location: bartlettTerms.compassHallway,
            los: [[{top: 14, left: 86}, {top: -58, left: 79}], [{top: 16, left: 27}, {top: -38, left: 9}], [{top: 124, left: 2}, {top: 29, left: -115}], [{top: 154, left: -147}, {top: 114, left: -324}], [{top: 178, left: -147}, {top: 172, left: -324}]]
          },
          {
            floor: 2, top: -185, left: 176, id: 2, location: bartlettTerms.vistaHallway,
            los: [[{top: 15, left: 143}, {top: -52, left: 159}, {top: -199, left: 159}, {top: -199, left: 207}, {top: -193, left: 207}, {top: -151, left: 432}], [{top: -101, left: 290}, {top: -87, left: 254}]]
          },
          {
            floor: 1, top: -188, left: -106, id: 3, location: bartlettTerms.archwayHall,
            los: [[{top: -144, left: -154}, {top: -110, left: -218}], [{top: -96, left: -154}, {top: -41, left: -190}], [{top: -43, left: -11}, {top: 81, left: 72}], [{top: 18, left: 21}, {top: 111, left: 72}], [{top: -43, left: 69}, {top: 13, left: 138}]]
          },
          {
            floor: 1, top: 177, left: -124, id: 4, location: bartlettTerms.lobby,
            los: [[{top: 111, left: 22},{top: 55, left: 71}],[{top: 26, left: -141},{top: 192, left: -141},{top: 192, left: 71}]]
          },
          {
            floor: 1, top: -400, left: 356, id: 5, location: bartlettTerms.diningRoom,
            los: [[{top: -196, left: 223},{top: -119, left: 145}], [{top: -197, left: 271},{top: -147, left: 247}], [{top: -142, left: 194},{top: -81, left: 145}]]
          },
          {
            outdoor: true, top: 666, left: 457, id: 6, location: bartlettTerms.mainGate,
            los: [[{top: 518, left: 633}, {top: 724, left: 431}]]
          },
          {
            outdoor: true, top: -525, left: 551, id: 7, location: bartlettTerms.parking,
            los: [[{top: -309, left: 710},{top: -163, left: 798}],[{top: -428, left: 130},{top: -390, left: 63}]]
          }
        ],
        ceilingHatches: [
          { floor: 1, top: 233, left: -337 },
          { floor: 1, top: 56, left: -17 },
          { floor: 1, top: 168, left: 194 },
          { floor: 1, top: 64, left: 374 },
          { floor: 1, top: -17, left: 482 },
          { floor: 1, top: 95, left: 558 },
          { floor: 2, top: -174, left: 433 }
        ],
        skylights: [
          { floor: 1, top: -319, left: 272, otherFloor: 'up' },
          { floor: 2, top: -319, left: 272 },
          { floor: 3, top: -319, left: 272 }
        ],
        droneTunnels: [
          { floor: 1, top: -274, left: 137, rotate: 90, size: DRONE_MED },
          { floor: 1, top: 109, left: 704, rotate: 90, size: DRONE_MED },
          { floor: 1, top: 176, left: 140, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -31, left: -408, rotate: 0, size: 86 },
          { floor: 1, top: -69, left: -395, rotate: 90, size: 34 },

          { floor: 2, top: 1, left: 267, rotate: 90, size: 120 }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: 595, left: -793, description: bartlettTerms.festival },
          { letter: spawnTerms.b, top: 646, left: 320, description: bartlettTerms.mainGate.removeBreakTags() },
          { letter: spawnTerms.c, top: -650, left: -329, description: bartlettTerms.courtyard }
        ],
        roomLabels: [
          { floor: 1, top: 186, left: -261, description: bartlettTerms.readingRoom, hardToRead: true },
          { floor: 1, top: 9, left: -254, description: bartlettTerms.lowerLibrary, hardToRead: true },
          { floor: 2, top: 9, left: -254, description: bartlettTerms.upperLibrary, hardToRead: true },
          { floor: 1, top: 143, left: -5, description: bartlettTerms.lobby, hardToRead: true },
          { floor: 1, top: 93, left: 109, description: bartlettTerms.coatRoom },
          { floor: 1, top: -123, left: -1, description: bartlettTerms.archwayHall, hardToRead: true },
          { floor: 1, top: -9, left: -1, description: bartlettTerms.archwayHall, hardToRead: true },
          { floor: 1, top: -94, left: 172, description: bartlettTerms.centralHallway, hardToRead: true },
          { floor: 1, top: -160, left: 298, description: bartlettTerms.centralHallway.removeBreakTags(), hardToRead: true },
          { floor: 1, top: -53, left: 249, description: bartlettTerms.eastStairs, hardToRead: true },
          { floor: 2, top: -53, left: 256, description: bartlettTerms.eastStairs, hardToRead: true },
          { floor: 1, top: -90, left: 401, description: bartlettTerms.bathroom },
          { floor: 1, top: -264, left: 265, description: bartlettTerms.diningRoom, hardToRead: true },
          { floor: 1, top: -247, left: 583, description: bartlettTerms.kitchen, hardToRead: true },
          { floor: 1, top: -254, left: 427, description: bartlettTerms.serviceRoom, hardToRead: true },
          { floor: 1, top: -34, left: 665, description: bartlettTerms.eastCorridor },
          { floor: 1, top: -46, left: 530, description: bartlettTerms.pantry },
          { floor: 1, top: 76, left: 567, description: bartlettTerms.pianoRoom, hardToRead: true },
          { floor: 1, top: 140, left: 253, description: bartlettTerms.lounge, hardToRead: true },
          { floor: 2, top: -250, left: 532, description: bartlettTerms.roof, hardToRead: true },
          { floor: 3, top: -250, left: 532, description: bartlettTerms.roof, hardToRead: true },
          { floor: 2, top: 106, left: -358, description: bartlettTerms.westCorridor, hardToRead: true },
          { floor: 2, top: 164, left: -207, description: bartlettTerms.classroom, hardToRead: true },
          { floor: 2, top: 164, left: -11, description: bartlettTerms.compassHallway, hardToRead: true },
          { floor: 2, top: -112, left: -109, description: bartlettTerms.vistaHallway, hardToRead: true },
          { floor: 2, top: -5, left: 57, description: bartlettTerms.vistaHallway.removeBreakTags(), hardToRead: true },
          { floor: 2, top: -157, left: 339, description: bartlettTerms.vistaHallway.removeBreakTags(), hardToRead: true },
          { floor: 2, top: 75, left: 189, description: bartlettTerms.frontOffice, hardToRead: true },
          { floor: 2, top: 185, left: 344, description: bartlettTerms.mainOffice, hardToRead: true },
          { floor: 2, top: 90, left: 654, description: bartlettTerms.rowingMuseum, hardToRead: true },
          { floor: 2, top: 37, left: 389, description: bartlettTerms.modelHall, hardToRead: true },
          { floor: 2, top: -61, left: 577, description: bartlettTerms.trophyRoom, hardToRead: true },
          { floor: 3, top: 30, left: -70, description: bartlettTerms.roof, hardToRead: true },
          { floor: 3, top: 30, left: 465, description: bartlettTerms.roof, hardToRead: true },
          { outdoor: true, top: 377, left: -200, description: bartlettTerms.frontPatio, hardToRead: true },
          { outdoor: true, top: 377, left: 289, description: bartlettTerms.frontPatio, hardToRead: true },
          { outdoor: true, top: 619, left: 36, description: bartlettTerms.frontEntrance, hardToRead: true },
          { outdoor: true, top: 619, left: -448, description: bartlettTerms.festival, hardToRead: true },
          { outdoor: true, top: -70, left: -797, description: bartlettTerms.campusField, hardToRead: true },
          { outdoor: true, top: -250, left: -251, description: bartlettTerms.terrace },
          { outdoor: true, top: -310, left: 69, description: bartlettTerms.terrace },
          { outdoor: true, top: -486, left: -127, description: bartlettTerms.backAlley, hardToRead: true },
          { outdoor: true, top: -431, left: 587, description: bartlettTerms.parking, hardToRead: true },
          { floor: 1, top: -204, left: 754, description: bartlettTerms.gardenPass },
          { floor: 1, top: 73, left: 754, description: bartlettTerms.gardenPass },
          { floor: 2, top: -204, left: 764, description: bartlettTerms.gardenPass },
          { floor: 2, top: 73, left: 764, description: bartlettTerms.gardenPass },
          { outdoor: true, top: 298, left: 655, description: bartlettTerms.mainGate, hardToRead: true },
          { outdoor: true, top: 615, left: 655, description: bartlettTerms.mainGate, hardToRead: true },
          { outdoor: true, top: 704, left: 573, description: bartlettTerms.eastBalcony, hardToRead: true },
          { outdoor: true, top: 704, left: -349, description: bartlettTerms.westBalcony, hardToRead: true }
        ]
      },
      border: {
        name: mapNameTerms.border,
        imgUrlPrefix: 'border',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 1, top: -715, left: -1275, background: true, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -530, left: -360, name: floorTerms.secondFloor },
          { index: 3, top: -530, left: -360, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 1, top: -292, left: 23 },
          { floor: 1, top: -108, left: -125 },
          { floor: 2, top: -272, left: 193 },
          { floor: 2, top: 34, left: -118 }
        ],
        bombObjectives: [
          { floor: 1, top: -123, left: -249, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -22, left: -123, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -337, left: 23, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -337, left: -213, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -318, left: 156, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -186, left: 213, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -325, left: -67, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 2, top: -288, left: 46, set: 4, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 1, top: -186, left: 249 },
          { floor: 1, top: -282, left: -12 },
          { floor: 2, top: -212, left: 193 },
          { floor: 2, top: -325, left: -103 }
        ],
        zoomPoints: {
          topLeft: { top: -443, left: -305 },
          bottomRight: { top: 125, left: 350 }
        },
        compassPoints: {
          top: 252, left: 387
        },
        ladders: [
          { floor: 1, top: -128, left: -767, otherFloor: 'up' },
          { floor: 2, top: -128, left: -767, otherFloor: 'down' },
          { floor: 1, top: -505, left: -52, otherFloor: 'up' },
          { floor: 2, top: -505, left: -52, otherFloor: 'down' }
        ],
        cameras: [
          {
            floor: 2, top: -92, left: 326, id: 1, location: borderTerms.eastStairs,
            los: [[{top: -85, left: 134}, {top: -94, left: 272}, {top: -106, left: 272}, {top: -106, left: 343}, {top: 77, left: 343}]]
          },
          {
            floor: 2, top: -81, left: -33 , id: 2, location: borderTerms.mainHallway,
            los: [[{top: -206, left: -50}, {top: -66, left: -50}, {top: -66, left: 261}]]
          },
          {
            floor: 1, top: -99, left: 122, id: 3, location: borderTerms.mainLobby,
            los: [[{top: -63, left: -68}, {top: -63, left: 152}, {top: -245, left: 152}]]
          },
          {
            floor: 1, top: -245, left: -172, id: 4, location: borderTerms.exitHallway,
            los: [[{top: -257, left: -256}, {top: -257, left: -155}, {top: -143, left: -155}]]
          },
          {
            outdoor: true, top: 268, left: -462, id: 5, location: borderTerms.parkingLotEntrance,
            los: [[{top: 299, left: 254}, {top: 299, left: -497}, {top: 64, left: -779}]]
          },
          {
            outdoor: true, top: -568, left: 425, id: 6, location: borderTerms.crashScene,
            los: [[{top: -703, left: 134}, {top: -428, left: 917}]]
          },
          {
            outdoor: true, top: -425, left: -347, id: 7, location: borderTerms.parkingLotAlley,
            los: [[{top: -683, left: -275}, {top: -242, left: -803}]]
          }
        ],
        ceilingHatches: [
          { floor: 1, top: -237, left: -122 },
          { floor: 1, top: -109, left: -91 },
          { floor: 1, top: -19, left: -153 },
          { floor: 1, top: -330, left: 67 },
          { floor: 1, top: -142, left: 228 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 1, top: 85, left: -254, rotate: 0, size: DRONE_MED },
          { floor: 1, top: -99, left: -305, rotate: 90, size: DRONE_MED },
          { floor: 1, top: -392, left: -188, rotate: 0, size: DRONE_MED },
          { floor: 1, top: -391, left: 158, rotate: 0, size: DRONE_MED },
          { floor: 1, top: -253, left: 220, rotate: 0, size: DRONE_MED },
          { floor: 1, top: -215, left: 108, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -103, left: 330, rotate: 0, size: 39 },
          { floor: 1, top: -83, left: 331, rotate: 90, size: 58 }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -194, left: 810, description: borderTerms.spawnEastVehicleEntrance },
          { letter: spawnTerms.b, top: 567, left: -128, description: borderTerms.spawnValley },
          { letter: spawnTerms.c, top: -140, left: -872, description: borderTerms.spawnWestVehicleExit }
        ],
        roomLabels: [
          { floor: 2, top: -364, left: 56, description: borderTerms.archives, hardToRead: true },
          { floor: 2, top: -320, left: -164, description: borderTerms.armoryLockers, hardToRead: true },
          { floor: 2, top: -255, left: -86, smaller: true, description: borderTerms.armoryDesk, hardToRead: true },
          { floor: 2, top: -17, left: -108, description: borderTerms.securityRoom, hardToRead: true },
          { floor: 2, top: 25, left: 36, description: borderTerms.breakRoom, hardToRead: true },
          { floor: 2, top: -152, left: -31, smaller: true, description: borderTerms.mainHallway, hardToRead: true },
          { floor: 2, top: -79, left: 115, description: borderTerms.mainHallway, hardToRead: true },
          { floor: 2, top: -161, left: 54, description: borderTerms.fountain },
          { floor: 2, top: -225, left: 54, description: borderTerms.officesHallway, hardToRead: true },
          { floor: 2, top: -225, left: 154, description: borderTerms.offices, hardToRead: true },
          { floor: 2, top: -56, left: 327, description: borderTerms.eastStairs },
          { floor: 1, top: -56, left: 327, description: borderTerms.eastStairs, hardToRead: true },
          { floor: 1, top: -230, left: -220, description: borderTerms.exitHallway },
          { floor: 1, top: -343, left: -176, description: borderTerms.ventilationRoom },
          { floor: 1, top: -57, left: -247, description: borderTerms.supplyRoom },
          { floor: 1, top: -10, left: -250, description: borderTerms.supplyCorridor },
          { floor: 1, top: 46, left: -249, description: borderTerms.detention },
          { floor: 1, top: -105, left: 65, description: borderTerms.mainLobby },
          { floor: 1, top: -22, left: 65, description: borderTerms.passportCheck },
          { floor: 1, top: 47, left: -93, description: borderTerms.customsInspection },
          { floor: 1, top: -74, left: -89, smaller: true, description: borderTerms.customsDesk, hardToRead: true },
          { floor: 1, top: -2, left: 216, description: borderTerms.waitingRoom },
          { floor: 1, top: -210, left: 231, description: borderTerms.tellers },
          { floor: 1, top: -146, left: -116, description: borderTerms.centralStairs },
          { floor: 1, top: -279, left: -82, description: borderTerms.serverRoom },
          { floor: 1, top: -283, left: 80, description: borderTerms.workshop },
          { floor: 1, top: -276, left: 139, description: borderTerms.bathroom },
          { outdoor: true, top: -155, left: -656, description: borderTerms.westTower },
          { outdoor: true, top: 29, left: -760, description: borderTerms.pedestrianExit },
          { outdoor: true, top: 404, left: -307, description: borderTerms.valley },
          { outdoor: true, top: 180, left: -403, description: borderTerms.parkingLotEntrance },
          { outdoor: true, top: -170, left: -465, description: borderTerms.parkingLot },
          { outdoor: true, top: -399, left: -622, description: borderTerms.westRoad },
          { outdoor: true, top: -530, left: -169, description: borderTerms.vehicleCustoms },
          { outdoor: true, top: -570, left: 308, description: borderTerms.crashScene },
          { outdoor: true, top: -390, left: 509, description: borderTerms.eastRoad },
          { outdoor: true, top: 0, left: 556, description: borderTerms.pedestrianEntrance },
          { outdoor: true, top: 200, left: 264, description: borderTerms.pedestrianCustoms },
          { outdoor: true, top: 257, left: -89, description: borderTerms.pedestrianCustoms },
          { outdoor: true, top: 442, left: 74, description: borderTerms.valley },
          { outdoor: true, top: 317, left: 293, description: borderTerms.watchTower },
          { outdoor: true, top: -156, left: 366, description: borderTerms.eastAlley },
          { outdoor: true, top: -12, left: -350, description: borderTerms.parkingLotAlley },
          { outdoor: true, top: -311, left: -304, description: borderTerms.parkingLotAlley },
          { floor: 2, top: -363, left: 208, description: borderTerms.northBalcony },
          { floor: 2, top: -249, left: 299, smaller: true, description: borderTerms.eastBalcony, hardToRead: true },
          { floor: 2, top: -173, left: -225, description: borderTerms.westBalcony },
          { floor: 2, top: -5, left: -290, smaller: true, description: borderTerms.westBalcony, hardToRead: true },
          { floor: 2, top: 118, left: -157, description: borderTerms.southBalcony },
          { floor: 2, top: 118, left: 169, description: borderTerms.southBalcony },
          { floor: 3, top: 17, left: -9, description: borderTerms.roof, hardToRead: true },
          { floor: 3, top: -138, left: -215, description: borderTerms.roof, hardToRead: true },
          { floor: 3, top: -318, left: 152, description: borderTerms.roof, hardToRead: true }
        ]
      },
      chalet: {
        name: mapNameTerms.chalet,
        imgUrlPrefix: 'chalet',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 0, top: -715, left: -1275, background: true, name: floorTerms.basement },
          { index: 1, top: -556, left: -342, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -556, left: -342, name: floorTerms.secondFloor },
          { index: 3, top: -556, left: -342, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 0, top: 62, left: 286 },
          { floor: 1, top: -147, left: 412 },
          { floor: 2, top: -267, left: 415 },
          { floor: 2, top: 275, left: -30 }
        ],
        bombObjectives: [
          { floor: 0, top: 220, left: 128, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 0, top: 100, left: 250, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -403, left: 220, set: 4, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -254, left: 412, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 118, left: 98, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 1, top: 186, left: -82, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 2, top: -160, left: 376, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -18, left: 317, set: 1, letter: objectiveTerms.bombShortA }
        ],
        secureObjectives: [
          { floor: 0, top: 252, left: 164 },
          { floor: 1, top: -5, left: 284 },
          { floor: 1, top: 188, left: 47 },
          { floor: 2, top: 214, left: -54 }
        ],
        zoomPoints: {
          topLeft: { top: -456, left: -113 },
          bottomRight: { top: 382, left: 494 }
        },
        compassPoints: {
          top: 494, left: 560
        },
        ladders: [
          { floor: 1, top: 69, left: -166, otherFloor: 'up' },
          { floor: 2, top: 69, left: -166, otherFloor: 'down' },
          { floor: 1, top: 6, left: 64, otherFloor: 'up' },
          { floor: 2, top: 6, left: 64, otherFloor: 'down' },
          { floor: 1, top: 319, left: 344, otherFloor: 'up' },
          { floor: 2, top: 319, left: 344, otherFloor: 'down' },
          { floor: 1, top: 14, left: 440, otherFloor: 'up' },
          { floor: 2, top: 14, left: 440, otherFloor: 'down' },
          { floor: 1, top: -91, left: -647, otherFloor: 'up' },
          { floor: 2, top: -91, left: -647, otherFloor: 'down' },
          { floor: 1, top: 353, left: -485, otherFloor: 'up' },
          { floor: 2, top: 353, left: -485, otherFloor: 'down' }
        ],
        cameras: [
          { floor: 1, otherFloor: 'up', top: -114, left: 198, id: 1, location: chaletTerms.bedroomHallway },
          {
            floor: 2, top: -114, left: 198, id: 1, location: chaletTerms.bedroomHallway,
            los: [[{top: -127, left: 317},{top: -127, left: 183},{top: 4, left: 183}]]
          },
          { floor: 1, otherFloor: 'up', top: 307, left: 296, id: 2, location: chaletTerms.fireplaceHallway },
          {
            floor: 2, top: 307, left: 296, id: 2, location: chaletTerms.fireplaceHallway,
            los: [[{top: 370, left: 181},{top: 321, left: 255},{top: 321, left: 313},{top: 96, left: 313}]]
          },
          { floor: 1, otherFloor: 'up', top: 101, left: -109, id: 3, location: chaletTerms.libraryStairs },
          { floor: 2, top: 101, left: -109, id: 3, location: chaletTerms.libraryStairs },
          {
            floor: 0, top: 150, left: 122, id: 4, location: chaletTerms.snowmobileGarage,
            los: [[{top: 140, left: 61},{top: 121, left: 116},{top: 141, left: 187}]]
          },
          {
            outdoor: true, top: -36, left: -350, id: 5, location: chaletTerms.frontYard,
            los: [[{top: -162, left: -384},{top: -30, left: -408},{top: 453, left: -425}]]
          },
          {
            outdoor: true, top: -147, left: 838, id: 6, location: chaletTerms.backyard,
            los: [[{top: 302, left: 1016},{top: -157, left: 878},{top: -695, left: 732}]]
          }
        ],
        ceilingHatches: [
          { floor: 0, top: 259, left: 116 },
          { floor: 0, top: 302, left: 298 },
          { floor: 0, top: 15, left: 378 },
          { floor: 0, top: -431, left: 384 },
          { floor: 0, top: -287, left: 210 },
          { floor: 1, top: 250, left: -107 },
          { floor: 1, top: 146, left: 59 },
          { floor: 1, top: 64, left: 63 },
          { floor: 1, top: 65, left: 235 },
          { floor: 1, top: -285, left: 369 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 0, top: -456, left: 203, rotate: 0, size: DRONE_MED },
          { floor: 0, top: 378, left: 155, rotate: 0, size: DRONE_MED },
          { floor: 0, top: 123, left: 172, rotate: 90, size: 62 },
          { floor: 1, top: 63, left: 292, rotate: 90, size: 76 },
          { floor: 1, top: 63, left: 165, rotate: 90, size: 44 },
          { floor: 1, top: 39, left: 383, rotate: 0, size: DRONE_MED },
          { floor: 1, top: 278, left: 20, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -330, left: 408, rotate: 90, size: DRONE_MED },
          { floor: 2, top: -133, left: 240, rotate: 0, size: DRONE_SMALL }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -309, left: -790, description: chaletTerms.spawnFrontYard },
          { letter: spawnTerms.b, top: -652, left: 680, description: chaletTerms.spawnCampfire },
          { letter: spawnTerms.c, top: 412, left: 886, description: chaletTerms.spawnCliffside },
          { letter: spawnTerms.d, top: 540, left: -819, description: chaletTerms.spawnLakeside }
        ],
        roomLabels: [
          { floor: 0, hardToRead: true, smaller: true, top: 69, left: -82, description: chaletTerms.libraryStairs },
          { floor: 0, top: 119, left: 49, description: chaletTerms.snowmobileGarageCorridor },
          { floor: 0, top: 332, left: 190, description: chaletTerms.snowmobileGarage },
          { floor: 0, hardToRead: true, smaller: true, top: 308, left: 101, description: chaletTerms.greatRoomStairs },
          { floor: 0, top: 245, left: 276, description: chaletTerms.storageRoom },
          { floor: 0, top: 149, left: 228, description: chaletTerms.wineCellar },
          { floor: 0, top: 107, left: 360, description: chaletTerms.wineStock },
          { floor: 0, top: -54, left: 395, description: chaletTerms.basementHallway },
          { floor: 0, top: -154, left: 494, description: chaletTerms.backyardStairs },
          { floor: 0, hardToRead: true, smaller: true, top: -95, left: 238, description: chaletTerms.mainStairs },
          { floor: 0, top: -306, left: 271, description: chaletTerms.mainGarage },
          { floor: 0, top: -391, left: 374, description: chaletTerms.garageEntrance },
          { floor: 1, hardToRead: true, smaller: true, top: 69, left: -82, description: chaletTerms.libraryStairs },
          { floor: 1, top: 8, left: -2, smaller: true, description: chaletTerms.westEntrance },
          { floor: 1, top: 71, left: 3, smaller: true, description: chaletTerms.gamingRoomHallway },
          { floor: 1, top: 272, left: -32, description: chaletTerms.gamingRoom },
          { floor: 1, top: 212, left: 96, hardToRead: true, description: chaletTerms.bar },
          { floor: 1, hardToRead: true, smaller: true, top: 317, left: 103, description: chaletTerms.greatRoomStairs },
          { floor: 1, top: 212, hardToRead: true, left: 221, description: chaletTerms.greatRoom },
          { floor: 1, top: -69, left: 330, description: chaletTerms.diningRoom },
          { floor: 1, hardToRead: true, smaller: true, top: -95, left: 238, description: chaletTerms.mainStairs },
          { floor: 1, top: -183, left: 207, description: chaletTerms.mainEntrance },
          { floor: 1, top: -376, left: 289, hardToRead: true, description: chaletTerms.trophyRoom },
          { floor: 1, top: -228, left: 291, hardToRead: true, description: chaletTerms.kitchenHallway },
          { floor: 1, top: -127, left: 360, description: chaletTerms.kitchen },
          { floor: 1, top: -154, left: 494, description: chaletTerms.backyardStairs },
          { floor: 2, hardToRead: true, smaller: true, top: 69, left: -82, description: chaletTerms.libraryStairs },
          { floor: 2, top: 113, left: 76, description: chaletTerms.libraryHallway },
          { floor: 2, top: 160, left: 11, smaller: true, description: chaletTerms.libraryEntrance },
          { floor: 2, top: 257, left: 49, hardToRead: true, description: chaletTerms.library },
          { floor: 2, top: -386, left: 357, description: chaletTerms.bedroomTerrace },
          { floor: 3, top: -386, left: 357, description: chaletTerms.bedroomTerrace },
          { floor: 2, top: 160, left: 128, description: chaletTerms.fireplaceHallway },
          { floor: 2, hardToRead: true, smaller: true, top: 317, left: 103, description: chaletTerms.greatRoomStairs },
          { floor: 2, top: -8, left: 220, description: chaletTerms.bedroomHallway },
          { floor: 2, hardToRead: true, smaller: true, top: -80, left: 200, description: chaletTerms.mainStairs },
          { floor: 2, top: -195, left: 199, hardToRead: true, description: chaletTerms.masterBathroom },
          { floor: 2, top: -195, left: 345, hardToRead: true, description: chaletTerms.masterBedroom },
          { floor: 2, top: -57, left: 362, hardToRead: true, description: chaletTerms.office },
          { outdoor: true, top: -612, left: -257, description: chaletTerms.woodenTrail },
          { outdoor: true, top: -483, left: 363, description: chaletTerms.campfireWood },
          { outdoor: true, top: -322, left: 557, description: chaletTerms.backyard },
          { floor: 1, top: -288, left: 925, description: chaletTerms.gazeebo },
          { floor: 2, top: -288, left: 925, description: chaletTerms.gazeebo },
          { outdoor: true, top: 177, left: 915, description: chaletTerms.cliffsideStairs },
          { outdoor: true, top: 451, left: 722, description: chaletTerms.cliffsideWoods },
          { outdoor: true, top: -75, left: 642, description: chaletTerms.backyard },
          { floor: 1, top: 138, left: 512, description: chaletTerms.backyardPatio },
          { floor: 2, top: 168, left: 363, description: chaletTerms.officeBalcony },
          { outdoor: true, top: 243, left: -715, description: chaletTerms.helipadTrail },
          { outdoor: true, top: 215, left: -476, description: chaletTerms.helipad },
          { floor: 1, top: 201, left: -184, description: chaletTerms.frontYardPatio },
          { outdoor: true, top: -205, left: -123, description: chaletTerms.frontYard },
          { floor: 2, top: -92, left: 120, hardToRead: true, smaller: true, description: chaletTerms.bathroomBalcony },
          { floor: 2, top: 185, left: -168, hardToRead: true, smaller: true, description: chaletTerms.libraryBalcony },
          { floor: 2, top: -227, left: 492, hardToRead: true, smaller: true, description: chaletTerms.bedroomBalcony },
          { outdoor: true, top: 491, left: -3, description: chaletTerms.snowmobiles }
        ]
      },
      club: {
        name: mapNameTerms.club,
        imgUrlPrefix: 'club-house',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 0, top: -715, left: -1275, background: true, name: floorTerms.basement },
          { index: 1, top: -566, left: -441, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -566, left: -441, name: floorTerms.secondFloor },
          { index: 3, top: -566, left: -441, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 0, top: -83, left: 70 },
          { floor: 1, top: 48, left: -257 },
          { floor: 2, top: -58, left: -20 },
          { floor: 2, top: -94, left: 211 }
        ],
        bombObjectives: [
          { floor: 0, top: -218, left: 110, set: 4, letter: objectiveTerms.bombShortB },
          { floor: 0, top: -127, left: 96, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -29, left: 18, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -89, left: 198, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -58, left: 25, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 2, top: -78, left: -112, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -54, left: 185, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 52, left: 243, set: 2, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 0, top: -278, left: 76 },
          { floor: 1, top: -29, left: -38 },
          { floor: 1, top: 170, left: 277 },
          { floor: 2, top: -109, left: 25 }
        ],
        zoomPoints: {
          topLeft: { top: -336, left: -416 },
          bottomRight: { top: 275, left: 397 }
        },
        compassPoints: {
          top: -297, left: 403
        },
        ladders: [
          { floor: 1, top: 224, left: 235, otherFloor: 'down' },
          { floor: 0, top: 224, left: 235, otherFloor: 'up' },
          { floor: 1, top: 254, left: 189, otherFloor: 'up' },
          { floor: 2, top: 254, left: 189, otherFloor: 'down' },
          { floor: 1, top: -191, left: 223, otherFloor: 'up' },
          { floor: 2, top: -191, left: 223, otherFloor: 'down' },
          { floor: 1, top: -577, left: 335, otherFloor: 'up' },
          { floor: 2, top: -577, left: 335, otherFloor: 'down' }
        ],
        cameras: [
          {
            floor: 2, top: -191, left: 3, id: 1, location: clubTerms.bedroomHallway,
            los: [[{top: -176, left: -129},{top: -176, left: 19},{top: -204, left: 19}]]
          },
          {
            floor: 1, top: -128, left: -18, id: 2, location: clubTerms.bar,
            los: [[{top: -140, left: -183},{top: -140, left: 29}],[{top: -76, left: 35},{top: 17, left: 152}]]
          },
          { floor: 1, otherFloor: 'up', top: 259, left: 287, id: 3, location: clubTerms.garage },
          {
            floor: 2, top: 259, left: 287, id: 3, location: clubTerms.garage,
            los: [[{top: 271, left: 163},{top: 271, left: 302},{top: 87, left: 302}]]
          },
          {
            floor: 0, top: -176, left: -28, id: 4, location: clubTerms.basementHallway,
            los: [[{top: -74, left: -41},{top: -186, left: -41},{top: -186, left: 147}]]
          },
          {
            outdoor: true, top: 254, left: -170, id: 5, location: clubTerms.VIPParking,
            los: [[{top: 359, left: -208},{top: 318, left: -158},{top: 358, left: 223}]]
          },
          {
            outdoor: true, top: -222, left: -316, id: 6, location: clubTerms.graffitiArea,
            los: [[{top: -43, left: -444},{top: -289, left: -373},{top: -670, left: -131}]]
          },
          {
            outdoor: true, top: 298, left: 444, id: 7, location: clubTerms.kennels,
            los: [[{top: 411, left: 261},{top: 350, left: 495},{top: 162, left: 546}]]
          }
        ],
        ceilingHatches: [
          { floor: 0, top: -258, left: 108 },
          { floor: 0, top: -40, left: -16 },
          { floor: 0, top: 210, left: 234 },
          { floor: 0, top: -64, left: 239 },
          { floor: 1, top: -38, left: -113 },
          { floor: 1, top: 159, left: -195 },
          { floor: 2, top: -40, left: -81 },
          { floor: 2, top: -261, left: 57 },
          { floor: 2, top: 28, left: 278 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 0, top: -540, left: 39, rotate: 210, size: DRONE_SMALL },
          { floor: 1, top: 127, left: -373, rotate: 90, size: 54 },
          { floor: 1, top: 139, left: -164, rotate: 90, size: DRONE_MED },
          { floor: 1, top: 181, left: 157, rotate: 90, size: DRONE_MED },
          { floor: 1, top: 80, left: 181, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: -124, left: -136, rotate: 90, size: DRONE_MED },
          { floor: 2, top: -62, left: 54, rotate: 90, size: DRONE_MED },
          { floor: 2, top: -39, left: 156, rotate: 90, size: DRONE_MED },
          { floor: 2, top: 79, left: 180, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: -40, left: 314, rotate: 90, size: DRONE_MED },
          { floor: 2, top: -26, left: 273, rotate: 90, size: DRONE_SMALL }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: 634, left: 144, description: clubTerms.spawnMainEntrance },
          { letter: spawnTerms.b, top: 32, left: -813, description: clubTerms.spawnShippingDocks },
          { letter: spawnTerms.c, top: 239, left: 798, description: clubTerms.spawnWarehouse },
          { letter: spawnTerms.d, top: -675, left: 348, description: clubTerms.spawnConstructionSite }
        ],
        roomLabels: [
          { outdoor: true, description: clubTerms.constructionSite, top: -528, left: 123 },
          { floor: 0, smaller: true, description: clubTerms.container, top: -507, left: 41 },
          { outdoor: true, description: clubTerms.graffitiArea, top: -366, left: 22 },
          { outdoor: true, description: clubTerms.recreationArea, top: -127, left: -317 },
          { outdoor: true, description: clubTerms.junkyard, top: 64, left: -473 },
          { outdoor: true, description: clubTerms.VIPParking, top: 322, left: -241 },
          { outdoor: true, description: clubTerms.mainGate, top: 485, left: 3 },
          { outdoor: true, description: clubTerms.parking, top: 160, left: -14 },
          { outdoor: true, description: clubTerms.kennels, top: 125, left: 392 },
          { floor: 1, description: clubTerms.trash, top: -212, left: 205 },
          { floor: 2, description: clubTerms.trash, top: -212, left: 205 },
          { floor: 3, description: clubTerms.trash, top: -212, left: 205 },
          { floor: 3, description: clubTerms.centralSubroof, top: 12, left: 119 },
          { floor: 2, description: clubTerms.centralSubroof, top: 12, left: 119 },
          { floor: 3, description: clubTerms.easternRoof, top: 15, left: 210 },
          { floor: 3, description: clubTerms.centralRoof, top: -155, left: -60 },
          { floor: 3, description: clubTerms.westernRoof, top: 73, left: -281 },
          { floor: 2, description: clubTerms.westernRoof, top: 73, left: -281 },
          { floor: 3, description: clubTerms.balcony, top: -79, left: -207 },
          { floor: 2, description: clubTerms.balcony, top: -79, left: -207 },
          { floor: 0, smaller: true, description: clubTerms.escapeTunnel, top: -358, left: 194 },
          { floor: 0, description: clubTerms.arsenalRoom, top: -238, left: 195 },
          { floor: 0, description: clubTerms.basementHallway, top: -160, left: 62 },
          { floor: 0, description: clubTerms.memorialRoom, top: -2, left: -21 },
          { floor: 0, description: clubTerms.utilityRoom, top: -16, left: 200 },
          { floor: 0, description: clubTerms.oilPit, top: 177, left: 224 },
          { floor: 0, description: clubTerms.centralStairs, top: -270, left: -48 },
          { floor: 0, description: clubTerms.church, top: -2, left: 99 },
          { floor: 1, description: clubTerms.frontPorch, top: 61, left: 3 },
          { floor: 1, description: clubTerms.garage, top: 195, left: 216 },
          { floor: 1, description: clubTerms.lobby, top: 40, left: 126 },
          { floor: 1, description: clubTerms.stockRoom, top: -105, left: 258 },
          { floor: 1, smaller: true, description: clubTerms.garageStorage, top: -4, left: 372 },
          { floor: 1, description: clubTerms.lounge, top: 15, left: 244 },
          { floor: 1, description: clubTerms.bar, top: -104, left: -75 },
          { floor: 1, description: clubTerms.centralHallway, top: -157, left: 24 },
          { floor: 1, description: clubTerms.centralStairs, top: -270, left: -48 },
          { floor: 1, hardToRead: true, description: clubTerms.kitchen, top: -208, left: 54 },
          { floor: 1, description: clubTerms.kitchenEntrance, top: -316, left: 22 },
          { floor: 1, smaller: true, description: clubTerms.westernHallway, top: -121, left: -216 },
          { floor: 1, description: clubTerms.stripClub, top: -3, left: -306 },
          { floor: 1, smaller: true, description: clubTerms.junkyardEntrance, top: 13, left: -383 },
          { floor: 1, description: clubTerms.sideEntrance, top: 178, left: -337 },
          { floor: 1, smaller: true, description: clubTerms.changingRoom, top: 150, left: -237 },
          { floor: 2, hardToRead: true, description: clubTerms.bedroom, top: -85, left: -21 },
          { floor: 2, smaller: true, hardToRead: true, description: clubTerms.bathroom, top: -135, left: -63 },
          { floor: 2, smaller: true, description: clubTerms.bedroomHallway, top: -179, left: -74 },
          { floor: 2, hardToRead: true, description: clubTerms.logisticOffice, top: -261, left: 99 },
          { floor: 2, hardToRead: true, description: clubTerms.gym, top: -66, left: -79 },
          { floor: 2, smaller: true, description: clubTerms.secretStash, top: -187, left: 46 },
          { floor: 2, hardToRead: true, description: clubTerms.CCTVRoom, top: 25, left: 211 },
          { floor: 2, hardToRead: true, description: clubTerms.cashRoom, top: -39, left: 232 },
          { floor: 2, hardToRead: true, smaller: true, description: clubTerms.easternStairs, top: -81, left: 325 },
          { floor: 1, hardToRead: true, smaller: true, description: clubTerms.easternStairs, top: -60, left: 328 },
          { floor: 2, description: clubTerms.easternSubroof, top: 7, left: 360 },
          { floor: 3, description: clubTerms.easternSubroof, top: 7, left: 360 }
        ]
      },
      coastline: {
        name: mapNameTerms.coastline,
        imgUrlPrefix: 'coastline',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 1, top: -715, left: -1275, background: true, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -241, left: -380, name: floorTerms.secondFloor },
          { index: 3, top: -241, left: -380, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 2, top: -46, left: 53 },
          { floor: 2, top: 148, left: 229 },
          { floor: 1, top: -72, left: 80 },
          { floor: 1, top: 150, left: -95 }
        ],
        bombObjectives: [
          { floor: 2, top: 45, left: -137, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 2, top: 203, left: -139, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 14, left: 279, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 2, top: 148, left: 264, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -63, left: 165, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -18, left: 63, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 181, left: -153, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -24, left: -248, set: 4, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 1, top: 181, left: -189 },
          { floor: 1, top: -18, left: 15 },
          { floor: 2, top: 72, left: 229 },
          { floor: 2, top: 203, left: -194 }
        ],
        zoomPoints: {
          topLeft: { top: -134, left: -317 },
          bottomRight: { top: 375, left: 332 }
        },
        compassPoints: {
          top: 522, left: 610
        },
        cameras: [
          {
            floor: 1, top: 95, left: -84, id: 1, location: coastlineTerms.hallway,
            los: [
              [{top: 40, left: -30}, {top: -55, left: 41}],
              [{top: 25, left: -30}, {top: -73, left: 31}],
              [{top: -92, left: -64}, {top: -33, left: -74}, {top: -33, left: -101}, {top: 108, left: -101}, {top: 108, left: -64}, {top: 98, left: -64}, {top: 67, left: 16}]
            ]
          },
          {
            floor: 1, top: 292, left: 198, id: 2, location: coastlineTerms.mainLobby,
            los: [
              [{top: 149, left: 133}, {top: 288, left: 178}],
              [{top: 66, left: 154}, {top: 248, left: 177}],
              [{top: 248, left: 246}, {top: 200, left: 287}],
              [{top: 306, left: 186}, {top: 306, left: 287}]
            ]
          },
          {
            floor: 2, top: 316, left: -194, id: 3, location: coastlineTerms.aquarium,
            los: [
              [{top: 261, left: -210}, {top: 330, left: -210}, {top: 330, left: -46}, {top: 288, left: -46}, {top: 288, left: -37}, {top: 262, left: 86}],
              [{top: 275, left: -37}, {top: 262, left: -22}]
            ]
          },
          {
            floor: 2, top: 77, left: 156, id: 4, location: coastlineTerms.hallway,
            los: [
              [{top: 105, left: -46}, {top: 105, left: 110}, {top: 97, left: 120}],
              [{top: 64, left: -27}, {top: 64, left: 119}],
              [{top: 347, left: 172}, {top: 64, left: 172}, {top: 64, left: 127}]
            ]
          },
          {
            outdoor: true, top: -195, left: 415, id: 5, location: coastlineTerms.garageRoof,
            los: [
              [{top: -114, left: 436}, {top: -211, left: 436}, {top: -211, left: -342}]
            ]
          },
          {
            outdoor: true, top: 436, left: -300, id: 6, location: coastlineTerms.ruins,
            los: [
              [{top: 485, left: 743}, {top: 454, left: -355}, {top: 276, left: -355}, {top: -115, left: -525}]
            ]
          },
          {
            outdoor: true, top: -109, left: -551, id: 7, location: coastlineTerms.ruins,
            los: [
              [{top: -279, left: -250}, {top: -164, left: -538}, {top: -124, left: -589}, {top: -18, left: -565}],
              [{top: 485, left: -219}, {top: -43, left: -510}]
            ]
          }
        ],
        ceilingHatches: [
          { floor: 1, top: 74, left: -178 },
          { floor: 1, top: 315, left: -192 },
          { floor: 1, top: 274, left: 105 },
          { floor: 1, top: 77, left: 191 },
          { floor: 2, top: -72, left: 286 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 1, top: 63, left: 316, rotate: 0, size: DRONE_SMALL },
          { floor: 1, top: 258, left: 82, rotate: 0, size: DRONE_SMALL },
          { floor: 1, top: 226, left: -53, rotate: 0, size: DRONE_SMALL },
          { floor: 1, top: 215, left: -214, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -81, left: -40, rotate: 90, size: 24 },
          { floor: 1, top: -90, left: -48, rotate: 0, size: 30 },
          { floor: 2, top: 223, left: -65, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: -4, left: -40, rotate: 90, size: DRONE_SMALL },
          { floor: 2, top: 94, left: 176, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -86, left: -74, rotate: 0, size: DRONE_MED, otherFloor: 'up' },
          { floor: 2, top: -86, left: -74, rotate: 0, size: DRONE_MED, otherFloor: 'upanddown' },
          { floor: 3, top: -86, left: -74, rotate: 0, size: DRONE_MED, otherFloor: 'down' },
          { floor: 1, top: 334, left: 275, rotate: 0, size: DRONE_MED, otherFloor: 'up' },
          { floor: 2, top: 334, left: 275, rotate: 0, size: DRONE_MED, otherFloor: 'upanddown' },
          { floor: 3, top: 334, left: 275, rotate: 0, size: DRONE_MED, otherFloor: 'down' },
          { floor: 2, top: 235, left: -51, rotate: 0, size: DRONE_MED, otherFloor: 'up' },
          { floor: 3, top: 235, left: -51, rotate: 0, size: DRONE_MED, otherFloor: 'down' },
          { floor: 2, top: -81, left: 214, rotate: 0, size: DRONE_MED, otherFloor: 'up' },
          { floor: 3, top: -81, left: 214, rotate: 0, size: DRONE_MED, otherFloor: 'down' }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: 186, left: 814, description: coastlineTerms.mainEntrance.removeBreakTags() },
          { letter: spawnTerms.b, top: -522, left: -280, description: coastlineTerms.poolSide },
          { letter: spawnTerms.c, top: 497, left: -525, description: coastlineTerms.ruins }
        ],
        roomLabels: [
          { floor: 1, top: -43, left: 265, description: coastlineTerms.serviceEntrance.removeBreakTags(), hardToRead: true  },
          { floor: 1, top: -14, left: 166, description: coastlineTerms.serviceEntrance, hardToRead: true },
          { floor: 1, top: 27, left: 265, description: coastlineTerms.toilets, hardToRead: true  },
          { floor: 1, top: 141, left: 220, description: coastlineTerms.mainLobby, hardToRead: true  },
          { floor: 1, top: 333, left: 249, description: coastlineTerms.southStairs, hardToRead: true  },
          { floor: 2, top: 333, left: 249, description: coastlineTerms.southStairs, hardToRead: true  },
          { floor: 1, top: 47, left: 44, description: coastlineTerms.kitchen, hardToRead: true },
          { floor: 1, top: -51, left: 12, description: coastlineTerms.kitchen, hardToRead: true },
          { floor: 1, top: 97, left: -38, description: coastlineTerms.hallway, hardToRead: true },
          { floor: 1, top: 319, left: 87, description: coastlineTerms.securityRoom, hardToRead: true },
          { floor: 1, top: 297, left: 4, description: coastlineTerms.sunRoom, hardToRead: true },
          { floor: 1, top: 269, left: -151, description: coastlineTerms.office, hardToRead: true },
          { floor: 1, top: 147, left: -151, description: coastlineTerms.blueBar, hardToRead: true },
          { floor: 1, top: 32, left: -215, description: coastlineTerms.sunriseBar, hardToRead: true },
          { floor: 1, top: -76, left: -249, description: coastlineTerms.poolEntrance, hardToRead: true },
          { floor: 1, top: -46, left: -86, description: coastlineTerms.northStairs, hardToRead: true },
          { floor: 2, top: -42, left: -59, description: coastlineTerms.northStairs, hardToRead: true },
          { floor: 2, top: 97, left: -38, description: coastlineTerms.hallway, hardToRead: true },
          { floor: 2, top: 3, left: -161, description: coastlineTerms.hookahLounge, hardToRead: true },
          { floor: 2, top: 168, left: -121, description: coastlineTerms.billiardsRoom, hardToRead: true },
          { floor: 2, top: 295, left: 175, description: coastlineTerms.hallway, hardToRead: true },
          { floor: 2, top: 292, left: 44, description: coastlineTerms.southHallway, hardToRead: true },
          { floor: 2, top: 301, left: -121, description: coastlineTerms.aquarium, hardToRead: true },
          { floor: 2, top: -57, left: 170, description: coastlineTerms.hallOfFame, hardToRead: true },
          { floor: 2, top: -36, left: 285, description: coastlineTerms.bathroom, hardToRead: true },
          { floor: 2, top: 27, left: 212, description: coastlineTerms.penthouse, hardToRead: true },
          { floor: 2, top: 212, left: 230, description: coastlineTerms.theater, hardToRead: true },
          { floor: 2, top: 1, left: -271, description: coastlineTerms.hookahDeck, hardToRead: true },
          { floor: 2, top: 36, left: 44, description: coastlineTerms.vipLounge, hardToRead: true },
          { outdoor: true, top: 167, left: -332, description: coastlineTerms.ruins, hardToRead: true },
          { floor: 1, top: -122, left: -17, description: coastlineTerms.cantina },
          { floor: 2, top: -122, left: 237, description: coastlineTerms.djBooth, hardToRead: true },
          { floor: 2, top: -122, left: -17, description: coastlineTerms.djBooth, hardToRead: true },
          { outdoor: true, top: -310, left: 189, description: coastlineTerms.pool },
          { outdoor: true, top: -296, left: -145, description: coastlineTerms.pool },
          { outdoor: true, top: -15, left: 412, description: coastlineTerms.mainEntrance, hardToRead: true },
          { outdoor: true, top: 305, left: 412, description: coastlineTerms.mainEntrance, hardToRead: true },
          { outdoor: true, top: 201, left: 44, description: coastlineTerms.courtyard, hardToRead: true },
          { outdoor: true, top: 421, left: -121, description: coastlineTerms.terrace },
          { outdoor: true, top: -387, left: 485, description: coastlineTerms.backAlley },
          { outdoor: true, top: -575, left: 211, description: coastlineTerms.poolSide },
          { outdoor: true, top: -166, left: -465, description: coastlineTerms.walkway, hardToRead: true },
          { floor: 2, top: 370, left: -121, description: coastlineTerms.balcony, hardToRead: true },
          { outdoor: true, top: -239, left: 445, description: coastlineTerms.garageRoof, hardToRead: true },
          { outdoor: true, top: 573, left: -211, description: coastlineTerms.southPromenade },
          { outdoor: true, top: 397, left: 43, description: coastlineTerms.southPromenade },
          { floor: 3 , top: 111, left: -121, description: coastlineTerms.rooftop, hardToRead: true },
          { floor: 3 , top: 78, left: 221, description: coastlineTerms.rooftop, hardToRead: true }
        ]
      },
      consulate: {
        name: mapNameTerms.consulate,
        imgUrlPrefix: 'consulate',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 0, top: -715, left: -1275, background: true, name: floorTerms.basement },
          { index: 1, top: -282, left: -452, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -282, left: -452, name: floorTerms.secondFloor },
          { index: 3, top: -282, left: -452, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 1, top: 41, left: 203 },
          { floor: 2, top: 121, left: -294 },
          { floor: 2, top: 45, left: 328 },
          { floor: 0, top: -34, left: 328 }
        ],
        bombObjectives: [
          { floor: 0, top: -34, left: 292, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 75, left: 115, set: 4, letter: objectiveTerms.bombShortB },
          { floor: 0, top: 56, left: -239, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 0, top: 130, left: -29, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 153, left: -255, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 153, left: 11, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 2, top: 167, left: 11, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 121, left: -256, set: 1, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 0, top: -26, left: -183 },
          { floor: 0, top: -34, left: 364 },
          { floor: 1, top: -6, left: 326 },
          { floor: 2, top: 0, left: 305 }
        ],
        zoomPoints: {
          topLeft: { top: -196, left: -354 },
          bottomRight: { top: 299, left: 455 }
        },
        compassPoints: {
          top: 314, left: 422
        },
        cameras: [
          {
            floor: 2, top: 26, left: -220, id: 1, location: consulateTerms.consulFrontDesk,
            los: [
              [{top: 85, left: -99}, {top: 85, left: -236}, {top: 2, left: -236}, {top: -31, left: -203}, {top: -31, left: -99}],
              [{top: 11, left: -93}, {top: -5, left: -17}],
              [{top: 44, left: -93}, {top: 60, left: -17}]
            ]
          },
          { floor: 2, top: -168, left: 11, id: 2, location: consulateTerms.mainStairs,
            los: [[
              {top: -108, left: -63}, {top: -137, left: -58}, {top: -168, left: -37}, {top: -185, left: -6},
              {top: -185, left: 28}, {top: -168, left: 59}, {top: -137, left: 80}, {top: -106, left: 85}
            ]]
          },
          { floor: 1, otherFloor: 'up', top: -168, left: 11, id: 2, location: consulateTerms.mainStairs },
          {
            floor: 1, top: -78, left: 374, id: 3, location: consulateTerms.visaOffice,
            los: [[{top: -52, left: 92}, {top: -61, left: 234}, {top: -97, left: 234}, {top: -97, left: 355}], [{top: -20, left: 391}, {top: 113, left: 418}]]
          },
          {
            floor: 1, top: 243, left: 11, id: 4, location: consulateTerms.frontDoor,
            los: [[{top: 165, left: 122}, {top: 217, left: 48}, {top: 258, left: 48}, {top: 258, left: 28}, {top: 279, left: 23}, {top: 279, left: -1}, {top: 258, left: -8}, {top: 258, left: -27}, {top: 215, left: -27}, {top: 215, left: -61}, {top: 168, left: -61}, {top: 96, left: -135}]]
          },
          {
            floor: 0, top: -79, left: 40, id: 5, location: consulateTerms.lockerHallway,
            los: [[{top: -54, left: -22}, {top: -92, left: 25}, {top: -92, left: 49}, {top: -117, left: 83}], [{top: -43, left: 87}, {top: 1, left: 133}]]
          },
          {
            floor: 0, top: -35, left: -150, id: 6, location: consulateTerms.garage,
            los: [[{top: -93, left: -135}, {top: -41, left: -135}, {top: -41, left: -100}, {top: 40, left: -100}]]
          },
          {
            outdoor: true, top: 498, left: -50, id: 7, location: consulateTerms.frontAlley,
            los: [[{top: 503, left: -435}, {top: 549, left: -52}, {top: 506, left: 464}]]
          },
          {
            outdoor: true, top: -32, left: -537, id: 8, location: consulateTerms.garageWay,
            los: [[{top: -48, left: -803}, {top: -94, left: -560}, {top: -32, left: -350}]]
          }
        ],
        ceilingHatches: [
          { floor: 0, top: 20, left: -172 },
          { floor: 0, top: 179, left: 108 },
          { floor: 0, top: -78, left: 150 },
          { floor: 0, top: 177, left: 316 },
          { floor: 0, top: -79, left: 374 },
          { floor: 0, top: 94, left: 2 },
          { floor: 1, top: 28, left: -320 },
          { floor: 1, top: 100, left: -37 },
          { floor: 1, top: 28, left: 261 }
        ],
        skylights: [
          { floor: 1, otherFloor: 'up', top: -102, left: 10 },
          { floor: 1, otherFloor: 'up', top: -24, left: -303 },
          { floor: 2, top: -24, left: -303 },
          { floor: 2, top: -102, left: 10 },
          { floor: 3, otherFloor: 'down', top: -24, left: -303 },
          { floor: 3, otherFloor: 'down', top: -102, left: 10 }
        ],
        droneTunnels: [
          { floor: 0, top: 26, left: -356, rotate: 90, size: DRONE_MED },
          { floor: 0, top: 103, left: 87, rotate: 90, size: DRONE_SMALL },
          { floor: 0, top: 200, left: 138, rotate: 0, size: DRONE_MED },
          { floor: 1, top: -1, left: -142, rotate: 0, size: DRONE_SMALL },
          { floor: 1, top: 186, left: 291, rotate: 90, size: DRONE_SMALL },
          { floor: 2, top: 67, left: 148, rotate: 90, size: DRONE_SMALL }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: 412, left: 622, description: consulateTerms.spawnRiotBarricade },
          { letter: spawnTerms.b, top: 634, left: -329, description: consulateTerms.spawnPoliceLine },
          { letter: spawnTerms.c, top: -509, left: -664, description: consulateTerms.spawnGasStation },
          { letter: spawnTerms.d, top: -322, left: 745, description: consulateTerms.spawnSideEntrance }
        ],
        roomLabels: [
          { floor: 0, top: -81, left: -305, description: consulateTerms.exitStairs },
          { floor: 0, top: 129, left: -261, description: consulateTerms.garage },
          { floor: 0, top: -62, left: -67, description: consulateTerms.basementCorridor },
          { floor: 0, top: -11, left: -40, description: consulateTerms.securityRoom },
          { floor: 0, top: 94, left: -84, description: consulateTerms.cafeteria },
          { floor: 0, top: -150, left: 11, description: consulateTerms.mainStairs },
          { floor: 0, top: -9, left: 57, description: consulateTerms.lockerHallway },
          { floor: 0, top: 144, left: 139, smaller: true, description: consulateTerms.serviceStairs },
          { floor: 0, top: -68, left: 113, smaller: true, description: consulateTerms.electricRoom },
          { floor: 0, top: 98, left: 139, description: consulateTerms.storageRoom },
          { floor: 0, top: -24, left: 245, description: consulateTerms.archives },
          { floor: 0, top: 180, left: 245, description: consulateTerms.archivesCorridor },
          { floor: 1, top: -59, left: -237, description: consulateTerms.exitStairs },
          { floor: 1, top: 105, left: -276, description: consulateTerms.pressRoom },
          { floor: 1, top: -61, left: -133, smaller: true, description: consulateTerms.westCorridor },
          { floor: 1, top: -13, left: -133, smaller: true, description: consulateTerms.westCorridor },
          { floor: 1, top: 49, left: -105, description: consulateTerms.publicBathroom },
          { floor: 1, top: 167, left: -139, description: consulateTerms.antechamber },
          { floor: 1, top: 44, left: 9, description: consulateTerms.lobby },
          { floor: 1, top: -60, left: 192, description: consulateTerms.eastCorridor, hardToRead: true },
          { floor: 1, top: 52, left: 138, description: consulateTerms.tellers, hardToRead: true },
          { floor: 1, top: 144, left: 139, smaller: true, description: consulateTerms.serviceStairs },
          { floor: 1, top: 184, left: 184, smaller: true, description: consulateTerms.serviceStairs },
          { floor: 1, top: -9, left: 270, description: consulateTerms.visaOffice, hardToRead: true },
          { floor: 1, top: 112, left: 352, description: consulateTerms.visaOffice, hardToRead: true },
          { floor: 1, top: -50, left: 10, description: consulateTerms.mainStairs },
          { floor: 1, top: 160, left: 430, description: consulateTerms.visaEntrance },
          { floor: 1, top: 298, left: 10, description: consulateTerms.frontDoor },
          { floor: 2, top: 300, left: 10, description: consulateTerms.balcony },
          { floor: 3, top: 300, left: 10, description: consulateTerms.balcony },
          { floor: 2, top: 184, left: 184, smaller: true, description: consulateTerms.serviceStairs },
          { floor: 2, top: -48, left: 161, description: consulateTerms.copyRoom },
          { floor: 2, top: 39, left: -275, hardToRead: true, description: consulateTerms.cabinet },
          { floor: 2, top: -48, left: 279, hardToRead: true, description: consulateTerms.administrationOffice },
          { floor: 2, top: 112, left: 279, hardToRead: true, description: consulateTerms.administrationOffice },
          { floor: 2, top: -50, left: 10, description: consulateTerms.mainStairs },
          { floor: 2, top: 29, left: 182, description: consulateTerms.breakRoom },
          { floor: 2, top: 118, left: 148, description: consulateTerms.frontOffice },
          { floor: 2, top: 106, left: 33, hardToRead: true, description: consulateTerms.meetingRoom },
          { floor: 2, top: 28, left: 11, description: consulateTerms.hallway },
          { floor: 2, top: 27, left: -125, description: consulateTerms.consulFrontDesk },
          { floor: 2, top: -59, left: -149, description: consulateTerms.privateBathroom },
          { floor: 2, top: -59, left: -237, description: consulateTerms.exitStairs },
          { floor: 2, top: 123, left: -113, hardToRead: true, description: consulateTerms.waitingRoom },
          { floor: 2, top: 123, left: -200, hardToRead: true, description: consulateTerms.consulateOffice },
          { outdoor: true, top: 72, left: -602, description: consulateTerms.garageWay },
          { outdoor: true, top: -323, left: -267, description: consulateTerms.courtyard },
          { outdoor: true, top: -323, left: 256, description: consulateTerms.courtyard },
          { outdoor: true, top: -648, left: -93, description: consulateTerms.backCourtyard },
          { outdoor: true, top: -323, left: 577, description: consulateTerms.sideEntrance },
          { outdoor: true, top: -142, left: 451, description: consulateTerms.dumpster },
          { outdoor: true, top: 23, left: 592, description: consulateTerms.parking },
          { outdoor: true, top: 272, left: 592, description: consulateTerms.parking },
          { outdoor: true, top: -137, left: 227, description: consulateTerms.gardens },
          { outdoor: true, top: -137, left: -201, description: consulateTerms.gardens },
          { outdoor: true, top: 358, left: -522, description: consulateTerms.fountain },
          { outdoor: true, hardToRead: true, smaller: true, top: -80, left: -377, description: consulateTerms.emergencyExit },
          { outdoor: true, top: 66, left: -399, description: consulateTerms.garageRoof },
          { outdoor: true, top: -127, left: -660, description: consulateTerms.memorialGarden },
          { outdoor: true, top: 622, left: -85, description: consulateTerms.policeLine },
          { outdoor: true, top: 622, left: 358, description: consulateTerms.riotBarracade },
          { outdoor: true, top: 438, left: -219, description: consulateTerms.westFrontYard },
          { outdoor: true, top: 438, left: 224, description: consulateTerms.eastFrontYard },
          { outdoor: true, top: 438, left: 9, description: consulateTerms.frontAlley },
          { floor: 3, top: 42, left: -166, description: consulateTerms.buildingRoof },
          { floor: 3, top: 42, left: 177, description: consulateTerms.buildingRoof }
        ]
      },
      favela: {
        name: mapNameTerms.favela,
        imgUrlPrefix: 'favela',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 1, top: -715, left: -1275, background: true, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -411, left: -771, name: floorTerms.secondFloor },
          { index: 3, top: -411, left: -771, name: floorTerms.thirdFloor },
          { index: 4, top: -411, left: -771, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 3, top: -159, left: 114 },
          { floor: 2, top: -207, left: -141 },
          { floor: 2, top: 204, left: -116 },
          { floor: 1, top: -12, left: -144 }
        ],
        bombObjectives: [
          { floor: 3, top: -160, left: 151, otherFloor: 'down', set: 1, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -217, left: 45, otherFloor: 'up', set: 1, letter: objectiveTerms.bombShortA },
          { floor: 2, top: -27, left: -262, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 2, top: 78, left: -263, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 155, left: -96, otherFloor: 'down', set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 270, left: -151, otherFloor: 'up', set: 3, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -62, left: -190, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 83, left: -344, set: 4, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 3, top: -159, left: 75 },
          { floor: 2, top: 56, left: -149 },
          { floor: 1, top: -153, left: -125 },
          { floor: 1, top: 269, left: -109 }
        ],
        zoomPoints: {
          topLeft: { top: -310, left: -584 },
          bottomRight: { top: 354, left: 183 }
        },
        compassPoints: {
          top: 280, left: 330
        },
        ladders: [
          { floor: 1, top: 476, left: -161, otherFloor: 'up' },
          { floor: 2, top: 476, left: -161, otherFloor: 'down' },
          { floor: 1, top: 309, left: 19, otherFloor: 'up' },
          { floor: 2, top: 309, left: 19, otherFloor: 'down' },
          { floor: 2, top: 166, left: 343, otherFloor: 'up' },
          { floor: 3, top: 166, left: 343, otherFloor: 'down' },
          { floor: 3, top: -138, left: 477, otherFloor: 'up' },
          { floor: 4, top: -138, left: 477, otherFloor: 'down' }
        ],
        cameras: [
          {
            floor: 3, top: -295, left: -45, id: 1, location: favelaTerms.backStairs,
            los: [[{top: -187, left: -62 }, {top: -310, left: -62}, {top: -310, left: 31}]]
          },
          {
            floor: 2, top: 299, left: -210, id: 2, location: favelaTerms.mainStairs,
            los: [[{top: 153, left: -256}, {top: 312, left: -256}, {top: 312, left: -124}]]
          },
          {
            floor: 1, top: -126, left: -69, id: 3, location: favelaTerms.laundryRoom,
            los: [[{top: -200, left: -86}, {top: -111, left: -86}, {top: -111, left: 50}], [{top: -201, left: 11}, {top: -285, left: 46}]]
          },
          {
            floor: 1, top: 156, left: -246, id: 4, location: favelaTerms.stairHall,
            los: [[{top: 224, left: -256}, {top: -60, left: -266}], [{top: 167, left: -209}, {top: 181, left: -102}]]
          },
          {
            outdoor: true, top: -384, left: -498, id: 5, location: favelaTerms.schoolAlley,
            los: [[{top: 74, left: -600}, {top: -416, left: -521}, {top: -446, left: -453}]]
          },
          {
            outdoor: true, top: 346, left: 18, id: 6, location: favelaTerms.street,
            los: [[{top: 434, left: -615}, {top: 408, left: 484}]]
          },
          {
            outdoor: true, top: -525, left: 230, id: 7, location: favelaTerms.backAlley,
            los: [[{top: -562, left: -89}, {top: -562, left: 248}, {top: -320, left: 401}]]
          }
        ],
        ceilingHatches: [
          { floor: 1, top: 1, left: -179 },
          { floor: 1, top: 39, left: -292 },
          { floor: 2, top: -222, left: 79 },
          { floor: 2, top: 264, left: -66 },
          { floor: 1, top: -244, left: -121 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 1, top: 111, left: -380, rotate: 90, size: DRONE_MED },
          { floor: 1, top: -285, left: -32, rotate: 0, size: DRONE_MED },
          { floor: 2, top: 128, left: -135, rotate: 0, size: DRONE_SMALL },
          { floor: 1, top: 5, left: -281, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: -110, left: -184, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: -91, left: -201, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: 126, left: -99, rotate: 0, size: DRONE_SMALL }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -162, left: 562, description: favelaTerms.rooftops },
          { letter: spawnTerms.b, top: 464, left: -668, description: favelaTerms.market },
          { letter: spawnTerms.c, top: -617, left: -469, description: favelaTerms.schoolAlley }
        ],
        roomLabels: [
          { floor: 3, top: -266, left: 109, description: favelaTerms.packagingRoom, veryHardToRead: true },
          { floor: 2, top: -54, left: -142, description: favelaTerms.footballApartment },
          { floor: 2, top: 112, left: -142, description: favelaTerms.footballApartment.removeBreakTags() },
          { floor: 1, top: -178, left: -213, description: favelaTerms.armoryRoom },
          { floor: 1, top: 210, left: -159, description: favelaTerms.auntsApartment, veryHardToRead: true },
          { floor: 1, top: 173, left: -61, description: favelaTerms.auntsApartment, veryHardToRead: true },
          { floor: 2, top: 190, left: -42, description: favelaTerms.auntsBedroom, veryHardToRead: true },
          { floor: 2, top: -205, left: -191, description: favelaTerms.growRoom, veryHardToRead: true },
          { floor: 1, top: -60, left: -136, description: favelaTerms.bikersApartment, hardToRead: true },
          { floor: 1, top: 78, left: -162, description: favelaTerms.bikersApartment, veryHardToRead: true },
          { floor: 2, top: -253, left: 95, description: favelaTerms.methLab, veryHardToRead: true },
          { floor: 2, top: -69, left: -321, description: favelaTerms.footballBedroom },
          { floor: 2, top: 85, left: -321, description: favelaTerms.footballOffice, hardToRead: true },
          { floor: 1, top: 44, left: -340, description: favelaTerms.bikersBedroom },
          { floor: 3, top: -266, left: -10, description: favelaTerms.backStairs, hardToRead: true },
          { floor: 2, top: -250, left: -37, description: favelaTerms.backStairs, hardToRead: true },
          { floor: 1, top: -250, left: -37, description: favelaTerms.backStairs, hardToRead: true },
          { floor: 2, top: 279, left: -165, description: favelaTerms.auntsHall, hardToRead: true },
          { floor: 2, top: 299, left: -63, description: favelaTerms.kidsRoom, hardToRead: true },
          { floor: 2, top: 223, left: -233, smaller: true, description: favelaTerms.mainStairs, hardToRead: true },
          { floor: 3, top: 223, left: -228, smaller: true, description: favelaTerms.mainStairs, hardToRead: true },
          { floor: 1, top: 223, left: -236, smaller: true, description: favelaTerms.mainStairs, hardToRead: true },
          { floor: 1, top: 86, left: -245, smaller: true, description: favelaTerms.stairHall },
          { floor: 2, top: -167, left: -299, description: favelaTerms.roof, hardToRead: true },
          { floor: 3, top: 33, left: -188, description: favelaTerms.roof },
          { floor: 1, top: -155, left: -3, description: favelaTerms.laundryRoom, hardToRead: true },
          { floor: 1, top: -241, left: -157, description: favelaTerms.vaultRoom },
          { floor: 1, top: -63, left: -306, description: favelaTerms.bikersGarage, hardToRead: true },
          { outdoor: true, top: -356, left: 524, description: favelaTerms.backAlley },
          { outdoor: true, top: -487, left: 213, description: favelaTerms.backAlley },
          { outdoor: true, top: -646, left: -157, description: favelaTerms.schoolAlley },
          { outdoor: true, top: -147, left: -478, description: favelaTerms.footballPitch },
          { floor: 1, top: 310, left: -417, description: favelaTerms.market },
          { floor: 2, top: 310, left: -417, description: favelaTerms.market },
          { outdoor: true, top: 232, left: 580, description: favelaTerms.street },
          { outdoor: true, top: 394, left: 122, description: favelaTerms.street },
          { outdoor: true, top: 103, left: 365, description: favelaTerms.rooftops, hardToRead: true },
          { outdoor: true, top: 130, left: 79, description: favelaTerms.courtyard },
          { floor: 1, top: -143, left: 213, description: favelaTerms.courtyard },
          { floor: 2, top: -143, left: 213, description: favelaTerms.courtyard },
          { outdoor: true, top: -330, left: -34, description: favelaTerms.accessAlley },
          { outdoor: true, top: 242, left: -294, description: favelaTerms.marketAlley, smaller: true },
          { outdoor: true, top: -552, left: -227, description: favelaTerms.schoolRooftops },
          { outdoor: true, top: -403, left: 95, description: favelaTerms.schoolRooftops, smaller: true },
          { floor: 1, top: 344, left: -90, description: favelaTerms.shop },
          { floor: 3, top: 237, left: -412, description: favelaTerms.marketRooftops, hardToRead: true },
          { floor: 3, top: 420, left: -412, description: favelaTerms.marketRooftops, hardToRead: true }
        ]
      },
      fortress: {
        name: mapNameTerms.fortress,
        imgUrlPrefix: 'fortress',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 0, top: -1678, left: -3250, background: true, dontSelect: true },
          // top pixel 1315, left pixel 2894
          { index: 1, top: 1315 - 1678, left: 2894 - 3250, name: floorTerms.firstFloor },
          // top pixel 1315, left pixel 2781
          { index: 2, top: 1315 - 1678, left: 2781 - 3250, name: floorTerms.secondFloor },
          // top pixel 1310, left pixel 2885
          { index: 3, top: 1310 - 1678, left: 2885 - 3250, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 2, top: -36, left: -25 },
          { floor: 2, top: 204, left: 215 },
          { floor: 1, top: 37, left: 63 },
          { floor: 1, top: 141, left: -202 }
        ],
        bombObjectives: [
          { floor: 2, top: -161, left: -178, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -178, left: 1, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 2, top: -4, left: 144, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 2, top: 258, left: 13, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 108, left: 196, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 1, top: 37, left: 93, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -64, left: -268, set: 4, letter: objectiveTerms.bombShortB },
          { floor: 1, top: 141, left: -232, set: 4, letter: objectiveTerms.bombShortA }
        ],
        secureObjectives: [
          { floor: 2, top: -151, left: -148 },
          { floor: 2, top: 142, left: 54 },
          { floor: 1, top: 108, left: 166 },
          { floor: 1, top: -157, left: -10 }
        ],
        zoomPoints: {
          topLeft: { top: -344, left: -388 },
          bottomRight: { top: 436, left: 522 }
        },
        compassPoints: {},
        ladders: [
          { floor: 1, top: -238, left: 279, otherFloor: 'up' },
          { floor: 2, top: -238, left: 279, otherFloor: 'down' }
        ],
        cameras: [
          {
            floor: 2, top: -278, left: -267, id: 1, location: fortressTerms.towerStairs,
            los: [
              [{ top: -273, left: -194 }, { top: -260, left: -54 }],
              [{ top: -238, left: -249 }, { top: -165, left: -203 }]// 511, 584
            ]
          },
          {
            floor: 2, top: 46, left: -57, id: 2, location: fortressTerms.centralStairsHall,
            los: [
              [{ top: 34, left: -201 }, { top: 36, left: -154 }],
              [{ top: 38, left: 63 }, { top: 35, left: 96 }],
              [{ top: 142, left: -41 }, { top: 167, left: -33 }],
              [{ top: 177, left: -41 }, { top: 277, left: -29 }]
            ]
          },
          {
            floor: 2, top: 313, left: 330, id: 3, location: fortressTerms.oldTower,
            los: [
              [{ top: 287, left: 153 }, { top: 293, left: 153 }, { top: 309, left: 285 }, { top: 320, left: 285 }],
              [{ top: 322, left: 342 }, { top: 221, left: 402 }]
            ]
          },
          {
            floor: 1, top: -234, left: -176, id: 4, location: fortressTerms.lobby,
            los: [
              [{ top: -291, left: -194}, { top: -287, left: -220 }, { top: -239, left: -220}],
              [{ top: -191, left: -154 }, { top: -120, left: -112 }],
              [{ top: -196, left: -95 }, { top: -190, left: -64 }],
              [{ top: -227, left: -62 }, { top: -215, left: 81 }]
            ]
          },
          {
            floor: 1, top: 224, left: -40, id: 5, location: fortressTerms.hammamHallway,
            los: [
              [{ top: -4, left: -81 }, { top: -26, left: -84 }],
              [{ top: 244, left: -78 }, { top: 255, left: -76 }, { top: 255, left: -57 }, { top: 241, left: -53 }],
              [{ top: 233, left: 108 }, { top: 251, left: 262 }],
              [{ top: 203, left: 228 }, { top: 200, left: 293 }]
            ]
          },
          {
            outdoor: true, top: -234, left: -375, id: 6, location: fortressTerms.cannonOverlook,
            los: [[{ top: 0, left: -470 }, { top: -600, left: -320 }]]
          },
          {
            outdoor: true, top: 202, left: 415, id: 7, location: fortressTerms.courtyardPath,
            los: []
          },
          {
            floor: 3, top: 315, left: 123, id: 8, location: fortressTerms.oldRoof,
            los: [[
              { top: 328, left: -450 }, { top: 328, left: 0 }, { top: 350, left: 10 }, { top: 350, left: 120 },
              { top: 328, left: 130 }, { top: 500, left: 525 }
            ]]
          }
        ],
        ceilingHatches: [
          { floor: 2, top: 358, left: 89 },
          { floor: 1, top: 297, left: 322 },
          { floor: 1, top: 37, left: 56 },
          { floor: 1, top: -10, left: -63 }
        ],
        skylights: [
          { floor: 1, otherFloor: 'up', top: -113, left: 186 },
          { floor: 2, top: -113, left: 186 },
          { floor: 3, otherFloor: 'down', top: -113, left: 186 }
        ],
        droneTunnels: [
          // 1F
          // external walls, starting south west going ccw
          { floor: 1, top: 298, left: -98, rotate: 0, size: 23 },
          { floor: 1, top: 259, left: 106, rotate: 90, size: 23 },
          { floor: 1, top: 307, left: 263, rotate: 90, size: 23 },
          { floor: 1, top: -56, left: 259, rotate: 90, size: 23 },
          { floor: 1, top: -268, left: 287, rotate: 0, size: 23 },
          { floor: 1, top: -316, left: -13, rotate: 0, size: 51 },
          { floor: 1, top: -251, left: -283, rotate: 90, size: 40 },
          { floor: 1, top: -258, left: -260, rotate: 45, size: 23 },
          // internal walls, starting south, going north
          { floor: 1, top: 223, left: -109, rotate: 135, size: 10 },
          { floor: 1, top: 223, left: -93, rotate: 90, size: 29 },
          { floor: 1, top: 147, left: 22, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -16, left: 61, rotate: 0, size: 44 },
          { floor: 1, top: -152, left: -97, rotate: 0, size: DRONE_SMALL },
          { floor: 1, top: -199, left: -194, rotate: 90, size: DRONE_SMALL },
          // 2F
          // external walls
          { floor: 2, top: 261, left: -83, rotate: 90, size: 23 },
          { floor: 2, top: -50, left: 280, rotate: 90, size: 23 },
          // internal walls
          { floor: 2, top: 282, left: 132, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: 185, left: 118, rotate: 90, size: DRONE_SMALL },
          { floor: 2, top: 74, left: 46, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: 32, left: -28, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: -117, left: 58, rotate: 90, size: DRONE_SMALL },
          { floor: 2, top: -235, left: -176, rotate: 0, size: DRONE_SMALL }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -690, left: -370, description: fortressTerms.mainGate },
          { letter: spawnTerms.b, top: -690, left: 170, description: fortressTerms.parking },
          { letter: spawnTerms.c, top: 670, left: 15, description: fortressTerms.garden },
          { letter: spawnTerms.d, top: 580, left: 415, description: fortressTerms.stable }
        ],
        roomLabels: [
          // EXT
          { outdoor: true, top: 372, left: -260, description: fortressTerms.gardenPath, hardToRead: true },
          { floor: 1, top: 345, left: 0, description: fortressTerms.gardenPath, hardToRead: true },
          { outdoor: true, top: 400, left: 180, description: fortressTerms.gardenPath, hardToRead: true },
          { outdoor: true, top: 400, left: 370, description: fortressTerms.stablePath, veryHardToRead: true },
          { outdoor: true, top: 201, left: 509, description: fortressTerms.cliffside, veryHardToRead: true },
          { outdoor: true, top: -9, left: 499, description: fortressTerms.cliffside, veryHardToRead: true },
          { outdoor: true, top: -239, left: 419, description: fortressTerms.cliffside, veryHardToRead: true },
          { outdoor: true, top: -499, left: 380, description: fortressTerms.cliffside, veryHardToRead: true },
          { outdoor: true, top: 100, left: 410, description: fortressTerms.courtyardPath, hardToRead: true },
          { outdoor: true, top: -120, left: 350, description: fortressTerms.courtyardPath, hardToRead: true },
          { outdoor: true, top: 219, left: -401, description: fortressTerms.cannonOverlook, veryHardToRead: true },
          { outdoor: true, top: -19, left: -401, description: fortressTerms.cannonOverlook, veryHardToRead: true },
          { outdoor: true, top: -290, left: -341, description: fortressTerms.cannonOverlook, veryHardToRead: true },
          { outdoor: true, top: -350, left: 170, description: fortressTerms.unloadingZone, veryHardToRead: true },
          { outdoor: true, top: -403, left: -140, description: fortressTerms.frontEntrance, veryHardToRead: true },
          // 1F
          { floor: 1, top: 277, left: 325, description: fortressTerms.laundryRoom, hardToRead: true },
          { floor: 1, top: 156, left: -140, description: fortressTerms.hammam, veryHardToRead: true },
          { floor: 1, top: 255, left: -243, description: fortressTerms.hammam, veryHardToRead: true },
          { floor: 1, top: 280, left: -134, description: fortressTerms.showers, veryHardToRead: true },
          { floor: 1, top: 198, left: -45, description: fortressTerms.hammamHallway, hardToRead: true },
          { floor: 1, top: 246, left: 183, description: fortressTerms.hammamHallway.removeBreakTags(), hardToRead: true },
          { floor: 1, top: 202, left: 294, description: fortressTerms.oldTowerStairs, veryHardToRead: true },
          { floor: 1, top: 154, left: 120, description: fortressTerms.cafeteria, hardToRead: true },
          { floor: 1, top: 125, left: -13, description: fortressTerms.centralStairs, veryHardToRead: true },
          { floor: 1, top: 70, left: 279, description: fortressTerms.infirmary, veryHardToRead: true },
          { floor: 1, top: 39, left: 2, description: fortressTerms.kitchen, veryHardToRead: true },
          { floor: 1, top: 44, left: -180, description: fortressTerms.changingRoom },
          { floor: 1, top: -5, left: -100, description: fortressTerms.mainHallway, veryHardToRead: true },
          { floor: 1, top: 12, left: 170, description: fortressTerms.waitingRoom, hardToRead: true },
          { floor: 1, top: -35, left: -207, description: fortressTerms.sittingRoom, hardToRead: true },
          { floor: 1, top: -60, left: -35, description: fortressTerms.diningRoom, hardToRead: true },
          { floor: 1, top: -103, left: 143, description: fortressTerms.courtyard, hardToRead: true },
          { floor: 1, top: -170, left: -239, description: fortressTerms.musicRoom, hardToRead: true },
          { floor: 1, top: -223, left: -128, description: fortressTerms.lobby, hardToRead: true },
          { floor: 1, top: -229, left: 243, description: fortressTerms.courtyardLadder, hardToRead: true },
          { floor: 1, top: -251, left: -13, description: fortressTerms.office, hardToRead: true },
          { floor: 1, top: -285, left: -237, description: fortressTerms.lobbyStairs, veryHardToRead: true },
          // 2F
          { floor: 2, top: 190, left: -200, description: fortressTerms.hammamRoof, veryHardToRead: true },
          { floor: 2, top: 351, left: 0, description: fortressTerms.shishaLounge, veryHardToRead: true },
          { floor: 2, top: 317, left: 190, description: fortressTerms.shishaHallway, hardToRead: true },
          { floor: 2, top: 220, left: -49, description: fortressTerms.centralStairsHall, veryHardToRead: true },
          { floor: 2, top: 63, left: 31, description: fortressTerms.centralStairsHall.removeBreakTags(), hardToRead: true },
          { floor: 2, top: 230, left: 40, description: fortressTerms.dormitory, hardToRead: true },
          { floor: 2, top: 132, left: 120, description: fortressTerms.dormitory, hardToRead: true },
          { floor: 2, top: 232, left: 162, description: fortressTerms.gamesRoom, hardToRead: true },
          { floor: 2, top: 128, left: -7, description: fortressTerms.centralStairs, veryHardToRead: true },
          { floor: 2, top: 62, left: 200, description: fortressTerms.briefingRoom, veryHardToRead: true },
          { floor: 2, top: 1, left: 300, description: fortressTerms.courtyardBalcony, veryHardToRead: true },
          { floor: 2, top: -145, left: -241, description: fortressTerms.museum, hardToRead: true },
          { floor: 2, top: 6, left: -160, description: fortressTerms.museum, hardToRead: true },
          { floor: 2, top: 2, left: 0, description: fortressTerms.bathroom, hardToRead: true },
          { floor: 2, top: -98, left: -120, description: fortressTerms.commandersOffice, veryHardToRead: true },
          { floor: 2, top: -101, left: 143, description: fortressTerms.courtyard, hardToRead: true },
          { floor: 2, top: -224, left: 247, description: fortressTerms.courtyardTower, veryHardToRead: true },
          { floor: 2, top: -297, left: -236, description: fortressTerms.towerStairs, veryHardToRead: true },
          { floor: 2, top: -246, left: -160, description: fortressTerms.towerHallway, veryHardToRead: true },
          { floor: 2, top: -279, left: 0, description: fortressTerms.towerRenovation, veryHardToRead: true },
          // Roof
          { floor: 3, top: 190, left: -200, description: fortressTerms.hammamRoof, veryHardToRead: true },
          { floor: 3, top: 230, left: 100, description: fortressTerms.oldRoof, veryHardToRead: true },
          { floor: 3, top: 282, left: 356, description: fortressTerms.oldTower, veryHardToRead: true },
          { floor: 3, top: -108, left: 0, description: fortressTerms.modernRoof, veryHardToRead: true },
          { floor: 3, top: 1, left: 300, description: fortressTerms.courtyardBalcony, veryHardToRead: true },
          { floor: 3, top: -288, left: -226, description: fortressTerms.westTower, veryHardToRead: true },
          { floor: 3, top: -288, left: 16, description: fortressTerms.eastTower, veryHardToRead: true },
          { floor: 3, top: -228, left: 280, description: fortressTerms.guardTower, veryHardToRead: true }
        ]
      },
      hereford: {
        name: mapNameTerms.hereford,
        imgUrlPrefix: 'hereford',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 0, top: -715, left: -1275, background: true, name: floorTerms.basement },
          { index: 1, top: -63, left: -414, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -63, left: -414, name: floorTerms.secondFloor },
          { index: 3, top: -63, left: -414, name: floorTerms.thirdFloor },
          { index: 4, top: -63, left: -414, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 0, top: 193, left: -94 },
          { floor: 1, top: 335, left: -111 },
          { floor: 2, top: 224, left: -27 },
          { floor: 3, top: 339, left: -84 }
        ],
        bombObjectives: [
          { floor: 0, top: 145, left: -57, set: 4, letter: objectiveTerms.bombShortB },
          { floor: 0, top: 323, left: 77, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 332, left: -63, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 132, left: -96, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 1, otherFloor: 'up', top: 352, left: 73, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 2, otherFloor: 'down', top: 352, left: 73, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 3, top: 399, left: 86, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 3, top: 386, left: -101, set: 1, letter: objectiveTerms.bombShortA }
        ],
        secureObjectives: [
          { floor: 0, top: 146, left: -94 },
          { floor: 1, top: 296, left: 111 },
          { floor: 2, top: 176, left: 6 },
          { floor: 3, top: 295, left: 86 }
        ],
        zoomPoints: {
          topLeft: { top: 25, left: -268 },
          bottomRight: { top: 463, left: 210 }
        },
        compassPoints: {
          top: 356, left: 497
        },
        ladders: [
          { floor: 1, top: 434, left: 605, otherFloor: 'up' },
          { floor: 2, top: 434, left: 605, otherFloor: 'down' },
          { floor: 1, top: 444, left: -44, otherFloor: 'up' },
          { floor: 2, top: 444, left: -44, otherFloor: 'down' },
          { floor: 1, top: 346, left: -171, otherFloor: 'down' },
          { floor: 0, top: 346, left: -171, otherFloor: 'up' },
          { floor: 2, top: 184, left: -165, otherFloor: 'up' },
          { floor: 3, top: 184, left: -165, otherFloor: 'down' }
        ],
        cameras: [
          {
            floor: 3, top: 205, left: -12, id: 1, location: herefordTerms.rooftop,
            los: [[{top: 419, left: -28}, {top: 192, left: -28}, {top: 192, left: 141}]]
          },
          {
            floor: 2, top: 268, left: -1, id: 2, location: herefordTerms.corridor,
            los: [
              [{top: 191, left: -46}, {top: 247, left: -11}, {top: 254, left: -11}, {top: 254, left: -28}, {top: 284, left: -28}, {top: 304, left: -99}],
              [{top: 303, left: -37}, {top: 366, left: -140}],
              [{top: 178, left: 33}, {top: 247, left: 18}, {top: 254, left: 18}, {top: 254, left: 33}, {top: 418, left: 33}]
            ]
          },
          {
            floor: 1, top: 247, left: 5, id: 3, location: herefordTerms.corridor1,
            los: [
              [{top: 223, left: -121}, {top: 241, left: -26}],
              [{top: 109, left: 18}, {top: 255, left: 18}, {top: 255, left: 32}, {top: 418, left: 32}]
            ]
          },
          {
            floor: 0, top: 123, left: 125, id: 4, location: herefordTerms.lockers,
            los: [[{top: 213, left: -27}, {top: 179, left: 47}, {top: 110, left: 47}, {top: 110, left: 142}, {top: 248, left: 142}, {top: 248, left: 36}, {top: 333, left: -27}]]
          },
          {
            outdoor: true, top: -238, left: 299, id: 5, location: herefordTerms.shootingRangeEastEntrance,
            los: [[{top: -613, left: -132}, {top: -220, left: 362}]]
          },
          {
            outdoor: true, top: 511, left: -298, id: 6, location: herefordTerms.forkliftArea,
            los: [[{top: 434, left: -398}, {top: 543, left: -319}, {top: 550, left: -60}]]
          }
        ],
        ceilingHatches: [
          { floor: 0, top: 120, left: -158 },
          { floor: 0, top: 398, left: -94 },
          { floor: 1, top: 368, left: -86 },
          { floor: 1, top: 403, left: 66 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 1, top: 239, left: -267, rotate: 90, size: DRONE_MED },
          { floor: 0, top: 98, left: 24, rotate: 0, size: 26 },
          { floor: 0, top: 83, left: 34, rotate: 90, size: 32 },
          { floor: 1, top: 442, left: -13, rotate: 0, size: 52 },
          { floor: 1, top: 340, left: 147, rotate: 90, size: DRONE_MED }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: 322, left: -789, description: herefordTerms.spawnTrainingCourse },
          { letter: spawnTerms.b, top: 236, left: 703, description: herefordTerms.spawnParking },
          { letter: spawnTerms.c, top: -630, left: 27, description: herefordTerms.spawnShootingRange }
        ],
        roomLabels: [
          { floor: 0, top: 263, left: -86, description: herefordTerms.armory },
          { floor: 0, top: 191, left: 94, description: herefordTerms.lockers },
          { floor: 0, top: 272, left: 2, description: herefordTerms.corridor },
          { floor: 0, top: 407, left: 1, description: herefordTerms.mainStairs },
          { floor: 0, top: 362, left: -88, description: herefordTerms.maintenanceArea },
          { floor: 0, top: 288, left: 94, description: herefordTerms.briefingRoom },
          { floor: 0, top: 218, left: 184, hardToRead: true, smaller: true, description: herefordTerms.basementEntrance },
          { floor: 1, top: 223, left: -219, description: herefordTerms.garage },
          { floor: 1, top: 177, left: -112, description: herefordTerms.TVRoom },
          { floor: 1, top: 245, left: -96, hardToRead: true, description: herefordTerms.garageCorridor },
          { floor: 1, top: 296, left: -138, description: herefordTerms.kitchen },
          { floor: 1, top: 302, left: 2, description: herefordTerms.corridor1 },
          { floor: 1, top: 407, left: 1, description: herefordTerms.mainStairs },
          { floor: 1, top: 379, left: 119, description: herefordTerms.diningRoom },
          { floor: 1, top: 218, left: 86, description: herefordTerms.pianoLounge },
          { floor: 2, top: 320, left: -68, hardToRead: true, description: herefordTerms.office },
          { floor: 2, top: 158, left: -67, hardToRead: true, description: herefordTerms.masterBedroom },
          { floor: 2, top: 334, left: 1, description: herefordTerms.corridor },
          { floor: 2, top: 407, left: 1, description: herefordTerms.mainStairs },
          { floor: 2, top: 451, left: 1, description: herefordTerms.backAccess },
          { floor: 2, top: 152, left: 116, hardToRead: true, description: herefordTerms.laundryRoom },
          { floor: 2, top: 227, left: 87, hardToRead: true, description: herefordTerms.bathroom },
          { floor: 2, top: 317, left: 91, hardToRead: true, description: herefordTerms.kidsBedroom },
          { floor: 3, top: 223, left: -87, description: herefordTerms.ballisticMatDepot },
          { floor: 3, top: 311, left: -68, description: herefordTerms.storage },
          { floor: 3, top: 246, left: -9, smaller: true, description: herefordTerms.storageCorridor },
          { floor: 3, top: 408, left: 1, description: herefordTerms.mainStairs },
          { floor: 3, top: 374, left: 92, description: herefordTerms.dummyDepot },
          { floor: 3, top: 261, left: 72, description: herefordTerms.workshop },
          { outdoor: true, top: -284, left: -215, description: herefordTerms.shootingRangeWestEntrance },
          { outdoor: true, top: -284, left: 254, description: herefordTerms.shootingRangeEastEntrance },
          { outdoor: true, top: -114, left: 12, description: herefordTerms.tireSetting },
          { outdoor: true, top: -264, left: 25, description: herefordTerms.observationRamp },
          { outdoor: true, top: -38, left: 335, description: herefordTerms.barracks },
          { outdoor: true, top: 319, left: 335, description: herefordTerms.barracks },
          { outdoor: true, top: 526, left: 209, description: herefordTerms.busBackAlley },
          { outdoor: true, top: 526, left: -215, description: herefordTerms.busBackAlley },
          { outdoor: true, top: 295, left: -528, description: herefordTerms.rappelTower },
          { floor: 3, top: 131, left: -1, description: herefordTerms.terrace },
          { floor: 4, top: 131, left: -1, description: herefordTerms.terrace },
          { outdoor: true, top: 2, left: -4, description: herefordTerms.frontAccess },
          { outdoor: true, top: 29, left: -317, description: herefordTerms.chapelGate },
          { outdoor: true, top: 286, left: -336, description: herefordTerms.forkliftArea },
          { outdoor: true, top: 187, left: 266, description: herefordTerms.sideStairsAlley },
          { outdoor: true, top: 50, left: 132, description: herefordTerms.basementEntrance },
          { outdoor: true, top: 583, left: 646, description: herefordTerms.parkingEntrance },
          { floor: 1, top: 116, left: 190, description: herefordTerms.sideStairs },
          { floor: 2, top: 116, left: 190, description: herefordTerms.sideStairs },
          { floor: 3, top: 116, left: 190, description: herefordTerms.sideStairs },
          { floor: 4, top: 116, left: 190, description: herefordTerms.sideStairs },
          { floor: 2, top: 283, left: -212, description: herefordTerms.garageTop },
          { floor: 3, top: 283, left: -212, description: herefordTerms.garageTop },
          { floor: 4, top: 283, left: -212, description: herefordTerms.garageTop },
          { floor: 4, top: 318, left: -40, description: herefordTerms.rooftop }
        ]
      },
      house: {
        name: mapNameTerms.house,
        imgUrlPrefix: 'house',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 0, top: -715, left: -1275, background: true, name: floorTerms.basement },
          { index: 1, top: -251, left: -382, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -251, left: -382, name: floorTerms.secondFloor },
          { index: 3, top: -251, left: -382, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 2, top: -110, left: -178 },
          { floor: 0, top: 55, left: -29 },
          { floor: 1, top: 57, left: 147 },
          { floor: 2, top: 61, left: 91 }
        ],
        bombObjectives: [
          { floor: 0, top: -59, left: -189, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 0, top: 10, left: 75, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 0, top: -59, otherFloor: 'up', left: -153, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -66, otherFloor: 'down', left: -154, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -110, left: -142, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 123, left: -105, set: 1, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 0, top: 85, left: 75 },
          { floor: 1, top: -111, left: -154 },
          { floor: 2, top: 123, left: -144 },
          { floor: 2, top: 61, left: 129 }
        ],
        zoomPoints: {
          topLeft: { top: -180, left: -259 },
          bottomRight: { top: 177, left: 213 }
        },
        compassPoints: {
          top: 380, left: 397
        },
        ladders: [
          { floor: 1, top: 476, left: 33, otherFloor: 'up' },
          { floor: 2, top: 476, left: 33, otherFloor: 'down' },
          { floor: 1, top: 117, left: -342, otherFloor: 'up' },
          { floor: 2, top: 117, left: -342, otherFloor: 'down' },
          { floor: 1, top: -486, left: -364, otherFloor: 'up' },
          { floor: 2, top: -486, left: -364, otherFloor: 'down' },
          { floor: 1, top: 61, left: 421, otherFloor: 'up' },
          { floor: 2, top: 61, left: 421, otherFloor: 'down' }
        ],
        cameras: [
          {
            floor: 2, top: -105, left: 50, id: 1, location: houseTerms.frontPorchTop,
            los: [[{top: -120, left: -71}, {top: -120, left: 69}, {top: 18, left: 69}]]
          },
          { floor: 1, otherFloor: 'up', top: -93, left: 50, id: 1, location: houseTerms.frontPorchTop },
          {
            floor: 1, top: 110, left: -3, id: 2, location: houseTerms.kitchen,
            los: [
              [{top: 102, left: -160}, {top: 115, left: -64}, {top: 122, left: -64}],
              [{top: -1, left: 172}, {top: 91, left: 67}, {top: 122, left: 67}]
            ]
          },
          {
            floor: 0, top: 4, left: -206, id: 3, location: houseTerms.trainingRoom,
            los: [
              [{top: 18, left: -24}, {top: 18, left: -220}],
              [{top: -20, left: -88}, {top: -45, left: -30}],
              [{top: -114, left: -133}, {top: -167, left: -112}],
              [{top: -114, left: -108}, {top: -158, left: -79}]
            ]
          },
          {
            floor: 0, top: -4, left: 36, id: 4, location: houseTerms.garage,
            los: [[{top: 120, left: 22}, {top: -20, left: 22}, {top: -20, left: 0}, {top: -104, left: 21}]]
          },
          {
            outdoor: true, top: -400, left: -289, id: 5, location: houseTerms.frontYard,
            los: [[{top: -221, left: -603}, {top: -622, left: -166}]]
          },
          {
            outdoor: true, top: 454, left: 291, id: 6, location: houseTerms.garden,
            los: [[{top: 628, left: -29}, {top: 488, left: 570}]]
          }
        ],
        ceilingHatches: [
          { floor: 0, top: -72, left: -120 },
          { floor: 0, top: 56, left: -79 },
          { floor: 1, top: 4, left: -19 },
          { floor: 1, top: 52, left: 175 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 0, top: -7, left: 161, rotate: 45, size: 26, alternate: true },
          { floor: 1, top: 126, left: 30, rotate: 340, size: 20, alternate: true }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -589, left: -31, description: houseTerms.spawnConstructionSite },
          { letter: spawnTerms.b, top: 218, left: 571, description: houseTerms.spawnRiverDocks },
          { letter: spawnTerms.c, top: 542, left: -172, description: houseTerms.spawnAPCArea },
          { letter: spawnTerms.d, top: 595, left: 387, description: houseTerms.spawnSideStreet }
        ],
        roomLabels: [
          { floor: 0, top: -128, left: -141, description: houseTerms.depot },
          { floor: 0, top: 2, left: -140, description: houseTerms.trainingRoom },
          { floor: 0, top: 11, hardToRead: true, smaller: true, left: -55, description: houseTerms.kitchenStairs },
          { floor: 0, top: 69, left: -232, description: houseTerms.sideStairs },
          { floor: 0, top: 112, left: -90, description: houseTerms.laundryRoom },
          { floor: 0, top: 64, left: 169, description: houseTerms.garage },
          { floor: 1, top: -118, left: -109, hardToRead: true, description: houseTerms.livingRoom },
          { floor: 1, top: 69, left: -232, description: houseTerms.sideStairs },
          { floor: 1, top: 119, left: -117, hardToRead: true, description: houseTerms.backEntrance },
          { floor: 1, top: -54, left: -33, hardToRead: true, description: houseTerms.lobby },
          { floor: 1, top: 11, hardToRead: true, smaller: true, left: -55, description: houseTerms.kitchenStairs },
          { floor: 1, top: 68, left: 29, description: houseTerms.kitchen },
          { floor: 1, top: -54, left: 107, description: houseTerms.office },
          { floor: 1, top: 58, left: 99, description: houseTerms.diningRoom },
          { floor: 2, top: -25, left: -158, description: houseTerms.workshop },
          { floor: 2, top: 64, left: -232, description: houseTerms.sideStairs },
          { floor: 2, top: 93, left: -122, description: houseTerms.kidsBedroom },
          { floor: 2, top: 19, left: -74, hardToRead: true, description: houseTerms.upperHallway },
          { floor: 2, top: -53, left: 53, hardToRead: true, smaller: true, description: houseTerms.lobbyStairs },
          { floor: 1, top: -53, left: 53, hardToRead: true, smaller: true, description: houseTerms.lobbyStairs },
          { floor: 2, top: 101, left: -38, hardToRead: true, description: houseTerms.walkIn },
          { floor: 2, top: 111, left: 116, hardToRead: true, description: houseTerms.masterBedroom },
          { floor: 2, top: -24, left: 120, hardToRead: true, description: houseTerms.bathroom },
          { outdoor: true, top: -217, left: 440, description: houseTerms.sideStreet },
          { outdoor: true, top: 200, left: 440, description: houseTerms.sideStreet },
          { outdoor: true, top: -16, left: 283, description: houseTerms.garageEntrance },
          { outdoor: true, top: 295, left: 224, description: houseTerms.garden },
          { outdoor: true, top: 229, left: -60, description: houseTerms.backAlley },
          { outdoor: true, top: 295, left: -256, description: houseTerms.patio },
          { outdoor: true, top: 398, left: -9, description: houseTerms.jacuzzi },
          { outdoor: true, top: -70, left: -255, description: houseTerms.basementStairs },
          { outdoor: true, top: 38, left: -295, description: houseTerms.treehouseAlley },
          { outdoor: true, top: -281, left: -159, description: houseTerms.frontYard },
          { outdoor: true, top: -281, left: 103, description: houseTerms.frontYard },
          { outdoor: true, top: -548, left: -238, description: houseTerms.frontStreet },
          { outdoor: true, top: -548, left: 226, description: houseTerms.frontStreet },
          { floor: 1, top: -123, left: 35, description: houseTerms.frontPorch },
          { floor: 1, top: 165, left: -72, description: houseTerms.backPorch },
          { floor: 2, top: 165, left: 13, description: houseTerms.backPorchTop },
          { floor: 3, top: 165, left: 13, description: houseTerms.backPorchTop },
          { floor: 2, top: -135, left: 49, description: houseTerms.frontPorchTop },
          { floor: 3, top: -135, left: 49, description: houseTerms.frontPorchTop },
          { floor: 3, top: 1, left: -11, description: houseTerms.rooftop }
        ]
      },
      kafe: {
        name: mapNameTerms.kafe,
        imgUrlPrefix: 'kafe',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 1, top: -715, left: -1275, background: true, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -288, left: -391, name: floorTerms.secondFloor },
          { index: 3, top: -288, left: -391, name: floorTerms.thirdFloor },
          { index: 4, top: -288, left: -391, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 1, top: 193, left: 59 },
          { floor: 2, top: 165, left: 71 },
          { floor: 2, top: 20, left: 406},
          { floor: 3, top: 178, left: 288 }
        ],
        bombObjectives: [
          { floor: 1, top: -52, left: -157, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 140, left: 59, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 2, top: 63, left: 51, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 210, left: 240, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 3, top: 120, left: 429, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 3, top: -69, left: 240, set: 1, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 1, top: 89, left: 59 },
          { floor: 2, top: 210, left: 36 },
          { floor: 2, top: 20, left: 337 },
          { floor: 3, top: 127, left: -50 }
        ],
        zoomPoints: {
          topLeft: { top: -209, left: -238 },
          bottomRight: { top: 335, left: 479 }
        },
        compassPoints: {
          top: 393, left: 295
        },
        ladders: [
          { floor: 1, top: 158, left: -486, otherFloor: 'up' },
          { floor: 2, top: 158, left: -486, otherFloor: 'down' },
          { floor: 1, top: 710, left: 389, otherFloor: 'up' },
          { floor: 2, top: 710, left: 389, otherFloor: 'down' }
        ],
        cameras: [
          { floor: 2, otherFloor: 'up', top: -183, left: 391, id: 1, location: kafeTerms.cocktailLounge },
          {
            floor: 3, top: -183, left: 391, id: 1, location: kafeTerms.cocktailLounge,
            los: [
              [{top: -197, left: 13}, {top: -197, left: 466}, {top: -101, left: 466}],
              [{top: 185, left: 458}, {top: -15, left: 416}]
            ]
          },
          {
            floor: 2, top: 140, left: 145, id: 2, location: kafeTerms.readingRoomCorridor,
            los: [[{top: -197, left: 129}, {top: 155, left: 129}, {top: 155, left: 468}]]
          },
          {
            floor: 1 , top: 50, left: 356 , id: 3, location: kafeTerms.coldRoomCorridor,
            los: [[{top: 37, left: 111}, {top: 37, left: 374}, {top: 326, left: 374}]]
          },
          {
            floor: 1, top: -31, left: -212, id: 4, location: kafeTerms.bakery,
            los: [
              [{top: -109, left: 3}, {top: -70, left: -73}, {top: -70, left: -82}, {top: -109, left: -82}, {top: -109, left: -228}, {top: 269, left: -228}],
              [{top: -81, left: 104}, {top: -27, left: 104}]
            ]
          },
          {
            outdoor: true, top: -210, left: -434, id: 5, location: kafeTerms.westMainStreet,
            los: [[{top: 43, left: -727}, {top: -474, left: -242}]]
          },
          {
            outdoor: true, top: 545, left: 566, id: 6, location: kafeTerms.parkAlley,
            los: [[{top: 645, left: 472}, {top: 518, left: 634}, {top: 244, left: 630}]]
          }
        ],
        ceilingHatches: [
          { floor: 1, top: 218, left: 278 },
          { floor: 2, top: 215, left: 74 },
          { floor: 2, top: -67, left: 94 },
          { floor: 2, top: 75, left: 257 },
          { floor: 2, top: 166, left: 449 },
          { floor: 3, top: -54, left: -19 }
        ],
        skylights: [
          { floor: 3, top: -43, left: 260 },
          { floor: 4, otherFloor: 'down', top: -43, left: 260 }
        ],
        droneTunnels: [
          { floor: 1, top: -15, left: -55, rotate: 0, size: 28 },
          { floor: 1, top: 62, left: 105, rotate: 90, size: DRONE_SMALL },
          { floor: 2, top: 108, left: 124, rotate: 90, size: DRONE_SMALL },
          { floor: 2, top: -20, left: 201, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: 121, left: 473, rotate: 90, size: DRONE_MED },
          { floor: 2, top: 276, left: 353, rotate: 0, size: DRONE_MED },
          { floor: 3, top: 11, left: 9, rotate: 90, size: DRONE_SMALL }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -559, left: 205, description: kafeTerms.spawnRiverDocks },
          { letter: spawnTerms.b, top: 146, left: -904, description: kafeTerms.spawnChristmasMarket },
          { letter: spawnTerms.c, top: 571, left: 161, description: kafeTerms.spawnPark }
          //{ letter: spawnTerms.d, top: -402, left: 904, description: kafeTerms.spawnRemoved }
        ],
        roomLabels: [
          { floor: 1, top: -162, left: -32, description: kafeTerms.frontStairs },
          { floor: 1, top: 83, left: -186, description: kafeTerms.bakery },
          { floor: 1, top: 230, left: -82, description: kafeTerms.bakeryKitchen },
          { floor: 1, top: -40, left: 56, description: kafeTerms.mainCorridor.removeBreakTags() },
          { floor: 1, top: 34, left: 12, description: kafeTerms.kitchenPrep },
          { floor: 1, top: 185, left: 129, description: kafeTerms.kitchenGrill },
          { floor: 1, top: 124, left: 157, description: kafeTerms.kitchenPickUp },
          { floor: 1, top: 71, left: 227, description: kafeTerms.coldRoomCorridor.removeBreakTags() },
          { floor: 1, top: 165, left: 267, description: kafeTerms.coldRoom },
          { floor: 1, top: -128, left: 313, description: kafeTerms.diningRoom },
          { floor: 1, top: 236, left: 440, description: kafeTerms.backStairs },
          { floor: 1, top: 188, left: 347, description: kafeTerms.coldRoomCorridor },
          { floor: 1, top: 60, left: 425, description: kafeTerms.VIPSection },
          { floor: 1, top: -39, left: 322, description: kafeTerms.barStairs },
          { floor: 1, top: 313, left: 395, description: kafeTerms.storage },
          { floor: 2, top: 139, left: 418, description: kafeTerms.laundryRoom },
          { floor: 2, top: -162, left: -32, description: kafeTerms.frontStairs },
          { floor: 2, top: -39, left: 322, description: kafeTerms.barStairs },
          { floor: 2, top: -64, left: 24, hardToRead: true, description: kafeTerms.museumEntrance },
          { floor: 2, top: 0, left: 24, description: kafeTerms.miningRoom },
          { floor: 2, top: 126, left: 24, description: kafeTerms.trainMuseum },
          { floor: 2, top: -133, left: 239, description: kafeTerms.pillarDiningRoom },
          { floor: 2, top: 236, left: 440, description: kafeTerms.backStairs },
          { floor: 2, top: 16, left: 152, description: kafeTerms.mainCorridor },
          { floor: 2, top: 143, left: 272, description: kafeTerms.readingRoomCorridor },
          { floor: 2, top: 70, left: 346, description: kafeTerms.readingRoom },
          { floor: 2, top: 189, left: 181, hardToRead: true, description: kafeTerms.fireplaceHall },
          { floor: 3, top: 236, left: 440, description: kafeTerms.backStairs },
          { floor: 3, top: -162, left: -34, description: kafeTerms.frontStairs },
          { floor: 3, top: -1, left: 67, description: kafeTerms.cigarShop },
          { floor: 3, top: 132, left: 38, hardToRead: true, description: kafeTerms.cigarLounge },
          { floor: 3, top: 24, left: 257, hardToRead: true, description: kafeTerms.bar },
          { floor: 3, top: 120, left: 257, hardToRead: true, description: kafeTerms.barBackstore },
          { floor: 3, top: 182, left: 218, description: kafeTerms.washrooms },
          { floor: 3, top: 256, left: 310, description: kafeTerms.washroomCorridor },
          { floor: 3, top: 61, left: 428, hardToRead: true, description: kafeTerms.cocktailLounge },
          { floor: 3, top: 129, left: 353, smaller: true, description: kafeTerms.cocktailLoungeEntrance },
          { outdoor: true, top: -379, left: -588, description: kafeTerms.westMainStreet },
          { outdoor: true,  top: -379, left: 132, description: kafeTerms.mainStreet },
          { outdoor: true,  top: -379, left: 851, description: kafeTerms.eastMainStreet },
          { outdoor: true,  top: 71, left: -337, description: kafeTerms.bakeryParking },
          { floor: 2,  top: 174, left: -162, description: kafeTerms.bakeryRoof },
          { floor: 3,  top: 174, left: -162, description: kafeTerms.bakeryRoof },
          { floor: 4,  top: 174, left: -162, description: kafeTerms.bakeryRoof },
          { floor: 4,  top: 42, left: 209, description: kafeTerms.cafeRoofTop },
          { floor: 2,  top: 44, left: 554, description: kafeTerms.terrace },
          { floor: 3,  top: 44, left: 554, description: kafeTerms.terrace },
          { floor: 4,  top: 44, left: 554, description: kafeTerms.terrace },
          { outdoor: true,  top: 379, left: 131, description: kafeTerms.backAlley },
          { outdoor: true,  top: 379, left: -290, description: kafeTerms.garrage },
          { outdoor: true, top: 577, left: 517, description: kafeTerms.parkAlley }
        ]
      },
      kanal: {
        name: mapNameTerms.kanal,
        imgUrlPrefix: 'kanal',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 1, top: -715, left: -1275, background: true, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -428, left: -608, name: floorTerms.secondFloor },
          { index: 3, top: -428, left: -608, name: floorTerms.thirdFloor },
          { index: 4, top: -428, left: -608, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 1, top: 95, left: -416 },
          { floor: 2, top: 48, left: -418 },
          { floor: 3, top: -111, left: 163 },
          { floor: 2, top: -101, left: 278 }
        ],
        bombObjectives: [
          { floor: 2, top: 125, left: -460, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 2, top: -140, left: -422, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -174, left: 139, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 2, top: -174, left: 428, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 3, top: -111, left: 203, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 3, top: -27, left: 408, set: 1, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 1, top: 95, left: -381 },
          { floor: 2, top: 76, left: -460 },
          { floor: 2, top: -114, left: 328 },
          { floor: 3, top: -76, left: 429 }
        ],
        zoomPoints: {
          topLeft: { top: -337, left: -507 },
          bottomRight: { top: 259, left: 547 }
        },
        compassPoints: {
          top: 168, left: 515
        },
        ladders: [
          { floor: 1, top: 269, left: 317, otherFloor: 'up' },
          { floor: 2, top: 269, left: 317, otherFloor: 'down' }
        ],
        cameras: [
          {
            floor: 3, top: 27, left: 253, id: 1, location: kanalTerms.controlRoomHallway,
            los: [[{top: 151, left: 237}, {top: 14, left: 237}, {top: 14, left: 487}]]
          },
          {
            floor: 2, top: 29, left: 204,  id: 2, location: kanalTerms.mapsOfficeHallway,
            los: [
              [{top: 205, left: 188}, {top: 16, left: 188}, {top: 16, left: 368}],
              [{top: 100, left: 372}, {top: 151, left: 498}],
              [{top: 99, left: 334}, {top: 154, left: 453}]
            ]
          },
          {
            floor: 2, top: 152, left: -272, id: 3, location: kanalTerms.coastGuardHall,
            los: [
              [{top: -104, left: -288}, {top: 168, left: -288}, {top: 168, left: -123}, {top: 155, left: -123}, {top: 147, left: 74}],
              [{top: 76, left: -171}, {top: 105, left: -210}]
            ]
          },
          {
            floor: 1, top: 70, left: -271, id: 4, location: kanalTerms.boatSuppliesHallway,
            los: [
              [{top: 106, left: -183}, {top: 66, left: -183}],
              [{top: -104, left: -287}, {top: 257, left: -287}]
            ]
          },
          {
            outdoor: true, top: 703, left: -526, id: 5, location: kanalTerms.frontLawn,
            los: [[{top: 664, left: -692}, {top: 721, left: -536}, {top: 721, left: 757}]]
          },
          {
            outdoor: true, top: -426, left: -655, id: 6, location: kanalTerms.lockgate,
            los: [[{top: -242, left: -826}, {top: -569, left: -666}]]
          },
          {
            outdoor: true, top: -402, left: 590, id: 7, location: kanalTerms.constructionSite,
            los: [[{top: -568, left: 387}, {top: -259, left: 1020}]]
          }
        ],
        ceilingHatches: [
          { floor: 1, top: 137, left: -377 },
          { floor: 1, top: -16, left: -207 },
          { floor: 2, top: -195, left: 162 },
          { floor: 2, top: -129, left: 469 },
          { floor: 2, top: 34, left: 120 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 1, top: -34, left: -506, rotate: 90, size: DRONE_MED },
          { floor: 1, top: -309, left: -506, rotate: 225, size: 30 },
          { floor: 1, top: 135, left: 267, rotate: 0, size: 70 },
          { floor: 2, top: -85, left: -366, rotate: 90, size: DRONE_SMALL },
          { floor: 2, top: -71, left: 246, rotate: 90, size: DRONE_SMALL },
          { floor: 3, top: 64, left: 460, rotate: 0, size: DRONE_MED },
          { floor: 3, top: 9, left: 193, rotate: 0, size: DRONE_SMALL }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -541, left: -1032, description: kanalTerms.spawnFloatingDock },
          { letter: spawnTerms.b, top: 508, left: -626, description: kanalTerms.spawnSailboats },
          { letter: spawnTerms.c, top: -523, left: 1114, description: kanalTerms.spawnConstructionSite }
        ],
        roomLabels: [
          { floor: 1, top: -68, left: -372, description: kanalTerms.boatGarage },
          { floor: 1, top: 177, left: -393, description: kanalTerms.boatSupplies },
          { floor: 1, top: 238, left: -438, description: kanalTerms.pipes },
          { floor: 1, top: 140, left: -266, smaller: true, description: kanalTerms.boatSuppliesHallway },
          { floor: 1, top: -66, left: -180, description: kanalTerms.lockerRoom },
          { floor: 1, hardToRead: true, smaller: true, top: 68, left: -202, description: kanalTerms.coastGuardStairs },
          { floor: 1, hardToRead: true, top: 68, left: -141, smaller: true, description: kanalTerms.showersCorridor },
          { floor: 1, top: 239, left: -180, description: kanalTerms.showers },
          { floor: 1, top: -142, left: 165, description: kanalTerms.loadingDock },
          { floor: 1, top: -140, left: 351, description: kanalTerms.machineHallway },
          { floor: 1, top: 115, left: 298, hardToRead: true, description: kanalTerms.controlCenterStairs },
          { floor: 2, top: -236, left: -434, description: kanalTerms.holdingRoom },
          { floor: 2, top: -269, left: -332, description: kanalTerms.holdingRoomHallway },
          { floor: 2, top: -51, left: -426, hardToRead: true, description: kanalTerms.radio },
          { floor: 2, top: 50, left: -342, hardToRead: true, description: kanalTerms.coastGuardOffice },
          { floor: 2, top: 240, left: -399, hardToRead: true, description: kanalTerms.archives },
          { floor: 2, top: -22, left: -267, smaller: true, hardToRead: true, description: kanalTerms.coastGuardHall },
          { floor: 2, top: 217, left: -202, hardToRead: true, description: kanalTerms.mainEntrance },
          { floor: 2, top: -51, left: -185, hardToRead: true, description: kanalTerms.lounge },
          { floor: 2, hardToRead: true, top: 68, left: -190, description: kanalTerms.coastGuardStairs },
          { floor: 2, top: 154, left: -20, description: kanalTerms.bridge },
          { floor: 2, top: 147, left: 152, description: kanalTerms.modelRoom },
          { floor: 2, top: -8, left: 124, hardToRead: true, description: kanalTerms.securityRoom },
          { floor: 2, top: -108, left: 130, hardToRead: true, description: kanalTerms.projectorRoom },
          { floor: 2, top: -189, left: 278, hardToRead: true, description: kanalTerms.mapsOffice },
          { floor: 2, top: 42, left: 279, description: kanalTerms.mapsOfficeHallway },
          { floor: 2, top: 115, left: 298, description: kanalTerms.controlCenterStairs },
          { floor: 2, top: -95, left: 430, description: kanalTerms.kitchen },
          { floor: 2, top: 63, left: 433, description: kanalTerms.cafeteria },
          { floor: 2, top: 137, left: 433, hardToRead: true, description: kanalTerms.plantsHallway },
          { floor: 3, top: 68, left: -232, description: kanalTerms.coastGuardStairs },
          { floor: 3, top: 52, left: 204, description: kanalTerms.thirdFloorExit },
          { floor: 3, top: -150, left: 166, description: kanalTerms.controlRoom },
          { floor: 3, top: -180, left: 288, hardToRead: true, description: kanalTerms.electricRoom },
          { floor: 3, top: 115, left: 298, description: kanalTerms.controlCenterStairs },
          { floor: 3, top: 48, left: 359, description: kanalTerms.controlRoomHallway },
          { floor: 3, top: -112, left: 405, hardToRead: true, description: kanalTerms.serverRoom },
          { outdoor: true, top: -377, left: -745, description: kanalTerms.lockgate },
          { outdoor: true, top: -434, left: -484, description: kanalTerms.quayContainers },
          { outdoor: true, top: -535, left: -745, description: kanalTerms.lockgateTunnel },
          { outdoor: true, top: -360, left: -89, description: kanalTerms.waterWalkway },
          { outdoor: true, top: -360, left: 192, description: kanalTerms.quayConstruction },
          { outdoor: true, top: -341, left: 606, description: kanalTerms.constructionSite },
          { outdoor: true, top: 39, left: 684, description: kanalTerms.constructionSite.removeBreakTags() },
          { floor: 2, top: -23, left: 535, smaller: true, hardToRead: true, description: kanalTerms.constructionEntrance },
          { outdoor: true, top: 255, left: 215, description: kanalTerms.parkingAlley },
          { outdoor: true, top: 248, left: 353, description: kanalTerms.parkingEntrance },
          { outdoor: true, top: 395, left: -4, description: kanalTerms.middleRoad },
          { outdoor: true, top: -79, left: -4, description: kanalTerms.middleRoad },
          { outdoor: true, top: -171, left: -568, description: kanalTerms.forkliftAlley },
          { outdoor: true, top: 122, left: -568, description: kanalTerms.forkliftAlley },
          { outdoor: true, top: 390, left: -331, description: kanalTerms.frontLawn },
          { floor: 2, top: -36, left: 342, description: kanalTerms.mapArchives, hardToRead: true },
          { floor: 1, top: 302, left: -413, description: kanalTerms.basementStairs },
          { floor: 4, top: 107, left: -356, description: kanalTerms.coastGuardRoof },
          { floor: 3, top: 107, left: -356, description: kanalTerms.coastGuardRoof },
          { floor: 3, top: 147, left: -16, description: kanalTerms.bridgeRoof },
          { floor: 4, top: 160, left: 154, description: kanalTerms.roofBrickPile },
          { floor: 3, top: 160, left: 154, description: kanalTerms.roofBrickPile },
          { floor: 4, top: 125, left: 444, description: kanalTerms.balcony },
          { floor: 3, top: 125, left: 444, description: kanalTerms.balcony },
          { floor: 4, top: -82, left: 245, description: kanalTerms.controlCenterRoof },
          { floor: 2, top: -353, left: -438, description: kanalTerms.dockStairs },
          { outdoor: true, top: 485, left: 274, description: kanalTerms.parking },
          { floor: 1, top: -169, left: -362, description: kanalTerms.boatCrane }
        ]
      },
      oregon: {
        name: mapNameTerms.oregon,
        imgUrlPrefix: 'oregon',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 0, top: -715, left: -1275, background: true, name: floorTerms.basement },
          { index: 1, top: -445, left: -611, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -445, left: -611, name: floorTerms.secondFloor },
          { index: 3, top: -445, left: -611, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 0, top: -7, left: 208 },
          { floor: 1, top: -84, left: 161 },
          { floor: 2, top: 114, left: -96 },
          { floor: 1, top: 3, left: -54 }
        ],
        bombObjectives: [
          { floor: 0, top: -49, left: 163, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 0, top: 123, left: 89, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -17, left: -264, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -42, left: -54, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 1, otherFloor: 'up', top: -311, left: 216, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 2, otherFloor: 'down', top: -291, left: 225, set: 4, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -3, left: -42, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 2, top: 114, left: -51, set: 1, letter: objectiveTerms.bombShortA }
        ],
        secureObjectives: [
          { floor: 0, top: 166, left: 160 },
          { floor: 1, top: -38, left: 161 },
          { floor: 1, top: -61, left: -264 },
          { floor: 2, top: 99, left: 46 }
        ],
        zoomPoints: {
          topLeft: { top: -355, left: -509 },
          bottomRight: { top: 303, left: 463 }
        },
        compassPoints: {
          top: 288, left: 503
        },
        ladders: [
          { floor: 1, top: -5, left: 130, otherFloor: 'up' },
          { floor: 2, top: -5, left: 130, otherFloor: 'down' },
          { floor: 2, top: -324, left: 191, otherFloor: 'up' },
          { floor: 3, top: -324, left: 191, otherFloor: 'down' }
        ],
        cameras: [
          {
            floor: 2, top: 70, left: 221, id: 1, location: oregonTerms.armoryCorridor,
            los: [
              [{top: 238, left: 238}, {top: 57, left: 238}, {top: 57, left: 118}],
              [{top: 57, left: 110}, {top: 57, left: -38}]
            ]
          },
          {
            floor: 1, top: 82, left: 168, id: 2, location: oregonTerms.lobby,
            los: [
              [{top: 65, left: 347}, {top: 80, left: 249}, {top: 80, left: 239}, {top: 69, left: 239}, {top: 69, left: 9}],
              [{top: 210, left: 237}, {top: 184, left: 203}],
              [{top: 101, left: 348}, {top: 95, left: 249}]
            ]
          },
          {
            floor: 1, top: 84, left: -149, id: 3, location: oregonTerms.diningHallCorridor,
            los: [[{top: 71, left: -350}, {top: 71, left: -131}, {top: 229, left: -131}]]
          },
          {
            floor: 1, top: -247, left: 214, id: 4, location: oregonTerms.rearStage,
            los: [
              [{top: -232, left: 43}, {top: -232, left: 245}, {top: -348, left: 245}],
              [{top: -307, left: 144}, {top: -281, left: 176}]
            ]
          },
          {
            outdoor: true, top: 194, left: -632, id: 5, location: oregonTerms.junkyard,
            los: [[{top: -15, left: -701}, {top: 529, left: -638}]]
          },
          {
            outdoor: true, top: 216, left: 406, id: 6, location: oregonTerms.parking,
            los: [[{top: 492, left: 438}, {top: -324, left: 509}]]
          },
          {
            outdoor: true, top: -492, left: 376, id: 7, location: oregonTerms.constructionSite,
            los: [[{top: -524, left: -468}, {top: -547, left: 394}, {top: -309, left: 753}]]
          }
        ],
        ceilingHatches: [
          { floor: 0, top: 126, left: 140 },
          { floor: 0, top: -104, left: 67 },
          { floor: 0, top: -147, left: 185 },
          { floor: 1, top: -32, left: -4 },
          { floor: 1, top: -95, left: 129 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 1, top: -37, left: -357, rotate: 90, size: DRONE_MED },
          { floor: 1, top: 34, left: 42, rotate: 90, size: DRONE_MED },
          { floor: 1, top: -153, left: 43, rotate: 90, size: DRONE_MED },
          { floor: 1, top: 203, left: -186, rotate: 0, size: 52 },
          { floor: 1, top: 208, left: -66, rotate: 0, size: 74 }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: 468, left: -892, description: oregonTerms.spawnJunkyard },
          { letter: spawnTerms.b, top: 567, left: 649, description: oregonTerms.spawnStreet },
          { letter: spawnTerms.c, top: -423, left: 525, description: oregonTerms.spawnConstructionSite }
        ],
        roomLabels: [
          { floor: 0, top: -321, left: 142, description: oregonTerms.towerStairs },
          { floor: 0, top: 29, left: 150, description: oregonTerms.supplyCloset, hardToRead: true },
          { floor: 0, top: -198, left: 197, description: oregonTerms.boilerRoom },
          { floor: 0, top: -146, left: 219, description: oregonTerms.electricRoom },
          { floor: 0, top: -173, left: 299, description: oregonTerms.bunkerEntrance },
          { floor: 0, top: -132, left: 416, description: oregonTerms.bunker },
          { floor: 0, top: 4, left: 81, description: oregonTerms.basementCorridor },
          { floor: 0, top: -89, left: 189, description: oregonTerms.supplyRoom },
          { floor: 0, top: 81, left: 126, description: oregonTerms.laundryRoom },
          { floor: 0, top: 85, left: 213, hardToRead: true, description: oregonTerms.laundryStorage },
          { floor: 0, top: 228, left: 220, hardToRead: true, smaller: true, description: oregonTerms.laundryStairs },
          { floor: 1, top: 64, left: -447, description: oregonTerms.office },
          { floor: 2, top: 64, left: -447, description: oregonTerms.office },
          { floor: 1, top: 13, left: -218, description: oregonTerms.diningHall },
          { floor: 1, top: 100, left: -260, description: oregonTerms.diningHallCorridor },
          { floor: 1, hardToRead: true, top: 154, left: -268, description: oregonTerms.showers },
          { floor: 1, top: 40, left: -109, description: oregonTerms.kitchen },
          { floor: 1, top: 97, left: -62, description: oregonTerms.bathroom },
          { floor: 1, hardToRead: true, top: 213, left: -70, description: oregonTerms.dormStairs },
          { floor: 1, hardToRead: true, top: 6, left: 11, description: oregonTerms.pantry },
          { floor: 1, top: 164, left: -20, description: oregonTerms.bathroomCorridor },
          { floor: 1, top: 185, left: 85, description: oregonTerms.classroom },
          { floor: 1, top: 185, left: 166, description: oregonTerms.lobby },
          { floor: 1, top: 227, left: 220, hardToRead: true, smaller: true, description: oregonTerms.mainStairs },
          { floor: 1, top: 137, left: 222, hardToRead: true, smaller: true, description: oregonTerms.laundryStairs },
          { floor: 1, top: -129, left: 113, description: oregonTerms.meetingHall },
          { floor: 1,  top: -241, left: 144, description: oregonTerms.rearStage },
          { floor: 1, top: -321, left: 142, description: oregonTerms.towerStairs },
          { floor: 1, top: 148, left: 314, description: oregonTerms.garage },
          { floor: 2, top: 10, left: -390, hardToRead: true, description: oregonTerms.officeStorage },
          { floor: 2, top: -20, left: -111, hardToRead: true, description: oregonTerms.kidsDorm },
          { floor: 2, hardToRead: true, top: 82, left: -7, description: oregonTerms.dormMainHall },
          { floor: 2, hardToRead: true, top: 213, left: -70, description: oregonTerms.dormStairs },
          { floor: 2, top: 169, left: 54, hardToRead: true, description: oregonTerms.smallDorms },
          { floor: 2, top: 82, left: 162, hardToRead: true, description: oregonTerms.armoryCorridor },
          { floor: 2, top: 161, left: 159, hardToRead: true, description: oregonTerms.masterBedroom },
          { floor: 2, top: 145, left: 297, hardToRead: true, description: oregonTerms.armory },
          { floor: 2, top: 214, left: 79, hardToRead: true, description: oregonTerms.walkIn },
          { floor: 2, hardToRead: true, top: 188, left: 220, description: oregonTerms.mainStairs },
          { floor: 2, top: -116, left: 145, hardToRead: true, description: oregonTerms.attic },
          { floor: 2, top: -241, left: 145, description: oregonTerms.watchTower },
          { floor: 2, top: -321, left: 142, description: oregonTerms.towerStairs },
          { outdoor: true, top: 312, left: -277, description: oregonTerms.busYard },
          { outdoor: true, top: 143, left: -594, description: oregonTerms.junkyard },
          { outdoor: true, top: -153, left: -353, description: oregonTerms.farmlands },
          { outdoor: true, top: -248, left: -45, description: oregonTerms.shootingRange },
          { outdoor: true, top: -430, left: 157, description: oregonTerms.constructionSite },
          { floor: 1, top: -117, left: 367, description: oregonTerms.constructionSite },
          { floor: 2, top: -117, left: 367, description: oregonTerms.constructionSite },
          { floor: 3, top: -117, left: 367, description: oregonTerms.constructionSite },
          { outdoor: true, top: 277, left: 407, description: oregonTerms.parking },
          { outdoor: true, top: 344, left: 172, description: oregonTerms.mainEntrance },
          { outdoor: true, top: 548, left: 270, description: oregonTerms.street },
          { floor: 2, top: 261, left: 126, description: oregonTerms.balcony },
          { floor: 2, top: 45, left: -232, description: oregonTerms.diningHallRoof },
          { floor: 3, top: 45, left: -232, description: oregonTerms.diningHallRoof },
          { floor: 3, top: 58, left: -435, description: oregonTerms.officeRoof },
          { floor: 1, top: 37, left: 144, description: oregonTerms.meetingHallEntrance },
          { floor: 2, top: 214, left: 301, description: oregonTerms.garageRoof },
          { floor: 3, top: 214, left: 301, description: oregonTerms.garageRoof },
          { floor: 3, top: 91, left: 58, description: oregonTerms.dormsRoof },
          { floor: 3, top: -77, left: 144, description: oregonTerms.meetingHallRoof },
          { floor: 3, top: -233, left: 177, description: oregonTerms.watchTower }
        ]
      },
      plane: {
        name: mapNameTerms.plane,
        imgUrlPrefix: 'plane',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 1, top: -715, left: -1275, background: true, name: floorTerms.firstFloor },
          { index: 2, top: -715, left: -920, name: floorTerms.secondFloor, default: true },
          { index: 3, top: -715, left: -920, name: floorTerms.thirdFloor },
          { index: 4, top: -715, left: -920, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 2, top: 30, left: 358, smaller: true },
          { floor: 2, top: -12, left: -278, smaller: true },
          { floor: 1, top: -47, left: 75, smaller: true },
          { floor: 2, top: 30, left: -15, smaller: true }
        ],
        bombObjectives: [
          { floor: 1, top: -10, left: 103, set: 3, letter: objectiveTerms.bombShortB, smaller: true },
          { floor: 1, top: -33, left: -203, set: 3, letter: objectiveTerms.bombShortA, smaller: true },
          { floor: 2, top: 31, left: 293, set: 1, letter: objectiveTerms.bombShortB, smaller: true },
          { floor: 2, top: -28, left: 459, set: 1, letter: objectiveTerms.bombShortA, smaller: true },
          { floor: 2, top: 30, left: 14, set: 2, letter: objectiveTerms.bombShortA, smaller: true },
          { floor: 2, top: -45, left: -105, set: 2, letter: objectiveTerms.bombShortB, smaller: true }
        ],
        secureObjectives: [
          { floor: 1, top: -10, left: 75, smaller: true },
          { floor: 2, top: -45, left: -140, smaller: true },
          { floor: 2, top: 31, left: 325, smaller: true },
          { floor: 2, top: 30, left: -43, smaller: true }
        ],
        zoomPoints: {
          topLeft: { top: -218, left: -515 },
          bottomRight: { top: 178, left: 482 }
        },
        compassPoints: {
          top: 97, left: 418
        },
        ladders: [
          { floor: 2, top: -33, left: -186, otherFloor: 'up' },
          { floor: 3, top: -33, left: -186, otherFloor: 'down' },
          { floor: 2, top: -4, left: -373, otherFloor: 'up' },
          { floor: 3, top: -4, left: -373, otherFloor: 'down' },
          { floor: 1, top: -166, left: -232, otherFloor: 'up' },
          { floor: 2, top: -166, left: -232, otherFloor: 'down' },
          { floor: 1, top: -127, left: -330, otherFloor: 'up' },
          { floor: 2, top: -127, left: -330, otherFloor: 'down' },
          { floor: 1, top: -323, left: -304, otherFloor: 'up' },
          { floor: 2, top: -323, left: -304, otherFloor: 'down' },
          { floor: 1, top: -152, left: 248, otherFloor: 'up' },
          { floor: 2, top: -152, left: 248, otherFloor: 'down' },
          { floor: 1, top: -296, left: 145, otherFloor: 'up' },
          { floor: 2, top: -296, left: 145, otherFloor: 'down' },
          { floor: 1, top: 136, left: 329, otherFloor: 'up' },
          { floor: 2, top: 136, left: 329, otherFloor: 'down' },
          { floor: 1, top: 207, left: 335, otherFloor: 'up' },
          { floor: 2, top: 207, left: 335, otherFloor: 'upanddown' },
          { floor: 3, top: 207, left: 335, otherFloor: 'down' },
          { floor: 2, top: 156, left: -470, otherFloor: 'up' },
          { floor: 3, top: 156, left: -470, otherFloor: 'upanddown' },
          { floor: 4, top: 156, left: -470, otherFloor: 'down' },
          { floor: 1, top: 218, left: -497, otherFloor: 'up' },
          { floor: 2, top: 218, left: -497, otherFloor: 'down' }
        ],
        cameras: [
          {
            floor: 3, top: -14, left: 248, id: 1, location: planeTerms.cabinStaff,
            los: [
              [{top: -27, left: 142}, {top: -27, left: 265}, {top: 35, left: 265}],
              [{top: 17, left: 148}, {top: 0, left: 216}]
            ]
          },
          {
            floor: 2, top: -60, left: 188, id: 2, location: planeTerms.frontHallway,
            los: [
              [{top: 51, left: 228}, {top: -1, left: 214}],
              [{top: -27, left: 218}, {top: -5, left: 232}],
              [{top: 51, left: 206}, {top: -32, left: 200}, {top: -32, left: 173}, {top: -73, left: 173}, {top: -73, left: 299}, {top: -49, left: 299}, {top: -39, left: 436}]
            ]
          },
          {
            floor: 2, top: -41, left: -215, id: 3, location: planeTerms.pressSectionA,
            los: [
              [{top: -72, left: -318}, {top: -72, left: -199}, {top: -24, left: -199}, {top: 12, left: -192}],
              [{top: 10, left: -318}, {top: -25, left: -234}]
            ]
          },
          {
            floor: 1, top: 33, left: 21, id: 4, location: planeTerms.luggageHold,
            los: [
              [{top: -67, left: 6}, {top: 47, left: 6}, {top: 47, left: 116}],
              [{top: -6, left: 119}, {top: -28, left: 170}]
            ]
          },
          {
            floor: 1, top: -49, left: -289, id: 5, location: planeTerms.cargoHold,
            los: [[{top: 44, left: -304}, {top: -62, left: -304}, {top: -62, left: -100}]]
          }
        ],
        ceilingHatches: [
          { floor: 2, top: 17, left: -116 },
          { floor: 2, top: -34, left: 49 },
          { floor: 2, top: 22, left: 111 },
          { floor: 2, top: 22, left: 407 },
          { floor: 1, top: 24, left: 72 },
          { floor: 1, top: -2, left: -218 },
          { floor: 1, top: 8, left: -78 },
          { floor: 3, top: -10, left: -496 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 2, top: -42, left: 172, rotate: 90, size: DRONE_SMALL, alternate: true }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -428, left: 434, description: planeTerms.spawnOfficialEntrance },
          { letter: spawnTerms.b, top: -489, left: -408, description: planeTerms.spawnReporterEntrance },
          { letter: spawnTerms.c, top: 385, left: 342, description: planeTerms.spawnServiceEntrance }
        ],
        roomLabels: [
          { floor: 2, top: -1, left: 325, description: planeTerms.meetingRoom, smaller: true, hardToRead: true },
          { floor: 2, top: -20, left: 408, description: planeTerms.frontHallway, smaller: true, hardToRead: true },
          { floor: 2, top: 9, left: 474, description: planeTerms.executiveOffice, smaller: true, hardToRead: true },
          { outdoor: true, top: -295, left: 389, description: planeTerms.mainEntrance },
          { floor: 2, top: -37, left: 247, description: planeTerms.frontHallway.removeBreakTags(), smaller: true,  hardToRead: true },
          { floor: 2, top: -5, hardToRead: true, left: 240, smaller: true, description: planeTerms.frontStairs },
          { floor: 2, top: 33, left: 233, description: planeTerms.pantry, smaller: true, hardToRead: true },
          { floor: 2, top: 33, left: 158, description: planeTerms.kitchen, smaller: true },
          { floor: 2, top: -32, left: 114, smaller: true, description: planeTerms.executiveHallway, hardToRead: true },
          { floor: 2, top: -11, left: -15, description: planeTerms.executiveBedroom, smaller: true, hardToRead: true },
          { floor: 2, top: 40, left: 68, hardToRead: true, smaller: true, description: planeTerms.changeRoom },
          { floor: 2, top: -4, hardToRead: true, smaller: true, left: 84, description: planeTerms.laund },
          { outdoor: true, top: 162, left: 277, hardToRead: true, description: planeTerms.frontServiceEntrance },
          { outdoor: true, top: 223, left: -85, description: planeTerms.rightWing },
          { outdoor: true, top: 221, left: -609, hardToRead: true, description: planeTerms.backServiceEntrance },
          { outdoor: true, top: -295, left: -367, description: planeTerms.reporterEntrance },
          { outdoor: true , top: -295, left: -124, description: planeTerms.leftWing },
          { floor: 2, top: -3, left: -109, description: planeTerms.staffSection, smaller: true, hardToRead: true },
          { floor: 2, top: 0, left: -184, smaller: true, description: planeTerms.securityRoom, hardToRead: true },
          { floor: 2, top: -44, left: -270, description: planeTerms.pressSectionA, smaller: true, hardToRead: true },
          { floor: 2, top: -44, left: -375, description: planeTerms.pressSectionB, smaller: true, hardToRead: true },
          { floor: 2, top: 2, hardToRead: true, smaller: true, left: -408, description: planeTerms.backStairs },
          { floor: 1, top: 2, hardToRead: true, smaller: true, left: -400, description: planeTerms.backStairs },
          { floor: 2, top: 2, left: -337, smaller: true, description: planeTerms.pressBathroom },
          { floor: 1, top: 34, left: -202, description: planeTerms.cargoHold, hardToRead: true, smaller: true },
          { floor: 1, top: -13, left: -48, smaller: true, description: planeTerms.serviceCorridor, hardToRead: true },
          { floor: 1, top: 16, left: -44, description: planeTerms.storage, smaller: true, hardToRead: true },
          { floor: 1, top: -3, left: 38, description: planeTerms.luggageHold, smaller: true, hardToRead: true },
          { floor: 1, top: 25, left: 174, smaller: true, description: planeTerms.firstAidStation, hardToRead: true },
          { floor: 1, top: 20, left: 262, smaller: true, description: planeTerms.cargoFrontEntrance, hardToRead: true },
          { floor: 1, top: -6, left: 253, smaller: true, description: planeTerms.frontStairs, hardToRead: true },
          { floor: 2, top: -5, left: 160, smaller: true, description: planeTerms.cockpitStairs },
          { floor: 3, top: -5, left: 175, smaller: true, description: planeTerms.cockpitStairs },
          { floor: 3, top: 20, left: 241, hardToRead: true, description: planeTerms.cabinStaff, smaller: true },
          { floor: 3, top: 3, left: 315, description: planeTerms.radioCabin, hardToRead: true },
          { floor: 3, top: 3, left: 402, description: planeTerms.cabin, hardToRead: true },
          { floor: 3, top: 99, left: 358, hardToRead: true, description: planeTerms.caterer },
          { floor: 3, top: 3, left: 8, hardToRead: true, description: planeTerms.serverRoomA },
          { floor: 3, top: 3, left: -221, hardToRead: true, description: planeTerms.serverRoomB },
          { floor: 3, top: 0, left: -428, hardToRead: true, description: planeTerms.serverRoomB },
          { floor: 1, top: -30, left: 222, smaller: true, description: planeTerms.technicalSeating },
          { floor: 2, top: 112, left: -453, hardToRead: true, description: planeTerms.caterer },
          { floor: 2, top: -54, left: -177, hardToRead: true, description: planeTerms.ladderRoom, smaller: true }
        ]
      },
      skyscraper: {
        name: mapNameTerms.skyscraper,
        imgUrlPrefix: 'skyscraper',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 1, top: -715, left: -1275, background: true, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -653, left: -539, name: floorTerms.secondFloor },
          { index: 3, top: -653, left: -539, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 2, top: 210, left: -100 },
          { floor: 2, top: 294, left: 599 },
          { floor: 1, top: 266, left: -22 },
          { floor: 1, top: 241, left: 617 }
        ],
        bombObjectives: [
          { floor: 2, top: 32, left: 118, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 32, left: -100, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 2, top: 294, left: 566, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 161, left: 620, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 1, top: 66, left: -113, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 266, left: 10, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 1, top: 241, left: 651, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 241, left: 474, set: 4, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 2, top: 32, left: 82 },
          { floor: 2, top: 341, left: 583 },
          { floor: 1, top: 66, left: -78 },
          { floor: 1, top: 286, left: 617 }
        ],
        zoomPoints: {
          topLeft: { top: -213, left: -207 },
          bottomRight: { top: 426, left: 762 }
        },
        compassPoints: {
          top: 505, left: 656
        },
        cameras: [
          {
            floor: 2, top: 126, left: 167, id: 1, location: skyscraperTerms.hallway,
            los: [
              [{top: 134, left: -146}, {top: 125, left: -32}, {top: 112, left: -32}, {top: 112, left: 184}, {top: 283, left: 184}]
            ]
          },
          {
            floor: 1, top: -145, left: 38, id: 2, location: skyscraperTerms.restaurant,
            los: [
              [{top: -60, left: 4}, {top: -27, left: -15}],
              [{top: 32, left: 125}, {top: 138, left: 163}]
            ]
          },
          {
            floor: 2, top: -11, left: 655, id: 3, location: skyscraperTerms.houseStairs,
            los: [
              [{top: -25, left: 567}, {top: -23, left: 457}],
              [{top: 84, left: 637}, {top: 197, left: 636}]
            ]
          },
          { floor: 1, top: -5, left: 622, otherFloor: 'up', id: 3, location: skyscraperTerms.houseStairs },
          {
            floor: 1, top: 65, left: 447, id: 4, location: skyscraperTerms.houseLobby,
            los: [
              [{top: 51, left: 555}, {top: 41, left: 584}],
              [{top: 171, left: 486}, {top: 205, left: 501}],
              [{top: 179, left: 554}, {top: 312, left: 673}],
              [{top: 202, left: 554}, {top: 312, left: 642}]
            ]
          },
          {
            outdoor: true, top: -420, left: -226, id: 5, location: skyscraperTerms.westGarden,
            los: [
              [{top: -441, left: -308}, {top: -309, left: -395}],
              [{top: -499, left: -166}, {top: -465, left: 62}]
            ]
          },
          {
            outdoor: true, top: -114, left: 856, id: 6, location: skyscraperTerms.eastGarden,
            los: [
              [{top: -212, left: 494}, {top: -212, left: 849}, {top: -168, left: 879}, {top: 507, left: 860}]
            ]
          },
          {
            outdoor: true, top: 597, left: 543, id: 7, location: skyscraperTerms.ventilationUnits,
            los: [
              [{top: 393, left: -213}, {top: 614, left: 228}],
              [{top: 441, left: 365}, {top: 346, left: 273}],
              [{top: 461, left: 818}, {top: 395, left: 877}]
            ]
          }
        ],
        ceilingHatches: [
          { floor: 1, top: 210, left: -61 },
          { floor: 1, top: 289, left: 654 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 1, top: 374, left: 632, rotate: 0, size: DRONE_MED },
          { floor: 2, top: 189, left: 740, rotate: 90, size: DRONE_MED },
          { floor: 2, top: 86, left: 450, rotate: 90, size: DRONE_MED },
          { floor: 2, top: -124, left: 47, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: 138, left: -154, rotate: 90, size: DRONE_MED }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -147, left: -789, description: skyscraperTerms.helipad },
          { letter: spawnTerms.b, top: -556, left: 920, description: skyscraperTerms.tower },
          { letter: spawnTerms.c, top: 581, left: 301, description: skyscraperTerms.ventilationUnits }
        ],
        roomLabels: [
          { floor: 1, top: 252, left: -77, description: skyscraperTerms.kitchen },
          { floor: 1, top: 290, left: 126, description: skyscraperTerms.pantry },
          { floor: 1, top: 259, left: 346, description: skyscraperTerms.deliveryRoom },
          { floor: 1, top: 128, left: 565, description: skyscraperTerms.houseLobby },
          { floor: 1, top: 2, left: 504, description: skyscraperTerms.houseEntrance },
          { floor: 1, top: 8, left: 373, description: skyscraperTerms.mainEntrance },
          { floor: 1, top: 76, left: 231, description: skyscraperTerms.reception },
          { floor: 2, top: 46, left: 231, description: skyscraperTerms.reception },
          { floor: 1, top: 214, left: 631, description: skyscraperTerms.bedroom, hardToRead: true },
          { floor: 1, top: 352, left: 627, description: skyscraperTerms.closet },
          { floor: 1, top: 302, left: 483, description: skyscraperTerms.bathroom, hardToRead: true },
          { floor: 1, top: 2, left: 577, description: skyscraperTerms.houseStairs, hardToRead: true },
          { floor: 1, top: 33, left: 79, description: skyscraperTerms.restaurant },
          { floor: 1, top: -104, left: -69, description: skyscraperTerms.toilet },
          { floor: 1, top: 33, left: -70, description: skyscraperTerms.bbq },
          { floor: 1, top: -32, left: -70, description: skyscraperTerms.backHallway },
          { floor: 1, top: 182, left: 110, description: skyscraperTerms.mainStairs, hardToRead: true },
          { floor: 2, top: 259, left: 98, description: skyscraperTerms.mainStairs, hardToRead: true },
          { floor: 2, top: 257, left: -44, description: skyscraperTerms.geishaRoom, hardToRead: true },
          { floor: 2, top: 147, left: 87, description: skyscraperTerms.hallway, hardToRead: true },
          { floor: 2, top: 1, left: -5, description: skyscraperTerms.hallway, hardToRead: true },
          { floor: 2, top: -29, left: 103, description: skyscraperTerms.teaRoom, hardToRead: true },
          { floor: 2, top: 6, left: -90, description: skyscraperTerms.karaoke, hardToRead: true },
          { floor: 2, top: -135, left: -93, description: skyscraperTerms.backStairs.removeBreakTags(), hardToRead: true },
          { floor: 1, top: -95, left: -124, description: skyscraperTerms.backStairs, hardToRead: true },
          { floor: 2, top: 263, left: 217, description: skyscraperTerms.taiko, hardToRead: true },
          { floor: 2, top: 263, left: 370, description: skyscraperTerms.terrace, hardToRead: true },
          { floor: 1, top: 27, left: 691, description: skyscraperTerms.houseBalcony },
          { floor: 2, top: 62, left: 367, description: skyscraperTerms.dragonStatue },
          { floor: 2, top: -12, left: 501, description: skyscraperTerms.clearance, hardToRead: true },
          { floor: 2, top: 2, left: 577, description: skyscraperTerms.houseStairs, hardToRead: true },
          { floor: 2, top: 178, left: 498, description: skyscraperTerms.lounge, hardToRead: true },
          { floor: 2, top: 135, left: 628, description: skyscraperTerms.exhibition, hardToRead: true },
          { floor: 2, top: 244, left: 628, description: skyscraperTerms.workOffice, hardToRead: true },
          { outdoor: true, top: 104, left: -291, description: skyscraperTerms.peacefullTree },
          { outdoor: true, top: -543, left: -294, description: skyscraperTerms.contemplationGarden },
          { outdoor: true, top: -392, left: -128, description: skyscraperTerms.westGarden },
          { outdoor: true, top: -419, left: 225, description: skyscraperTerms.gazeebo, hardToRead: true },
          { outdoor: true, top: -271, left: 215, description: skyscraperTerms.bridge },
          { floor: 1, top: -181, left: 191, description: skyscraperTerms.restBalcony.removeBreakTags() },
          { floor: 2, top: -181, left: 191, description: skyscraperTerms.restBalcony.removeBreakTags() },
          { floor: 1, top: -78, left: 348, description: skyscraperTerms.mainEntrance },
          { outdoor: true, top: -577, left: 305, description: skyscraperTerms.northGarden },
          { outdoor: true, top: -134, left: 765, description: skyscraperTerms.eastGarden },
          { floor: 1, top: 151, left: 819, description: skyscraperTerms.sandGarden },
          { floor: 2, top: 151, left: 819, description: skyscraperTerms.sandGarden },
          { outdoor: true, top: -106, left: 943, description: skyscraperTerms.sidePath },
          { floor: 1, top: 110, left: 943, description: skyscraperTerms.sidePath },
          { floor: 2, top: 110, left: 943, description: skyscraperTerms.sidePath },
          { outdoor: true, top: 432, left: 918, description: skyscraperTerms.sideStairs },
          { outdoor: true, top: 529, left: 542, description: skyscraperTerms.ventilationUnits },
          { floor: 1, top: -362, left: 714, description: skyscraperTerms.tower },
          { floor: 2, top: -362, left: 714, description: skyscraperTerms.tower },
          { outdoor: true, top: -295, left: -494, description: skyscraperTerms.helipad },
          { outdoor: true, top: -16, left: -409, description: skyscraperTerms.helipad },
          { floor: 1, top: 376, left: 92, description: skyscraperTerms.restBalcony.removeBreakTags() },
          { floor: 2, top: 390, left: 92, description: skyscraperTerms.restBalcony.removeBreakTags() },
          { floor: 1, top: 39, left: -185, description: skyscraperTerms.restBalcony },
          { floor: 2, top: 39, left: -185, description: skyscraperTerms.restBalcony },
          { floor: 2, top: -45, left: 720, description: skyscraperTerms.houseBalcony },
          { floor: 1, top: -420, left: 417, description: skyscraperTerms.coveredWalkway },
          { floor: 2, top: -420, left: 417, description: skyscraperTerms.coveredWalkway }
        ]
      },
      themepark: {
        name: mapNameTerms.themepark,
        imgUrlPrefix: 'themepark',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 1, top: -715, left: -1275, background: true, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -430, left: -408, name: floorTerms.secondFloor },
          { index: 3, top: -430, left: -408, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 2, top: -125, left: 307 },
          { floor: 2, top: 109, left: -3 },
          { floor: 1, top: -55, left: 25 },
          { floor: 1, top: -77, left: -147 }
        ],
        bombObjectives: [
          { floor: 2, top: -125, left: 270, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 71, left: 299, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -18, left: -63, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 109, left: -40, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -144, left: 318, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -103, left: 192, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -77, left: -184, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -197, left: -152, set: 4, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 2, top: -125, left: 344 },
          { floor: 2, top: -18, left: -24 },
          { floor: 1, top: -82, left: 227 },
          { floor: 1, top: -77, left: -109 }
        ],
        zoomPoints: {
          topLeft: { top: -344, left: -303 },
          bottomRight: { top: 283, left: 533 }
        },
        compassPoints: {
          top: 430, left: 594
        },
        ladders: [
        ],
        cameras: [
          {
            floor: 1, top: 25, left: 291, id: 1, location: themeparkTerms.gallery,
            los: [
              [{top: 214, left: 345}, {top: 146, left: 317}, {top: 146, left: 310}, {top: 153, left: 310}, {top: 153, left: 273}, {top: -8, left: 274}, {top: -8, left: 346}, {top: 98, left: 345}, {top: 110, left: 362}],
              [{top: 133, left: 318}, {top: 214, left: 360}]
            ]
          },
          {
            floor: 2, top: -36, left: 493, id: 2, location: themeparkTerms.hauntedStairs,
            los: [
              [{top: 90, left: 443}, {top: 29, left: 479}],
              [{top: -8, left: 145}, {top: -25, left: 224}],
              [{top: -44, left: 175}, {top: -42, left: 224}, {top: -42, left: 234}, {top: -50, left: 234}, {top: -50, left: 511}, {top: 90, left: 511}],
              [{top: 15, left: 369}, {top: -2, left: 399}]
            ]
          },
          {
            floor: 1, top: -165, left: -24, id: 3, location: themeparkTerms.jointCorridor,
            los: [
              [{top: -197, left: 56}, {top: -179, left: -1}, {top: -179, left: -41}, {top: 34, left: -41}],
              [{top: -167, left: 121}, {top: -169, left: 157}],
              [{top: -154, left: 121}, {top: -152, left: 157}],
              [{top: 2, left: -1}, {top: 152, left: 26}],
              [{top: 35, left: -1}, {top: 152, left: 10}]
            ]
          },
          { floor: 2, top: 57, left: -232, id: 4, location: themeparkTerms.arcadeEntrance },
          { floor: 1, otherFloor: 'up', top: 57, left: -232, id: 4, location: themeparkTerms.arcadeEntrance },
          {
            floor: 2, top: 140, left: 208, id: 5, location: themeparkTerms.railPlatform,
            los: [
              [{top: 32, left: 172}, {top: -8, left: 145}],
              [{top: 154, left: 176}, {top: 154, left: 224},{top: -265, left: 224}]
            ]
          },
          {
            outdoor: true, top: -374, left: -336, id: 6, location: themeparkTerms.teacups,
            los: [
              [{top: -259, left: -522}, {top: -612, left: -176}]
            ]
          },
          {
            outdoor: true, top: -277, left: 623, id: 7, location: themeparkTerms.serviceEntry,
            los: [
              [{top: -149, left: 881}, {top: -440, left: 515}]
            ]
          },
          {
            outdoor: true, top: 301, left: -380, id: 8, location: themeparkTerms.guestInfo,
            los: [
              [{top: 199, left: -647}, {top: 560, left: -171}]
            ]
          }
        ],
        ceilingHatches: [
          { floor: 1, top: -114, left: -176 },
          { floor: 1, top: -79, left: 80 },
          { floor: 1, top: 90, left: 332 },
          { floor: 1, top: -181, left: 474 },
          { floor: 2, top: -2, left: 28 },
          { floor: 2 , top: -38, left: 444}
        ],
        skylights: [],
        droneTunnels: [
          { floor: 2, top: -137, left: -196, rotate: 0, size: DRONE_MED },
          { floor: 2, top: 210, left: -27, rotate: 90, size: DRONE_SMALL },
          { floor: 2, top: -172, left: 69, rotate: 90, size: DRONE_SMALL },
          { floor: 2, top: 222, left: 388, rotate: 0, size: DRONE_MED },
          { floor: 2, top: 78, left: 230, rotate: 90, size: DRONE_SMALL },
          { floor: 2, top: -136, left: 230, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -11, left: -271, rotate: 90, size: 74 },
          { floor: 1, top: -22, left: -239, rotate: 0, size: 34 },
          { floor: 1, top: -263, left: -155, rotate: 0, size: DRONE_MED },
          { floor: 1, top: 40, left: -81, rotate: 0, size: DRONE_SMALL },
          { floor: 1, top: 222, left: -81, rotate: 0, size: DRONE_MED },
          { floor: 1, top: -200, left: 185, rotate: 0, size: DRONE_MED },
          { floor: 1, top: -200, left: 385, rotate: 0, size: DRONE_MED },
          { floor: 1, top: 158, left: 155, rotate: 0, size: DRONE_MED },
          { floor: 1, top: -168, left: -47, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -15, left: 253, rotate: 0, size: DRONE_SMALL }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: 433, left: -740, description: themeparkTerms.mainEntrance },
          { letter: spawnTerms.b, top: -638, left: -620, description: themeparkTerms.teacups },
          { letter: spawnTerms.c, top: 111, left: 937, description: themeparkTerms.bumperCars }
        ],
        roomLabels: [
          { floor: 1, top: -130, left: -84, description: themeparkTerms.drugLab, hardToRead: true },
          { floor: 1, top: -198, left: -208, description: themeparkTerms.drugStorage, hardToRead: true },
          { floor: 1, top: 109, left: -200, description: themeparkTerms.arcadeEntrance, hardToRead: true },
          { floor: 1, top: 108, left: -71, description: themeparkTerms.barrelRoom, hardToRead: true },
          { floor: 1, top: 18, left: -106, description: themeparkTerms.jointCorridor, hardToRead: true },
          { floor: 1, top: -159, left: 31, description: themeparkTerms.jointCorridor, hardToRead: true },
          { floor: 1, top: -224, left: -60, description: themeparkTerms.arcadeToilet, hardToRead: true },
          { floor: 1, top: -224, left: 112, description: themeparkTerms.lockerRoom, hardToRead: true },
          { floor: 1, top: -224, left: 28, description: themeparkTerms.cafeStairs, hardToRead: true },
          { floor: 2, top: -224, left: 32, description: themeparkTerms.cafeStairs, hardToRead: true },
          { floor: 1, top: -101, left: 56, description: themeparkTerms.executionRoom, hardToRead: true },
          { floor: 1, top: 50, left: 150, description: themeparkTerms.coffinRoom, hardToRead: true },
          { floor: 1, top: -157, left: 213, description: themeparkTerms.hauntedDining, hardToRead: true },
          { floor: 1, top: -45, left: 356, description: themeparkTerms.gargoyle, hardToRead: true },
          { floor: 1, top: -149, left: 405, description: themeparkTerms.gargoyleStorage, hardToRead: true },
          { floor: 1, top: 21, left: 420, description: themeparkTerms.crypt, hardToRead: true },
          { floor: 1, top: 70, left: 308, description: themeparkTerms.gallery, hardToRead: true },
          { floor: 1, top: -125, left: 472, description: themeparkTerms.loadingDeck, hardToRead: true, smaller: true },
          { floor: 1, top: 144, left: 84, description: themeparkTerms.fuelStorage, hardToRead: true },
          { floor: 1, top: 137, left: 200, description: themeparkTerms.propStorage, hardToRead: true },
          { floor: 1, top: 211, left: 406, description: themeparkTerms.hauntedEntrance.removeBreakTags(), hardToRead: true },
          { floor: 1, top: 73, left: 420, description: themeparkTerms.hauntedStairs, hardToRead: true },
          { floor: 1, top: 24, left: -254, description: themeparkTerms.arcadeStairs, hardToRead: true },
          { floor: 1, top: 63, left: 17, description: themeparkTerms.serviceCorridor, hardToRead: true, smaller: true },
          { floor: 2, top: 24, left: -254, description: themeparkTerms.arcadeStairs, hardToRead: true },
          { floor: 2, top: -52, left: -162, description: themeparkTerms.upperArcade, hardToRead: true },
          { floor: 2, top: -100, left: 0, description: themeparkTerms.cafeCorridor, hardToRead: true },
          { floor: 2, top: -190, left: -71, description: themeparkTerms.cafe, hardToRead: true },
          { floor: 2, top: -46, left: -52, description: themeparkTerms.dayCare, hardToRead: true },
          { floor: 2, top: 163, left: 10, description: themeparkTerms.bunk, hardToRead: true },
          { floor: 2, top: 220, left: 153, description: themeparkTerms.liftCar, hardToRead: true, smaller: true },
          { floor: 2, top: 192, left: -67, description: themeparkTerms.bunkToilet, hardToRead: true },
          { floor: 2, top: 62, left: 101, description: themeparkTerms.railPlatform, hardToRead: true },
          { floor: 2, top: 62, left: 202, description: themeparkTerms.railPlatform, hardToRead: true },
          { floor: 2, top: -180, left: 101, description: themeparkTerms.railPlatform, hardToRead: true },
          { floor: 2, top: -180, left: 202, description: themeparkTerms.railPlatform, hardToRead: true },
          { floor: 2, top: -154, left: 301, description: themeparkTerms.office, hardToRead: true },
          { floor: 2, top: -163, left: 398, description: themeparkTerms.officeToilet, hardToRead: true },
          { floor: 2, top: -96, left: 472, description: themeparkTerms.cashStash, hardToRead: true },
          { floor: 2, top: 59, left: 443, description: themeparkTerms.hauntedStairs, hardToRead: true },
          { floor: 2, top: 154, left: 417, description: themeparkTerms.controlRoom, hardToRead: true },
          { floor: 2, top: 120, left: 289, description: themeparkTerms.initiationRoom, hardToRead: true },
          { floor: 2, top: -20, left: 293, description: themeparkTerms.railCorridor, hardToRead: true },
          { floor: 2, top: 188, left: 303, description: themeparkTerms.southExit, hardToRead: true },
          { floor: 2, top: -205, left: -225, description: themeparkTerms.cafeTerrace, hardToRead: true },
          { floor: 2, top: 220, left: 501, description: themeparkTerms.hauntedBalcony, hardToRead: true },
          { floor: 2, top: -329, left: 152, description: themeparkTerms.railOverlook, hardToRead: true, smaller: true },
          { floor: 2, top: -321, left: -36, description: themeparkTerms.railRamp, hardToRead: true },
          { floor: 3, top: -56, left: 362, description: themeparkTerms.hauntedRoof, hardToRead: true },
          { floor: 3, top: -56, left: -54, description: themeparkTerms.arcadeRoof, hardToRead: true },
          { outdoor: true, top: -111, left: -350, description: themeparkTerms.sweetShop, hardToRead: true },
          { outdoor: true, top: 372, left: -13, description: themeparkTerms.palms, hardToRead: true },
          { outdoor: true, top: 246, left: -300, description: themeparkTerms.guestInfo, hardToRead: true },
          { outdoor: true, top: -41, left: -561, description: themeparkTerms.village, hardToRead: true },
          { outdoor: true, top: -370, left: -460, description: themeparkTerms.teacups, hardToRead: true },
          { outdoor: true, top: -391, left: -152, description: themeparkTerms.backAlley, hardToRead: true },
          { outdoor: true, top: -303, left: 380, description: themeparkTerms.backAlley, hardToRead: true },
          { outdoor: true, top: -206, left: 634, description: themeparkTerms.serviceEntry, hardToRead: true },
          { outdoor: true, top: 207, left: 701, description: themeparkTerms.bumperCars, hardToRead: true },
          { outdoor: true, top: 364, left: 430, description: themeparkTerms.hauntedEntrance, hardToRead: true },
          { outdoor: true, top: 514, left: 430, description: themeparkTerms.roboCircuit, hardToRead: true },
          { outdoor: true, top: 364, left: 222, description: themeparkTerms.hauntedShop, hardToRead: true }
        ]
      },
      tower: {
        name: mapNameTerms.tower,
        imgUrlPrefix: 'tower',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 1, top: -715, left: -1275, name: floorTerms.firstFloor, background: true },
          { index: 2, top: -715, left: -715, name: floorTerms.secondFloor, default: true },
          { index: 3, top: -715, left: -1115, name: floorTerms.thirdFloor },
          { index: 4, top: -715, left: -1115, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 2, top: 331, left: -257 },
          { floor: 2, top: -186, left: 253 },
          { floor: 1, top: -72, left: -171 },
          { floor: 1, top: -177, left: 376 }
        ],
        bombObjectives: [
          { floor: 2, top: 8, left: -344, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 2, top: -210, left: -344, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 2, top: -130, left: 253, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 18, left: 146, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -221, left: 193, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 21, left: 193, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -143, left: -132, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -72, left: -352, set: 4, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 2, top: -152, left: 208 },
          { floor: 2, top: 502, left: 64 },
          { floor: 1, top: -143, left: 223 },
          { floor: 1, top: -143, left: -210 }
        ],
        zoomPoints: {
          topLeft: { top: -665, left: -694 },
          bottomRight: { top: 662, left: 584 }
        },
        compassPoints: {
          top: 380, left: 932
        },
        ladders: [
          { floor: 3, top: 245, left: -139, otherFloor: 'up' },
          { floor: 4, top: 245, left: -139, otherFloor: 'down' },
          { floor: 3, top: 65, left: 116, otherFloor: 'up' },
          { floor: 4, top: 65, left: 116, otherFloor: 'down' }
        ],
        cameras: [
          {
            floor: 2, top: -349, left: 43, id: 1, location: towerTerms.galleryMain,
            los: [
              [{top: -363, left: -85}, {top: -363, left: 60}, {top: -190, left: 60}, {top: -190, left: 16}, {top: 110, left: -21}]
            ]
          },
          {
            floor: 2, top: 47, left: 463, id: 2, location: towerTerms.exhibitHallway,
            los: [
              [{top: -29, left: 479}, {top: 62, left: 479}, {top: 62, left: 272}, {top: 27, left: 272}, {top: -11, left: 71}],
              [{top: 5, left: 272}, {top: -33, left: 127}]
            ]
          },
          {
            floor: 2, top: 220, left: -67, id: 3, location: towerTerms.companyReception,
            los: [
              [{top: 437, left: -50}, {top: 366, left: -54}, {top: 366, left: -84}, {top: 206, left: -84}, {top: 206, left: 330}],
              [{top: 374, left: 11}, {top: 438, left: 43}]
            ]
          },
          {
            floor: 1, top: 335, left: -133, id: 4, location: towerTerms.traditionalHall,
            los: [
              [{top: 2, left: -133}, {top: 121, left: -134}, {top: 121, left: -150}, {top: 346, left: -150}],
              [{top: 302, left: -93}, {top: 261, left: 113}, {top: 202, left: 113}, {top: 178, left: 134}, {top: 121, left: 218}],
              [{top: 217, left: 55}, {top: 121, left: 147}]
            ]
          },
          {
            floor: 1, top: 154, left: -459, id: 5, location: towerTerms.westBalcony,
            los: [
              [{top: -341, left: -476}, {top: 170, left: -476}, {top: 170, left: -99}]
            ]
          },
          {
            floor: 2, top: -627, left: -13, id: 6, location: towerTerms.centerAtrium,
            los: [
              [{top: -365, left: -576}, {top: -669, left: -13}, {top: -368, left: 543}]
            ]
          },
          {
            floor: 1, top: 592, left: -21, id: 7, location: towerTerms.fountain,
            los: [
              [{top: 375, left: -274}, {top: 441, left: -182}, {top: 530, left: -201}, {top: 536, left: -183}, {top: 591, left: -197}, {top: 597, left: -176}, {top: 607, left: -179}, {top: 607, left: 141}, {top: 596, left: 137}, {top: 590, left: 160}, {top: 534, left: 145}, {top: 528, left: 168}, {top: 440, left: 146}, {top: 374, left: 230}]
            ]
          }
        ],
        ceilingHatches: [
          { floor: 2, top: -233, left: -67 },
          { floor: 2, top: -27, left: 44 },
          { floor: 1, top: -274, left: -328 },
          { floor: 1, top: 307, left: -315 },
          { floor: 1, top: 158, left: -54 },
          { floor: 1, top: -66, left: 87 },
          { floor: 1, top: 450, left: 342 },
          { floor: 1, top: 505, left: -162 },
          { floor: 1, top: -128, left: -170 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 1, top: -331, left: 92, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -331, left: -131, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -303, left: 376, rotate: 0, size: DRONE_SMALL },
          { floor: 1, top: 100, left: -416, rotate: 0, size: 44 },
          { floor: 1, top: 377, left: -21, rotate: 0, size: 70 },
          { floor: 2, top: -369, left: -120, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: 342, left: -155, rotate: 0, size: 20 },
          { floor: 2, top: 349, left: -161, rotate: 90, size: 24 },
          { floor: 2, top: 324, left: 249, rotate: 90, size: 192 },
          { floor: 2, top: -46, left: 417, rotate: 90, size: DRONE_SMALL },
          //North Air Duct
          { floor: 3, top: -208, left: -167, rotate: 0, size: 330 },
          { floor: 3, top: -64, left: -167, rotate: 0, size: 40, otherFloor: 'up' },
          { floor: 4, top: -49, left: -133, rotate: 90, size: 80 },
          { floor: 4, top: -64, left: -167, rotate: 0, size: 40, otherFloor: 'down' },
          //East Air Duct
          { floor: 4, top: -49, left: 270, rotate: 0, size: 12, otherFloor: 'down' },
          { floor: 4, top: -49, left: 176, rotate: 90, size: 204 },
          { floor: 2, top: 62, left: 370, rotate: 0, size: DRONE_MED, otherFloor: 'up' },
          { floor: 3, top: -4, left: 370, rotate: 0, size: 128 },
          { floor: 3, top: 54, left: 370, rotate: 0, size: DRONE_SMALL, otherFloor: 'down' },
          { floor: 2, top: -64, left: 390, rotate: 0, size: 12, otherFloor: 'up' },
          { floor: 2, top: -64, left: 404, rotate: 90, size: 40 },
          { floor: 3, top: -64, left: 387, rotate: 0, size: 12, otherFloor: 'down' },
          { floor: 3, top: -64, left: 261, rotate: 0, size: 12, otherFloor: 'up' },
          { floor: 3, top: -64, left: 323, rotate: 90, size: 140 },
          //West Air Duct
          { floor: 2, top: 195, left: -369, rotate: 0, size: DRONE_MED, otherFloor: 'up' },
          { floor: 2, top: 121, left: -404, rotate: 0, size: 12, otherFloor: 'up' },
          { floor: 2, top: 121, left: -407, rotate: 90, size: 20 },
          { floor: 3, top: 153, left: -369, rotate: 0, size: 74 },
          { floor: 3, top: 186, left: -369, rotate: 0, size: 12, otherFloor: 'down' },
          { floor: 3, top: 121, left: -406, rotate: 0, size: 12, otherFloor: 'down' },
          { floor: 3, top: 121, left: -275, rotate: 0, size: 12, otherFloor: 'up' },
          { floor: 3, top: 121, left: -340, rotate: 90, size: 144 },
          { floor: 4, top: 121, left: -288, rotate: 0, size: 12, otherFloor: 'down' },
          { floor: 4, top: 121, left: -230, rotate: 90, size: 128 }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -627, left: -317, description: towerTerms.northRoof, floor: 4 },
          { letter: spawnTerms.b, top: 575, left: 527, description: towerTerms.southRoof, floor: 4 }
        ],
        roomLabels: [
          // Air Ducts
          { floor: 4, top: -43, left: -200, description: towerTerms.northAirDuct, hardToRead: true },
          { floor: 3, top: -210, left: -211, description: towerTerms.northAirDuct, hardToRead: true },
          { floor: 4, top: -78, left: 177, description: towerTerms.eastAirDuct, hardToRead: true },
          { floor: 3, top: -93, left: 324, description: towerTerms.eastAirDuct, hardToRead: true },
          { floor: 3, top: 92, left: -338, description: towerTerms.westAirDuct, hardToRead: true },
          { floor: 4, top: 92, left: -231, description: towerTerms.westAirDuct, hardToRead: true },
          // 4F/Exterior
          { floor: 4, top: -594, left: 224, description: towerTerms.northRoofNotShown, hardToRead: true },
          { floor: 4, top: 356, left: -10, description: towerTerms.roofAccess, hardToRead: true },
          { floor: 4, top: -214, left: -10, description: towerTerms.roofAccess, hardToRead: true },
          { floor: 4, top: 606, left: -265, description: towerTerms.southRoofNotShown, hardToRead: true },
          { floor: 4, top: 165, left: 11, description: towerTerms.elevator, hardToRead: true },
          // 3F:
          { floor: 3, top: 90, left: -14, description: towerTerms.ventilation, hardToRead: true },
          { floor: 3, top: -219, left: -14, description: towerTerms.ventilation, hardToRead: true },
          { floor: 3, top: -614, left: -14, description: towerTerms.mezzanine, hardToRead: true },
          { floor: 3, top: -366, left: -315, description: towerTerms.mezzanine, hardToRead: true },
          { floor: 3, top: -366, left: 295, description: towerTerms.mezzanine, hardToRead: true },
          { floor: 3, top: 165, left: 11, description: towerTerms.elevator, hardToRead: true },
          // 1F:
          { floor: 1, top: -439, left: -384, description: towerTerms.westAtrium, hardToRead: true },
          { floor: 1, top: -438, left: 334, description: towerTerms.eastAtrium, hardToRead: true },
          { floor: 1, top: -473, left: -167, description: towerTerms.centerAtrium, hardToRead: true },
          { floor: 1, top: -473, left: 114, description: towerTerms.centerAtrium, hardToRead: true },
          { floor: 1, top: -342, left: -26, description: towerTerms.mainReception, hardToRead: true },
          { floor: 1, top: -259, left: -244, description: towerTerms.kitchen, hardToRead: true },
          { floor: 1, top: 59, left: -453, description: towerTerms.westBalcony, hardToRead: true },
          { floor: 1, top: -211, left: -453, description: towerTerms.westBalcony, hardToRead: true },
          { floor: 1, top: -80, left: -232, description: towerTerms.restaurant, hardToRead: true },
          { floor: 1, top: -131, left: -353, description: towerTerms.birdRoom, hardToRead: true },
          { floor: 1, top: 48, left: -185, description: towerTerms.restaurantReception, hardToRead: true },
          { floor: 1, top: 48, left: 11, description: towerTerms.centerHallway, hardToRead: true },
          { floor: 1, top: -235, left: -20, description: towerTerms.centerHallway, hardToRead: true },
          { floor: 1, top: -164, left: 135, description: towerTerms.teaRoom, hardToRead: true },
          { floor: 1, top: -120, left: 347, description: towerTerms.lounge, hardToRead: true },
          { floor: 1, top: -256, left: 473, description: towerTerms.eastBalcony, hardToRead: true },
          { floor: 1, top: -24, left: 473, description: towerTerms.eastBalcony, hardToRead: true },
          { floor: 1, top: 30, left: 297, description: towerTerms.bar, hardToRead: true },
          { floor: 1, top: 151, left: -3, description: towerTerms.elevator, hardToRead: true },
          { floor: 1, top: 156, left: 197, description: towerTerms.barHallway, hardToRead: true },
          { floor: 1, top: 156, left: -260, description: towerTerms.restaurantHallway, hardToRead: true },
          { floor: 1, top: 265, left: -23, description: towerTerms.traditionalHall, hardToRead: true },
          { floor: 1, top: 252, left: -217, description: towerTerms.bonsaiRoom, hardToRead: true },
          { floor: 1, top: 252, left: 180, description: towerTerms.gameRoom, hardToRead: true },
          { floor: 1, top: 508, left: -24, description: towerTerms.fountain, hardToRead: true },
          { floor: 1, top: 442, left: -308, description: towerTerms.westObservatory, hardToRead: true },
          { floor: 1, top: 442, left: 250, description: towerTerms.eastObservatory, hardToRead: true },
          // 1F to 2F:
          { floor: 1, top: -518, left: -23, description: towerTerms.northStairs, hardToRead: true },
          { floor: 2, top: -528, left: -23, description: towerTerms.northStairs, hardToRead: true },
          { floor: 1, top: -1, left: -619, description: towerTerms.westStairs, hardToRead: true },
          { floor: 2, top: -1, left: -619, description: towerTerms.westStairs, hardToRead: true },
          { floor: 1, top: 119, left: 409, description: towerTerms.eastStairs, hardToRead: true },
          { floor: 2, top: 119, left: 409, description: towerTerms.eastStairs, hardToRead: true },
          // 2F:
          { floor: 2, top: 165, left: 11, description: towerTerms.elevator, hardToRead: true },
          { floor: 2, top: 87, left: -9, description: towerTerms.elevator, hardToRead: true },
          { floor: 2, top: -439, left: -384, description: towerTerms.westAtrium, hardToRead: true },
          { floor: 2, top: -438, left: 334, description: towerTerms.eastAtrium, hardToRead: true },
          { floor: 2, top: -473, left: -167, description: towerTerms.centerAtrium, hardToRead: true },
          { floor: 2, top: -473, left: 114, description: towerTerms.centerAtrium, hardToRead: true },
          { floor: 2, top: -469, left: -23, description: towerTerms.infoBooth, hardToRead: true },
          { floor: 2, top: -396, left: -17, description: towerTerms.galleryMain, hardToRead: true },
          { floor: 2, top: -121, left: -17, description: towerTerms.galleryMain, hardToRead: true },
          { floor: 2, top: -203, left: -129, description: towerTerms.galleryAnnex, hardToRead: true },
          { floor: 2, top: 9, left: -282, description: towerTerms.lanternRoom, hardToRead: true },
          { floor: 2, top: -254, left: 276, description: towerTerms.mediaCenter, hardToRead: true },
          { floor: 2, top: 23, left: 378, description: towerTerms.exhibitHallway, hardToRead: true },
          { floor: 2, top: 10, left: 200, description: towerTerms.exhibitRoom, hardToRead: true },
          { floor: 2, top: -237, left: 447, description: towerTerms.eastBalcony, hardToRead: true },
          { floor: 2, top: 119, left: 483, description: towerTerms.eastBalcony, hardToRead: true },
          { floor: 2, top: -211, left: -282, description: towerTerms.giftShop, hardToRead: true },
          { floor: 2, top: -211, left: -466, description: towerTerms.westBalcony, hardToRead: true },
          { floor: 2, top: 73, left: -471, description: towerTerms.westBalcony, hardToRead: true },
          { floor: 2, top: 163, left: -210, description: towerTerms.officesHallway, hardToRead: true },
          { floor: 2, top: 269, left: -283, description: towerTerms.offices, hardToRead: true },
          { floor: 2, top: 373, left: -500, description: towerTerms.supplyRoom, hardToRead: true },
          { floor: 2, top: 475, left: -345, description: towerTerms.meetingRoom, hardToRead: true },
          { floor: 2, top: 524, left: -21, description: towerTerms.ceoOffice, hardToRead: true },
          { floor: 2, top: 488, left: 274, description: towerTerms.bathroom, hardToRead: true },
          { floor: 2, top: 312, left: 453, description: towerTerms.serverRoom, hardToRead: true },
          { floor: 2, top: 257, left: 75, description: towerTerms.companyReception, hardToRead: true },
          { outdoor: true, top: -606, left: -481, description: towerTerms.northRappel },
          { outdoor: true, top: -606, left: 453, description: towerTerms.northRappel },
          { outdoor: true, top: 572, left: 453, description: towerTerms.southRappel },
          { outdoor: true, top: 572, left: -481, description: towerTerms.southRappel }
        ]
      },
      yacht: {
        name: mapNameTerms.yacht,
        imgUrlPrefix: 'yacht',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 1, top: -715, left: -1275, background: true, name: floorTerms.firstFloor },
          { index: 2, top: -261, left: -840, name: floorTerms.secondFloor, default: true },
          { index: 3, top: -261, left: -840, name: floorTerms.thirdFloor },
          { index: 4, top: -261, left: -840, name: floorTerms.fourthFloor },
          { index: 5, top: -261, left: -840, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 4, top: 13, left: 16 },
          { floor: 3, top: -55, left: 129 },
          { floor: 2, top: 93, left: 81 },
          { floor: 1, top: -24, left: -415 }
        ],
        bombObjectives: [
          { floor: 4, top: 14, left: 141, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 4, top: -32, left: -6, set: 1, letter: objectiveTerms.bombShortB },
          { floor: 2, top: 11, left: -297, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 9, left: -101, set: 2, letter: objectiveTerms.bombShortB },
          { floor: 2, top: 93, left: 45, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 2, top: -86, left: 52, set: 3, letter: objectiveTerms.bombShortB },
          { floor: 1, top: -95, left: -275, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 116, left: -259, set: 4, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
            { floor: 3, top: -6, left: 31 },
            { floor: 2, top: 33, left: -150 },
            { floor: 2, top: 61, left: 343 },
            { floor: 4, top: 14, left: 180 }
        ],
        zoomPoints: {
          topLeft: { top: -139, left: -610 },
          bottomRight: { top: 160, left: 590 }
        },
        compassPoints: {
          top: 331, left: 220
        },
        ladders: [
          { floor: 3, top: -11, left: 232, otherFloor: 'up' },
          { floor: 4, top: -11, left: 232, otherFloor: 'down' },
          { floor: 1, top: -109, left: -239, otherFloor: 'up' },
          { floor: 2, top: -109, left: -239, otherFloor: 'down' },
          { floor: 3, top: 116, left: -206, otherFloor: 'up' },
          { floor: 4, top: 116, left: -206, otherFloor: 'down' },
          { floor: 3, top: 116, left: 331, otherFloor: 'up' },
          { floor: 4, top: 116, left: 331, otherFloor: 'down' },
          { floor: 3, top: -93, left: 331, otherFloor: 'up' },
          { floor: 4, top: -93, left: 331, otherFloor: 'down' },
          { floor: 2, top: -39, left: 610, otherFloor: 'up' },
          { floor: 3, top: -39, left: 610, otherFloor: 'down' }
        ],
        cameras: [
          {
            floor: 4, top: 87, left: -134, id: 1, location: yachtTerms.helipadEntrance,
            los: [
              [{top: -41, left: -112}, {top: -78, left: -92}],
              [{top: 102, left: -31}, {top: 102, left: 103}],
              [{top: 102, left: -42}, {top: 102, left: -145}],
              [{top: 22, left: -61}, {top: 47, left: -86}]
            ]
          },
          {
            floor: 3, top: 21, left: 264, id: 2, location: yachtTerms.bedroomHallway,
            los: [[{top: 35, left: 152}, {top: 35, left: 280}, {top: -78, left: 280}]]
          },
          {
            floor: 3, top: 86, left: -227, id: 3, location: yachtTerms.lounge,
            los: [
              [{top: -5, left: -117}, {top: -32, left: -80}],
              [{top: 37, left: -32}, {top: 64, left: -139}, {top: 102, left: -139}, {top: 102, left: -243}, {top: -77, left: -243}]
            ]
          },
          {
            floor: 2, top: 13, left: 262, id: 4, location: yachtTerms.frontStairs,
            los: [
              [{top: 26, left: -36}, {top: 26, left: 280}, {top: -36, left: 280}],
              [{top: -45, left: 280}, {top: -48, left: 280}],
              [{top: -79, left: 280}, {top: -76, left: 280}],
              [{top: -68, left: 280}, {top: -65, left: 280}],
              [{top: -58, left: 280}, {top: -55, left: 280}],
              [{top: -80, left: 234}, {top: -40, left: 248}]
            ]
          },
          {
            floor: 2, top: 124, left: -266, id: 5, location: yachtTerms.backStairs,
            los: [
              [{top: -116, left: -258}, {top: 49, left: -271}, {top: 49, left: -281}, {top: 138, left: -281}, {top: 138, left: -15}],
              [{top: 77, left: -194}, {top: 99, left: -233}]
            ]
          },
          {
            floor: 1, top: -43, left: 63, id: 6, location: yachtTerms.engineHallway,
            los: [
              [{top: -21, left: -61}, {top: -21, left: 80}, {top: -88, left: 80}],
              [{top: -88, left: -138}, {top: -56, left: -32}],
              [{top: -73, left: -230}, {top: -60, left: -72}]
            ]
          },
          {
            floor: 3, top: 10, left: 631, id: 7, location: yachtTerms.frontDeck,
            los: [[{top: -105, left: 592}, {top: 12, left: 675}, {top: 127, left: 596}]]
          },
          { floor: 2, otherFloor: 'up', top: 10, left: 631, id: 7, location: yachtTerms.frontDeck },
          { floor: 4, otherFloor: 'down', top: 10, left: 631, id: 7, location: yachtTerms.frontDeck },
          { floor: 5, otherFloor: 'down', top: 10, left: 631, id: 7, location: yachtTerms.frontDeck },
          {
            floor: 3, top: 114, left: -477, id: 8, location: yachtTerms.spaDeck,
            los: [[{top: 119, left: -661}, {top: 152, left: -553}, {top: 152, left: 358}]]
          },
          { floor: 2, otherFloor: 'up', top: 114, left: -477, id: 8, location: yachtTerms.spaDeck },
          { floor: 4, otherFloor: 'down', top: 114, left: -477, id: 8, location: yachtTerms.spaDeck },
          { floor: 5, otherFloor: 'down', top: 114, left: -477, id: 8, location: yachtTerms.spaDeck }
        ],
        ceilingHatches: [
          { floor: 3, top: -63, left: 81 },
          { floor: 3, top: -45, left: 189 },
          { floor: 3, top: 0, left: 235 },
          { floor: 2, top: -45, left: -210 },
          { floor: 2, top: 46, left: -74 },
          { floor: 2, top: 56, left: 25 },
          { floor: 2, top: 71, left: 310 },
          { floor: 2, top: -34, left: 310 },
          { floor: 1, top: 15, left: -550 },
          { floor: 1, top: 14, left: -328  },
          { floor: 1, top: -53, left: 155 }
        ],
        skylights: [],
        droneTunnels: [
          { floor: 1, top: 63, left: -550, rotate: 90, size: 108 },
          { floor: 1, top: -36, left: -550, rotate: 90, size: 108 },
          { floor: 2, top: 103, left: -155, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: 129, left: -289, rotate: 90, size: DRONE_MED },
          { floor: 3, top: -83, left: -190, rotate: 0, size: DRONE_MED },
          { floor: 3, top: -83, left: 175, rotate: 0, size: DRONE_MED },
          { floor: 3, top: 106, left: -52, rotate: 0, size: DRONE_MED },
          { floor: 3, top: 62, left: 177, rotate: 90, size: DRONE_MED },
          { floor: 3, top: 106, left: 147, rotate: 0, size: DRONE_MED },
          { floor: 3, top: 106, left: 289, rotate: 0, size: DRONE_MED },
          { floor: 3, top: 0, left: 217, rotate: 90, size: DRONE_MED }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -532, left: -187, description: yachtTerms.spawnSubmarine },
          { letter: spawnTerms.b, top: 413, left: -737, description: yachtTerms.spawnZodiak },
          { letter: spawnTerms.c, top: 354, left: 596, description: yachtTerms.spawnSnowMobile }
        ],
        roomLabels: [
          { floor: 4, top: 59, left: 17, description: yachtTerms.mapsRoom },
          { floor: 4, top: 62, left: 121, description: yachtTerms.cockpit },
          { floor: 4, top: 100, left: 21, description: yachtTerms.cockpitHallway },
          { floor: 4, top: -29, left: 64, description: yachtTerms.captainsOffice },
          { floor: 4, top: 14, left: 323, description: yachtTerms.cockpitBalcony },
          { floor: 4, top: 27, left: -83, description: yachtTerms.topDeckStairs },
          { floor: 4, top: -53, left: -103, description: yachtTerms.helipadEntrance },
          { floor: 4, top: 24, left: -258, description: yachtTerms.helipad },
          { floor: 3, top: 14, left: -359, description: yachtTerms.spaDeck },
          { floor: 3, top: 138, left: -89, description: yachtTerms.eastDeck },
          { floor: 3, top: -89, left: -89, description: yachtTerms.westDeck },
          { floor: 3, top: 138, left: 226, description: yachtTerms.eastDeck },
          { floor: 3, top: -89, left: 226, description: yachtTerms.westDeck },
          { floor: 3, top: 17, left: 390, description: yachtTerms.frontDeck },
          { floor: 3, top: 17, left: 723, description: yachtTerms.frontDeck },
          { floor: 3, top: 20, left: 801, description: yachtTerms.kingOfTheWorld, hardToRead: true, smaller: true },
          { floor: 5, top: 17, left: 108, description: yachtTerms.roof },
          { floor: 3, top: 17, left: 325, description: yachtTerms.masterBedroom },
          { floor: 3, top: 4, left: 77, description: yachtTerms.casino },
          { floor: 3, top: -9, left: 170, description: yachtTerms.pokerRoom },
          { floor: 3, top: 78, left: 210, description: yachtTerms.bathroom },
          { floor: 3, top: 36, left: 200, smaller: true, description: yachtTerms.bedroomHallway },
          { floor: 3, top: 101, left: 65, description: yachtTerms.casinoHallway },
          { floor: 3, top: -25, left: -49, smaller: true, description: yachtTerms.globeHallway },
          { floor: 3, top: 49, left: -179, description: yachtTerms.lounge },
          { floor: 3, top: 26, left: -102, hardToRead: true, smaller: true, description: yachtTerms.topDeckStairs.removeBreakTags() },
          { floor: 2, top: 103, left: 127, description: yachtTerms.cafeteria },
          { floor: 1, top: -15, left: -361, description: yachtTerms.engine },
          { floor: 1, hardToRead: true, top: 18, left: -516, description: yachtTerms.backEntrance },
          { floor: 1, top: 18, left: -634, description: yachtTerms.rearDeck },
          { floor: 1, top: -33, left: -274, description: yachtTerms.serverRoom },
          { floor: 1, top: 74, left: -274, description: yachtTerms.engineStorage },
          { floor: 2, top: -40, left: -314, description: yachtTerms.engineControl },
          { floor: 2, top: 14, left: -517, description: yachtTerms.rearDeck },
          { floor: 1, top: 18, left: -215, description: yachtTerms.backStairs },
          { floor: 1, top: -95, left: -192, smaller: true, description: yachtTerms.emergencyExit },
          { floor: 1, top: -26, left: -7, description: yachtTerms.engineHallway },
          { floor: 1, top: -48, left: 204, description: yachtTerms.frontStairs },
          { floor: 2, top: -12, left: -157, description: yachtTerms.kitchen },
          { floor: 2, top: -26, left: 47, description: yachtTerms.staffDormitory },
          { floor: 4, top: -94, left: -18, description: yachtTerms.westBalcony },
          { floor: 4, top: 143, left: -18, description: yachtTerms.eastBalcony },
          { floor: 2, top: 133, left: -143, description: yachtTerms.kitchenHallway },
          { floor: 2, top: 78, left: -259, description: yachtTerms.backStairs },
          { floor: 2, top: -53, left: -91, description: yachtTerms.kitchenStairs },
          { floor: 2, top: -21, left: -36, smaller: true, description: yachtTerms.kitchenPantry },
          { floor: 2, top: -18, left: 143, description: yachtTerms.infirmary },
          { floor: 2, top: -50, left: 364, description: yachtTerms.borealSubRoom },
          { floor: 2, top: 24, left: 60, description: yachtTerms.cafeteriaHallway },
          { floor: 2, top: -25, left: 204, description: yachtTerms.frontStairs },
          { floor: 2, top: -76, left: -256, smaller: true, description: yachtTerms.engineUtility },
          { floor: 3, top: -57, left: 252, description: yachtTerms.frontStairs },
          { outdoor: true, hardToRead: true, top: -262, left: -43, description: yachtTerms.submarine },
          { outdoor: true, hardToRead: true, top: -206, left: -306, description: yachtTerms.westGlacier },
          { outdoor: true, hardToRead: true, top: 232, left: 617, description: yachtTerms.eastHullBreach },
          { outdoor: true, hardToRead: true, top: 388, left: 100, description: yachtTerms.eastGlacier },
          { outdoor: true, hardToRead: true, top: 388, left: -304, description: yachtTerms.frozenRiver },
          { outdoor: true, top: 245, left: -569, hardToRead: true, description: yachtTerms.zodiac },
          { outdoor: true, hardToRead: true, top: -145, left: 261, description: yachtTerms.westHullBreach },
          { floor: 2, top: -15, left: 553, description: yachtTerms.anchorName },
          { floor: 2, top: 85, left: 454, description: yachtTerms.aklarkSubEntrance, smaller: true, hardToRead: true }
        ]
      },
      villa: {
        name: mapNameTerms.villa,
        imgUrlPrefix: 'villa',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [
          { index: 0, top: -720, left: -1280, background: true, name: floorTerms.basement },
          { index: 1, top: -480, left: 0, name: floorTerms.firstFloor, default: true },
          { index: 2, top: -480, left: 0, name: floorTerms.secondFloor },
          { index: 3, top: -480, left: 0, name: floorTerms.roof }
        ],
        hostageObjectives: [
          { floor: 2, top: 62, left: 284 },
          { floor: 2, top: -315, left: 347 },
          { floor: 1, top: 100, left: 295 },
          { floor: 0, top: -197, left: 487 }
        ],
        bombObjectives: [
          { floor: 2, top: 103, left: 191, set: 1, letter: objectiveTerms.bombShortA },
          { floor: 2, top: 62, left: 324, set: 1, letter: objectiveTerms.bombShortB },

          { floor: 2, top: -204, left: 417, set: 2, letter: objectiveTerms.bombShortA },
          { floor: 2, top: -204, left: 306, set: 2, letter: objectiveTerms.bombShortB },

          { floor: 1, top: -105, left: 220, set: 3, letter: objectiveTerms.bombShortA },
          { floor: 1, top: 75, left: 145, set: 3, letter: objectiveTerms.bombShortB },

          { floor: 1, top: -333, left: 417, set: 4, letter: objectiveTerms.bombShortA },
          { floor: 1, top: -225, left: 428, set: 4, letter: objectiveTerms.bombShortB }
        ],
        secureObjectives: [
          { floor: 2, top: 170, left: 309 },
          { floor: 2, top: -205, left: 529 },
          { floor: 1, top: -105, left: 260 },
          { floor: 0, top: -161, left: 370 }
        ],
        zoomPoints: {
          topLeft: { left: 0, top: -420 },
          bottomRight: { left: 270, top: 640 }
        },
        compassPoints: {
        },
        ladders: [],
        cameras: [
          {floor: 2, top: -353, left: 381, id: 1, location: villaTerms.astronomyRoom,
            los: [[{top: -397, left: 393}, {top: -280, left: 393}, {top: -280, left: 380}, {top: -244, left: 381}, {top: -244, left: 346}, {top: -280, left: 357}, {top: -280, left: 255}, {top: -350, left: 255}, {top: -350, left: 335}, {top: -355, left: 335}, {top: -368, left: 255}, {top: -397, left: 255}, {top: -397, left: 393}]]},
          {floor: 2, top: -65, left: 140, id: 2, location: villaTerms.classicalHall,
            los: [[{top: -80, left: 125}, {top: -80, left: 248}, {top: -46, left: 248}, {top: -46, left: 176}, {top: -33, left: 198}, {top: 3, left: 198}, {top: -46, left: 155}, {top: -46, left: 137}, {top: 21, left: 161}, {top: 21, left: 132}, {top: 226, left: 132}, {top: 226, left: 110}, {top: 21, left: 110}, {top: 21, left: 103}, {top: -19, left: 103}, {top: -80, left: 125}]]},
          {floor: 1, top: -207, left: 254, id: 3, location: villaTerms.backHallway,
            los: [[{top: -207, left: 254}, {top: -193, left: 223}, {top: -218, left: 223}, {top: -212, left: 240}, {top: -228, left: 240}, {top: -228, left: 254}, {top: -253, left: 254}, {top: -278, left: 269}, {top: -268, left: 269}, {top: -268, left: 310}, {top: -258, left: 310}, {top: -290, left: 346}, {top: -290, left: 369}, {top: -284, left: 369}, {top: -240, left: 310}, {top: -232, left: 296}, {top: -228, left: 296}, {top: -228, left: 320}, {top: -220, left: 320}, {top: -229, left: 369}, {top: -182, left: 369}, {top: -192, left: 320}, {top: -188, left: 320}, {top: -188, left: 280}, {top: -207, left: 254}]]},
          {floor: 1, top: 206, left: 157, id: 4, location: villaTerms.mainEntrance,
            los: [[{top: 206, left: 157}, {top: 189, left: 35}, {top: 158, left: 35}, {top: 158, left: 61}, {top: 175, left: 94}],
            [{top: 151, left: 111}, {top: 170, left: 127}],
            [{top: 151, left: 160}, {top: 91, left: 163}, {top: 91, left: 192}, {top: 151, left: 174}],
            [{top: 173, left: 206}, {top: 151, left: 239}, {top: 151, left: 267}, {top: 206, left: 157}]]},
          {floor: 0, top: -128, left: 288, id: 5, location: villaTerms.archHallway,
            los: [[{top: -143, left: 327}, {top: -128, left: 288}, {top: -86, left: 252}],
            [{top: -163, left: 246}, {top: -167, left: 241}, {top: -193, left: 241}, {top: -158, left: 267}],
            [{top: -162, left: 274}, {top: -204, left: 258}, {top: -204, left: 273}, {top: -250, left: 265}, {top: -250, left: 274}, {top: -254, left: 274}, {top: -302, left: 269}, {top: -302, left: 290}, {top: -163, left: 290}]]},
          {outdoor: true, top: -82, left: 53, id: 6, location: villaTerms.stableYard,
            los: [[{top: -77, left: 95  }, {top: -86, left: 82}, {top: -97, left: 174}], [{top: -404, left: 248}, {top: -720, left: 414}]]},
          {outdoor: true, top: 360, left: 366, id: 7, location: villaTerms.ruins, los: [[{top: 480, left: 340}, {top: 390, left: 386}, {top: 40, left: 650}]]},
          {outdoor: true, top: -73, left: 685, id: 8, location: villaTerms.driveway,
          los: [[{top: 290, left: 392}, {top: -73, left: 686}, {top: -130, left: 720}]]}
        ],
        ceilingHatches: [
          // scale is off b/w map and hatch, so rescaling to fit.
          { floor: 1, top: -59, left: 109, width: 25, height: 25 },
          { floor: 1, top: -304, left: 300, width: 25, height: 25 },
          { floor: 1, top: 213, left: 360, width: 25, height: 25 },
          { floor: 1, top: -169, left: 556, width: 25, height: 25 },

          { floor: 0, top: -111, left: 296, width: 25, height: 25 },
          { floor: 0, top: -325, left: 498, width: 25, height: 25 }
        ],
        skylights: [
          {floor: 1, otherFloor: 'up', top: -176, left: 345 },
          {floor: 2, top: -193, left: 368 }
        ],
        droneTunnels: [
          { floor: 0, top: -197, left: 296, rotate: 90, size: 12 },
          { floor: 0, top: -315, left: 521, rotate: 90, size: 57 },
          { floor: 1, top: 274, left: 169, rotate: 0, size: 44 },
          { floor: 1, top: 224, left: 359, rotate: 0, size: DRONE_SMALL },
          { floor: 1, top: 89, left: 90, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: 64, left: 372, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -123, left: 491, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -155, left: 177, rotate: 90, size: DRONE_SMALL },
          { floor: 1, top: -295, left: 235, rotate: 90, size: DRONE_SMALL },
          { floor: 2, top: -32, left: 200, rotate: 90, size: 10 },
          { floor: 2, top: -85, left: 227, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: -279, left: 580, rotate: 0, size: DRONE_SMALL },
          { floor: 2, top: -360, left: 409, rotate: 0, size: DRONE_SMALL }
        ],
        spawnPoints: [
          { letter: spawnTerms.a, top: -371, left: -155, description: villaTerms.spawnMainRoad },
          { letter: spawnTerms.b, top: 428, left: 371, description: villaTerms.spawnRuins },
          { letter: spawnTerms.c, top: -290, left: 845, description: villaTerms.spawnFountain }
        ],
        roomLabels: [
          // EXT
          { outdoor: true, top: 380, left: 100, description: villaTerms.ruins, hardToRead: true },
          { outdoor: true, top: 180, left: -50, description: villaTerms.roundabout, hardToRead: true },
          { floor: 1, top: 270, left: 290, description: villaTerms.greenhouse },
          { floor: 1, top: 160, left: 60, description: villaTerms.frontEntrance, veryHardToRead: true },
          { floor: 3, top: 86, left: 263, description: villaTerms.roof, hardToRead: true },
          { outdoor: true, top: 189, left: 460, description: villaTerms.terrace },
          { outdoor: true, top: 59, left: 460, description: villaTerms.terrace, hardToRead: true },
          { floor: 0, top: 59, left: 320, description: villaTerms.cryptTunnel },
          { floor: 0, top: 120, left: 512, description: villaTerms.crypt, hardToRead: true },
          { outdoor: true, top: 110, left: 600, description: villaTerms.cryptEntrance, hardToRead: true },
          { outdoor: true, top: 119, left: 700, description: villaTerms.garden, hardToRead: true },
          { outdoor: true, top: -20, left: 610, description: villaTerms.driveway, hardToRead: true },
          { outdoor: true, top: -180, left: 653, description: villaTerms.driveway, hardToRead: true },
          { outdoor: true, top: -370, left: 672, description: villaTerms.driveway, hardToRead: true },
          { outdoor: true, top: -80, left: -80, description: villaTerms.mainRoad, hardToRead: true },
          { outdoor: true, top: -40, left: 530, description: villaTerms.balcony, hardToRead: true },
          { outdoor: true, top: -110, left: 724, description: villaTerms.pergola, hardToRead: true },
          { outdoor: true, top: -170, left: 90, description: villaTerms.stableYard, hardToRead: true },
          { floor: 3, top: -248, left: 481, description: villaTerms.skylightRoof, hardToRead: true },
          { floor: 2, top: -95, left: 530, description: villaTerms.bedroomRoof, hardToRead: true },
          { outdoor: true, top: -131, left: 820, description: villaTerms.chapel, hardToRead: true },
          { floor: 0, top: -230, left: 570, description: villaTerms.garage, veryHardToRead: true },
          { outdoor: true, top: -390, left: 740, description: villaTerms.fountain, hardToRead: true },
          // hidden under stable's roof
          { outdoor: true, top: -281, left: 80, description: villaTerms.stable, hardToRead: true },
          { floor: 0, top: -380, left: 260, description: villaTerms.cellarTunnel, veryHardToRead: true },
          { outdoor: true, top: -390, left: 420, description: villaTerms.sideRoad, veryHardToRead: true },
          // 2F
          { floor: 2, top: 282, left: 310, description: villaTerms.veranda },
          { floor: 2, top: 206, left: 121, description: villaTerms.classicalHall, hardToRead: true },
          { floor: 2, top: -14, left: 150, description: villaTerms.classicalHall, hardToRead: true },
          { floor: 2, top: -60, left: 2830, description: villaTerms.classicalHall, hardToRead: true },
          { floor: 2, top: 184, left: 350, description: villaTerms.study, hardToRead: true },
          { floor: 2, top: 70, left: 165, description: villaTerms.gamesRoom, veryHardToRead: true },
          { floor: 2, top: 108, left: 320, description: villaTerms.aviatorRoom, hardToRead: true },
          { floor: 2, top: 6, left: 255, description: villaTerms.huntingVault },
          { floor: 2, top: -38, left: 348, description: villaTerms.landing, veryHardToRead: true },
          { floor: 2, top: -109, left: 286, description: villaTerms.trophyEntrance, veryHardToRead: true },
          { floor: 2, top: -159, left: 447, description: villaTerms.statuaryRoom, hardToRead: true },
          { floor: 2, top: -243, left: 297, description: villaTerms.trophyRoom, veryHardToRead: true },
          { floor: 2, top: -235, left: 520, description: villaTerms.masterBedroom, veryHardToRead: true },
          { floor: 2, top: -317, left: 296, description: villaTerms.astronomyRoom, veryHardToRead: true },
          { floor: 2, top: -313, left: 440, description: villaTerms.masterBathroom, hardToRead: true },
          { floor: 2, top: -313, left: 533, description: villaTerms.walkInCloset, veryHardToRead: true },
          // 1F
          { floor: 1, top: 197, left: 200, description: villaTerms.mainEntrance, veryHardToRead: true },
          { floor: 1, top: 191, left: 347, description: villaTerms.artStudio, hardToRead: true },
          { floor: 1, top: 127, left: 165, description: villaTerms.library, hardToRead: true },
          { floor: 1, top: 44, left: 135, description: villaTerms.library, hardToRead: true },
          { floor: 1, top: 95, left: 250, description: villaTerms.mainHallway, veryHardToRead: true },
          { floor: 1, top: 16, left: 310, description: villaTerms.mainHallway, veryHardToRead: true },
          { floor: 1, top: -74, left: 347, description: villaTerms.mainHallway, veryHardToRead: true },
          { floor: 1, top: 72, left: 319, description: villaTerms.pianoRoom, hardToRead: true },
          { floor: 1, top: 50, left: 204, description: villaTerms.gallery, hardToRead: true },
          { floor: 1, top: -26, left: 113, description: villaTerms.toilet, hardToRead: true },
          { floor: 1, top: -41, left: 281, description: villaTerms.livingRoom, veryHardToRead: true },
          { floor: 1, top: -131, left: 279, description: villaTerms.livingRoom, veryHardToRead: true },
          { floor: 1, top: -40, left: 463, description: villaTerms.bicycleStorage, hardToRead: true },
          { floor: 1, top: -128, left: 430, description: villaTerms.memorialRoom, veryHardToRead: true },
          { floor: 1, top: -172, left: 207, description: villaTerms.mudroom, veryHardToRead: true },
          { floor: 1, top: -204, left: 347, description: villaTerms.skylightHallway, hardToRead: true },
          { floor: 1, top: -189, left: 528, description: villaTerms.laundry, hardToRead: true },
          { floor: 1, top: -232, left: 280, description: villaTerms.backHallway, veryHardToRead: true },
          { floor: 1, top: -247, left: 480, description: villaTerms.diningRoom, hardToRead: true },
          { floor: 1, top: -254, left: 340, description: villaTerms.chinaRoom, hardToRead: true },
          { floor: 1, top: -325, left: 371, description: villaTerms.kitchen, veryHardToRead: true },
          { floor: 1, top: -339, left: 502, description: villaTerms.pantry, hardToRead: true },
          // B
          { floor: 0, top: -40, left: 288, description: villaTerms.tastingRoom, veryHardToRead: true },
          { floor: 0, top: -196, left: 268, description: villaTerms.archHallway, veryHardToRead: true },
          { floor: 0, top: -190, left: 371, description: villaTerms.artStorage, hardToRead: true },
          { floor: 0, top: -210, left: 466, description: villaTerms.oldOffice, veryHardToRead: true },
          { floor: 0, top: -291, left: 357, description: villaTerms.wineCellar, veryHardToRead: true },
          // Stairs
          { floor: 1, top: 262, left: 170, description: villaTerms.mainStairs, veryHardToRead: true },
          { floor: 2, top: 273, left: 180, description: villaTerms.mainStairs, veryHardToRead: true },
          { floor: 0, top: -40, left: 370, description: villaTerms.redStairs, veryHardToRead: true },
          { floor: 1, top: -40, left: 400, description: villaTerms.redStairs, veryHardToRead: true },
          { floor: 2, top: -43, left: 420, description: villaTerms.redStairs, hardToRead: true },
          { floor: 0, top: -331, left: 257, description: villaTerms.backStairs, veryHardToRead: true },
          { floor: 1, top: -316, left: 270, description: villaTerms.backStairs, veryHardToRead: true },
          { floor: 2, top: -370, left: 310, description: villaTerms.backStairs, veryHardToRead: true },
          { floor: 0, top: -321, left: 519, description: villaTerms.pantryStairs, veryHardToRead: true },
          { floor: 1, top: -315, left: 541, description: villaTerms.pantryStairs, veryHardToRead: true }
        ]
      }
      /*emptytemplate: {
        name: 'Empty',
        imgUrlPrefix: 'empty',
        objectives: [
          'bomb', 'hostage', 'secure'
        ],
        floors: [],
        hostageObjectives: [],
        bombObjectives: [],
        secureObjectives: [],
        zoomPoints: {
          topLeft: {},
          bottomRight: {}
        },
        compassPoints: {
        },
        ladders: [
        ],
        cameras: [],
        ceilingHatches: [],
        skylights: [],
        droneTunnels: [],
        spawnPoints: [],
        roomLabels: []
      }*/
    };
  };

  return  {
    getMapData: getMapData
  };
})(R6MLangTerms);
