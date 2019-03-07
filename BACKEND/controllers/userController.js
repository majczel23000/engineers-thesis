import mongoose from 'mongoose';
import User from '../models/userModel.js';
let errorResponse = require('../models/errorResponseModel').error;
let successResponse = require('../models/successResponseModel').success;

// Create new user and return user node
exports.createUser = (req, res) => {
    User.findOne({email: req.body.email}, (error, user) => {
        if (error) {
            res.send(error);
        }
        if (user) {
            res.status(409).json(errorResponse(409, 'User with specified email already exists'));
        } else {
            const newUser = new User(req.body);
            newUser.save((err, user2) => {
                if (err) {
                    res.send(err);
                }
                
                res.status(200).json(successResponse(200, 'User successfully created', user2));
            })
        }
    })    
}

exports.getUserById = (req, res) => {
    user.findById(req.body.id, (err, user) => {
        if (err) {
            res.send(err);
        }

        res.json(user);
    });
};

// Return all user nodes
exports.getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }

        res.status(200).json(successResponse(200, 'Users successfully fetched', users));
    })
}

exports.updateUser = (req, res) => {
    user.findOneAndUpdate({_id: req.body.id}, req.body, (err, user) => {
        if (err) {
            res.send(err);
        }

        res.json(user);
    });
};

exports.deleteUser = (req, res) => {
    user.remove({_id: req.body.id}, (err) => {
        if (err) {
            res.send(err);
        }

        res.json({
            message: `user ${req.body.id} successfully deleted`
        });
    });
};