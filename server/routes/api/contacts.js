// Pull in dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
require("../../config/passport")(passport);

// Load User model
const User = require("../../models/User");
const Contact = require("../../models/Contact");

// @route POST api/contacts/request
// @desc Register user
// @access Public
router.post("/request", passport.authenticate('jwt', {session: false}), async (req, res) => {

    //Get requester and recipient
    await User.findById(req.user.id, (error, userReq) => {
        if(error) {
            return console.log(`Error has occurred: ${error}`);
        }
        Requester = userReq;
    });
    await User.findOne({email: req.body.email}, (error, userRec) => {
        if(error) {
            return console.log(`Error has occurred: ${error}`);
        }
        Recipient = userRec;
    });

    //Make contacts
    const docRequester = await Contact.findOneAndUpdate(
        {requester: Requester, recipient: Recipient},
        {$set: {status: 1}},
        {upsert: true, new: true}
    );
    const docRecipient = await Contact.findOneAndUpdate(
        {recipient: Requester, requester: Recipient},
        {$set: {status: 2}},
        {upsert: true, new: true}
    );

    await User.findOneAndUpdate(
        {_id: Requester.id},
        { $push: { contacts: docRequester._id }}
    );
    await User.findOneAndUpdate(
        {_id: Recipient.id},
        { $push: { contacts: docRecipient._id }}
    );
    return res.status(200).json({ msg: "Request sent"});
});

// @route POST api/contacts/accept
// @desc Register user
// @access Public
router.post("/accept", passport.authenticate('jwt', {session: false}), async (req, res) => {

    //Get requester and recipient
    await User.findById(req.user.id, (error, userReq) => {
        if(error) {
            return console.log(`Error has occurred: ${error}`);
        }
        Requester = userReq;
    });
    await User.findOne({email: req.body.email}, (error, userRec) => {
        if(error) {
            return console.log(`Error has occurred: ${error}`);
        }
        Recipient = userRec;
    });

    await Contact.findOneAndUpdate(
        { requester: Requester, recipient: Recipient },
        { $set: { status: 3 }}
    );
    await Contact.findOneAndUpdate(
        { recipient: Requester, requester: Recipient },
        { $set: { status: 3 }}
    );
    return res.status(200).json({ msg: "Concact acccepted"});
});

module.exports = router;
