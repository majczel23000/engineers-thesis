import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
let successResponse = require('../models/successResponseModel').success;
let messages = require('../environments/environments').messages;

// STATISTICS: Get all statistics
exports.statistics = (req, res) => {
    let statisticsResponse = {
        user: '',
        role: ''
    }
    // User statistics:
    User.find({}, 'status', (err, users) => {
        if (err) {
            res.send(err);
        } else {
            let activeUsers = 0;
            let inactiveUsers = 0;
            let deletedUsers = 0;
            for (let i = 0; i < users.length; i++) {
                if (users[i].status === 'ACTIVE') {
                    activeUsers++;
                } else if (users[i].status === 'INACTIVE') {
                    inactiveUsers++;
                } else {
                    deletedUsers++;
                }
            }
            statisticsResponse.user = {
                active: activeUsers,
                inactive: inactiveUsers,
                deleted: deletedUsers
            }
            // Role statistics
            Role.find({}, 'status', (err, roles) => {
                if (err) {
                    res.send(err);
                } else {
                    let activeRoles = 0;
                    let inactiveRoles = 0;
                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].status === 'ACTIVE') {
                            activeRoles++;
                        } else {
                            inactiveRoles++;
                        }
                    }
                    statisticsResponse.role = {
                        active: activeRoles,
                        inactive: inactiveRoles
                    }
                    res.status(200).json(successResponse(200, messages.statistics.success.fetched, statisticsResponse));
                }
            })
        }
    })
}
