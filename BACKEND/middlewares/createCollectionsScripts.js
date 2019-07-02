let MongoClient = require('mongodb').MongoClient;
import Role from '../models/roleModel.js';

module.exports = {
    createRoles: function() {
        let date = new Date();
        let roles = [
            { code: 'USERS/GET_ALL', name: 'Get all users', description: 'Get all users', createdAt: date },
            { code: 'USERS/GET_ID', name: 'Get specified user', description: 'Get specified user', createdAt: date },
            { code: 'USERS/CREATE', name: 'Create user', description: 'Create user', createdAt: date },
            { code: 'USERS/UPDATE', name: 'Update user', description: 'Update user', createdAt: date },
            { code: 'USERS/DELETE', name: 'Delete user', description: 'Delete user', createdAt: date },
            { code: 'ROLES/GET_ALL', name: 'Get all roles', description: 'Get all roles', createdAt: date },
            { code: 'ROLES/GET_ID', name: 'Get specified roles', description: 'Get specified role', createdAt: date },
            { code: 'ROLES/UPDATE', name: 'Update role', description: 'Update role', createdAt: date }
        ];
        MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
            if(err)
                console.log("Error: starting connection before creating Roles collection.");
            let dbo = db.db("cms");
            dbo.dropCollection("roles", function(err, red){});
            Role.insertMany(roles, (err, res) => {});
        })

    }
}