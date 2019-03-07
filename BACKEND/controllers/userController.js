import mongoose from 'mongoose';
import user from '../models/userModel.js';

exports.getUserById = (req, res) => {
    user.findById(req.body.id, (err, user) => {
        if (err) {
            res.send(err);
        }

        res.json(user);
    });
};

exports.getAllUsers = (req, res) => {
    user.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }

        res.json(users);
    })
}

exports.createUser = (req, res) => {
    const newUser = new user(req.body);
    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        }

        res.json(user);
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