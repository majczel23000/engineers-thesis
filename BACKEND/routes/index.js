import user from '../controllers/userController';
import role from '../controllers/roleController';
import faq from '../controllers/faqController';
import menu from '../controllers/menuController';
import page from '../controllers/pageController';
import image from '../controllers/imageController';
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


    // === FAQS ===
    app.route('/faq')
        .post(verifyToken, checkRoleAndStatus(roles.faqs.create), faq.createFaq)
        .get(verifyToken, checkRoleAndStatus(roles.faqs.getAll), faq.getAllFaqs);
    app.route('/faq/:id')
        .get(verifyToken, checkRoleAndStatus(roles.faqs.getId), faq.getFaqById)
        .delete(verifyToken, checkRoleAndStatus(roles.faqs.delete), faq.deleteFaq)
        .put(verifyToken, checkRoleAndStatus(roles.faqs.update), faq.updateFaq);
    app.route('/faq/:id/activate')
        .post(verifyToken, checkRoleAndStatus(roles.faqs.update), faq.activate);
    app.route('/faq/:id/deactivate')
        .post(verifyToken, checkRoleAndStatus(roles.faqs.update), faq.deactivate);

    // === MENUS ===
    app.route('/menu')
        .post(verifyToken, checkRoleAndStatus(roles.menus.create), menu.createMenu)
        .get(verifyToken, checkRoleAndStatus(roles.menus.getAll), menu.getAllMenus);
    app.route('/menu/:id')
        .put(verifyToken, checkRoleAndStatus(roles.menus.update), menu.updateMenu)
        .get(verifyToken, checkRoleAndStatus(roles.menus.getId), menu.getMenuById)
        .delete(verifyToken, checkRoleAndStatus(roles.menus.delete), menu.deleteMenu);
    app.route('/menu/:id/activate')
        .post(verifyToken, checkRoleAndStatus(roles.menus.update), menu.activate);
    app.route('/menu/:id/deactivate')
        .post(verifyToken, checkRoleAndStatus(roles.menus.update), menu.deactivate);

    // === PAGES ===
    app.route('/page')
        .post(page.createPage)
        .get(page.getAllPages);
    app.route('/page/:id')
        .get(page.getPageById)
        .delete(page.deletePage)
        .put(page.updatePage);
    app.route('/page/:id/activate')
        .post(page.activate);
    app.route('/page/:id/deactivate')
        .post(page.deactivate);

    // === IMAGES ===
    app.route('/image')
        .post(image.addImage)
        .get(image.getAllImages);
    app.route('/image/:id')
        .get(image.getImageById)
        .delete(image.deleteImage);
    app.route('/image/:id/activate')
        .post(image.activate);
    app.route('/image/:id/deactivate')
        .post(image.deactivate);
};