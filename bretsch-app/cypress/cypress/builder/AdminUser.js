import { build } from 'test-data-bot';

export const adminUserBuilder = ({}) =>
    build('AdminUser').fields({
        userEmail: 'test@bretsch.de',
        userPassword: 'bretschi1',
        userFirstname: 'firstbretsch',
        userLastname: 'lastbretsch',
        userBday: '10/01/2000',
        userPreferedPayment: 'Paypal',
        userStreet: 'bretschStreet 12',
        userCity: 'Bretsch',
        newuserEmail: 'test@bretsch.de',
        newuserPassword: 'bretschi1',
        newuserFirstname: 'firstbretsch',
        newuserLastname: 'lastbretsch',
        newuserBday: '10/01/2000',
        newuserPreferedPayment: 'Paypal',
        newuserStreet: 'bretschStreet 12',
        newuserCity: 'Bretsch',
    });