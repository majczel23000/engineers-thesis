module.exports = {
    createResponse: function(code, message, data){
        const response = new Object();
        response.code = code;
        response.message = message;
        response.data = data;
        return response;
    }
}