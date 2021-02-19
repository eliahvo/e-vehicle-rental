import React, {useContext, useEffect, useState} from 'react';
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
import {authContext} from "../../../contexts/AuthenticationContext";

export const ChipsPos = styled.span`
  margin: 0.2%;
`;

export const VehicleTypeChips = () => {
  const { token } = useContext(authContext);

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
  const [vstartPrice, setvStartPrice] = useState<number>(0);
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

  const handleCreateDialogOpen = async () => {
    clearInput();
    setDialogCreate(true);
  };

  const handleNameChange = (e) => {
    setname(e.target.value);
  };

  const handlePriceChange = (e) => {
    if (parseFloat(e.target.value) || e.target.value.empty) {
      setPrice(parseFloat(e.target.value));
    }
  };

  const handleStartPriceChange = (e) => {
    if (parseFloat(e.target.value) || e.target.value.empty) {
      setvStartPrice(parseFloat(e.target.value));
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
        <Button data-testid="admin-create-button" variant="outlined" color="primary" onClick={handleCreateDialogOpen}>
          Create
        </Button>
        <Button style={{ margin: 10 }} variant="outlined" onClick={allVehicleTypes}>
          Refresh
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

  const clearInput = () => {
    setname(' ');
    setPrice(0);
    setvStartPrice(0);
    setBLevel(0);
    setTypeId(' ');
  };

  const manageVehicleTypeDialog = (mOpen: boolean, hClose: any, actiontype: string, finishFunc: any) => {
    return (
      <Dialog onClose={hClose} aria-labelledby="simple-dialog-title" open={mOpen}>
        <form onSubmit={finishFunc}>
          <DialogTitle id="simple-dialog-title">Create new vehicle type</DialogTitle>
          <DialogContent dividers>
            <p> Name: </p>
            <FormControl required>
              <TextField
                data-testid="admin-createVehicleType-name"
                defaultValue={name}
                onChange={handleNameChange}
                id="outlined-basic"
                variant="outlined"
              />
            </FormControl>
            <p> Start Price </p>
            <FormControl required>
              <OutlinedInput
                data-testid="admin-createVehicleType-startPrice"
                id="filled-adornment-weight"
                defaultValue={vstartPrice}
                onChange={handleStartPriceChange}
                endAdornment={<InputAdornment position="end">€</InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
            <p> Price </p>
            <FormControl required>
              <OutlinedInput
                data-testid="admin-createVehicleType-price"
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

            <p> Minimal Battery Level: </p>
            <FormControl required>
              <OutlinedInput
                data-testid="admin-createVehicleType-battery"
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
            <Button data-testid="admin-createVehicleType-create" type="submit" color="primary">
              {actiontype}
            </Button>
          </div>
        </form>
      </Dialog>
    );
  };


  const allVehicleTypes = async () => {
    const vehicleTypeRequest = await fetch(`/api/vehicletype/`, {
      headers: { 'content-type': 'application/json', Authorization: token},
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
    await setvStartPrice(t.startPrice);
    handleUpdateDialogOpen();
  };

  const updateVehicleTypeDB = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const vehicleTypeRequest = await fetch(`/api/vehicletype/` + typeId, {
      headers: { 'content-type': 'application/json', Authorization: token},
      body: JSON.stringify({
        type: name,
        pricePerMinute: price,
        minimalBatteryLevel: bLevel,
        startPrice: vstartPrice,
      }),
      method: 'PATCH',
    });
    if (vehicleTypeRequest.status === 200) {
      await allVehicleTypes();
      setSucUpdate(true);
    } else {
      setAlertUpdate(true);
    }
    handleUpdateDialogClose();
    await clearInput();
  };

  const createVehicleType = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const vehicleTypeRequest = await fetch(`/api/vehicletype/`, {
      headers: { 'content-type': 'application/json', Authorization: token},
      body: JSON.stringify({
        type: name,
        pricePerMinute: price,
        minimalBatteryLevel: bLevel,
        startPrice: vstartPrice,
      }),
      method: 'POST',
    });
    if (vehicleTypeRequest.status === 201) {
      await allVehicleTypes();
      setSucCreate(true);
    } else {
      setAlertCreate(true);
    }
    handleCreateDialogClose();
    await clearInput();
  };

  const deleteOneVehicleType = async (e: any) => {
    if (choosedVehicleType) {
      const vehicleTypeRequest = await fetch(`/api/vehicletype/` + choosedVehicleType.vehicleTypeId.toString(), {
        headers: { 'content-type': 'application/json', Authorization: token },
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
            <Button
              data-testid="admin-createVehicleType-deleteIrrevocably>"
              onClick={deleteOneVehicleType}
              color="primary"
            >
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
        {manageVehicleTypeDialog(openDialogCreate, handleCreateDialogClose, 'Create', createVehicleType)}
        {manageVehicleTypeDialog(openDialogUpdate, handleUpdateDialogClose, 'Update', updateVehicleTypeDB)}
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
