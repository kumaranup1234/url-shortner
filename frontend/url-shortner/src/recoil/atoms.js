import { atom } from 'recoil';


const getInitialAuthState = () => {
    const storedAuth = localStorage.getItem('authState');
    return storedAuth ? JSON.parse(storedAuth) : { isLoggedIn: false, user: null };
};
// Atom to store user authentication state
export const authState = atom({
    key: 'authState', // unique ID (with respect to other atoms/selectors)
    default: getInitialAuthState(),
});

