module.exports = {
    createResponse: function(code, message, data = null){
        const response = new Object();
        response.code = code;
        response.message = message;
        if (data != null )
            response.data = data;
        return response;
    }
}