import user from '../controllers/userController';
import role from '../controllers/roleController';
import statistics from '../controllers/statisticsController';
let verifyToken = require('../middlewares/verifyToken').verifyToken;
let checkRoleAndStatus = require('../middlewares/checkRole').checkRoleAndStatus;
let roles = require('../environments/environments').roles;

export default (app) => {
    app.route('/users')
        .get(verifyToken, checkRoleAndStatus(roles.users.getAll), user.getAllUsers)
        .post(verifyToken, checkRoleAndStatus(roles.users.create), user.createUser);
    app.route('/users/:id')
        .get(verifyToken, checkRoleAndStatus(roles.users.getId), user.getUserById)
        .put(verifyToken, checkRoleAndStatus(roles.users.update), user.updateUser)
        .delete(verifyToken, checkRoleAndStatus(roles.users.delete), user.deleteUser);
    app.route('/users/:id/activate')
        .post(verifyToken, checkRoleAndStatus(roles.users.update), user.activate);
    app.route('/users/:id/deactivate')
        .post(verifyToken, checkRoleAndStatus(roles.users.update), user.deactivate);
    app.route('/users/login')
        .post(user.login);

    app.route('/roles')
        .get(verifyToken, checkRoleAndStatus(roles.roles.getAll), role.getAllRoles);
    app.route('/roles/:id')
        .get(verifyToken, checkRoleAndStatus(roles.roles.getId), role.getRoleById)
        .put(verifyToken, checkRoleAndStatus(roles.roles.update), role.updateRole);
    app.route('/roles/:id/activate')
        .post(verifyToken, checkRoleAndStatus(roles.users.update), role.activate);
    app.route('/roles/:id/deactivate')
        .post(verifyToken, checkRoleAndStatus(roles.users.update), role.deactivate);

    app.route('/statistics')
        .get(verifyToken, statistics.statistics);
};