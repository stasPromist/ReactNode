const joi = require('joi');
const { User } = require('../models/User');
const { Card } = require('../models/Card');

module.exports = {
    //Get all cards that created by all users
    list: async function (req, res, next) {
        try {
            const result = await Card.find();
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting cards' });
        }
    },

    //Show one specific card by ID
    details: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });
            const { error, value } = schema.validate(req.params);
            if (error) {
                console.log(error.details[0].message);
                throw `error get details`;
            }
            const card = await Card.findById(value.id);
            if (!card) throw "Invalid card id, no such card.";
            res.json(card);
        }
        catch (err) {
            res.status(400).json({ error: "Invalid data" });
            console.log(`Error: ${err}`);
        }
    },



    //Get all cards created by this user
    userCards: async function (req, res, next) {
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
            if (!user || !user.isBiz) throw "Invalid user id, no such user.";
            const cards = await Card.find({ user_id: user._id });
            res.json(cards);
        }
        catch (err) {
            res.status(400).json({ error: `error get cards of a user` });
            console.log(err.message);
        }
    },


    //Create a new Card
    addNew: async function (req, res, next) {
        try {
            console.log(req.body)
            const user = await User.findOne({ email: req.token.email });
            if (!user || !user.isBiz) throw "Not a business user";
            const schema = joi.object({
                title: joi.string().min(2).max(256).required(),
                category: joi.string().min(2).max(256).required(),
                description: joi.string().min(2).max(1024).required(),
                ingredients: joi.string().min(2).max(256).required(),
                address: joi.string().min(2).max(256).required(),
                phone: joi.string().min(9).max(14).required(),
                url: joi.string().min(6).max(1024),
                alt: joi.string().min(2).max(256),
                image: joi.string().min(6).max(1024),
            });
            const { error, value } = schema.validate(req.body);
            console.log(value)
            if (error) {
                console.log(error.details[0].message);
                throw 'error add card';
            }
            const card = new Card({
                title: value.title,
                category: value.category,
                description: value.description,
                ingredients: value.ingredients,
                address: value.address,
                phone: value.phone,
                image: {
                    url: value.url
                        ? value.url
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                    alt: value.alt ? value.alt : "Pic Of Business Card",
                },
                bizNumber: Math.floor(Math.random() * 10000000),
                user_id: user._id,
            });
            const newCard = await card.save();
            res.json(newCard);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error adding card` });
        }
    },
    
    //Update card 
    updateDetails: async function (req, res, next) {
        try {
            const user = await User.findOne({ email: req.token.email });
            if (!user || !user.isBiz) throw "Not a business user";
            const schema = joi.object({
                title: joi.string().min(2).max(256).required(),
                category: joi.string().min(2).max(256).required(),
                description: joi.string().min(2).max(1024).required(),
                ingredients: joi.string().min(2).max(256).required(),
                address: joi.string().min(2).max(256).required(),
                phone: joi.string().min(9).max(14).required(),
                image: {
                    url: joi.string().min(6).max(1024),
                    alt: joi.string().min(2).max(256),
                }
            }).min(1);
            const { error, value } = schema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                throw 'error updating card';
            }
            const filter = {
                _id: req.params.id,
                userID: user._id,
            };
            const card = await Card.findOneAndUpdate(filter, value);
            if (!card) throw "No card with this ID in the database";
            const uCard = await Card.findById(card._id);
            res.json(uCard);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error updating card` });
        }
    },

    //Remove card from the list(not favorite list)
    deleteCard: async function (req, res, next) {
        try {
            const user = await User.findOne({ email: req.token.email });
            if (!user || !user.isBiz) throw "Not a business user";
            const schema = joi.object({
                id: joi.string().required(),
            });
            const { error, value } = schema.validate(req.params);
            if (error) {
                console.log(error.details[0].message);
                throw `error delete card`;
            }
            const allUsers = await User.find({});
            allUsers.forEach((aUser) => {
                const index = aUser.favCards.indexOf(value.id);
                if (index > -1) {
                    aUser.favCards.splice(index, 1);
                    aUser.save();
                }
            });
            const deleted = await Card.findOneAndRemove({
                _id: value.id,
                user_id: user._id,
            });

            if (!deleted) throw "failed to delete";
            res.json(deleted);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error delete card` });
        }
    },
}