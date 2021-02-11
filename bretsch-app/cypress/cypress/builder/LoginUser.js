import { build } from 'test-data-bot';

export const loginBuilder = ({}) =>
    build('LoginUser').fields({
        email: 'user1@bretsch.eu',
        password: 'bretsch1',
    });