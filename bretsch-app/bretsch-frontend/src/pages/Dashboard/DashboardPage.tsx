import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useSnackbar } from 'notistack';
import { User, Booking, VehicleType, Vehicle } from '../../util/entityInterfaces';

const containerStyle = {
  height: '800px',
  width: '100%',
};

const center = {
  lat: 49.871575,
  lng: 8.651596,
};

const options = {
  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // m1.png, m2.png, m3.png, m4.png, m5.png and m6.png have to be in that folder
};

export const DashboardPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchVehicle = async () => {
    const vehicleRequest = await fetch(`api/vehicle`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (vehicleRequest.status === 200) {
      const vehicleJSON = await vehicleRequest.json();
      setVehicles(vehicleJSON.data);
    } else {
      enqueueSnackbar(`Error while fetching vehicle data!`, {
        variant: 'error',
      });
    }
  };
  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <MarkerClusterer options={options}>
          {(clusterer) =>
            vehicles.map((vehicle: Vehicle) => (
              <Marker
                key={vehicle.vehicleId}
                position={{
                  lat: parseFloat(vehicle.positionLatitude),
                  lng: parseFloat(vehicle.positionLongitude),
                }}
                onClick={(_) =>
                  enqueueSnackbar(`${vehicle.vehicleType.type + vehicle.vehicleId} bretscht davon!`, {
                    variant: 'success',
                  })
                }
                icon={`./icons/${vehicle.vehicleType.type}.png`}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
};
