/* eslint-disable filenames/match-regex */
/* globals google */


import {
  inherits
} from "./helper"

import {
  getSharedCross,
  getProcessed,
  setProcessed
} from "./SharedCross"
import {
  MapEvent,
  MarkerExtended,
  OverlayViewExtended
} from './types';

/**
 * This constructor creates a label and associates it with a marker.
 * It is for the private use of the MarkerWithLabel class.
 * @constructor
 * @param {Marker} marker The marker with which the label is to be associated.
 * @param {string} crossURL The URL of the cross image =.
 * @private
 */
const OverlayViewExtended = function(this: OverlayViewExtended, marker: MarkerExtended, crossURL: string) {
  this.marker_ = marker;

  this.labelDiv_ = document.createElement("div");
  this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;";

  // Set up the DIV for handling mouse events in the label. This DIV forms a transparent veil
  // in the "overlayMouseTarget" pane, a veil that covers just the label. This is done so that
  // events can be captured even if the label is in the shadow of a google.maps.InfoWindow.
  // Code is included here to ensure the veil is always exactly the same size as the label.
  this.eventDiv_ = document.createElement("div");
  this.eventDiv_.style.cssText = this.labelDiv_.style.cssText;

  // This is needed for proper behavior on MSIE:
  this.eventDiv_.addEventListener('selectstart', function() { return false; });
  this.eventDiv_.addEventListener('dragstart', function() { return false; });

  // Get the DIV for the "X" to be displayed when the marker is raised.
  this.crossDiv_ = null;
  this.crossURL_ = crossURL
} as any as { new (marker: MarkerExtended, crossURL: string): OverlayViewExtended; };

function extendedOverlayView() {
/**
 * Adds the DIV representing the label to the DOM. This method is called
 * automatically when the marker's <code>setMap</code> method is called.
 * @private
 */
OverlayViewExtended.prototype.onAdd = function () {
  var me = this;

  this.crossDiv_ = getSharedCross(this.crossURL_);

  this.getPanes().markerLayer.appendChild(this.labelDiv_);
  this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_);
  // One cross is shared with all markers, so only add it once:
  if (!getProcessed()) {
    this.getPanes().overlayImage.appendChild(this.crossDiv_);
    setProcessed();
  }

  this.addMouseListeners();

  this.listeners2_ = [
    google.maps.event.addListener(this.marker_, "clickable_changed", function () {
      me.setClickable();
    }),
    google.maps.event.addListener(this.marker_, "cursor_changed", function () {
      me.setCursor();
    }),
    google.maps.event.addListener(this.marker_, "draggable_changed", function () {
      me.setClickable();
    }),
    google.maps.event.addListener(this.marker_, "position_changed", function () {
      me.setPosition();
    }),
    google.maps.event.addListener(this.marker_, "visible_changed", function () {
      me.setVisible();
    }),
    google.maps.event.addListener(this.marker_, "title_changed", function () {
      me.setTitle();
    }),
    google.maps.event.addListener(this.marker_, "zindex_changed", function () {
      me.setZIndex();
    }),
    google.maps.event.addListener(this.marker_, "labelanchor_changed", function () {
      me.setAnchor();
    }),
    google.maps.event.addListener(this.marker_, "labelclass_changed", function () {
      me.setStyles();
    }),
    google.maps.event.addListener(this.marker_, "labelcontent_changed", function () {
      me.setContent();
    }),
    google.maps.event.addListener(this.marker_, "labelstyle_changed", function () {
      me.setStyles();
    }),
    google.maps.event.addListener(this.marker_, "labelvisible_changed", function () {
      me.setVisible();
    })
  ];

  this.isAdded_ = true;
};

// Stop all processing of an event.
//
var cAbortEvent = function (e: Event) {
  e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
};

// Stop an event from propagating.
//
var cStopPropagation = function (e: Event) {
  e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
};

/**
 * Adds the listeners for a clickable label.
 * @private
 */
OverlayViewExtended.prototype.addMouseListeners = function () {
  var me = this;
  var cTouchScreen = false;
  var cMouseIsDown = false;
  var cDraggingLabel = false;
  var cIgnoreClick: boolean;
  var cLatOffset: number;
  var cLngOffset: number;

  this.listeners1_ = [
    google.maps.event.addDomListener(this.eventDiv_, "mouseover", function (this: HTMLElement, e: Event) {
      var mEvent = {latLng: me.marker_.getPosition()};
      if (me.marker_.getClickable() || me.marker_.getDraggable()) {
        if (!cTouchScreen) {
          this.style.cursor = (me.marker_.getCursor() || "pointer");
          google.maps.event.trigger(me.marker_, "mouseover", mEvent);
          cAbortEvent(e);
        }
      } else {
        // @ts-ignore
        this.style.cursor = null;
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "mouseout", function (e: Event) {
      var mEvent = {latLng: me.marker_.getPosition()};
      if (me.marker_.getClickable() || me.marker_.getDraggable()) {
        if (!cTouchScreen) {
          google.maps.event.trigger(me.marker_, "mouseout", mEvent);
          cAbortEvent(e);
        }
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "mousedown", function (e: Event) {
      var mEvent = {latLng: me.marker_.getPosition()};
      cDraggingLabel = false;
      if (me.marker_.getClickable() || me.marker_.getDraggable()) {
        cMouseIsDown = true;
        google.maps.event.trigger(me.marker_, "mousedown", mEvent);
        if (!cTouchScreen) {
          cAbortEvent(e); // Prevent map pan when starting a drag on a label
        }
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "mouseup", function (e: Event) {
      var mEvent = {latLng: me.marker_.getPosition()};
      if (cMouseIsDown) {
        cMouseIsDown = false;
        google.maps.event.trigger(me.marker_, "mouseup", mEvent);
        if (cDraggingLabel) {
          cDraggingLabel = false;
          me.crossDiv_.style.display = "none";
          cIgnoreClick = true; // Set flag to ignore the click event reported after a label drag
          google.maps.event.trigger(me.marker_, "dragend", mEvent);
        }
        if (!me.marker_.getDraggable()) {
          cAbortEvent(e);
        }
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "click", function (e: Event) {
      var mEvent = {latLng: me.marker_.getPosition()};
      if (me.marker_.getClickable() || me.marker_.getDraggable()) {
        if (cIgnoreClick) { // Ignore the click reported when a label drag ends
          cIgnoreClick = false;
        } else {
          google.maps.event.trigger(me.marker_, "click", mEvent);
        }
        cAbortEvent(e); // Prevent click from being passed on to map
      }
    }),
    google.maps.event.addDomListener(this.eventDiv_, "dblclick", function (e: Event) {
      var mEvent = {latLng: me.marker_.getPosition()};
      if (me.marker_.getClickable() || me.marker_.getDraggable()) {
        google.maps.event.trigger(me.marker_, "dblclick", mEvent);
        cAbortEvent(e); // Prevent map zoom when double-clicking on a label
      }
    }),
    google.maps.event.addListener(this.marker_.getMap(), "mousemove", function (mEvent: MapEvent) {
      var position;
      if (cMouseIsDown && me.marker_.getDraggable() && mEvent.latLng) {
        if (cDraggingLabel) {
          // Change the reported location from the mouse position to the marker position:
          mEvent.latLng = new google.maps.LatLng(mEvent.latLng.lat() - cLatOffset, mEvent.latLng.lng() - cLngOffset);
          if (me.marker_.get("crossOnDrag")) { // Position and display the cross
            position = me.getProjection().fromLatLngToDivPixel(mEvent.latLng);
            me.crossDiv_.style.left = position.x + "px";
            me.crossDiv_.style.top = position.y + "px";
            me.crossDiv_.style.display = "";
          }
          google.maps.event.trigger(me.marker_, "drag", mEvent);
        } else {
          // Calculate offsets from the click point to the marker position:
          cLatOffset = mEvent.latLng.lat() - me.marker_.getPosition().lat();
          cLngOffset = mEvent.latLng.lng() - me.marker_.getPosition().lng();
          cDraggingLabel = true;
          mEvent.latLng = me.marker_.getPosition();
          google.maps.event.trigger(me.marker_, "dragstart", mEvent);
        }
      }
    }),
    google.maps.event.addListener(this.marker_, "dragstart", function () {
      // During a drag, the marker's z-index is temporarily set to 1000000 to ensure
      // it appears above all other markers. Here we also set the label's z-index
      // to 1000000 (plus or minus 1 depending on whether the label is supposed
      // to be above or below the marker). (NOTE: For some reason, Google does not
      // fire a zindex_changed event when changing the marker's z-index to 100000
      // or else this task would be handled by the MarkerLabel.setZIndex() method.)
      //
      // @ts-ignore
      me.labelDiv_.style.zIndex = 1000000 + (this.get("labelInBackground") ? -1 : +1);
      me.eventDiv_.style.zIndex = me.labelDiv_.style.zIndex;
    }),
    google.maps.event.addListener(this.marker_, "drag", (mEvent: MapEvent) => {
      this.setPosition(mEvent.latLng);
    }),
    google.maps.event.addListener(this.marker_, "dragend", function () {
      me.setZIndex();
    }),
    // Prevent touch events from passing through the label DIV to the underlying map.
    //
    google.maps.event.addDomListener(this.eventDiv_, "touchstart", function (e: Event) {
      cTouchScreen = true;
      cStopPropagation(e);
      // @ts-ignore
    }, { passive: true }),
    google.maps.event.addDomListener(this.eventDiv_, "touchmove", function (e: Event) {
      cStopPropagation(e);
      // @ts-ignore
    }, { passive: true }),
    google.maps.event.addDomListener(this.eventDiv_, "touchend", function (e: Event) {
      cStopPropagation(e);
      // @ts-ignore
    }, { passive: true })
  ];
};

/**
 * Removes the listeners for a clickable label.
 * @private
 */
OverlayViewExtended.prototype.removeMouseListeners = function () {
  var i;

  if (this.listeners1_) {
    for (i = 0; i < this.listeners1_.length; i++) {
      google.maps.event.removeListener(this.listeners1_[i]);
    }
  }
};

/**
 * Removes the DIV for the label from the DOM. It also removes all event handlers.
 * This method is called automatically when the marker's <code>setMap(null)</code>
 * method is called.
 * @private
 */
OverlayViewExtended.prototype.onRemove = function () {
  var i;
  if (this.labelDiv_.parentNode) {
    this.labelDiv_.parentNode.removeChild(this.labelDiv_);
  }
  if (this.eventDiv_.parentNode) {
    this.eventDiv_.parentNode.removeChild(this.eventDiv_);
  }
  // Remove event listeners:
  this.removeMouseListeners();

  if (this.listeners2_) {
    for (i = 0; i < this.listeners2_.length; i++) {
      google.maps.event.removeListener(this.listeners2_[i]);
    }
  }
};

/**
 * Draws the label on the map.
 * @private
 */
OverlayViewExtended.prototype.draw = function () {
  this.setContent();
  this.setTitle();
  this.setStyles();
};

/**
 * Sets the content of the label.
 * The content can be plain text or an HTML DOM node.
 * @private
 */
OverlayViewExtended.prototype.setContent = function () {
  var content = this.marker_.get("labelContent");
  if (typeof content.nodeType === "undefined") {
    this.labelDiv_.innerHTML = content;
    this.eventDiv_.innerHTML = this.labelDiv_.innerHTML;
  } else {
    if (!this.labelDiv_.hasChildNodes() || typeof this.labelDiv_.firstChild.nodeType === "undefined") {
      this.labelDiv_.innerHTML = ""; // Remove current content
      this.labelDiv_.appendChild(content);
    }
    content = content.cloneNode(true);
    this.eventDiv_.innerHTML = ""; // Remove current content
    this.eventDiv_.appendChild(content);
  }
};

/**
 * Sets the content of the tool tip for the label. It is
 * always set to be the same as for the marker itself.
 * @private
 */
OverlayViewExtended.prototype.setTitle = function () {
  this.eventDiv_.title = this.marker_.getTitle() || "";
};

/**
 * Sets the style of the label by setting the style sheet and applying
 * other specific styles requested.
 * @private
 */
OverlayViewExtended.prototype.setStyles = function () {
  var i, labelStyle;

  // Apply style values from the style sheet defined in the labelClass parameter:
  this.labelDiv_.className = this.marker_.get("labelClass");
  this.eventDiv_.className = this.labelDiv_.className;

  // Clear existing inline style values:
  this.labelDiv_.style.cssText = "";
  this.eventDiv_.style.cssText = "";
  // Apply style values defined in the labelStyle parameter:
  labelStyle = this.marker_.get("labelStyle");
  for (i in labelStyle) {
    if (labelStyle.hasOwnProperty(i)) {
      this.labelDiv_.style[i] = labelStyle[i];
      this.eventDiv_.style[i] = labelStyle[i];
    }
  }
  this.setMandatoryStyles();
};

/**
 * Sets the mandatory styles to the DIV representing the label as well as to the
 * associated event DIV. This includes setting the DIV position, z-index, and visibility.
 * @private
 */
OverlayViewExtended.prototype.setMandatoryStyles = function () {
  this.labelDiv_.style.position = "absolute";
  this.labelDiv_.style.overflow = "hidden";
  // Make sure the opacity setting causes the desired effect on MSIE:
  if (typeof this.labelDiv_.style.opacity !== "undefined" && this.labelDiv_.style.opacity !== "") {
    this.labelDiv_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(opacity=" + (this.labelDiv_.style.opacity * 100) + ")\"";
    this.labelDiv_.style.filter = "alpha(opacity=" + (this.labelDiv_.style.opacity * 100) + ")";
  }

  this.eventDiv_.style.position = this.labelDiv_.style.position;
  this.eventDiv_.style.overflow = this.labelDiv_.style.overflow;
  this.eventDiv_.style.cursor = "pointer"; // Required to make this clickable on iOS
  this.eventDiv_.style.opacity = 0.01; // Don't use 0; DIV won't be clickable on MSIE
  this.eventDiv_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(opacity=1)\"";
  this.eventDiv_.style.filter = "alpha(opacity=1)"; // For MSIE

  this.setAnchor();
  this.setPosition();
  this.setZIndex();
  this.setVisible();
};

/**
 * Sets the anchor point of the label.
 * @private
 */
OverlayViewExtended.prototype.setAnchor = function () {
  var anchor = this.marker_.get("labelAnchor");
  this.labelDiv_.style.marginLeft = -anchor.x + "px";
  this.labelDiv_.style.marginTop = -anchor.y + "px";
  this.eventDiv_.style.marginLeft = -anchor.x + "px";
  this.eventDiv_.style.marginTop = -anchor.y + "px";
};

/**
 * Sets the position of the label. The z-index is also updated, if necessary.
 * @private
 */
OverlayViewExtended.prototype.setPosition = function () {
  var projection = this.getProjection();
  if (projection) {
    var position = projection.fromLatLngToDivPixel(this.marker_.getPosition());
    this.labelDiv_.style.left = Math.round(position.x) + "px";
    this.labelDiv_.style.top = Math.round(position.y) + "px";
    this.eventDiv_.style.left = this.labelDiv_.style.left;
    this.eventDiv_.style.top = this.labelDiv_.style.top;
  }
};

/**
 * Sets the z-index of the label. If the marker's z-index property has not been defined, the z-index
 * of the label is set to the vertical coordinate of the label. This is in keeping with the default
 * stacking order for Google Maps: markers to the south are in front of markers to the north.
 * @private
 */
OverlayViewExtended.prototype.setZIndex = function () {
  var zAdjust = (this.marker_.get("labelInBackground") ? -1 : +1);
  if (typeof this.marker_.getZIndex() === "undefined") {
    this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + zAdjust;
    this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
  } else {
    this.labelDiv_.style.zIndex = this.marker_.getZIndex() + zAdjust;
    this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
  }
};

/**
 * Sets the clickability of the label. The label is clickable only if the
 * marker itself is clickable (i.e., its clickable property is true) or if
 * it is draggable (i.e., its draggable property is true).
 * @private
 */
OverlayViewExtended.prototype.setClickable = function () {
  this.removeMouseListeners();
  this.eventDiv_.style.cursor = null;
  if (this.marker_.getClickable() || this.marker_.getDraggable()) {
    this.addMouseListeners();
  }
};

/**
 * Sets the cursor for the label.
 * @private
 */
OverlayViewExtended.prototype.setCursor = function () {
  this.eventDiv_.style.cursor = this.marker_.getCursor();
};

/**
 * Sets the visibility of the label. The label is visible only if the marker itself is
 * visible (i.e., its visible property is true) and the labelVisible property is true.
 * @private
 */
OverlayViewExtended.prototype.setVisible = function () {
  if (this.marker_.get("labelVisible")) {
    this.labelDiv_.style.display = this.marker_.getVisible() ? "block" : "none";
  } else {
    this.labelDiv_.style.display = "none";
  }
  this.eventDiv_.style.display = this.labelDiv_.style.display;
};
}

var init = false;
function createOverlayViewExtended(marker: MarkerExtended, crossURL: string) {
  if (!init && typeof google !== 'undefined') {
    inherits(OverlayViewExtended, google.maps.OverlayView);
    extendedOverlayView();
    init = true;
  }
  return new OverlayViewExtended(marker, crossURL);
}
export { createOverlayViewExtended }
