import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useSnackbar } from 'notistack';

const containerStyle = {
  width: '100%',
  height: '800px'
};

const center = {
  lat: 49.871575,
  lng: 8.651596
};

export interface Vehicle {
  positionLatitude: number;
  positionLongitude: number;
  vehicleType: string;
}

export const DashboardPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [vehicles, setVehicles] = useState<Vehicle[]>([{
    positionLatitude: 49.865158,
    positionLongitude: 8.648249,
    vehicleType: "scooter",
  }, {
    positionLatitude: 49.875158,
    positionLongitude: 8.648249,
    vehicleType: "car",
  }]);


  return (
    <LoadScript
      googleMapsApiKey=""
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        { /* Child components, such as markers, info windows, etc. */}

        {vehicles.map((vehicle: Vehicle) => {
          return (
            <Marker
              position={{
                lat: vehicle.positionLatitude,
                lng: vehicle.positionLongitude,
              }}
              onClick={_ => 
                enqueueSnackbar(`${vehicle.vehicleType} bretscht davon!`, { variant: 'success' })}
              icon={`./icons/${vehicle.vehicleType}.png`}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  )
}