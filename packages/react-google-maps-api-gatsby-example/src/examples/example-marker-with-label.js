/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Marker, MarkerClusterer } from '@react-google-maps/api'
import { MarkerWithLabel } from '@react-google-maps/marker-with-label'

const ExampleMarkerWithLabelPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired
  }).isRequired
}

const center = {
  lat: -28.024,
  lng: 140.887
}

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
}

const locations = [
  { lat: -31.56391, lng: 147.154312, name: 'Marker 1' },
  { lat: -33.718234, lng: 150.363181, name: 'Marker 2' },
  { lat: -33.727111, lng: 150.371124, name: 'Marker 3' },
  { lat: -33.848588, lng: 151.209834, name: 'Marker 4' },
  { lat: -33.851702, lng: 151.216968, name: 'Marker 5' },
  { lat: -34.671264, lng: 150.863657, name: 'Marker 6' },
  { lat: -35.304724, lng: 148.662905, name: 'Marker 7' },
  { lat: -36.817685, lng: 175.699196, name: 'Marker 8' },
  { lat: -36.828611, lng: 175.790222, name: 'Marker 9' },
  { lat: -37.75, lng: 145.116667, name: 'Marker 10' },
  { lat: -37.759859, lng: 145.128708, name: 'Marker 11' },
  { lat: -37.765015, lng: 145.133858, name: 'Marker 12' },
  { lat: -37.770104, lng: 145.143299, name: 'Marker 13' },
  { lat: -37.7737, lng: 145.145187, name: 'Marker 14' },
  { lat: -37.774785, lng: 145.137978, name: 'Marker 15' },
  { lat: -37.819616, lng: 144.968119, name: 'Marker 16' },
  { lat: -38.330766, lng: 144.695692, name: 'Marker 17' },
  { lat: -39.927193, lng: 175.053218, name: 'Marker 18' },
  { lat: -41.330162, lng: 174.865694, name: 'Marker 19' },
  { lat: -42.734358, lng: 147.439506, name: 'Marker 20' },
  { lat: -42.734358, lng: 147.501315, name: 'Marker 21' },
  { lat: -42.735258, lng: 147.438, name: 'Marker 22' },
  { lat: -43.999792, lng: 170.463352, name: 'Marker 23' }
]

const onClick = (...args) => {
  console.log('onClick args: ', args)
}

const markerIconUrl = 'https://maps.gstatic.com/mapfiles/transparent.png'

const ExampleMarkerWithLabel = ({ styles }) => {
  const labelAnchor = new google.maps.Point(50, 25)
  return (
    <div className="map">
      <div className="map-container">
        <GoogleMap
          id="marker-clusterer-example"
          mapContainerStyle={styles.container}
          zoom={3}
          center={center}
          onClick={onClick}
        >
          {locations.map(location => {
            const key = location.lat.toString() + location.lng.toString()
            return (
              <MarkerWithLabel
                key={key}
                position={location}
                icon={markerIconUrl}
                labelInBackground={false}
                onClick={onClick}
                labelAnchor={labelAnchor}
              >
                <div
                  style={{
                    backgroundColor: 'white',
                    color: 'red',
                    width: '100px',
                    height: '25px',
                    textAlign: 'center',
                    border: '1px solid red',
                    borderRadius: '4px'
                  }}
                >
                  {location.name}
                </div>
              </MarkerWithLabel>
            )
          })}
        </GoogleMap>
      </div>
    </div>
  )
}

ExampleMarkerWithLabel.propTypes = ExampleMarkerWithLabelPropTypes

export default ExampleMarkerWithLabel
