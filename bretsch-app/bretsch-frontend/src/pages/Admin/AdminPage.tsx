import { Layout } from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { LinearProgress, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { ColDef, DataGrid, FilterModel, ValueFormatterParams } from '@material-ui/data-grid';
import { MyProfile } from '../Profile/ProfilePage';
import { User, Vehicle } from '../../util/EntityInterfaces';
import Button from '@material-ui/core/Button';

// TODO Object destruction -> concret Table
const useStyles = makeStyles((theme) => ({
  headings: {
    color: theme.palette.primary.main,
  },
}));

export const MyAdmin = styled.div`
  margin: 5% 10%;
`;

export const BatteryProgressNumber = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  text-align: center;
  color: black;
`;

export const BatteryProgress = styled.progress`
  width: 100%;
`;

export const AdminPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    allVehicles().then((r) => {
      allUsers();
    });
  }, []);

  // get all vehicles
  const allVehicles = async () => {
    const vehicleRequest = await fetch(`/api/vehicle/`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (vehicleRequest.status === 200) {
      const userJSON = await vehicleRequest.json();
      setVehicles(userJSON.data);
    }
  };

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

  const classes = useStyles();

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
      button: <Button variant="contained">Default</Button>,
    });
  }

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
      button: <Button variant="contained">Default</Button>,
    });
  }

  // Filter model for vehicle table
  const vehicleFilterModel: FilterModel = {
    items: [{ columnField: 'license_plate', operatorValue: 'contains', value: '' }],
  };

  return (
    <Layout title="Admin">
      <MyAdmin>
        <h1 className={classes.headings}>Vehicles</h1>
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
                  },
                  { field: 'status', headerName: 'Status', width: 150 },
                  {
                    field: 'battery',
                    headerName: 'Battery',
                    width: 100,
                    renderCell: (params: ValueFormatterParams) => (
                      <div style={{ position: 'relative' }}>
                        <BatteryProgress value={params.value.toString()} max="100" />
                        <BatteryProgressNumber>{params.value.toString()}</BatteryProgressNumber>
                      </div>
                    ),
                  },
                  { field: 'bookings', headerName: 'Number of bookings' },
                  { field: 'type', headerName: 'Type' },
                  { field: 'position', headerName: 'Position', width: 300 },
                  {
                    field: '',
                    headerName: '',
                    width: 150,
                    renderCell: (params: ValueFormatterParams) => (
                      <strong>
                        <Button variant="outlined" color="secondary" size="small" style={{ marginLeft: 16 }}>
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
        <h1 className={classes.headings}>Users</h1>
        <div style={{ height: 400, width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                columns={[
                  { field: 'id', hide: true },
                  {
                    field: 'name',
                    headerName: 'name',
                    width: 150,
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
                    field: '',
                    headerName: '',
                    width: 150,
                    renderCell: (params: ValueFormatterParams) => (
                      <strong>
                        <Button variant="outlined" color="secondary" size="small" style={{ marginLeft: 16 }}>
                          Delete
                        </Button>
                      </strong>
                    ),
                  },
                ]}
                rows={userRows}
                disableColumnMenu
                showToolbar
                filterModel={vehicleFilterModel}
              />
            </div>
          </div>
        </div>
      </MyAdmin>
    </Layout>
  );
};
