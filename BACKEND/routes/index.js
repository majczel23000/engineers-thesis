import user from '../controllers/userController';
import role from '../controllers/roleController';
import statistics from '../controllers/statisticsController';
import faq from '../controllers/faqController';
import menu from '../controllers/menuController';
let verifyToken = require('../middlewares/verifyToken').verifyToken;
let checkRoleAndStatus = require('../middlewares/checkRole').checkRoleAndStatus;
let roles = require('../environments/environments').roles;

export default (app) => {
    // === USERS ===
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

    // === ROLES ===
    app.route('/roles')
        .get(verifyToken, checkRoleAndStatus(roles.roles.getAll), role.getAllRoles);
    app.route('/roles/:id')
        .get(verifyToken, checkRoleAndStatus(roles.roles.getId), role.getRoleById)
        .put(verifyToken, checkRoleAndStatus(roles.roles.update), role.updateRole);
    app.route('/roles/:id/activate')
        .post(verifyToken, checkRoleAndStatus(roles.users.update), role.activate);
    app.route('/roles/:id/deactivate')
        .post(verifyToken, checkRoleAndStatus(roles.users.update), role.deactivate);

    // === STATISTICS ===
    app.route('/statistics')
        .get(verifyToken, statistics.statistics);

    // === FAQS ===
    app.route('/faq')
        .post(faq.createFaq)
        .get(faq.getAllFaqs);
    app.route('/faq/:id')
        .get(faq.getFaqById)
        .delete(faq.deleteFaq)
        .put(faq.updateFaq);
    app.route('/faq/:id/activate')
        .post(faq.activate);
    app.route('/faq/:id/deactivate')
        .post(faq.deactivate);

    // === MENUS ===
    app.route('/menu')
        .post(menu.createMenu)
        .get(menu.getAllMenus);
    app.route('/menu/:id')
        .put(menu.updateMenu)
        .get(menu.getMenuById)
        .delete(menu.deleteMenu);
    app.route('/menu/:id/activate')
        .post(menu.activate);
    app.route('/menu/:id/deactivate')
        .post(menu.deactivate);
};