'use strict';

var R6MMainSessions = (function($, window, document, R6MLangTerms, undefined) {
  var setup = function setup($dialog) {
    var html = '';

    html += '<h2>Shared Sessions</h2>';
    html += '<label>Session name';
    html += '<input type="text" placeholder=""></input>';
    html += '</label>';
    html += '<button>Creat/Join</button>';
    $dialog.html(html);
  };

  var getOpenFn = function getOpenFn($dialog) {
    return function() {
      $.fancybox.open($dialog, {
        padding: 10,
        helpers: {
          overlay: {
            css: {
              background: 'rgba(48,113,169, 0.65)'
            }
          }
        }
      });
    };
  };

  return  {
    createJoinDialog: {
      setup: setup,
      getOpenFn: getOpenFn
    }
  };
})(window.jQuery, window, document, R6MLangTerms);
