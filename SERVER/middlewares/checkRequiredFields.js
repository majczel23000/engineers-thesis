let objects = require('../models/requiredFields');

module.exports = {
    checkRequiredFields: function(name, requestBody){
        let result = {
            message: '',
            success: true
        };
        let collection = objects.objects[name];
        for (let i = 0; i < collection.length; i++) {
            if (requestBody[collection[i]] === '' || requestBody[collection[i]] === undefined || requestBody[collection[i]] === null) {
                result.message += 'Field ' + `'${collection[i]}'` + ' is required. ';
                result.success = false;
            }
        }
        return result;
    }
}