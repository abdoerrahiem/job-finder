import { useEffect, useState } from 'react'
import RNLocation from 'react-native-location'

const getLocation = () => {
  const [location, setLocation] = useState()

  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 5.0,
    })

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'We need to access your location',
          message: 'We use your location to show where you are on the map',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    }).then((granted) => {
      if (granted) {
        RNLocation.subscribeToLocationUpdates((locations) => {
          console.log(locations)
          fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${locations.longitude},${locations.latitude}.json?types=poi&limit=1&access_token=pk.eyJ1IjoiYWJkb2VycmFoaWVtIiwiYSI6ImNrNWgxeHBqdjBlNGQzbW53cmc0emhoOHUifQ.kacSGFUFh6X9UXmzGlGqVQ`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data.features)
            })
            .catch((err) => console.log(err))
        })
      }
    })
  }, [])

  return location
}

export default getLocation
