let errorResponse = require('../models/errorResponseModel').error;

module.exports = {
    checkRole: function(roleName){
        return (request, response, next) => {
            if (!request.user.roles.length) {
                return response.status(401).json(errorResponse(401, "You don't have permission to perform this action!"));
            } else {
                let status = false;
                for (let i = 0; i < request.user.roles.length; i++) {
                    if (request.user.roles[i] === roleName) {
                        status = true
                    }
                }
                if (!status) {
                    return response.status(401).json(errorResponse(401, "You don't have permission to perform this action!"));
                } else {
                    next()
                }
            }
            
        }
    }
}