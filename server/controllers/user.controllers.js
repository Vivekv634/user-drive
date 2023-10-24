const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const getData = async (req, res) => {
    const user = await User.findById(req.userID).select('-password');
    res.json({ user });
}

const updateData = async (req, res) => {
    const { fname, lname } = req.body;
    await User.findByIdAndUpdate(req.userID, { fname, lname });
    res.json({ success: "Data Updated successfully!" });
}

const deleteData = async (req, res) => {
    await User.findByIdAndDelete(req.userID);
    res.json({ success: "User Data Deleted" });
}

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const existedUser = await User.findById(req.userID);
    if (existedUser) {
        const checkPassword = bcrypt.compare(oldPassword, existedUser.password);
        if (checkPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.findByIdAndUpdate(req.userID, { password: hashedPassword });
            res.json({ success: "Password Updated Successfully!" });
        } else {
            res.json({ error: "Old Password Doesn\'t match" });
        }
    }
}
module.exports = { getData, updateData, deleteData, changePassword };