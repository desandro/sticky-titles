( function( window ) {

'use strict';

var getSize = window.getSize;

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
  this.element.style.left = 0;

  this.spacer.style.height = this.size.height + 'px';
  this.spacer.style.marginTop = this.size.marginTop + 'px';
  this.spacer.style.marginBottom = this.size.marginBottom + 'px';
};

StickyTitle.prototype.unstick = function() {
  this.element.style.position = 'relative';
  this.element.style.top = '';
  this.element.style.left = '';
  this.spacer.style.height = 0;
};

// --------------------------  -------------------------- //

window.StickyTitle = StickyTitle;

})( window );
