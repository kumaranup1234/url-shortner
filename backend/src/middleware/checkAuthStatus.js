import {verifyToken} from "../utils/verifyToken";
const checkAuthStatus = (req, res, next) => {
    const token = req.cookies.authToken;
    if (token) {
        const user = verifyToken(token);
        if (user) {
            req.user = user;
        } else {
            console.log("Invalid token");
        }
    }
    next();
};

module.exports = {
    checkAuthStatus,
}
