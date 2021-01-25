// tslint:disable: no-submodule-imports
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { Vehicle, vehicle_status } from '../../util/EntityInterfaces';
import { Layout } from '../../components/Layout';
import { AppContext } from '../../contexts/AppContext';
import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  makeStyles,
  Menu,
  MenuItem,
  useTheme,
} from '@material-ui/core';
import { useMapStyle } from './util/mapStyle';
import { VehicleInfoContext } from '../../contexts/VehicleInfoContext';
import VehicleInfoFormDialog from '../../components/VehicleInfoForBooking';
import { setVehicleStatus } from '../../util/RequestHelper';
import FilterListIcon from '@material-ui/icons/FilterList';
import useLocalStorage from '../../util/LocalStorageHook';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    zIndex: 999,
  },
  filterButton: {
    position: 'absolute',
    right: '0.75rem',
    top: '5rem',
    zIndex: 100,
  },
}));

const center = {
  lat: 49.871575,
  lng: 8.651596,
};

export const DashboardPage = () => {
  const theme = useTheme();
  const classes = useStyles();
  const mapStyle = useMapStyle();
  const { vehicles } = React.useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [openVehicleInfo, setOpenVehicleInfo] = React.useState(false);
  const [currenVehicleIdForInfo, setCurrenVehicleIdForInfo] = React.useState(-1);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [vehicleTypes, setVehicleTypes] = useLocalStorage<{ name: string; isChecked: boolean }[]>(
    'Dashboard.vehicleTypes',
    [],
  );
  const [displayVehicles, setDisplayVehicles] = useState(vehicles);
  const { reloadAll } = React.useContext(AppContext);

  useEffect(() => {
    reloadAll();
  }, []);

  useEffect(() => {
    updateAvailableVehicleTypes();
  }, [vehicles]);

  useEffect(() => {
    updateFilter();
  }, [vehicleTypes]);

  const toggleVehicleInfo = () => {
    setOpenVehicleInfo(!openVehicleInfo);
  };

  const vehicleInfoContext = {
    open: openVehicleInfo,
    toggleOpen: toggleVehicleInfo,
    vehicleId: currenVehicleIdForInfo,
  };
  const updateAvailableVehicleTypes = () => {
    const availableVehicles = vehicles.filter((v: Vehicle) => v.status === 'Free');
    const vehicleTypeNames = availableVehicles.map((v: Vehicle) => v.vehicleType.type);
    const uniqueVehicleTypeNames = vehicleTypeNames.filter((x, i, a) => a.indexOf(x) === i); // Filter duplicated types

    const availableVehicleTypes: { name: string; isChecked: boolean }[] = [];
    uniqueVehicleTypeNames.map((vName: string) => {
      let vChecked = true;
      vehicleTypes.map((vehicleType: { name: string; isChecked: boolean }) => {
        if (vName === vehicleType.name) {
          vChecked = vehicleType.isChecked;
        }
      });
      availableVehicleTypes.push({ name: vName, isChecked: vChecked });
    });
    setVehicleTypes(availableVehicleTypes);
  };

  const updateFilter = () => {
    const availableVehicles = vehicles.filter((v: Vehicle) => v.status === 'Free');
    const checkedVehicleTypes = vehicleTypes.filter((v: { name: string; isChecked: boolean }) => v.isChecked);
    const checkedVehicleTypeNames = checkedVehicleTypes.map((v: { name: string; isChecked: boolean }) => v.name);

    const filteredVehicles = availableVehicles.filter((v: Vehicle) =>
      checkedVehicleTypeNames.includes(v.vehicleType.type),
    );

    setDisplayVehicles(filteredVehicles);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVehicleTypesData: { name: string; isChecked: boolean }[] = [];
    vehicleTypes.map((vehicleType: { name: string; isChecked: boolean }) => {
      if (vehicleType.name === event.target.name) {
        vehicleType.isChecked = event.target.checked;
      }
      newVehicleTypesData.push(vehicleType);
    });
    setVehicleTypes(newVehicleTypesData);
    updateFilter();
  };

  return (
    <Layout title="Dashboard">
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
        className={classes.filterButton}
        variant="contained"
        color="primary"
      >
        <FilterListIcon />
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {vehicleTypes.map((vehicleType: { name: string; isChecked: boolean }) => {
          return (
            <MenuItem key={vehicleType.name} dense>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicleType.isChecked}
                    onChange={handleFilterChange}
                    name={vehicleType.name}
                    color="primary"
                  />
                }
                label={vehicleType.name}
              />
            </MenuItem>
          );
        })}
      </Menu>
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
                displayVehicles.map((vehicle: Vehicle) => {
                  if (vehicle.status === 'Free') {
                    return (
                      <Marker
                        key={vehicle.vehicleId}
                        position={{
                          lat: parseFloat(vehicle.positionLatitude),
                          lng: parseFloat(vehicle.positionLongitude),
                        }}
                        onClick={() => {
                          setOpenVehicleInfo(true);
                          setCurrenVehicleIdForInfo(vehicle.vehicleId);
                          setVehicleStatus(vehicle.vehicleId, vehicle_status.Reserved);
                        }}
                        icon={`./icons/marker/${vehicle.vehicleType.type}.png`}
                        clusterer={clusterer}
                      />
                    );
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
