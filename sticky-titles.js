( function( window ) {

'use strict';

// var Title = window.StickyTitle;

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

function StickyTitles( elems ) {
  this.titles = [];
  this.add( elems );
  this._create();
}

StickyTitles.prototype._create = function() {
  
};

StickyTitles.prototype.add = function( elems ) {
  if ( !elems ) {
    return;
  }
  elems = makeArray( elems );
  this.titles.push.apply( elems );
};

// -------------------------- transport -------------------------- //

window.StickyTitles = StickyTitles;

})( window );

