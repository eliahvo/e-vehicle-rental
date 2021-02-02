import { DataGrid, FilterModel, ValueFormatterParams } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { Vehicle } from '../../../util/EntityInterfaces';
import styled from 'styled-components';

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

export const VehicleTable = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    allVehicles();
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
  let vehicleFilterModel: FilterModel;
  vehicleFilterModel = {
    items: [{ columnField: 'license_plate', operatorValue: 'contains', value: '' }],
  };

  return (
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
  );
};
