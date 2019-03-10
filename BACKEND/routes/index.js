import user from '../controllers/userController';
import role from '../controllers/roleController';
let verifyToken = require('../middlewares/verifyToken').verifyToken;

export default (app) => {
    app.route('/users')
        .get(verifyToken, user.getAllUsers)
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