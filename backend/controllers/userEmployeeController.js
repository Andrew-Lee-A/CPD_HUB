const User = require('../models/userModel')

//Get all booked CPD
const getUserEmployees = async (req, res) => {
    const _id = req.user._id
    const user = await User.findById({_id})
    const manager = _id

    if(user.permission === 'admin'){
      const employees = await User.find({manager: '63562c99479c74bbd5abafd0'}).sort({createdAt: -1})
      console.log(employees)
      res.status(200).json(employees)
     } else {
      res.status(401).json({ error: 'Invalid Permission'})
    }
}

module.exports = {
    getUserEmployees,
}