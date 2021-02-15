import { DataGrid, FilterModel, ValueFormatterParams } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { User, Vehicle } from '../../../util/EntityInterfaces';
import styled from 'styled-components';
import { chipMessageError, chipMessageSucess, CreateButton, deleteDialog, vehicleStatus } from './vehicleTable';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DateFnsUtils from '@date-io/date-fns';

export const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [choosedUser, setchoosedUsers] = useState<User>();
  const [choosedUserName, setchoosedUsersName] = useState<string>();

  // Values Create and Update
  const [uemail, setuemail] = useState<string>('');
  const [upassword, setupassword] = useState<string>('');
  const [ufirstName, setufirstName] = useState<string>('');
  const [ulastName, setulastName] = useState<string>('');
  const [uBirthDate, setuBirthDate] = React.useState<Date | null>(new Date());
  const [uPreferedPayment, setuPreferedPayment] = useState<string>('');
  const [uStreetPlusNumber, setuStreetPlusNumber] = useState<string>('');
  const [ucity, setucity] = useState<string>('');

  const handleUEmailChange = (e) => {
    setuemail(e.target.value.toString());
  };
  const handleUPasswordChange = (e) => {
    setupassword(e.target.value.toString());
  };
  const handleUFirstName = (e) => {
    setufirstName(e.target.value.toString());
  };
  const handleULastName = (e) => {
    setulastName(e.target.value.toString());
  };
  const handleBirthDateChange = (date: Date | null) => {
    setuBirthDate(date);
  };
  const handleUPreferedPaymentChange = (e) => {
    setuPreferedPayment(e.target.value.toString());
  };
  const handleUStreetPlusNameChange = (e) => {
    setuStreetPlusNumber(e.target.value.toString());
  };
  const handleUCityChange = (e) => {
    setucity(e.target.value.toString());
  };
  // Dialogs
  const [deleteDialogUser, setDeleteDialogUser] = useState<boolean>(false);
  const [createDialogUser, setCreateDialogUser] = useState<boolean>(false);
  const [updateDialogUser, setUpdateDialogUser] = useState<boolean>(false);

  const handleDeleteDialogClose = () => {
    setDeleteDialogUser(false);
  };
  const handleCreateDialogOpen = () => {
    setCreateDialogUser(true);
  };

  const handleCreateDialogClose = () => {
    setCreateDialogUser(false);
  };

  const handleUpdateDialogOpen = () => {
    setCreateDialogUser(true);
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialogUser(false);
  };
  // Chips
  const [chipUserDelete, setchipUserDelete] = useState<boolean>(false);
  const [chipErrorDelete, setchipErrorDelete] = useState<boolean>(false);

  const [chipUserCreate, setchipUserCreate] = useState<boolean>(false);
  const [chipErrorCreate, setchipErrorCreate] = useState<boolean>(false);

  const [chipUserUpdate, setchipUserUpdate] = useState<boolean>(false);
  const [chipErrorUpdate, setchipErrorUpdate] = useState<boolean>(false);

  const handleUserDeleteSucChipClose = () => {
    setchipUserDelete(false);
  };
  const handleUserDeleteErrorChipClose = () => {
    setchipErrorDelete(false);
  };
  const handleUserCreateSucChipClose = () => {
    setchipUserCreate(false);
  };
  const handleUserCreateErrorChipClose = () => {
    setchipErrorCreate(false);
  };
  const handleUserUpdateSucChipClose = () => {
    setchipUserUpdate(false);
  };
  const handleUserUpdateErrorChipClose = () => {
    setchipErrorUpdate(false);
  };

  useEffect(() => {
    allUsers();
  }, []);

  useEffect(() => {
    if (choosedUser) {
      setchoosedUsersName(choosedUser.firstName + ' ' + choosedUser.lastName);
      setuemail(choosedUser.email);
      setufirstName(choosedUser.firstName);
      setulastName(choosedUser.lastName);
      setuBirthDate(new Date(choosedUser.birthDate));
      setuPreferedPayment(choosedUser.preferedPayment);
      setuStreetPlusNumber(choosedUser.streetPlusNumber);
      setucity(choosedUser.city);
    }
  }, [choosedUser]);

  // get all vehicles
  const allUsers = async () => {
    const userRequest = await fetch(`/api/user/`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (userRequest.status === 200) {
      const userJSON = await userRequest.json();
      setUsers(userJSON.data);
    }
  };

  // delete vehicles
  const deleteUserDB = async () => {
    if (choosedUser) {
      const userRequest = await fetch(`/api/user/` + choosedUser.userId.toString(), {
        headers: { 'content-type': 'application/json' },
        method: 'DELETE',
      });
      if (userRequest.status === 200) {
        await allUsers();
        setchipUserDelete(true);
      } else {
        setchipErrorDelete(true);
      }
      handleDeleteDialogClose();
    }
  };

  // create vehicles
  const createUserDB = async (e) => {
    e.preventDefault();
    const userRequest = await fetch(`/api/user/`, {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        email: uemail,
        password: upassword,
        firstName: ufirstName,
        lastName: ulastName,
        birthDate: uBirthDate,
        preferedPayment: uPreferedPayment,
        streetPlusNumber: uStreetPlusNumber,
        city: ucity,
      }),
    });
    if (userRequest.status === 200) {
      await allUsers();
      setchipUserCreate(true);
    } else {
      setchipErrorCreate(true);
    }
    handleCreateDialogClose();
    await clearInput();
  };

  // create vehicles
  const updateUserDB = async (e) => {
    e.preventDefault();
    if (choosedUser.userId) {
      let userRequest;
      if (upassword === '') {
        userRequest = await fetch(`/api/user/` + choosedUser.userId, {
          headers: { 'content-type': 'application/json' },
          method: 'PATCH',
          body: JSON.stringify({
            email: uemail,
            firstName: ufirstName,
            lastName: ulastName,
            birthDate: uBirthDate,
            preferedPayment: uPreferedPayment,
            streetPlusNumber: uStreetPlusNumber,
            city: ucity,
          }),
        });
      } else {
        userRequest = await fetch(`/api/user/` + choosedUser.userId, {
          headers: { 'content-type': 'application/json' },
          method: 'PATCH',
          body: JSON.stringify({
            email: uemail,
            firstName: ufirstName,
            lastName: ulastName,
            birthDate: uBirthDate,
            password: upassword,
            preferedPayment: uPreferedPayment,
            streetPlusNumber: uStreetPlusNumber,
            city: ucity,
          }),
        });
      }
      if (userRequest.status === 200) {
        await allUsers();
        setchipUserUpdate(true);
      } else {
        setchipErrorUpdate(true);
      }
      handleUpdateDialogClose();
      await clearInput();
    }
  };

  const handleDeleteUser = async (e: any) => {
    let id = '';
    e.preventDefault();
    id = e.currentTarget.id.toString();
    const uDelete = users.filter((u) => u.userId.toString() === id);
    if (uDelete.length === 1) {
      await setchoosedUsers(uDelete[0]);
      await setDeleteDialogUser(true);
    }
  };

  const clearInput = () => {
    setuemail('');
    setupassword('');
    setufirstName('');
    setulastName('');
    setuBirthDate(new Date());
    setuPreferedPayment('');
    setuStreetPlusNumber('');
    setucity('');
  };

  const fillInput = () => {};

  const userManageDialog = (mOpen: boolean, hClose: any, actiontype: string, finishFunc: any) => {
    return (
      <Dialog onClose={hClose} aria-labelledby="simple-dialog-title" open={mOpen}>
        <form onSubmit={finishFunc}>
          <DialogTitle defaultValue={ufirstName + ' ' + ulastName} id="simple-dialog-title">
            {actiontype} user
          </DialogTitle>
          <DialogContent dividers>
            <p>E-mail: </p>
            <FormControl required>
              <TextField
                data-testid="admin-createVehicle-licensePlate"
                onChange={handleUEmailChange}
                value={uemail}
                id="outlined-required"
                variant="outlined"
              />
            </FormControl>
            <p>Password: </p>
            <FormControl required>
              <TextField
                data-testid="admin-createVehicle-licensePlate"
                onChange={handleUPasswordChange}
                value={upassword}
                id="outlined-required"
                variant="outlined"
              />
            </FormControl>
            <p>Firstname: </p>
            <FormControl required>
              <TextField
                data-testid="admin-createVehicle-licensePlate"
                onChange={handleUFirstName}
                value={ufirstName}
                id="outlined-required"
                variant="outlined"
              />
            </FormControl>
            <p>Lastname: </p>
            <FormControl required>
              <TextField
                data-testid="admin-createVehicle-licensePlate"
                onChange={handleULastName}
                value={ulastName}
                id="outlined-required"
                variant="outlined"
              />
            </FormControl>
            <p>Birthdate:</p>

            <FormControl required>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  format="dd/MM/yyyy"
                  value={uBirthDate}
                  onChange={handleBirthDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
            <p>Prefered Payment: </p>
            <FormControl required>
              <TextField
                data-testid="admin-createVehicle-licensePlate"
                onChange={handleUPreferedPaymentChange}
                value={uPreferedPayment}
                id="outlined-required"
                variant="outlined"
              />
            </FormControl>
            <p>Street and street number: </p>
            <FormControl required>
              <TextField
                data-testid="admin-createVehicle-licensePlate"
                onChange={handleUStreetPlusNameChange}
                value={uStreetPlusNumber}
                id="outlined-required"
                variant="outlined"
              />
            </FormControl>
            <p>City: </p>
            <FormControl required>
              <TextField
                data-testid="admin-createVehicle-licensePlate"
                onChange={handleUCityChange}
                value={ucity}
                id="outlined-required"
                variant="outlined"
              />
            </FormControl>
          </DialogContent>
          <div>
            <Button data-testid="admin-createVehicle-createSend" type="submit" color="primary">
              {actiontype}
            </Button>
          </div>
        </form>
      </Dialog>
    );
  };
  const handleUpdateUser = async (id: string) => {
    const choosedUserToUpdate = users.filter((u) => u.userId.toString() === id);
    if (choosedUserToUpdate.length === 1) {
      await setchoosedUsers(choosedUserToUpdate[0]);
      setUpdateDialogUser(true);
    }
  };

  // all users
  const userRows: any[] = [];
  for (const user of users) {
    userRows.push({
      id: user.userId,
      name: [user.firstName, user.lastName, user.userId],
      userRole: user.userRole,
      email: user.email,
      birthday: user.birthDate,
      preferedPayment: user.preferedPayment,
      adress: user.streetPlusNumber + ' ' + user.city,
      button: user.userId,
    });
  }

  return (
    <>
      <CreateButton>
        <Button variant="outlined" color="primary" onClick={handleCreateDialogOpen}>
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
                  field: 'name',
                  headerName: 'name',
                  width: 200,
                  renderCell: (params: ValueFormatterParams) => (
                    <>
                      <IconButton
                        aria-label="info"
                        color="primary"
                        onClick={() => {
                          handleUpdateUser(params.value[2].toString());
                        }}
                        style={{ marginRight: 5, color: 'primary' }}
                      >
                        <EditIcon />
                      </IconButton>
                      {params.value[0]} {params.value[1]}
                    </>
                  ),
                },
                { field: 'email', headerName: 'email', width: 150 },
                {
                  field: 'userRole',
                  headerName: 'userRole',
                  width: 150,
                },
                { field: 'birthday', headerName: 'birth date' },
                { field: 'preferedPayment', headerName: 'prefered payment', width: 150 },
                { field: 'adress', headerName: 'adress', width: 300 },
                {
                  field: 'button',
                  headerName: '',
                  width: 150,
                  renderCell: (params: ValueFormatterParams) => (
                    <strong>
                      <Button
                        id={params.value.toString()}
                        onClick={handleDeleteUser}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        style={{ marginLeft: 16 }}
                      >
                        Delete
                      </Button>
                    </strong>
                  ),
                },
              ]}
              rows={userRows}
              disableColumnMenu
              showToolbar
            />
          </div>
        </div>
      </div>
      {chipMessageSucess(chipUserDelete, handleUserDeleteSucChipClose, 'Successfully delete user.')}
      {chipMessageError(
        chipErrorDelete,
        handleUserDeleteErrorChipClose,
        'Something went wrong. Could not delete user.',
      )}

      {chipMessageSucess(chipUserUpdate, handleUserUpdateSucChipClose, 'Successfully update user.')}
      {chipMessageError(
        chipErrorUpdate,
        handleUserUpdateErrorChipClose,
        'Something went wrong. Could not update user.',
      )}

      {chipMessageSucess(chipUserCreate, handleUserCreateSucChipClose, 'Successfully create user.')}
      {chipMessageError(
        chipErrorCreate,
        handleUserCreateErrorChipClose,
        'Something went wrong. Could not create user.',
      )}

      {deleteDialog(choosedUserName, 'User', handleDeleteDialogClose, deleteUserDB, deleteDialogUser)}
      {userManageDialog(createDialogUser, handleCreateDialogClose, 'Create', createUserDB)}
      {userManageDialog(updateDialogUser, handleUpdateDialogClose, 'Update', updateUserDB)}
    </>
  );
};
