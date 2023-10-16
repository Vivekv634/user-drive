const User = require('../models/user.model');

const getData = async (req, res) => {
    const user = await User.findById(req.userID).select('-password');
    res.json({ user });
}

const updateData = async (req, res) => {
    const { fname, lname, email } = req.body;
    await User.findByIdAndUpdate(req.userID, { fname, lname, email });
    res.json({ success: "User Data Updated" });
}

const deleteData = async (req, res) => {
    await User.findByIdAndDelete(req.userID);
    res.json({ success: "User Data Deleted" });
}
module.exports = { getData, updateData, deleteData };