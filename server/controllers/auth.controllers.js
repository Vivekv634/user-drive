require('dotenv').config();
const User = require('../models/user.model');
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { fname, lname, email, password } = req.body;
    try {
        if (validator.validate(email)) {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(409).json({ error: "Email already is in use" });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ fname, lname, email, password: hashedPassword });
                await newUser.save();
                return res.json({ success: "You have been registered successfully!" });
            }
        } else {
            return res.status(401).json({ error: "Please check your credentials" });
        }
    } catch (error) {
        console.error("Error: " + error.message);
        return res.status(500).json({ error: "Internal server error occured!" });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (validator.validate(email)) {
            const userExists = await User.findOne({ email });
            if (userExists) {
                const checkPassword = bcrypt.compare(password, userExists.password);
                if (checkPassword) {
                    const token = jwt.sign({ userID: userExists._id }, process.env.TOKEN_KEY);
                    res.status(200).json({userToken: token});
                }
            } else {
                return res.status(404).json({ error: "Please check your credentials" });
            }
        } else {
            return res.status(401).json({ error: "Please check your credentials" });
        }
    } catch (error) {
        console.error("Error: " + error.message);
        return res.status(500).json({ error: "Internal server error occured!" });
    }
}

module.exports = { registerUser, loginUser };