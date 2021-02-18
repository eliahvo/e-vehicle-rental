import { build } from 'test-data-bot';

export const adminBuilder = ({}) =>
    build('AdminUser').fields({
        vehicleTypeName: 'plane',
        vehicleTypePrice: '20',
        vehicleTypeStartPrice: '50',
        vehicleTypeBattery: '30',
        newVehicleTypeName: 'planenew',
        newVehicleTypePrice: '0',
        newVehicleTypeBattery: '0',
    });