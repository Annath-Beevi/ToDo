const {CustomApiError} = require('../Error/custom-error')
const {customApiSuccess} = require('../Success/custom-success')

const errorHandleMiddleware = (err, req, res, next) =>{
    // return res.status(500).json({msg: "something went wrong"})

    if(err instanceof CustomApiError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    if(req instanceof customApiSuccess){
        return res.status(req.statusCode).json({msg: req.message})
    }
    return res.status(500).json({msg: "Something went wrong, Please try again later"})
};
module.exports = errorHandleMiddleware