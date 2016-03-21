'use strict';

var R6MapsLangTermsGerman = (function(R6MapsLangTerms, undefined) {
  var name = 'de',
    terms = {
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

  //R6MapsLangTerms.registerLanguage(name, terms);

  return  {
    name: name,
    terms: terms
  };
})(R6MapsLangTerms);
