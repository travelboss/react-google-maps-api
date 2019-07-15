// eslint-disable-next-line filenames/match-exported
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleMarkerWithLabel } from '../actions/app'

const id = 'markerWithLabel'

const CheckboxMarkerWithLabel = ({ onChange, value }) => (
  <div className='custom-control custom-checkbox'>
    <input
      id={id}
      className='custom-control-input'
      type='checkbox'
      onChange={onChange}
      value={value}
    />

    <label
      className='custom-control-label'
      htmlFor={id}
    >
      Marker With Label
    </label>
  </div>
)

CheckboxMarkerWithLabel.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  value: state.getIn(['app', 'markerWithLabel'])
})

const mapDispatchToProps = dispatch => ({
  onChange: ({ target: { checked } }) => {
    dispatch(
      toggleMarkerWithLabel({
        markerWithLabel: checked
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxMarkerWithLabel)
