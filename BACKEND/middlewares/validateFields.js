module.exports = {
    validateFields: function(object, data) {
        let result = {
            message: '',
            status: true
        };
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                if (object[key].required && (data[key] === '' || data[key] === null || data[key] === undefined)) {
                    result.message += 'Field ' + key + ' can`t be empty. ';
                    result.status = false;
                }
            }
        }
        return result;
    } 
}