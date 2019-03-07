import user from '../controllers/userController';

export default (app) => {
    app.route('/users')
        .get(user.getAllUsers)
        .post(user.createUser);
    app.route('/users/:id')
        .get(user.getUserById)
        .put(user.updateUser)
        .delete(user.deleteUser);
};