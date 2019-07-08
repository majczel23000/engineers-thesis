import Faq from '../models/faqModel';
let errorResponse = require('../models/errorResponseModel').error;
let successResponse = require('../models/successResponseModel').success;
let messages = require('../environments/environments').messages;
let validateFields = require('../middlewares/validators').validateFields;

// CREATE: Create new FAQ and return new FAQ node
exports.createFaq = (req, res) => {
    req.body.status = "INACTIVE";
    const validateFieldsResult = validateFields(Faq.schema.obj, req.body);
    if (!validateFieldsResult.status) {
        res.status(409).send(errorResponse(409, validateFieldsResult.message));
        return;
    }
    if (req.body.code.length < 5) {
        res.status(409).send(errorResponse(409, messages.faqs.errors.codeLength));
        return;
    } else if (!(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(req.body.code))) {
        res.status(409).send(errorResponse(409, messages.faqs.errors.codeRegexp));
        return;
    }
    if (req.body.name.length < 5) {
        res.status(409).send(errorResponse(409, messages.faqs.errors.codeLength));
        return;
    } else if (!(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(req.body.name))) {
        res.status(409).send(errorResponse(409, messages.faqs.errors.nameRegexp));
        return;
    }

    const date = new Date();
    req.body.createdAt = date;
    req.body.updatedAt = date;
    const newFaq = new Faq(req.body);
    newFaq.save((err, faq) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(successResponse(200, messages.faqs.success.created, faq));
        }
    })
};

// GET ALL: Return all faqs nodes
exports.getAllFaqs = (req, res) => {
    Faq.find({status: { $in: ['ACTIVE', 'INACTIVE', 'DELETED'] }}, 'code name status', (err, faqs) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(successResponse(200, messages.faqs.success.fetched, faqs));
        }
    })
};

// GET ID: Return faq with specified id
exports.getFaqById = (req, res) => {
    Faq.findById(req.params.id, (err, faq) => {
        if (err) {
            res.send(err);
        } else if (faq) {
            res.status(200).json(successResponse(200, messages.faqs.success.fetched, faq));
        } else {
            res.status(404).json(errorResponse(404, messages.faqs.errors.idNotFound));
        }
    })
};

// REMOVE: Remove faq (change status flag to deleted)
exports.deleteFaq = (req, res) => {
    Faq.findByIdAndUpdate(req.params.id, { status: 'DELETED' }, { new: true }, (err, faq) => {
        if (err) {
            res.send(err);
        } else if (faq) {
            res.status(200).json(successResponse(200, messages.faqs.success.removed, faq));
        } else {
            res.status(404).json(errorResponse(404, messages.faqs.errors.idNotFound));
        }
    })
};

// ACTIVATE: Activate faq in database
exports.activate = (req, res) => {
    Faq.findByIdAndUpdate(req.params.id, { status: 'ACTIVE', updatedAt: new Date() }, { new: true }, (err, faq) => {
        if (err) {
            res.send(err);
        } else if (faq) {
            res.status(200).json(successResponse(200, messages.faqs.success.activated, faq));
        } else {
            res.status(404).json(errorResponse(404, messages.faqs.errors.idNotFound));
        }
    })
};

// DEACTIVATE: Deactivate faq in database
exports.deactivate = (req, res) => {
    Faq.findByIdAndUpdate(req.params.id, { status: 'INACTIVE', updatedAt: new Date() }, { new: true }, (err, faq) => {
        if (err) {
            res.send(err);
        } else if (faq) {
            res.status(200).json(successResponse(200, messages.faqs.success.deactivated, faq));
        } else {
            res.status(404).json(errorResponse(404, messages.faqs.errors.idNotFound));
        }
    })
};

// UPDATE: Update faq and return updated faq node
exports.updateFaq = (req, res) => {
    if (req.body.code)
        delete req.body.code;
    if (req.body.createdAt)
        delete req.body.createdAt;
    req.body.updatedAt = new Date();
    if (req.body.status)
        delete req.body.status;
    let checkElementsCorrection = true;
    if (req.body.elements) {
        for (let i = 0; i < req.body.elements.length; i++) {
            if (req.body.elements[i].hasOwnProperty('question') && req.body.elements[i].hasOwnProperty('answear')) {
                if (!req.body.elements[i].question) {
                    checkElementsCorrection = false;
                    break;
                } else if (!req.body.elements[i].answear) {
                    checkElementsCorrection = false;
                    break;
                }
            } else {
                checkElementsCorrection = false;
                break;
            }
        }
    } else {
        delete req.body.elements;
    }
    if (checkElementsCorrection) {
        Faq.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, faq) => {
            if (err) {
                res.send(err);
            } else if (faq){
                res.status(200).json(successResponse(200, messages.faqs.success.updated, faq));
            } else {
                res.status(404).json(errorResponse(404, messages.faqs.errors.idNotFound));
            }
        })
    } else {
        res.status(406).json(errorResponse(406, "Array of elements is incorrect"));
    }
}