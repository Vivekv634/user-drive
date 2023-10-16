require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const userTokenID = req.header('userTokenID');
    if (!userTokenID) {
        res.status(401).json('User Authentication failed');
    } else {
        try {
            const token = jwt.verify(userTokenID, process.env.TOKEN_KEY);
            req.userID = token.userID;
            next();
        } catch (error) {
            res.status(401).json('User Authentication failed');
        }
    }
}

module.exports = { authenticate };