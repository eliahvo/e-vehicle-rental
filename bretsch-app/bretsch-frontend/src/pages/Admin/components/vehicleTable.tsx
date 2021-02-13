import { DataGrid, FilterModel, ValueFormatterParams } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import { Vehicle, VehicleType } from '../../../util/EntityInterfaces';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Snackbar,
  TextField,
} from '@material-ui/core';
// progress style by https://codepen.io/restlessdesign/pen/CJrad
export const BatteryProgressNumber = styled.span`
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  font-weight: 100;
  font-size: 3em;
  margin-top: -1.33em;
  color: black;
`;

export const CreateButton = styled.div`
  margin-bottom: 2%;
`;

export const ProgressBorder = styled.div`
  border: 2px solid black;
  background: black;
  border-radius: 60px;
  overflow: hidden;
  margin: 1%;
  height: 50%;
`;

export const BatteryProgress = styled.progress`
  width: 100%;
  background: #75b800;
`;

export const Progressbar = styled.div`
  background-color: #1a1a1a;
  height: 50%;
  width: 100%;
  margin: 50px auto;
  border-radius: 5px;
  box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;

  background-size: 30px 30px;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
`;

export const stripes = styled.div`
    background-size: 33% 33%;
    background-image: linear-gradient(
        135deg,
        rgba(255, 255, 255, .15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, .15) 50%,
        rgba(255, 255, 255, .15) 75%,
        transparent 75%,
        transparent
`;

/*
  Used,
  Free,
  Not_available,
  Reserved,
}
 */
export const vehicleStatus = [
  {
    value: 0,
    label: 'Used',
    default: 'Used',
  },
  {
    value: 1,
    label: 'Free',
    default: 'Free',
  },
  {
    value: 2,
    label: 'Not available',
    default: 'Not_available',
  },
  {
    value: 3,
    label: 'Reserved',
    default: 'Reserved',
  },
];

export const Progressbarinner = styled.span`
  display: block;
  height: 95%;

  background-color: #75b800;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset;
  position: relative;
  animation: auto-progress 10s infinite linear;
`;

export const VehicleTable = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleTypes, setVehiclesType] = useState<VehicleType[]>([]);
  const [vehicleTypesSelect, setVehiclesTypesSelect] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openDialogCreate, setDialogCreate] = React.useState(false);
  const [openDialogUpdate, setDialogUpdate] = React.useState(false);
  const [licencePlateV, setLicencePlate] = React.useState<string>('');
  const [vStatus, setVStatus] = React.useState<number>(1);

  const [errorLongitude, setLongitudeerror] = useState<string>(' ');
  const [errorLatitude, setLatitudeerror] = useState<string>(' ');
  const [bLevel, setBLevel] = useState<number>(100);
  const [longitude, setLongitude] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [choosedVType, setchoosedVType] = useState<number>(0);
  const [choosedUpdateVehicle, setchoosedUpdateVehicle] = useState<Vehicle>();
  const [errorbLevel, setErrorbLevel] = useState<string>(' ');

  // Create Dialog
  const handleCreateDialogClose = () => {
    setDialogCreate(false);
  };
  const handleCreateDialogOpen = () => {
    setDialogCreate(true);
  };

  // Update Dialog
  const handleUpdateDialogClose = () => {
    setDialogUpdate(false);
  };
  const handleUpdateDialogOpen = () => {
    setDialogUpdate(true);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVStatus(parseInt(event.target.value, 10));
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setchoosedVType(parseInt(event.target.value, 10));
  };

  const handleLPlateChange = (e) => {
    setLicencePlate(e.target.value);
  };

  // Chips
  const [chipSucCreate, setchipSucCreate] = React.useState(false);
  const [chipErrorCreate, setchipErrorCreate] = React.useState(false);

  const [chipSucUpdate, setchipSucUpdate] = React.useState(false);
  const [chipErrorUpdate, setchipErrorUpdate] = React.useState(false);

  const handleChipSucCreateClose = () => {
    setchipSucCreate(false);
  };
  const handleChipErrorCreateClose = () => {
    setchipErrorCreate(false);
  };
  const handleChipSucUpdateClose = () => {
    setchipSucUpdate(false);
  };
  const handleChipErrorUpdateClose = () => {
    setchipErrorUpdate(false);
  };

  const handleBLevelChange = (e) => {
    if (parseInt(e.target.value, 10) || e.target.value.empty) {
      const num = parseInt(e.target.value, 10);
      if (num < 100) {
        setBLevel(parseInt(e.target.value, 10));
        setErrorbLevel('');
      } else {
        setErrorbLevel('Error: Value should be smaller than 100');
      }
    } else {
      setErrorbLevel('Error: Value should be a number');
    }
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value.toString());
  };

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  useEffect(() => {
    allVehicles().then((r) => {
      allVehicleTypes();
    });
  }, []);

  useEffect(() => {
    createVehicleTypeArray();
  }, [vehicleTypes]);

  // get all vehicles
  const allVehicles = async () => {
    const vehicleRequest = await fetch(`/api/vehicle/`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (vehicleRequest.status === 200) {
      const vehicleJSON = await vehicleRequest.json();
      setVehicles(vehicleJSON.data);
    }
  };

  // get all Vehicle Types
  const allVehicleTypes = async () => {
    const vehicleTypeRequest = await fetch(`/api/vehicletype/`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (vehicleTypeRequest.status === 200) {
      const vehicleTypeJSON = await vehicleTypeRequest.json();
      await setVehiclesType(vehicleTypeJSON.data);
    }
  };

  const createVehicleTypeArray = () => {
    const newArr = [];
    for (const t of vehicleTypes) {
      newArr.push({ value: t.vehicleTypeId, label: t.type });
    }
    setVehiclesTypesSelect(newArr);
  };

  // delete vehicles
  const deleteVehicles = async (id: string) => {
    const vehicleRequest = await fetch(`/api/vehicle/` + id, {
      headers: { 'content-type': 'application/json' },
      method: 'DELETE',
    });
    if (vehicleRequest.status === 204) {
      await allVehicles();
      setOpen(true);
    }
  };

  // delete vehicles
  const createVehicleDB = async (e) => {
    e.preventDefault();
    const vehicleRequest = await fetch(`/api/vehicle/`, {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        licencePlate: licencePlateV,
        status: vStatus,
        positionLongitude: longitude,
        positionLatitude: latitude,
        batteryLevel: bLevel,
        vehicleType: choosedVType,
      }),
    });
    if (vehicleRequest.status === 201) {
      await allVehicles();
      handleCreateDialogClose();
    }
  };

  // delete vehicles
  const updateVehicleDB = async (e) => {
    e.preventDefault();
    if (choosedUpdateVehicle) {
      const vehicleRequest = await fetch(`/api/vehicle/` + choosedUpdateVehicle.vehicleId, {
        headers: { 'content-type': 'application/json' },
        method: 'PATCH',
        body: JSON.stringify({
          licencePlate: licencePlateV,
          status: vStatus,
          positionLongitude: longitude,
          positionLatitude: latitude,
          batteryLevel: bLevel,
          vehicleType: choosedVType,
        }),
      });
      if (vehicleRequest.status === 200) {
        await allVehicles();
        handleUpdateDialogClose();
      }
    }
  };

  const fillInput = async (v: Vehicle) => {
    setLicencePlate(v.licencePlate);
    const choosedStatus = vehicleStatus.filter((s) => v.status === s.default);
    if (choosedStatus.length === 1) {
      setVStatus(choosedStatus[0].value);
    }
    setLongitude(v.positionLongitude);
    setLatitude(v.positionLatitude);
    setBLevel(v.batteryLevel);
    setchoosedVType(v.vehicleType.vehicleTypeId);
  };

  const updateChoosedVehicle = async (lp: string) => {
    const choosedVehicle = vehicles.filter((v) => v.licencePlate === lp);
    if (choosedVehicle.length === 1) {
      await fillInput(choosedVehicle[0]);
      await setchoosedUpdateVehicle(choosedVehicle[0]);
      handleUpdateDialogOpen();
    }
  };

  const VehicleManageDialog = (mOpen: boolean, hClose: any, actiontype: string, finishFunc: any) => {
    return (
      <Dialog onClose={hClose} aria-labelledby="simple-dialog-title" open={mOpen}>
        <form onSubmit={finishFunc}>
          <DialogTitle defaultValue={licencePlateV} id="simple-dialog-title">
            {' '}
            {actiontype} Vehicle{' '}
          </DialogTitle>
          <DialogContent dividers>
            <p> Licence Plate: </p>
            <FormControl required>
              <TextField
                onChange={handleLPlateChange}
                value={licencePlateV}
                id="outlined-required"
                variant="outlined"
              />
            </FormControl>
            <p> Battery Level: </p>
            <FormControl required>
              <OutlinedInput
                id="filled-adornment-weight"
                defaultValue={bLevel}
                onChange={handleBLevelChange}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
            <FormHelperText id="component-helper-text">{errorbLevel}</FormHelperText>
            <p> Status: </p>
            <FormControl required>
              <TextField
                id="outlined-select-currency"
                select
                value={vStatus}
                onChange={handleStatusChange}
                variant="outlined"
              >
                {vehicleStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <p> According VehicleType: </p>
            <FormControl required>
              <TextField
                id="outlined-select-currency"
                select
                value={choosedVType}
                onChange={handleTypeChange}
                variant="outlined"
              >
                {vehicleTypesSelect.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <p> Longitude: </p>
            <FormControl required>
              <OutlinedInput
                id="filled-adornment-weight"
                onChange={handleLongitudeChange}
                value={longitude}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
            <FormHelperText id="component-helper-text">{errorLongitude}</FormHelperText>
            <p> Latitude: </p>
            <FormControl required>
              <OutlinedInput
                id="filled-adornment-weight"
                onChange={handleLatitudeChange}
                value={latitude}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
            <FormHelperText id="component-helper-text">{errorLatitude}</FormHelperText>
          </DialogContent>
          <div>
            <Button type="submit" color="primary">
              {actiontype}
            </Button>
          </div>
        </form>
      </Dialog>
    );
  };

  // all Vehicles
  const vehicleRows: any[] = [];
  for (const vehicle of vehicles) {
    vehicleRows.push({
      battery: vehicle.batteryLevel,
      id: vehicle.vehicleId,
      license_plate: vehicle.licencePlate,
      status: vehicle.status,
      bookings: vehicle.bookings.length,
      type: vehicle.vehicleType.type,
      position: vehicle.positionLatitude + ' / ' + vehicle.positionLongitude,
      button: vehicle.vehicleId,
    });
  }

  const handleDeleteVehicle = async (e: any) => {
    let id = '';
    id = e.currentTarget.id;
    await deleteVehicles(id);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Filter model for vehicle table
  let vehicleFilterModel: FilterModel;
  vehicleFilterModel = {
    items: [{ columnField: 'license_plate', operatorValue: 'contains', value: '' }],
  };

  /*const deleteDialog = () => {
    let type = '';
    if (choosedVehicleType) {
      type = choosedVehicleType.type;
      return (
          <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogTitle id="alert-dialog-title">{'Delete Vehicle Type: ' + type}</DialogTitle>
              <DialogContentText id="alert-dialog-description">
                <p>Are you sure you want to delete the following vehicle Type?</p>
                <p>This will also delete all according Vehicles irrevocably.</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                NO!
              </Button>
              <Button onClick={deleteOneVehicleType} color="primary">
                Delete irrevocably
              </Button>
            </DialogActions>
          </Dialog>
      );
    }
    return <></>;
  };*/

  const chipMessageSucess = (cOpen: any, chandleClose: any, msg: string) => {
    return (
      <Snackbar open={cOpen} autoHideDuration={6000} onClose={chandleClose}>
        <Alert onClose={chandleClose} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    );
  };

  const chipMessageError = (cOpen: boolean, chandleClose: any, msg: string) => {
    return (
      <Snackbar open={cOpen} autoHideDuration={6000} onClose={chandleClose}>
        <Alert onClose={chandleClose} severity="error">
          {msg}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <>
      <CreateButton>
        <Button data-testid="admin-createVehicle-createButton" variant="outlined" color="primary" onClick={handleCreateDialogOpen}>
          Create
        </Button>
      </CreateButton>
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              columns={[
                { field: 'id', hide: true },
                {
                  field: 'license_plate',
                  headerName: 'License Plate',
                  width: 150,
                  renderCell: (params: ValueFormatterParams) => (
                    <>
                      <IconButton
                        aria-label="info"
                        color="primary"
                        onClick={() => {
                          updateChoosedVehicle(params.value.toString());
                        }}
                        style={{ marginRight: 5, color: 'primary' }}
                      >
                        <EditIcon />
                      </IconButton>
                      {params.value.toString()}
                    </>
                  ),
                },
                { field: 'status', headerName: 'Status', width: 150 },
                {
                  field: 'battery',
                  headerName: 'Battery',
                  width: 100,
                  renderCell: (params: ValueFormatterParams) => (
                    <>
                      <Progressbar>
                        <Progressbarinner style={{ width: params.value.toString() + '%' }} />
                      </Progressbar>
                    </>
                  ),
                },
                { field: 'bookings', headerName: 'Number of bookings' },
                { field: 'type', headerName: 'Type' },
                { field: 'position', headerName: 'Position', width: 300 },
                {
                  field: 'button',
                  headerName: '',
                  width: 150,
                  renderCell: (params: ValueFormatterParams) => (
                    <strong>
                      <Button data-testid="admin-deleteVehicle-deleteButton"
                        id={params.value.toString()}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleDeleteVehicle}
                        style={{ marginLeft: 16 }}
                      >
                        Delete
                      </Button>
                    </strong>
                  ),
                },
              ]}
              rows={vehicleRows}
              disableColumnMenu
              showToolbar
              filterModel={vehicleFilterModel}
            />
          </div>
        </div>
      </div>
      {VehicleManageDialog(openDialogCreate, handleCreateDialogClose, 'Create', createVehicleDB)}
      {VehicleManageDialog(openDialogUpdate, handleUpdateDialogClose, 'Update', updateVehicleDB)}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          A Vehicle was successfully deleted!
        </Alert>
      </Snackbar>
      {chipMessageError(chipErrorCreate, handleChipErrorCreateClose, 'Something went wrong. Could not create vehicle.')}
      {chipMessageError(
        chipErrorUpdate,
        handleChipErrorUpdateClose,
        'Something went wrong. Could not update vehicle.',
      )}
    </>
  );
};
