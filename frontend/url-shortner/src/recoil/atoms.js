import { atom } from 'recoil';

// Atom to store user authentication state
export const authState = atom({
    key: 'authState', // unique ID (with respect to other atoms/selectors)
    default: { isLoggedIn: false, user: null },
});
