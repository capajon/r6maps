'use strict';

var R6MapsLangTermsGerman = (function(R6MapsLangTerms, undefined) {
  var terms = {
    mapNames: {
      bank: 'Bank (DE)',
      oregon: 'Oregon'
    },
    mapRooms: {
      bank: {
        parkingLot: 'Parking Lot (DE)'
      }
    }
  };

  R6MapsLangTerms.loadLangPack(terms);

  return  {
    terms: terms
  };
})(R6MapsLangTerms);
