const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getUsers, registerUser, loginUser, currentUser } = require("../controllers/userController");

const router = express.Router();

router.get('/', getUsers);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current', validateToken, currentUser);

module.exports = router;