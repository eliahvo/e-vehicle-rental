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

export const setVehicleStatus = async (vehicleId: any, vehicleStatus: vehicle_status): Promise<void> => {
  await fetch(`/api/vehicle/${vehicleId}`, {
    body: JSON.stringify({
      status: vehicleStatus,
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
  });
};

export const setVehicleStats = async (
  vehicleId: any,
  vehicleStatus: vehicle_status,
  vehicleBattery: number,
): Promise<void> => {
  if (vehicleBattery >= 0 && vehicleBattery <= 100) {
    await fetch(`/api/vehicle/${vehicleId}`, {
      body: JSON.stringify({
        status: vehicleStatus,
        batteryLevel: vehicleBattery,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    });
  }
};
