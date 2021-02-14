import { DataGrid, FilterModel, ValueFormatterParams } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { User, Vehicle } from '../../../util/EntityInterfaces';
import styled from 'styled-components';
import {chipMessageError, chipMessageSucess, CreateButton, deleteDialog} from './vehicleTable';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

export const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [choosedUser, setchoosedUsers] = useState<User>();
  const [choosedUserName, setchoosedUsersName] = useState<string>();

  //Dialogs
  const [deleteDialogUser, setDeleteDialogUser] = useState<boolean>(false);
  const [createDialogUser, setCreateDialogUser] = useState<boolean>(false);

  //Chips
  const [chipUserDelete, setchipUserDelete] = useState<boolean>(false);
  const [chipErrorDelete, setchipErrorDelete] = useState<boolean>(false);

  const handleUserDeleteSucChipClose = () => {
    setchipUserDelete(false);
  };
  const handleUserDeleteErrorChipClose = () => {
    setchipErrorDelete(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogUser(false);
  };
  const handleCreateDialogOpen = () => {
    setCreateDialogUser(true);
  };

  useEffect(() => {
    allUsers();
  }, []);

  useEffect(() => {
    if (choosedUser) {
      setchoosedUsersName(choosedUser.firstName + ' ' + choosedUser.lastName);
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
      const vehicleRequest = await fetch(`/api/user/` + choosedUser.userId.toString(), {
        headers: { 'content-type': 'application/json' },
        method: 'DELETE',
      });
      if (vehicleRequest.status === 200) {
        await allUsers();
        setchipUserDelete(true);
      } else {
        setchipErrorDelete(true);
      }
      handleDeleteDialogClose();
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
  // all users
  const userRows: any[] = [];
  for (const user of users) {
    userRows.push({
      id: user.userId,
      name: user.firstName + ' ' + user.lastName,
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
                      <IconButton aria-label="info" color="primary" style={{ marginRight: 5, color: 'primary' }}>
                        <EditIcon />
                      </IconButton>
                      {params.value.toString()}
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
      {deleteDialog(choosedUserName, 'User', handleDeleteDialogClose, deleteUserDB, deleteDialogUser)}
    </>
  );
};

