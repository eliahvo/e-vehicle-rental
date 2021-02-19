import { build, fake, sequence } from 'test-data-bot';

export const registerBuilder = ({}) =>
    build('RegisterUser').fields({
        email: sequence(x => `user${x+100}@bretsch.eu`),
        password: sequence(x => `bretsch${x+100}`),
        firstname: 'firstnametest',
        lastname: 'lastnametest',
        birthdate: '2000-01-01',
        streetAndNumber: 'Bretsch 69',
        city: 'Bretsch City',
    });