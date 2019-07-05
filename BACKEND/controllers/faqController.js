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
}

// GET ALL: Return all faqs nodes
exports.getAllFaqs = (req, res) => {
    Faq.find({status: { $in: ['ACTIVE', 'INACTIVE', 'DELETED'] }}, 'code name status', (err, faqs) => {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(successResponse(200, messages.faqs.success.fetched, faqs));
        }
    })
}

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
}