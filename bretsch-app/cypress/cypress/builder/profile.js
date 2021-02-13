import { build } from 'test-data-bot';

export const profileBuilder = ({}) =>
    build('ProfileUser').fields({
        email: 'user1@bretsch.eu',
        password: 'bretsch1',
        newpassword: 'bretsch1',
        firstname: 'firstnametest',
        lastname: 'lastnametest',
        birthdate: '2000-01-01',
        streetAndNumber: 'Bretsch 69',
        city: 'Bretsch City',
    });