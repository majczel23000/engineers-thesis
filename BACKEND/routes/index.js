import user from '../controllers/userController';
import role from '../controllers/roleController';

export default (app) => {
    app.route('/users')
        .get(user.getAllUsers)
        .post(user.createUser);
    app.route('/users/:id')
        .get(user.getUserById)
        .put(user.updateUser)
        .delete(user.deleteUser);

    app.route('/roles')
        .get(role.getAllRoles)
        .post(role.createRole);
    app.route('/roles/:id')
        .get(role.getRoleById)
        .put(role.updateRole)
        .delete(role.deleteRole);
};