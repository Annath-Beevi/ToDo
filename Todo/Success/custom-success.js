class customApiSuccess extends Request{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomSuccess = (msg, statusCode) =>{
    return new customApiSuccess(msg, statusCode)
}

module.exports = {customApiSuccess, createCustomSuccess}