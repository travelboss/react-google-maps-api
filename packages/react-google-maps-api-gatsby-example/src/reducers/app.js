import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

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
  TRANSIT_TOGGLE,
  GROUND_TOGGLE,
  OPTIONS_TOGGLE,
  OVERLAY_VIEW_TOGGLE,
  STANDALONE_SEARCHBOX_TOGGLE,
  MARKER_CLUSTERER_TOGGLE,
  MARKER_WITH_LABEL_TOGGLE,
  MARKER_WITH_LABEL_AND_CLUSTERER_TOGGLE
} from '../action-types'

const initialState = fromJS({
  language: 'en',
  loadScriptChecked: false,
  googleMapsApiKey: '',
  fusion: false,
  data: false,
  directions: false,
  heatmap: false,
  traffic: false,
  shapes: false,
  drawing: false,
  bicycling: false,
  transit: false,
  ground: false,
  options: false,
  overlayView: false,
  standaloneSearchbox: false,
  markerClusterer: false,
  markerWithLabel: false,
  markerWithLabelAndClusterer: false
})

export default handleActions(
  {
    [CHANGE_LANGUAGE]: (state, { payload: { language } }) =>
      state.merge({
        language,
      }),
    [LOAD_SCRIPT_TOGGLE]: state =>
      state.merge({
        loadScriptChecked: !state.get('loadScriptChecked'),
      }),
    [SET_GOOGLE_MAPS_API_KEY]: (state, { payload: { googleMapsApiKey } }) =>
      state.merge({
        googleMapsApiKey,
      }),
    [FUSION_TOGGLE]: (state, { payload: { fusion } }) =>
      state.merge({
        fusion,
      }),
    [DATA_TOGGLE]: (state, { payload: { data } }) =>
      state.merge({
        data,
      }),
    [DIRECTIONS_TOGGLE]: (state, { payload: { directions } }) =>
      state.merge({
        directions,
      }),
    [HEATMAP_TOGGLE]: (state, { payload: { heatmap } }) =>
      state.merge({
        heatmap,
      }),
    [TRAFFIC_TOGGLE]: (state, { payload: { traffic } }) =>
      state.merge({
        traffic,
      }),
    [SHAPES_TOGGLE]: (state, { payload: { shapes } }) =>
      state.merge({
        shapes,
      }),
    [DRAWING_TOGGLE]: (state, { payload: { drawing } }) =>
      state.merge({
        drawing,
      }),
    [BICYCLING_TOGGLE]: (state, { payload: { bicycling } }) =>
      state.merge({
        bicycling,
      }),
    [TRANSIT_TOGGLE]: (state, { payload: { transit } }) =>
      state.merge({
        transit,
      }),
    [GROUND_TOGGLE]: (state, { payload: { ground } }) =>
      state.merge({
        ground,
      }),
    [OPTIONS_TOGGLE]: (state, { payload: { options } }) =>
      state.merge({
        options,
      }),
    [OVERLAY_VIEW_TOGGLE]: (state, { payload: { overlayView } }) =>
      state.merge({
        overlayView,
      }),
    [STANDALONE_SEARCHBOX_TOGGLE]: (
      state,
      { payload: { standaloneSearchbox } }
    ) =>
      state.merge({
        standaloneSearchbox,
      }),
  [MARKER_CLUSTERER_TOGGLE]: (state, { payload: { markerClusterer } }) =>
    state.merge({
      markerClusterer
    }),
  [MARKER_WITH_LABEL_TOGGLE]: (state, { payload: { markerWithLabel } }) =>
    state.merge({
      markerWithLabel
    }),
  [MARKER_WITH_LABEL_AND_CLUSTERER_TOGGLE]: (state, { payload: { markerWithLabelAndClusterer } }) =>
    state.merge({
      markerWithLabelAndClusterer
    })
  },
  initialState
)
