import React from "react"

import { createPortal } from "react-dom"

import { Marker, MarkerProps } from '@react-google-maps/api'

import {
  createMarkerExtended
} from "./MarkerExtended"

export interface MarkerWithLabelProps extends MarkerProps {
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
export class MarkerWithLabel extends Marker<MarkerWithLabelProps> {
  containerElement: HTMLElement | null = null

  createMapMarker = (markerOptions: google.maps.ReadonlyMarkerOptions) => {
    const mo = {
      ...markerOptions,
      labelAnchor: this.props.labelAnchor,
      labelClass: this.props.labelClass,
      labelStyle: this.props.labelStyle,
      labelInBackground: this.props.labelInBackground,
      labelVisible: this.props.labelVisible,
      crossOnDrag: this.props.crossOnDrag,
      clickable: this.props.clickable,
      draggable: this.props.draggable,
      optimized: this.props.optimized,
      crossImage: this.props.crossImage,
      labelContent: this.containerElement
    }

    return createMarkerExtended(mo);
  }

  render() {
    if (this.containerElement === null) {
      this.containerElement = document.createElement("div");
    }
    return this.containerElement !== null ? (
      createPortal(React.Children.only(this.props.children), this.containerElement)
    ) : (
      <></>
    )
  }
}

export default MarkerWithLabel
