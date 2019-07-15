// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExampleMarkerClusterer from '../examples/example-marker-clusterer'

import { shapeExampleStyles } from './styles'

const SectionMarkerClusterer = ({ markerClusterer }) =>
  markerClusterer
    ? (
      <ExampleMarkerClusterer
        styles={shapeExampleStyles}
      />
    )
    : (<></>)

SectionMarkerClusterer.propTypes = {
  markerClusterer: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  language: state.getIn(['app', 'language']),
  loadScriptChecked: state.getIn(['app', 'loadScriptChecked']),
  googleMapsApiKey: state.getIn(['app', 'googleMapsApiKey']),
  heatmap: state.getIn(['app', 'heatmap']),
  traffic: state.getIn(['app', 'traffic']),
  shapes: state.getIn(['app', 'shapes']),
  drawing: state.getIn(['app', 'drawing']),
  bicycling: state.getIn(['app', 'bicycling']),
  ground: state.getIn(['app', 'ground']),
  markerClusterer: state.getIn(['app', 'markerClusterer'])
})

export default connect(
  mapStateToProps
)(SectionMarkerClusterer)
