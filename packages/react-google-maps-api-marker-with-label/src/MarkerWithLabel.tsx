import React from "react"

import { createPortal } from "react-dom"

import { Marker, MarkerProps } from '@react-google-maps/api'

import { applyUpdaterToNextProps } from './helper';
import {
  createMarkerExtended
} from "./MarkerExtended"

const updaterMap = {
  labelAnchor(instance: google.maps.Marker, labelAnchor: google.maps.Point) {
    instance.set("labelAnchor", labelAnchor);
  },
  labelClass(instance: google.maps.Marker, labelClass: string) {
    instance.set("labelClass", labelClass);
  },
  labelStyle(instance: google.maps.Marker, labelStyle: ElementCSSInlineStyle) {
    instance.set("labelStyle", labelStyle);
  },
  labelInBackground(instance: google.maps.Marker, labelInBackground: boolean) {
    instance.set("labelInBackground", labelInBackground);
  },
  labelVisible(instance: google.maps.Marker, labelVisible: boolean) {
    instance.set("labelVisible", labelVisible);
  },
  crossOnDrag(instance: google.maps.Marker, crossOnDrag: boolean) {
    instance.set("crossOnDrag", crossOnDrag);
  },
  crossImage(instance: google.maps.Marker, crossImage: string) {
    instance.set("crossImage", crossImage);
  },
}
export interface MarkerWithLabelProps extends MarkerProps {
  labelAnchor?: google.maps.Point,
  labelClass?: string,
  labelStyle?: ElementCSSInlineStyle,
  labelInBackground?: boolean,
  labelVisible?: boolean,
  crossOnDrag?: boolean,
  optimized?: boolean,
  crossImage?: string
}
export class MarkerWithLabel extends Marker<MarkerWithLabelProps> {
  containerElement: HTMLElement | null = null

  createMapMarker = (markerOptions: google.maps.ReadonlyMarkerOptions) => {
    const mo = {
      ...markerOptions,
      labelAnchor: this.props.labelAnchor || new google.maps.Point(0, 0),
      labelClass: this.props.labelClass || "markerLabels",
      labelStyle: this.props.labelStyle || {} as ElementCSSInlineStyle,
      labelInBackground: this.props.labelInBackground || false,
      labelVisible: this.props.labelVisible === undefined ? true : this.props.labelVisible,
      crossOnDrag: this.props.crossOnDrag === undefined ? true : this.props.crossOnDrag,
      clickable: this.props.clickable === undefined ? true : this.props.clickable,
      draggable: this.props.draggable || false,
      optimized: false,
      crossImage: this.props.crossImage || "//maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png",
      labelContent: this.containerElement
    }

    return createMarkerExtended(mo);
  }

  componentDidUpdate(prevProps: MarkerProps) {
    super.componentDidUpdate(prevProps);

    if (this.state.marker !== null) {
      applyUpdaterToNextProps(
        updaterMap,
        prevProps,
        this.props,
        this.state.marker
      )

      // @ts-ignore
      this.state.marker.label.draw();
    }
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
