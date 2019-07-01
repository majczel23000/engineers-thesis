import user from '../controllers/userController';
import role from '../controllers/roleController';
let verifyToken = require('../middlewares/verifyToken').verifyToken;
let checkRole = require('../middlewares/checkRole').checkRole;
let roles = require('../environments/environments').roles;

export default (app) => {
    app.route('/users')
        .get(verifyToken, checkRole(roles.users.getAll), user.getAllUsers)
        .post(verifyToken, checkRole(roles.users.create), user.createUser);
    app.route('/users/:id')
        .get(verifyToken, checkRole(roles.users.getId), user.getUserById)
        .put(verifyToken, checkRole(roles.users.update), user.updateUser)
        .delete(verifyToken, checkRole(roles.users.delete), user.deleteUser);
    app.route('/users/login')
        .post(user.login);

    app.route('/roles')
        .get(verifyToken, checkRole(roles.roles.getAll), role.getAllRoles)
        .post(verifyToken, checkRole(roles.roles.create), role.createRole);
    app.route('/roles/:id')
        .get(verifyToken, checkRole(roles.roles.getId), role.getRoleById)
        .put(verifyToken, checkRole(roles.roles.update), role.updateRole)
        .delete(verifyToken, checkRole(roles.roles.delete), role.deleteRole);
};