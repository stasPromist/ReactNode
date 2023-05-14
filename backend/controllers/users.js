const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');
const joi = require('joi');
const bcrypt = require('bcrypt');
const { Card } = require('../models/Card');

module.exports = {
    // log in any user
    signin: async function (req, res, next) {
        try {
            const schema = joi.object({
                email: joi.string().required().min(6).max(256).email(),
                password: joi.string().required().min(6).max(1024),
            });
            const { error, value } = schema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                throw 'Unauthorized';
            }
            const user = await User.findOne({ email: value.email });
            if (!user) throw Error;
            const validPassword = await bcrypt.compare(value.password, user.password);
            if (!validPassword) throw 'Invalid password';
            const param = { email: value.email };
            const token = jwt.sign(param, config.jwt_token, { expiresIn: '72800s' });
            res.json({
                token: token,
                id: user._id,
                email: user.email,
                name: user.name,
                isBiz: user.isBiz,
                isAdmin: user.isAdmin,
                image: user.image
            });
        }
        catch (err) {
            console.log(`Error: ${err}`);
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
    },

    //Update password
    updatePassword: async function (req, res, next) {
        try {
            const schema = joi.object({
                email: joi.string().required().min(6).max(256).email(),
                password: joi.string().required().min(6).max(1024),
            });

            const { error, value } = schema.validate(req.body);
            console.log(value.email);
            if (error) {
                console.log(error.details[0].message);
                throw 'Error apdate new password';
            }

            const user = await User.findOne({ email: value.email });
            if (!user) throw Error;
            const hash = await bcrypt.hash(value.password, 10);
            const updatedUserPassword = await User.findOneAndUpdate({ email: value.email },
                { password: hash },
            )
            res.json({
                id: updatedUserPassword._id,
                email: updatedUserPassword.email,
                name: updatedUserPassword.name,
                isBiz: updatedUserPassword.isBiz,
                isAdmin: updatedUserPassword.isAdmin
            });
        }
        catch (err) {
            console.log(`Error: ${err}`);
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
    },

    //Create a new user
    signup: async function (req, res, next) {
        try {
            const schema = joi.object({
                name: joi.string().required().min(2).max(256),
                email: joi.string().min(6).max(256).required().email(),
                password: joi.string().min(6).max(1024).required(),
                isBiz: joi.boolean().required(),
                url: joi.string().min(6).max(1024),
                alt: joi.string().min(2).max(256),
                image: joi.string().min(6).max(1024),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                throw 'error sign up new user';
            }
            const user = await User.findOne({ email: value.email });
            if (user) {
                return res.status(400).json({ error: "User already registered." });
            }
            const hash = await bcrypt.hash(value.password, 10);
            const newUser = new User({
                name: value.name,
                email: value.email,
                password: hash,
                isBiz: value.isBiz,
                image: {
                    url: value.url
                        ? value.url
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                    alt: value.alt ? value.alt : "Pic Of Business Card",
                },
            });
            await newUser.save();
            res.json({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isBiz: newUser.isBiz,
                isAdmin: newUser.isAdmin,
                image: {
                    url: newUser.url,
                    alt: newUser.alt
                }
            })
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: 'error sign up new user' });
        }
    },


    details: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });
            const { error, value } = schema.validate(req.params);
            if (error) {
                console.log(error.details[0].message);
                throw 'error get details';
            }
            const user = await User.findById(value.id);
            if (!user) throw "Invalid user id, no such user.";
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                isBiz: user.isBiz,
                isAdmin: user.isAdmin,
            });
        }
        catch (err) {
            res.status(400).json({ error: "Invalid data" });
            console.log(`Error: ${err}`);
        }
    },

    //Get User's collection of favourite cards
    getFavCards: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });
            const { error, value } = schema.validate(req.params);
            if (error) {
                console.log(error.details[0].message);
                throw 'error get details';
            }
            console.log(req.body)
            const user = await User.findById(value.id);
            if (user.favCards.length > 0) {
                const favCards = await Card.find({ "_id": { "$in": user.favCards } });
                res.json(favCards);
            }
        }
        catch (err) {
            res.status(400).json({ error: `error get cards of a user` });
            console.log(err.message);
        }
    },

    //Remove card from favourite card 
    delFavCard: async function (req, res, next) {
        try {
            console.log(req.body)
            const user = await User.findOne({ _id: req.body.currentId });
            console.log(user)
            const index = user.favCards.indexOf(req.body._id);
            if (index > -1) {
                user.favCards.splice(index, 1);
                user.save();
            };
            const deleted = await Card.findOneAndRemove({
                _id: value.id,
                user_id: user._id,
            });
            if (!deleted) throw "failed to delete";
            res.json(deleted);
        }
        catch (err) {
            res.status(400).json({ error: `error delete card of a user` });
            console.log(err.message);
        }
    },
    
    //Add card to favorite list
    updateDetailsofUser: async function (req, res, next) {
        console.log("Hello");
        try {
            console.log(req.body)
            const user = await User.findOne({ _id: req.body.currentId });
            console.log(user.id)
            if (!user.favCards.includes(req.body._id)) {
                user.favCards.push(req.body._id);
                user.save();
            }
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error add card` });
        }
    },

    //Get all users(except admin user)
    list: async function (req, res, next) {
        try {
            const user = await User.find({ isAdmin: false });
            res.json(user);
        }
        catch (err) {
            res.status(400).json({ error: `error get cards of a user` });
            console.log(err.message);
        }
    },

    // Show user by ID
    ShowUser: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });
            const { error, value } = schema.validate(req.params);
            if (error) {
                console.log(error.details[0].message);
                throw `error get details`;
            }
            const user = await User.findById(value.id);
            if (!user) throw "Invalid card id, no such user.";
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                isBiz: user.isBiz,
                isAdmin: user.isAdmin,
                favCards: user.favCards
            });
        }
        catch (err) {
            res.status(400).json({ error: "Invalid data" });
            console.log(`Error: ${err}`);
        }
    },
    
    //Delete user 
    deleteUserOne: async function (req, res) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });
            const { error, value } = schema.validate(req.params);
            if (error) {
                console.log(error.details[0].message);
                throw `error delete user`;
            }
            const deleted = await User.findOneAndRemove({
                _id: value.id,
            });
            if (!deleted) throw "failed to delete";
            res.json(deleted);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error delete user` });
        }
    },
    //Update user(only status)
    updateDetails: async function (req, res, next) {
        try {
            const schema = joi.object({
                isBiz: joi.boolean().required(),
            }).min(1);
            const { error, value } = schema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                throw 'error updating user';
            }
            const filter = {
                _id: req.params.id,
            };
            const user = await User.findOneAndUpdate(filter, value);
            if (!user) throw "No user with this ID in the database";
            res.json(user);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error updating user` });
        }
    },
}
