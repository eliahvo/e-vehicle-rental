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
import FilterListIcon from '@material-ui/icons/FilterList';
import useLocalStorage from '../../util/LocalStorageHook';
import { SocketclientContext } from '../../contexts/SocketclientContext';
import { CheckDialog } from '../../components/CheckDialog';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';

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
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { vehicles } = React.useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [openVehicleInfo, setOpenVehicleInfo] = React.useState(false);
  const [currentVehicleIdForInfo, setCurrenVehicleIdForInfo] = React.useState(-1);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [vehicleTypes, setVehicleTypes] = useLocalStorage<{ name: string; isChecked: boolean }[]>(
    'Dashboard.vehicleTypes',
    [],
  );
  const [displayVehicles, setDisplayVehicles] = useState(vehicles);
  const { reloadAll, reloadVehicles } = React.useContext(AppContext);
  const [socketclient, setSocketclient] = React.useContext(SocketclientContext);
  const [vehicleBlacklist, setVehicleBlacklist] = React.useState<number[]>([]);

  useEffect(() => {
    reloadAll();
  }, []);

  useEffect(() => {
    if (socketclient) {
      socketclient.on('booking', async (arg: any) => {
        setVehicleBlacklist((blacklist) => [...blacklist, arg.vehicleId]);
        if (
          history.location.pathname.toLowerCase().includes('dashboard') &&
          arg.vehicleId === currentVehicleIdForInfo
        ) {
          setOpenVehicleInfo(false);
          enqueueSnackbar(`This vehicle is no longer available!`, {
            variant: 'error',
          });
        }
      });
    }
  }, [socketclient]);

  useEffect(() => {
    updateAvailableVehicleTypes();
  }, [vehicles]);

  useEffect(() => {
    if (socketclient) {
      socketclient.on('stopBooking', async (arg: any) => {
        await reloadVehicles();
        const index = vehicleBlacklist.indexOf(arg.vehicleId);
        setVehicleBlacklist((blacklist) => blacklist.filter((_, i) => i !== index));
      });
    }
  }, [socketclient, vehicleBlacklist]);

  useEffect(() => {
    updateFilter();
  }, [vehicleTypes]);

  const toggleVehicleInfo = () => {
    setOpenVehicleInfo(!openVehicleInfo);
  };

  const vehicleInfoContext = {
    open: openVehicleInfo,
    toggleOpen: toggleVehicleInfo,
    vehicleId: currentVehicleIdForInfo,
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
      <CheckDialog text="Transaction successfully completed!" />
      {vehicleTypes.length ? (
        <>
          <Button
            data-testid="dashboard-filterButton1"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
            className={classes.filterButton}
            variant="contained"
            color="primary"
          >
            <FilterListIcon />
          </Button>

          <Menu
            data-testid="dashboard-filterButtonOption2"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
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
        </>
      ) : (
        ''
      )}
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
        language="en"
        region="en"
        onLoad={() => setLoading(true)}
      >
        <VehicleInfoContext.Provider value={vehicleInfoContext}>
          <GoogleMap
            data-testid="dashboard-map1"
            onLoad={() => setLoading(true)}
            onTilesLoaded={() => setLoading(false)}
            mapContainerStyle={{
              height: '100%',
              width: '100%',
            }}
            center={center}
            zoom={14}
            mapTypeId="roadmap"
            options={{
              backgroundColor: theme.palette.background,
              disableDefaultUI: true,
              restriction: {
                latLngBounds: {
                  south: 47.2701114,
                  west: 5.8663153,
                  north: 55.099161,
                  east: 15.0419319,
                },
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
                  if (vehicle.status === 'Free' && vehicleBlacklist.indexOf(vehicle.vehicleId)) {
                    return (
                      <Marker
                        data-testid="dashboard-pointer1"
                        key={vehicle.vehicleId}
                        position={{
                          lat: parseFloat(vehicle.positionLatitude),
                          lng: parseFloat(vehicle.positionLongitude),
                        }}
                        onClick={() => {
                          setOpenVehicleInfo(true);
                          setCurrenVehicleIdForInfo(vehicle.vehicleId);
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
