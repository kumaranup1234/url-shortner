const express = require('express');
const router = express.Router();
const {
    createOneLink,
    deleteOneLink,
    updateOneLink,
    getOneLink,
    trackPageView,
    checkUserName,
    getMyPage
} = require('../controllers/oneLinkController');

const { authenticateUser } = require('../middleware/authenticate');
const upload = require("../utils/multerConfig");


// create a new OneLink page
router.post(
    '/create',
    authenticateUser,
    upload.fields([
        { name: 'profilePhoto', maxCount: 1 },
        { name: 'images', maxCount: 10 }
    ]),
    createOneLink
);
// delete an existing OneLink page
router.delete('/delete', authenticateUser, deleteOneLink);

// get onelink
router.get('/my-page', authenticateUser, getMyPage);

// update the user OneLink page
router.post('/update', authenticateUser, upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]),updateOneLink);

// fetch a OneLink page by username
router.get('/:username', getOneLink);

// track page views (increments the page view counter)
router.post('/:username/views', trackPageView);

// check for username
router.post('/check', authenticateUser, checkUserName);

module.exports = router;
