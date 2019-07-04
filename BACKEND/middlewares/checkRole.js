let errorResponse = require('../models/errorResponseModel').error;
let messages = require('../environments/environments').messages;
let roleController = require('../controllers/roleController');
import Role from '../models/roleModel.js';

module.exports = {
    checkRoleAndStatus: function(roleName) {
        return (request, response, next) => {
            if (!request.user.roles.length) {
                return response.status(401).json(errorResponse(401, messages.global.errors.permission));
            } else if (request.user.status === 'INACTIVE') {
                return response.status(401).json(errorResponse(401, messages.global.errors.userInactive));
            } else if (request.user.status === 'DELETED') {
                return response.status(401).json(errorResponse(401, messages.global.errors.userDeleted));
            } else {
                let status = false;
                for (let i = 0; i < request.user.roles.length; i++) {
                    if (request.user.roles[i] === roleName) {
                        Role.find({code: roleName}, (err, role) => {
                            if (role[0].status === 'ACTIVE') {
                                next()
                            } else if (role[0].status === 'INACTIVE') {
                                return response.status(401).json(errorResponse(401, messages.global.errors.roleInactive));
                            } else {
                                return response.status(401).json(errorResponse(401, messages.global.errors.permission));
                            }
                        });
                    }
                }
            }
        }
    }
}