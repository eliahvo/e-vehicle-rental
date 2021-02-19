import { useContext } from 'react';
import { authContext } from '../contexts/AuthenticationContext';
import { Vehicle, vehicle_status } from './EntityInterfaces';

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  const request = await fetch(`api/vehicle`, {
    headers: { 'content-type': 'application/json' },
    method: 'GET',
  });
  if (request.status === 200) {
    const vehicleData: Vehicle[] = (await request.json()).data;
    return vehicleData;
  }
  return [];
};

export const setVehicleStats = async (
  vehicleId: any,
  vehicleStatus: vehicle_status,
  vehicleBattery: number,
  token: any,
): Promise<void> => {
  if (vehicleBattery >= 0 && vehicleBattery <= 100) {
    await fetch(`/api/vehicle/${vehicleId}`, {
      body: JSON.stringify({
        status: vehicleStatus,
        batteryLevel: vehicleBattery,
      }),
      headers: { 'Content-Type': 'application/json', Authorization: token },
      method: 'PATCH',
    });
  }
};

export const validatePassword = async (userEmail: string, userPassword: string, token: any): Promise<boolean> => {
  const passwordRequest = await fetch(`/api/user/checkpwd`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  });
  return passwordRequest.status === 200;
};
