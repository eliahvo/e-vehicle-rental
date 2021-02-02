import { Layout } from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { LinearProgress, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { ColDef, DataGrid, FilterModel, ValueFormatterParams } from '@material-ui/data-grid';
import { MyProfile } from '../Profile/ProfilePage';
import { User, Vehicle } from '../../util/EntityInterfaces';
import Button from '@material-ui/core/Button';
import { VehicleTable } from './components/vehicleTable';
import { UserTable } from './components/UserTable';

const useStyles = makeStyles((theme) => ({
  headings: {
    color: theme.palette.primary.main,
  },
}));

export const MyAdmin = styled.div`
  margin: 5% 10%;
`;

export const AdminPage = () => {
  const classes = useStyles();

  return (
    <Layout title="Admin">
      <MyAdmin>
        <h1 className={classes.headings}>Vehicles</h1>
        <VehicleTable />
        <h1 className={classes.headings}>Users</h1>
        <UserTable />
      </MyAdmin>
    </Layout>
  );
};
