import User from '../models/userModel.js';
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let errorResponse = require('../models/errorResponseModel').error;
let successResponse = require('../models/successResponseModel').success;
let validateEmail = require('../middlewares/validators').validateEmail;
let validateFields = require('../middlewares/validators').validateFields;
let BRYPT_SALT_ROUNDS = 12;
let messages = require('../environments/environments').messages;

// CREATE: Create new user and return user node
exports.createUser = (req, res) => {
    const validateFieldsResult = validateFields(User.schema.obj, req.body);
    // firstName, lastName, email, password
    if (!validateFieldsResult.status) {
        res.status(409).send(errorResponse(409, validateFieldsResult.message));
        return;
    }
    if (!validateEmail(req.body.email)) {
        res.status(409).send(errorResponse(409, messages.users.errors.email));
        return;
    }
    if (!(/^[a-zA-Z]+$/.test(req.body.firstName))) {
        res.status(409).send(errorResponse(409, messages.users.errors.firstName));
        return;
    }
    if (!(/^[a-zA-Z]+$/.test(req.body.lastName))) {
        res.status(409).send(errorResponse(409, messages.users.errors.lastName));
        return;
    }
    if (req.body.password.length < 6) {
        res.status(409).send(errorResponse(409, messages.users.errors.password));
        return;
    }

    User.findOne({email: req.body.email}, (error, user) => {
        if (error) {
            res.send(error);
        } else if (user) {
            res.status(409).json(errorResponse(409, messages.users.errors.emailExists));
        } else {
            bcrypt.hash(req.body.password, BRYPT_SALT_ROUNDS).then(function(hashedPassword){
                const newUser = new User(req.body);
                newUser.password = hashedPassword;
                newUser.save((err, user2) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.status(200).json(successResponse(200, messages.users.success.created, user2));
                    }
                }) 
            });           
        }
    })
}

// GET-ALL: Return all user nodes
exports.getAllUsers = (req, res) => {
    User.find({}, 'firstName lastName email', (err, users) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(successResponse(200, messages.users.success.fetched, users));
        }
    })
}

// GET-ID: Return user with specified id
exports.getUserById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
        } else if (user) {
            res.status(200).json(successResponse(200, messages.users.success.fetched, user));
        } else {
            res.status(404).json(errorResponse(404, messages.users.errors.idNotFound));
        }  
    });
};

// UPDATE: Update user and return updated user node
exports.updateUser = (req, res) => {
    req.body.updatedAt = new Date;
    if (req.body.email)
        delete req.body.email;
    if (req.body.createdAt)
        delete req.body.createdAt;
    if (req.body.updatedAt)
        delete req.body.updatedAt;
    if (!(/^[a-zA-Z]+$/.test(req.body.firstName))) {
        res.status(409).send(errorResponse(409, messages.users.errors.firstName));
        return;
    }
    if (!(/^[a-zA-Z]+$/.test(req.body.lastName))) {
        res.status(409).send(errorResponse(409, messages.users.errors.lastName));
        return;
    }
    if (req.body.password.length < 6) {
        res.status(409).send(errorResponse(409, messages.users.errors.password));
        return;
    }
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
        } else if (user) {
            res.status(200).json(successResponse(200, messages.users.success.updated, user));
        } else {
            res.status(404).json(errorResponse(404, messages.users.errors.idNotFound));
        }
    })
};

// REMOVE: Remove user from database
exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
        } else if (user) {
            res.status(200).json(successResponse(200, messages.users.success.removed, user));
        } else {
            res.status(404).json(errorResponse(404, messages.users.errors.idNotFound));
        }
    })
};

// LOGIN: Login user to system
exports.login = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            res.send(err);
        } else{
            if(!user){
                res.status(404).json(errorResponse(404, messages.users.errors.emailNotFound));
            } else if(!bcrypt.compareSync(req.body.password, user.password)){
                res.status(402).json(errorResponse(402, messages.users.errors.wrongPassword));
            } else {
               let payload = { subject: user };
               let token = jwt.sign(payload, 'secretKey');
               res.status(200).json(successResponse(200, messages.users.success.loggedIn, {token: token, user}));
           }
        }
    });
}