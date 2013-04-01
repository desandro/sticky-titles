( function( window ) {

'use strict';

var getSize = window.getSize;
var getStyleProperty = window.getStyleProperty;

var transformProp = getStyleProperty('transform');

// -------------------------- StickyTitle -------------------------- //

// singular class for each title

function StickyTitle( elem ) {
  this.element = elem;
  this._create();
}

StickyTitle.prototype._create = function() {
  this.element.style.position = 'relative';

  // space takes space before
  this.spacer = document.createElement('div');
  this.spacer.className = 'sticky-title-spacer';
  this.element.parentNode.insertBefore( this.spacer, this.element );
};

// measure top position and outerHeight
StickyTitle.prototype.measure = function() {
  var size = this.size = getSize( this.element );
  this.top = this.element.getBoundingClientRect().top - size.marginTop;
  this.outerHeight = size.outerHeight;
  this.bottom = this.top + size.outerHeight;
};

StickyTitle.prototype.stick = function() {
  this.element.style.position = 'fixed';
  this.element.style.top = 0;
  // this.element.style.zIndex = 10;

  this.spacer.style.height = this.size.height + 'px';
  this.spacer.style.marginTop = this.size.marginTop + 'px';
  this.spacer.style.marginBottom = this.size.marginBottom + 'px';
};

StickyTitle.prototype.unstick = function() {
  // return element to relative positioning
  this.element.style.position = 'relative';
  this.element.style.top = '';
  if ( transformProp ) {
    this.element.style[ transformProp ] = '';
  }
  this.spacer.style.height = 0;
};

StickyTitle.prototype.offset = function( nextTitle ) {
  var gap = nextTitle.top - window.scrollY;
  var offset = this.size.height - gap;
  offset = Math.max( offset, 0 );
  if ( offset === this._offset ) {
    return;
  }

  if ( transformProp ) {
    this.element.style[ transformProp ] = 'translateY(' +  -offset + 'px)';
  } else {
    this.element.style.top = -offset + 'px';
  }

  this._offset = offset;
};

// --------------------------  -------------------------- //

// create global namespace, add Title to it
window.StickyTitles = {
  Title: StickyTitle
};

})( window );
