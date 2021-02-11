import React, { useEffect, useState } from 'react';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  TextField,
} from '@material-ui/core';
import { Vehicle, VehicleType } from '../../../util/EntityInterfaces';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { CreateButton } from './vehicleTable';

export const ChipsPos = styled.span`
  margin: 0.2%;
`;

export const VehicleTypeChips = () => {
  const [open, setOpen] = React.useState(false);
  const [openDialogCreate, setDialogCreate] = React.useState(false);
  const [openDialogUpdate, setDialogUpdate] = React.useState(false);
  const [vehicleTypes, setVehiclesType] = useState<VehicleType[]>([]);
  const [choosedVehicleType, setchoosedVehiclesType] = useState<VehicleType | null>(null);

  // Badges
  const [alert, setAlert] = React.useState(false);
  const [alertCreate, setAlertCreate] = React.useState(false);
  const [sucCreate, setSucCreate] = React.useState(false);
  const [alertUpdate, setAlertUpdate] = React.useState(false);
  const [sucUpdate, setSucUpdate] = React.useState(false);

  // Create and Update Vehicle Type
  const [name, setname] = useState<string>(' ');
  const [price, setPrice] = useState<number>(0);
  const [errorprice, setErrorprice] = useState<string>(' ');
  const [bLevel, setBLevel] = useState<number>(0);
  const [errorbLevel, setErrorbLevel] = useState<string>(' ');
  const [typeId, setTypeId] = useState<string>(' ');

  const handleClickOpen = async (t: VehicleType) => {
    setchoosedVehiclesType(t);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Badge handle
  const handleAlertClose = () => {
    setAlert(false);
  };
  const handleCreateAlertClose = () => {
    setAlertCreate(false);
  };
  const handleCreateSucClose = () => {
    setSucCreate(false);
  };

  const handleUpdateAlertClose = () => {
    setAlertUpdate(false);
  };
  const handleUpdateSucClose = () => {
    setSucUpdate(false);
  };

  // Create Dialog
  const handleCreateDialogClose = () => {
    setDialogCreate(false);
  };

  const handleCreateDialogOpen = () => {
    setDialogCreate(true);
  };

  const handleNameChange = (e) => {
    setname(e.target.value);
  };

  const handlePriceChange = (e) => {
    if (parseFloat(e.target.value) || e.target.value.empty) {
      setPrice(parseFloat(e.target.value));
      setErrorprice('');
    } else {
      setErrorprice('Error: Value should be a number');
    }
  };

  // Update Dialog
  const handleUpdateDialogClose = () => {
    setDialogUpdate(false);
  };

  const handleUpdateDialogOpen = () => {
    setDialogUpdate(true);
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

  useEffect(() => {
    allVehicleTypes().then((r) => printChips());
  }, []);

  const printChips = () => {
    const chips = [];
    chips.push(
      <ChipsPos>
        <Button variant="outlined" color="primary" onClick={handleCreateDialogOpen}>
          Create
        </Button>
      </ChipsPos>,
    );
    for (const t of vehicleTypes) {
      chips.push(
        <ChipsPos id={t.vehicleTypeId.toString()}>
          <Chip
            label={t.type}
            onClick={() => {
              updateVehicleType(t);
            }}
            onDelete={() => {
              handleClickOpen(t);
            }}
            color="primary"
            variant="outlined"
          />
        </ChipsPos>,
      );
    }
    return chips;
  };

  const createVehicleTypeDialog = () => {
    return (
      <Dialog onClose={handleCreateDialogClose} aria-labelledby="simple-dialog-title" open={openDialogCreate}>
        <form onSubmit={createVehicleType}>
          <DialogTitle id="simple-dialog-title">Create new vehicle type</DialogTitle>
          <DialogContent dividers>
            <p> Name: </p>
            <FormControl required>
              <TextField onChange={handleNameChange} id="outlined-basic" variant="outlined" />
            </FormControl>
            <p> Price </p>
            <FormControl required>
              <OutlinedInput
                id="filled-adornment-weight"
                onChange={handlePriceChange}
                endAdornment={<InputAdornment position="end">€/min</InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
            <FormHelperText id="component-helper-text">{errorprice}</FormHelperText>
            <p> Minimal Battery Level: </p>
            <FormControl required>
              <OutlinedInput
                id="filled-adornment-weight"
                onChange={handleBLevelChange}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
            <FormHelperText id="component-helper-text">{errorbLevel}</FormHelperText>
          </DialogContent>

          <div>
            <Button type="submit" color="primary">
              Create
            </Button>
          </div>
        </form>
      </Dialog>
    );
  };

  const updateVehicleTypeDialog = () => {
    return (
      <Dialog onClose={handleUpdateDialogClose} aria-labelledby="simple-dialog-title" open={openDialogUpdate}>
        <form onSubmit={updateVehicleTypeDB}>
          <DialogTitle id="simple-dialog-title">Update vehicle type</DialogTitle>
          <DialogContent dividers>
            <p> Name: </p>
            <FormControl>
              <TextField required  onChange={handleNameChange}  id="outlined-required" defaultValue={name} variant="outlined" />
            </FormControl>
            <p> Price </p>
            <FormControl required>
              <OutlinedInput
                id="filled-adornment-weight"
                defaultValue={price}
                onChange={handlePriceChange}
                endAdornment={<InputAdornment position="end">€/min</InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
            <FormHelperText id="component-helper-text">{errorprice}</FormHelperText>
            <p> Minimal Battery Level: </p>
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
          </DialogContent>

          <div>
            <Button type="submit" color="primary">
              Update
            </Button>
          </div>
        </form>
      </Dialog>
    );
  };

  const allVehicleTypes = async () => {
    const vehicleTypeRequest = await fetch(`/api/vehicletype/`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (vehicleTypeRequest.status === 200) {
      const vehicleTypeJSON = await vehicleTypeRequest.json();
      setVehiclesType(vehicleTypeJSON.data);
    }
  };

  const updateVehicleType = async (t: VehicleType) => {
    await setname(t.type);
    await setPrice(t.pricePerMinute);
    await setBLevel(t.minimalBatteryLevel);
    await setTypeId(t.vehicleTypeId.toString());
    handleUpdateDialogOpen();
  };

  const updateVehicleTypeDB = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const vehicleTypeRequest = await fetch(`/api/vehicletype/` + typeId, {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        type: name,
        pricePerMinute: price,
        minimalBatteryLevel: bLevel,
      }),
      method: 'PATCH',
    });
    if (vehicleTypeRequest.status === 200) {
      await allVehicleTypes();
      handleUpdateDialogClose();
      setSucUpdate(true);
    } else {
      setAlertUpdate(true);
    }
  };

  const createVehicleType = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const vehicleTypeRequest = await fetch(`/api/vehicletype/`, {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        type: name,
        pricePerMinute: price,
        minimalBatteryLevel: bLevel,
      }),
      method: 'POST',
    });
    if (vehicleTypeRequest.status === 200) {
      await allVehicleTypes();
      handleCreateDialogClose();
      setSucCreate(true);
    } else {
      setAlertCreate(true);
    }
  };

  const deleteOneVehicleType = async (e: any) => {
    if (choosedVehicleType) {
      const vehicleTypeRequest = await fetch(`/api/vehicletype/` + choosedVehicleType.vehicleTypeId.toString(), {
        headers: { 'content-type': 'application/json' },
        method: 'DELETE',
      });
      if (vehicleTypeRequest.status === 200) {
        await allVehicleTypes();
        setAlert(true);
        handleClose();
      }
    }
  };

  const dialog = () => {
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
  };

  return (
    <>
      <div>
        {printChips()}
        {dialog()}
        {createVehicleTypeDialog()}
        {updateVehicleTypeDialog()}
      </div>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          A Vehicle Type was sucessfully deleted!
        </Alert>
      </Snackbar>
      <Snackbar open={alertCreate} autoHideDuration={6000} onClose={handleCreateAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
          An Error occured: Could not create Vehicle Type!
        </Alert>
      </Snackbar>
      <Snackbar open={sucCreate} autoHideDuration={6000} onClose={handleCreateSucClose}>
        <Alert onClose={handleAlertClose} severity="success">
          Successfully created a new Vehicle Type!
        </Alert>
      </Snackbar>
      <Snackbar open={alertUpdate} autoHideDuration={6000} onClose={handleUpdateAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
          An Error occured: Could not update Vehicle Type!
        </Alert>
      </Snackbar>
      <Snackbar open={sucUpdate} autoHideDuration={6000} onClose={handleUpdateSucClose}>
        <Alert onClose={handleAlertClose} severity="success">
          Successfully update a new Vehicle Type!
        </Alert>
      </Snackbar>
    </>
  );
};
