import { createAction } from 'redux-actions'

import {
  CHANGE_LANGUAGE,
  LOAD_SCRIPT_TOGGLE,
  SET_GOOGLE_MAPS_API_KEY,
  FUSION_TOGGLE,
  DATA_TOGGLE,
  DIRECTIONS_TOGGLE,
  HEATMAP_TOGGLE,
  TRAFFIC_TOGGLE,
  SHAPES_TOGGLE,
  DRAWING_TOGGLE,
  BICYCLING_TOGGLE,
  GROUND_TOGGLE,
  OPTIONS_TOGGLE,
  OVERLAY_VIEW_TOGGLE,
  STANDALONE_SEARCHBOX_TOGGLE,
  MARKER_CLUSTERER_TOGGLE,
  MARKER_WITH_LABEL_TOGGLE,
  MARKER_WITH_LABEL_AND_CLUSTERER_TOGGLE
} from '../action-types'

export const changeLanguage = createAction(CHANGE_LANGUAGE)
export const toggleLoadScript = createAction(LOAD_SCRIPT_TOGGLE)
export const setGoogleMapsKey = createAction(SET_GOOGLE_MAPS_API_KEY)
export const toggleFusion = createAction(FUSION_TOGGLE)
export const toggleData = createAction(DATA_TOGGLE)
export const toggleDirections = createAction(DIRECTIONS_TOGGLE)
export const toggleHeatmap = createAction(HEATMAP_TOGGLE)
export const toggleTraffic = createAction(TRAFFIC_TOGGLE)
export const toggleShapes = createAction(SHAPES_TOGGLE)
export const toggleDrawing = createAction(DRAWING_TOGGLE)
export const toggleBicycling = createAction(BICYCLING_TOGGLE)
export const toggleGround = createAction(GROUND_TOGGLE)
export const toggleOptions = createAction(OPTIONS_TOGGLE)
export const toggleOverlayView = createAction(OVERLAY_VIEW_TOGGLE)
export const toggleStandaloneSearchbox = createAction(STANDALONE_SEARCHBOX_TOGGLE)
export const toggleMarkerClusterer = createAction(MARKER_CLUSTERER_TOGGLE)
export const toggleMarkerWithLabel = createAction(MARKER_WITH_LABEL_TOGGLE)
export const toggleMarkerWithLabelAndClusterer = createAction(MARKER_WITH_LABEL_AND_CLUSTERER_TOGGLE)
