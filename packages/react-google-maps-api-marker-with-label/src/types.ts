/* globals google */
export type OverlayViewExtended = google.maps.OverlayView & {
  marker_: google.maps.Marker,
  labelDiv_: HTMLDivElement,
  eventDiv_: HTMLDivElement,
  crossDiv_: HTMLDivElement | null,
  crossURL_: string,
}

export type MarkerExtended = google.maps.Marker & {
  label: OverlayViewExtended
}

export interface MapEvent {
  latLng: google.maps.LatLng | null | undefined
}

export type MarkerWithLabelOptions = google.maps.ReadonlyMarkerOptions & {
  labelAnchor?: google.maps.Point,
  labelClass?: string,
  labelStyle?: ElementCSSInlineStyle,
  labelInBackground?: boolean,
  labelVisible?: boolean,
  crossOnDrag?: boolean,
  clickable?: boolean,
  draggable?: boolean,
  optimized?: boolean,
  crossImage?: string
}
