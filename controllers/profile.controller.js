const express = require("express");
const { getProfile, updateProfile } = require("../services/profile.service");
const { userMiddleware } = require("../middleware/user.middleware");
const profileRouter = express.Router();
profileRouter.get('/',userMiddleware,async(req,res)=>{
    const userId = req.user.userId;
    const profile = await getProfile(userId);
    res.send(profile)
})
profileRouter.put('/update-profile:id',async(req,res)=>{
    const id = req.params.id;
    const profile = await updateProfile(id,)
})

module.exports = profileRouter