import { useSnackbar } from 'notistack';
import { Vehicle } from './EntityInterfaces';
const { enqueueSnackbar } = useSnackbar();

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  const request = await fetch(`api/vehicle`, {
    headers: { 'content-type': 'application/json' },
    method: 'GET',
  });
  if (request.status === 200) {
    const vehicleData: Vehicle[] = (await request.json()).data;
    return vehicleData;
  } else {
    enqueueSnackbar(`Error while fetching vehicle data!`, {
      variant: 'error',
    });
    return [];
  }
};
