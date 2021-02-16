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
  endDate: Date;
  paymentStatus: string;
  price: number;
  startDate: Date;
  updatedAt: string;
  vehicle: Vehicle;
  user: User;
}
export interface VehicleType {
  vehicleTypeId: number;
  type: string;
  startPrice: number;
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

export enum vehicle_status {
  Used,
  Free,
  Not_available,
  Reserved,
}
