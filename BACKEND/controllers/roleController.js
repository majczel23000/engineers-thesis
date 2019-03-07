import mongoose from 'mongoose';
import Role from '../models/roleModel.js';
let errorResponse = require('../models/errorResponseModel').error;
let successResponse = require('../models/successResponseModel').success;

// CREATE: Create new role and return role node
exports.createRole = (req, res) => {
    Role.findOne({code: req.body.code}, (error, role) => {
        if (error) {
            res.send(error);
        } else if (role) {
            res.status(409).json(errorResponse(409, 'Role with specified code already exists'));
        } else {
            const newRole = new Role(req.body);
            newRole.save((err, role2) => {
                if (err) {
                    res.send(err);
                } else {
                    res.status(200).json(successResponse(200, 'Role successfully created', role2));
                }
            })
        }
    })    
}

// GET-ALL: Return all role nodes
exports.getAllRoles = (req, res) => {
    Role.find({}, (err, roles) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(successResponse(200, 'Roles successfully fetched', roles));
        }
    })
}

// GET-ID: Return role with specified id
exports.getRoleById = (req, res) => {
    Role.findById(req.params.id, (err, role) => {
        if (err) {
            res.send(err);
        } else if (role) {
            res.status(200).json(successResponse(200, 'Role successfully fetched', role));
        } else {
            res.status(404).json(errorResponse(404, 'Role with specified id not found'));
        }  
    });
};

// UPDATE: Update role and return updated role node
exports.updateRole = (req, res) => {
    req.body.updatedAt = new Date;
    Role.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, role) => {
        if (err) {
            res.send(err);
        } else if (role) {
            res.status(200).json(successResponse(200, 'Role successfully updated', role));
        } else {
            res.status(404).json(errorResponse(404, 'Role with specified id not found'));
        }
    })
};

// REMOVE: Remove role from database
exports.deleteRole = (req, res) => {
    Role.findByIdAndRemove(req.params.id, (err, role) => {
        if (err) {
            res.send(err);
        } else if (role) {
            res.status(200).json(successResponse(200, 'Role successfully removed', role));
        } else {
            res.status(404).json(errorResponse(404, 'Role with specified id not found'));
        }
    })
};