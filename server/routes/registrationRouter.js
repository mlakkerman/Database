const Router = require('express');
const router = new Router();
const registrationController = require('../controllers/registrationController');

router.post('/', registrationController.registerUser);
router.get('/:userId', registrationController.getRegisteredEvents);

module.exports = router;
