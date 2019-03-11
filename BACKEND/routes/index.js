import user from '../controllers/userController';
import role from '../controllers/roleController';
let verifyToken = require('../middlewares/verifyToken').verifyToken;
let checkRole = require('../middlewares/checkRole').checkRole;

export default (app) => {
    app.route('/users')
        .get(verifyToken, checkRole('GET_ALL_USERSS'), user.getAllUsers)
        .post(user.createUser);
    app.route('/users/:id')
        .get(user.getUserById)
        .put(user.updateUser)
        .delete(user.deleteUser);
    app.route('/users/login')
        .post(user.login);

    app.route('/roles')
        .get(role.getAllRoles)
        .post(role.createRole);
    app.route('/roles/:id')
        .get(role.getRoleById)
        .put(role.updateRole)
        .delete(role.deleteRole);
};