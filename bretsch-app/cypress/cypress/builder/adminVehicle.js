import { build } from 'test-data-bot';

export const adminVehicleBuilder = ({}) =>
    build('AdminVehicle').fields({
        licensePlate: 'DA-BR-999',
        longitude: '49.865158',
        latitude: '8.648249',
        newLicensePlate: 'DA-BR-888',
        newLongitude: '48.12345',
        newLatitude: '8.12345',
        newBatteryLevel: '90',
        
    });