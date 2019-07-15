import {
  inherits
} from "./helper";

import {
  createOverlayViewExtended
} from "./OverlayViewExtended";

import {
  MarkerExtended,
  MarkerWithLabelOptions
} from "./types";

/**
 * @name MarkerWithLabelOptions
 * @class This class represents the optional parameter passed to the {@link MarkerWithLabel} constructor.
 *  The properties available are the same as for <code>google.maps.Marker</code> with the addition
 *  of the properties listed below. To change any of these additional properties after the labeled
 *  marker has been created, call <code>google.maps.Marker.set(propertyName, propertyValue)</code>.
 *  <p>
 *  When any of these properties changes, a property changed event is fired. The names of these
 *  events are derived from the name of the property and are of the form <code>propertyname_changed</code>.
 *  For example, if the content of the label changes, a <code>labelcontent_changed</code> event
 *  is fired.
 *  <p>
 * @property {string|Node} [labelContent] The content of the label (plain text or an HTML DOM node).
 * @property {Point} [labelAnchor] By default, a label is drawn with its anchor point at (0,0) so
 *  that its top left corner is positioned at the anchor point of the associated marker. Use this
 *  property to change the anchor point of the label. For example, to center a 50px-wide label
 *  beneath a marker, specify a <code>labelAnchor</code> of <code>google.maps.Point(25, 0)</code>.
 *  (Note: x-values increase to the right and y-values increase to the top.)
 * @property {string} [labelClass] The name of the CSS class defining the styles for the label.
 *  Note that style values for <code>position</code>, <code>overflow</code>, <code>top</code>,
 *  <code>left</code>, <code>zIndex</code>, <code>display</code>, <code>marginLeft</code>, and
 *  <code>marginTop</code> are ignored; these styles are for internal use only.
 * @property {Object} [labelStyle] An object literal whose properties define specific CSS
 *  style values to be applied to the label. Style values defined here override those that may
 *  be defined in the <code>labelClass</code> style sheet. If this property is changed after the
 *  label has been created, all previously set styles (except those defined in the style sheet)
 *  are removed from the label before the new style values are applied.
 *  Note that style values for <code>position</code>, <code>overflow</code>, <code>top</code>,
 *  <code>left</code>, <code>zIndex</code>, <code>display</code>, <code>marginLeft</code>, and
 *  <code>marginTop</code> are ignored; these styles are for internal use only.
 * @property {boolean} [labelInBackground] A flag indicating whether a label that overlaps its
 *  associated marker should appear in the background (i.e., in a plane below the marker).
 *  The default is <code>false</code>, which causes the label to appear in the foreground.
 * @property {boolean} [labelVisible] A flag indicating whether the label is to be visible.
 *  The default is <code>true</code>. Note that even if <code>labelVisible</code> is
 *  <code>true</code>, the label will <i>not</i> be visible unless the associated marker is also
 *  visible (i.e., unless the marker's <code>visible</code> property is <code>true</code>).
 * @property {boolean} [crossOnDrag] A flag indicating whether a cross ("X") is to be
 *  shown when the marker label is dragged. The default is <code>true</code>. The marker
 *  is placed at the position of the cross when the drag ends.
 * @property {boolean} [optimized] A flag indicating whether rendering is to be optimized
 *  for the marker. <b>Important: The optimized rendering technique is not supported by
 *  MarkerWithLabel, so the value of this parameter is always forced to <code>false</code>.
 * @property {string} [crossImage="//maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png"]
 *  The URL of the cross image to be displayed while dragging a marker.
 */
/**
 * Creates a MarkerWithLabel with the options specified in {@link MarkerWithLabelOptions}.
 * @constructor
 * @param {MarkerWithLabelOptions} [opt_options] The optional parameters.
 */
const defaultOptions = {
  labelContent: "",
  labelAnchor: null as google.maps.Point | null, // new google.maps.Point(0, 0),
  labelClass: "markerLabels",
  labelStyle: {},
  labelInBackground: false,
  labelVisible: true,
  crossOnDrag: true,
  clickable: true,
  draggable: false,
  optimized: false,
  crossImage: "//maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png",
}
const MarkerExtended = function(this: MarkerExtended, opt_options: MarkerWithLabelOptions) {
  const options = {
    ...defaultOptions,
    ...opt_options,
    optimized: false // Optimized rendering is not supported
  };

  this.label = createOverlayViewExtended(this, options.crossImage); // Bind the label to the marker

  // Call the parent constructor. It calls Marker.setValues to initialize, so all
  // the new parameters are conveniently saved and can be accessed with get/set.
  // Marker.set triggers a property changed event (called "propertyname_changed")
  // that the marker label listens for in order to react to state changes.
  google.maps.Marker.apply(this, [options]);
} as any as { new (opt_options: MarkerWithLabelOptions): MarkerExtended; };

function extendMarker() {
  /**
   * Overrides the standard Marker setMap function.
   * @param {Map} theMap The map to which the marker is to be added.
   * @private
   */
  MarkerExtended.prototype.setMap = function (theMap: google.maps.Map) {

    // Call the inherited function...
    google.maps.Marker.prototype.setMap.apply(this, [theMap]);

    // ... then deal with the label:
    this.label.setMap(theMap);
  };
}

var init = false;
function createMarkerExtended(opt_options: MarkerWithLabelOptions) {
  if (!init && typeof google !== 'undefined') {
    defaultOptions.labelAnchor = new google.maps.Point(0, 0);
    inherits(MarkerExtended, google.maps.Marker);
    extendMarker();
    init = true;
  }
  return new MarkerExtended(opt_options);
}

export { createMarkerExtended };
