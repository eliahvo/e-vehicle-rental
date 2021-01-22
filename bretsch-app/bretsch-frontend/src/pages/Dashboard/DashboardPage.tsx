import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useSnackbar } from 'notistack';
import { Vehicle, vehicle_status } from '../../util/EntityInterfaces';
import { Layout } from '../../components/Layout';
import { AppContext } from '../../contexts/AppContext';
import React, { useState } from 'react';
import { Backdrop, CircularProgress, makeStyles, useTheme } from '@material-ui/core';
import { useMapStyle } from './util/mapStyle';
import { VehicleInfoContext } from '../../contexts/VehicleInfoContext';
import VehicleInfoFormDialog from '../../components/VehicleInfoForBooking';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 0,
    color: theme.palette.primary.main,
  },
}));

const center = {
  lat: 49.871575,
  lng: 8.651596,
};

export const setVehicleStatus = async function (vId: any, status: vehicle_status) {
  await fetch('/api/vehicle/' + vId, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: status,
    }),
  });
};

export const DashboardPage = () => {
  const theme = useTheme();
  const classes = useStyles();
  const mapStyle = useMapStyle();
  const { enqueueSnackbar } = useSnackbar();
  const { vehicles } = React.useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [openVehicleInfo, setOpenVehicleInfo] = React.useState(false);
  const [currenVehicleIdForInfo, setCurrenVehicleIdForInfo] = React.useState(-1);

  const toggleOpen = () => {
    setOpenVehicleInfo(!openVehicleInfo);
  };

  const vehicleInfoContext = {
    toggleOpen: toggleOpen,
    open: openVehicleInfo,
    vehicleId: currenVehicleIdForInfo,
  };

  return (
    <Layout title="Dashboard">
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <LoadScript
        googleMapsApiKey="AIzaSyATr3q52hdyJ7sbnPIw69sp4k8rGGehO2Y"
        language="en"
        region="en"
        onLoad={() => setLoading(true)}
      >
        <VehicleInfoContext.Provider value={vehicleInfoContext}>
          <GoogleMap
            onLoad={() => setLoading(true)}
            onTilesLoaded={() => setLoading(false)}
            mapContainerStyle={{
              height: '100%',
              width: '100%',
            }}
            center={center}
            zoom={15}
            mapTypeId="roadmap"
            options={{
              backgroundColor: theme.palette.background,
              disableDefaultUI: true,
              maxZoom: 20,
              minZoom: 13,
              restriction: {
                latLngBounds: {
                  east: 8.960182,
                  north: 49.984304,
                  south: 49.758828,
                  west: 8.291636,
                },
                strictBounds: true,
              },
              styles: mapStyle,
            }}
          >

            <MarkerClusterer
              averageCenter={true}
              options={{
                imagePath: './icons/clusterer/m',
              }}
            >

              {(clusterer) =>
                vehicles.map((vehicle: Vehicle) => {
                  if(vehicle.status === "Free"){
                  return (

                    <Marker
                      key={vehicle.vehicleId}
                      position={{
                        lat: parseFloat(vehicle.positionLatitude),
                        lng: parseFloat(vehicle.positionLongitude),
                      }}
                      onClick={(_) => {
                        setOpenVehicleInfo(true);
                        setCurrenVehicleIdForInfo(vehicle.vehicleId);
                        setVehicleStatus(vehicle.vehicleId, vehicle_status.Reserved);
                      }}
                      icon={`./icons/marker/${vehicle.vehicleType.type}.png`}
                      clusterer={clusterer}
                    />

                  )
                    }
                })
              }

            </MarkerClusterer>

          </GoogleMap>
          <VehicleInfoFormDialog />
        </VehicleInfoContext.Provider>
      </LoadScript>

    </Layout>

  );
};
