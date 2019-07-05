module.exports = {
    validateEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    validateFields: function(object, data) {
        let result = {
            message: '',
            status: true
        };
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                if (object[key].required && (data[key] === '' || data[key] === null || data[key] === undefined)) {
                    result.message += 'Field ' + key + ' is required. ';
                    result.status = false;
                }
            }
        }
        return result;
    }
}