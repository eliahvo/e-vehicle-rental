import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useSnackbar } from 'notistack';
import { Vehicle } from '../../util/EntityInterfaces';
import { Layout } from '../../components/Layout';
import { AppContext } from '../../contexts/AppContext';
import React from 'react';

const containerStyle = {
  height: '100%',
  width: '100%',
};

const center = {
  lat: 49.871575,
  lng: 8.651596,
};

const options = {
  // m1.png, m2.png, m3.png, m4.png, m5.png and m6.png have to be in that folder
  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
};

export const DashboardPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { vehicles } = React.useContext(AppContext);

  return (
    <Layout title="Dashboard">
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
    </Layout>
  );
};
