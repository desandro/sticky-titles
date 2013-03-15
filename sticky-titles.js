( function( window ) {

'use strict';

var StickyTitle = window.StickyTitle;

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

StickyTitles.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

StickyTitles.prototype._create = function() {
  this.measure();
  window.addEventListener( 'scroll', this, false );
};

StickyTitles.prototype.add = function( elems ) {
  if ( !elems ) {
    return;
  }
  elems = makeArray( elems );
  var titles = [];
  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    var title = new StickyTitle( elem );
    titles.push( title );
  }
  this.titles.push.apply( this.titles, titles );
};

StickyTitles.prototype.measure = function() {
  for ( var i=0, len = this.titles.length; i < len; i++ ) {
    var title = this.titles[i];
    title.measure();
  }
};

StickyTitles.prototype.stickTitle = function( title ) {
  // don't stick if the same
  if ( title === this.stuckTitle ) {
    return;
  }
  this.unstickTitle();
  title.stick();
  this.stuckTitle = title;
};

StickyTitles.prototype.unstickTitle = function() {
  if ( !this.stuckTitle ) {
    return;
  }
  this.stuckTitle.unstick();
  delete this.stuckTitle;
};

// -------------------------- events -------------------------- //

StickyTitles.prototype.onscroll = function() {
  // console.log( window.scrollY );
  var scrollY = window.scrollY;

  for ( var i=0, len = this.titles.length; i < len; i++ ) {
    var title = this.titles[i];
    var previousTitle = i  && this.titles[ i - 1 ];
    var nextTitle = i < len - 1 && this.titles[ i + 1 ];
    if ( scrollY >= title.top && scrollY <= nextTitle.top ) {
      this.stickTitle( title );
      title.offset( nextTitle );
      // var gap = nextTitle.top - scrollY;
      // title.offset( nextTitle.top - scrollY );
      break;
    }
  }
};

// -------------------------- transport -------------------------- //

window.StickyTitles = StickyTitles;

})( window );

