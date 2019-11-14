import user from '../controllers/userController';
import role from '../controllers/roleController';
import faq from '../controllers/faqController';
import menu from '../controllers/menuController';
import page from '../controllers/pageController';
import image from '../controllers/imageController';
import settings from '../controllers/settingsController';
import dictionaries from '../controllers/dictionariesController';
import carousels from '../controllers/carouselController';
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
        .post(verifyToken, checkRoleAndStatus(roles.pages.create), page.createPage)
        .get(verifyToken, checkRoleAndStatus(roles.pages.getAll), page.getAllPages);
    app.route('/page/:id')
        .get(verifyToken, checkRoleAndStatus(roles.pages.getId), page.getPageById)
        .delete(verifyToken, checkRoleAndStatus(roles.pages.delete), page.deletePage)
        .put(verifyToken, checkRoleAndStatus(roles.pages.update), page.updatePage);
    app.route('/page/:id/activate')
        .post(verifyToken, checkRoleAndStatus(roles.pages.update), page.activate);
    app.route('/page/:id/deactivate')
        .post(verifyToken, checkRoleAndStatus(roles.pages.update), page.deactivate);

    // === IMAGES ===
    app.route('/image')
        .post(verifyToken, checkRoleAndStatus(roles.images.create), image.addImage)
        .get(verifyToken, checkRoleAndStatus(roles.images.getAll), image.getAllImages);
    app.route('/image/:id')
        .get(verifyToken, checkRoleAndStatus(roles.images.getId), image.getImageById)
        .delete(verifyToken, checkRoleAndStatus(roles.images.delete), image.deleteImage);
    app.route('/image/:id/activate')
        .post(verifyToken, checkRoleAndStatus(roles.images.update), image.activate);
    app.route('/image/:id/deactivate')
        .post(verifyToken, checkRoleAndStatus(roles.images.update), image.deactivate);

    // === SETTINGS ===
    app.route('/settings')
        .post(verifyToken, checkRoleAndStatus(roles.settings.create), settings.createSettings)
        .get(verifyToken, checkRoleAndStatus(roles.settings.getAll), settings.getAllSettings);
    app.route('/settings/:id')
        .get(verifyToken, checkRoleAndStatus(roles.settings.getId), settings.getSettingById)
        .delete(verifyToken, checkRoleAndStatus(roles.settings.delete), settings.deleteSetting)
        .put(verifyToken, checkRoleAndStatus(roles.settings.update), settings.update);
    app.route('/settings/:id/activate')
        .post(verifyToken, checkRoleAndStatus(roles.settings.update), settings.activate);
    app.route('/settings/:id/deactivate')
        .post(verifyToken, checkRoleAndStatus(roles.settings.update), settings.deactivate);

    // === DICTIONARIES ===
    app.route('/dictionaries')
        .post(verifyToken, checkRoleAndStatus(roles.dictionaries.create), dictionaries.createDictionary)
        .get(verifyToken, checkRoleAndStatus(roles.dictionaries.getAll), dictionaries.getAllDictionaries);
    app.route('/dictionaries/:id')
        .get(verifyToken, checkRoleAndStatus(roles.dictionaries.getId), dictionaries.getDictionaryById)
        .delete(verifyToken, checkRoleAndStatus(roles.dictionaries.delete), dictionaries.deleteDictionary)
        .put(verifyToken, checkRoleAndStatus(roles.dictionaries.update), dictionaries.update);
    app.route('/dictionaries/:id/activate')
        .post(verifyToken, checkRoleAndStatus(roles.dictionaries.update), dictionaries.activate);
    app.route('/dictionaries/:id/deactivate')
        .post(verifyToken, checkRoleAndStatus(roles.dictionaries.update), dictionaries.deactivate);

    // === CAROUSELS ===
    app.route('/carousels')
        .post(verifyToken, checkRoleAndStatus(roles.carousels.create), carousels.createCarousel)
        .get(verifyToken, checkRoleAndStatus(roles.carousels.getAll), carousels.getAllCarousels);
    app.route('/carousels/:id')
        .get(verifyToken, checkRoleAndStatus(roles.carousels.getId), carousels.getCarouselById)
        .delete(verifyToken, checkRoleAndStatus(roles.carousels.delete), carousels.deleteCarousel)
        .put(verifyToken, checkRoleAndStatus(roles.carousels.update), carousels.update);
    app.route('/carousels/:id/activate')
        .post(verifyToken, checkRoleAndStatus(roles.carousels.update), carousels.activate);
    app.route('/carousels/:id/deactivate')
        .post(verifyToken, checkRoleAndStatus(roles.carousels.update), carousels.deactivate);
};