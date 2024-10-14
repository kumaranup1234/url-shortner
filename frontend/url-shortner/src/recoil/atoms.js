import { atom } from 'recoil';

// Atom to store user authentication state
export const authState = atom({
    key: 'authState', // unique ID (with respect to other atoms/selectors)
    default: { isLoggedIn: false, user: null },
});
export const topLocationState = atom({
    key: 'topLocationState',
    default: { name: 'None', clicks: 0 }, // default value
});

export const topDateState = atom({
    key: 'topDateState',
    default: { date: '', clicks: 0 }, // default value
});

export const totalClicksState = atom({
    key: 'totalClicksState',
    default: 0, // default value
});