'use strict';

var DEV_MODE = false;

String.prototype.removeBreakTags = function() {
  var target = this;

  return target.replace(new RegExp('<br/>', 'g'), ' ');
};
