'use strict';
var defined = require('./$.defined')
  , cof     = require('./$.cof')
  , $def    = require('./$.def');

$def($def.P, 'String', {
  // 21.1.3.7 String.prototype.includes(searchString, position = 0)
  includes: function includes(searchString /*, position = 0 */){
    if(cof(searchString) == 'RegExp')throw TypeError("String#includes doesn't accept regex!");
    return !!~String(defined(this)).indexOf(searchString, arguments[1]);
  }
});