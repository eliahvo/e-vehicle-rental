import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useSnackbar } from 'notistack';

const containerStyle = {
  width: '100%',
  height: '800px'
};

const center = {
  lat: 49.871575,
  lng: 8.651596
};
export interface User {
	userId: number;
  email: string;
  hashedPassword: string;
  userRole: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  preferedPayment: string;
  streetPlusNumber: string;
  city: string;
  bookings: Booking[];
  createdAt: string;
  updatedAt: string;
}
export interface Booking {
  bookingId: number;
  createdAt: string;
  endDate: string;
  paymentStatus: string;
  price: number;
  startDate: string;
  updatedAt: string;
}
export interface VehicleType {
	vehicleTypeId: number;
  type: string;
  pricePerMinute: number;
  minimalBatteryLevel: number;
  vehicles: Vehicle[];
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  batteryLevel: number;
  bookings: Booking[];
  createdAt: string;
  licencePlate: string;
  positionLatitude: string;
  positionLongitude: string;
  status: string;
  updatedAt: string;
  vehicleId: number;
  vehicleType: VehicleType;
}

export const DashboardPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchVehicle = async function() {
    const vehicleRequest = await fetch(`api/vehicle`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
    );
    if (vehicleRequest.status === 200) {
			const vehicleJSON = await vehicleRequest.json();
			setVehicles(vehicleJSON.data);
		}
  };
  useEffect(() => {
    fetchVehicle();
  },[]);

  return (
    <LoadScript
      googleMapsApiKey=""
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        { /* Child components, such as markers, info windows, etc. */}

        {vehicles.map((vehicle: Vehicle) => {
          return (
            <Marker
              position={{
                lat: parseFloat(vehicle.positionLatitude),
                lng: parseFloat(vehicle.positionLongitude),
              }}
              onClick={_ => 
                enqueueSnackbar(`${vehicle.vehicleType.type} bretscht davon!`, { variant: 'success' })}
              icon={`./icons/${vehicle.vehicleType.type}.png`}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  )
}