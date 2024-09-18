const express = require('express');
const router = express.Router();
const Sweets = require('../controllers/Sweets');
const Spices = require('../controllers/Spices');
const Soups = require('../controllers/Soups');
const ContactMe = require('../controllers/ContactMe');
const multer = require('multer');
const storage = require('../config/cloudinary');

const upload = multer({ storage });

//Client side api
router.post('/add-feedback', ContactMe.addFeedback);
router.get('/get-feedback', ContactMe.getFeedback);
router.delete('/delete-feedback/:id', ContactMe.deleteFeedback);

//Admin side api
router.post('/add-sweets', upload.single('recipeImage'), Sweets.addSweets);
router.get('/get-sweets', Sweets.getSweets);
router.get('/get-sweets/:id', Sweets.getSweetsById);
router.put('/update-recipe/:id', Sweets.updateSweets);
router.delete('/delete-sweets/:id', Sweets.deleteSweets);
router.post('/update-like', Sweets.updateLikeStatus);

router.post('/add-spices', upload.single('recipeImage'), Spices.addSpices);
router.get('/get-spices', Spices.getSpices);
router.get('/get-spices/:id', Spices.getSpicesById);
router.put('/update-spices/:id', Spices.updateSpices);
router.delete('/delete-spices/:id', Spices.deleteSpices);
// router.post('/update-like', Spices.updateLikeStatus);

router.post('/add-soups', upload.single('recipeImage'), Soups.addSoups);
router.get('/get-soups', Soups.getSoups);
router.get('/get-soups/:id', Soups.getSoupssById);
router.put('/update-recipe/:id', Soups.updateSoups);
router.delete('/delete-soups/:id', Soups.deleteSoups);
// router.post('/update-like', Soups.updateLikeStatus);

module.exports = router;
