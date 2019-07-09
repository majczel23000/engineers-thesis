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
    },
    validateMenuElements: function(elements) {
        if (elements) {
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].hasOwnProperty('url') && elements[i].hasOwnProperty('text')) {
                    if (!elements[i].url || !elements[i].text) {
                        return false;
                    } else if (elements[i].hasOwnProperty('children') && elements[i].children) {
                        return module.exports.validateMenuElements(elements[i].children);
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    }
}