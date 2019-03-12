import user from '../controllers/userController';
import role from '../controllers/roleController';
let verifyToken = require('../middlewares/verifyToken').verifyToken;
let checkRole = require('../middlewares/checkRole').checkRole;

export default (app) => {
    app.route('/users')
        .get(verifyToken, checkRole('USERS/GET_ALL'), user.getAllUsers)
        .post(verifyToken, checkRole('USERS/CREATE'), user.createUser);
    app.route('/users/:id')
        .get(verifyToken, checkRole('USERS/GET_ID'), user.getUserById)
        .put(verifyToken, checkRole('USERS/UPDATE'), user.updateUser)
        .delete(verifyToken, checkRole('USERS/DELETE'), user.deleteUser);
    app.route('/users/login')
        .post(user.login);

    app.route('/roles')
        .get(verifyToken, checkRole('ROLES/GET_ALL'), role.getAllRoles)
        .post(verifyToken, checkRole('ROLES/CREATE'), role.createRole);
    app.route('/roles/:id')
        .get(verifyToken, checkRole('ROLES/GET_ID'), role.getRoleById)
        .put(verifyToken, checkRole('ROLES/UPDATE'), role.updateRole)
        .delete(verifyToken, checkRole('ROLES/DELETE'), role.deleteRole);
};