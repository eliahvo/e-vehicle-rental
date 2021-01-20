import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useSnackbar } from 'notistack';
import { Vehicle } from '../../util/EntityInterfaces';
import { Layout } from '../../components/Layout';
import { AppContext } from '../../contexts/AppContext';
import React from 'react';

const center = {
  lat: 49.871575,
  lng: 8.651596,
};

export const DashboardPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { vehicles } = React.useContext(AppContext);

  return (
    <Layout title="Dashboard">
      <LoadScript googleMapsApiKey="" language="en" region="en">
        <GoogleMap
          mapContainerStyle={{
            height: '100%',
            width: '100%',
          }}
          center={center}
          zoom={15}
          mapTypeId="roadmap"
          options={{
            maxZoom: 20,
            minZoom: 13,
            restriction: {
              strictBounds: true,
              latLngBounds: {
                north: 49.984304,
                south: 49.758828,
                east: 8.960182,
                west: 8.291636,
              },
            },
          }}
        >
          <MarkerClusterer
            averageCenter={true}
            options={{
              imagePath: './icons/clusterer/m',
            }}
          >
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
                  icon={`./icons/marker/${vehicle.vehicleType.type}.png`}
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
