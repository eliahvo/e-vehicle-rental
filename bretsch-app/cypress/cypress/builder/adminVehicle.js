import { build } from 'test-data-bot';

export const adminVehicleBuilder = ({}) =>
    build('AdminVehicle').fields({
        licensePlate: 'DA-BR-999',
        longitude: '49.865158',
        latitude: '8.648249',
        
    });