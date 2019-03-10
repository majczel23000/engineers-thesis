import mongoose from 'mongoose';
import User from '../models/userModel.js';
let errorResponse = require('../models/errorResponseModel').error;
let successResponse = require('../models/successResponseModel').success;
let validateEmail = require('../middlewares/validateEmail').validateEmial;

// CREATE: Create new user and return user node
exports.createUser = (req, res) => {
    User.findOne({email: req.body.email}, (error, user) => {
        if (error) {
            res.send(error);
        } else if (user) {
            res.status(409).json(errorResponse(409, 'User with specified email already exists'));
        } else {
            if(validateEmail(req.body.email)) {
                const newUser = new User(req.body);
                newUser.save((err, user2) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.status(200).json(successResponse(200, 'User successfully created', user2));
                    }
                })
            } else {
                res.status(409).send(errorResponse(409, 'Please enter valid email'));
            }
            
        }
    })    
}

// GET-ALL: Return all user nodes
exports.getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(successResponse(200, 'Users successfully fetched', users));
        }
    })
}

// GET-ID: Return user with specified id
exports.getUserById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
        } else if (user) {
            res.status(200).json(successResponse(200, 'User successfully fetched', user));
        } else {
            res.status(404).json(errorResponse(404, 'User with specified id not found'));
        }  
    });
};

// UPDATE: Update user and return updated user node
exports.updateUser = (req, res) => {
    req.body.updatedAt = new Date;
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
        } else if (user) {
            res.status(200).json(successResponse(200, 'User successfully updated', user));
        } else {
            res.status(404).json(errorResponse(404, 'User with specified id not found'));
        }
    })
};

// REMOVE: Remove user from database
exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
        } else if (user) {
            res.status(200).json(successResponse(200, 'User successfully removed', user));
        } else {
            res.status(404).json(errorResponse(404, 'User with specified id not found'));
        }
    })
};