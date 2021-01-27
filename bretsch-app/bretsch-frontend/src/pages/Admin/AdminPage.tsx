import { Layout } from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { ColDef, DataGrid, FilterModel } from '@material-ui/data-grid';
import { MyProfile } from '../Profile/ProfilePage';
import { Vehicle } from '../../util/EntityInterfaces';

// TODO Object destruction -> concret Table
const useStyles = makeStyles((theme) => ({
  headings: {
    color: theme.palette.primary.main,
  },
}));

export const MyAdmin = styled.div`
  margin: 5% 10%;
`;

const riceFilterModel: FilterModel = {
  items: [{ columnField: 'commodity', operatorValue: 'contains', value: 'rice' }],
};
//

/*export function BasicToolbarFilteringGrid() {
    const { data } = ""
    });*/

export const AdminPage = () => {
  const [vehicles, setVehiles] = useState<Vehicle[]>([]);

  useEffect(() => {
    allVehicles();
  }, []);

  const allVehicles = async () => {
    const vehicleRequest = await fetch(`/api/vehicle/`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (vehicleRequest.status === 200) {
      const vehicleJSON = await vehicleRequest.json();
      setVehiles(vehicleJSON.data);
    }
  };

  const classes = useStyles();

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
    });
  }

  return (
    <Layout title="Admin">
      <MyAdmin>
        <div className={classes.headings}>Vehicles</div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            columns={[
              { field: 'id', hide: true },
              {
                field: 'license_plate',
                headerName: 'License Plate',
                width: 150,
              },
              { field: 'status', headerName: 'Status', width: 150 },
              { field: 'battery', headerName: 'Battery' },
              { field: 'bookings', headerName: 'Number of bookings' },
              { field: 'type', headerName: 'Type' },
              { field: 'position', headerName: 'Position', width: 300},
              { field: 'button', headerName: 'Button' },
            ]}
            rows={vehicleRows}
            disableColumnMenu
          />
        </div>
      </MyAdmin>
    </Layout>
  );
};
