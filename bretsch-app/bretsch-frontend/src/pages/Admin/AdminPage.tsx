import { Layout } from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { AppBar, Box, LinearProgress, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import styled from 'styled-components';
import { ColDef, DataGrid, FilterModel, ValueFormatterParams } from '@material-ui/data-grid';
import { MyProfile } from '../Profile/ProfilePage';
import { User, Vehicle } from '../../util/EntityInterfaces';
import Button from '@material-ui/core/Button';
import { VehicleTable } from './components/vehicleTable';
import { UserTable } from './components/UserTable';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { VehicleTypeChips } from './components/vehicleTypeChips';
import { BookingTable } from './components/bookingTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${props.index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  headings: {
    color: theme.palette.primary.main,
  },
}));

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const MyAdmin = styled.div`
  margin: 5% 10%;
`;

export const AdminPage = () => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Layout title="Admin">
      <MyAdmin>
        <h1 className={classes.headings}>Vehicle Type</h1>
        <VehicleTypeChips />
        <h1 className={classes.headings}>Vehicles</h1>
        <VehicleTable />
        <h1 className={classes.headings}>Users</h1>
        <UserTable />
        <h1 className={classes.headings}>Bookings</h1>
        <BookingTable />
      </MyAdmin>
    </Layout>
  );
};
