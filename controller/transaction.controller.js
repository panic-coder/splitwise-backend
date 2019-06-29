const constantsParam = require('../constants/static.js');
const transactionService = require('../services/transaction.services');

exports.addData = (req, res, next) => {
    var responseResult = {};
    try {
        req.checkBody('group_id', 'group id is required').notEmpty();
        req.checkBody('paid_by', 'paid by is required').notEmpty();
        console.log(req.body);
        var errors = req.validationErrors();
        if (errors) {
            responseResult.status = false;
            responseResult.message = errors[0].msg;
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else {
            transactionService.addData(req.body, (error, result) => {
                if (error) {
                    responseResult.status = false;
                    responseResult.message = "Internal Server Error";
                    return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.message = "Transaction Added successfully";
                    res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
                }
            });
        }
    } catch (err) {
        responseResult.status = false;
        responseResult.message = "Internal Server Error";
        return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
    }
};

exports.getData = (req, res, next) => {
    var responseResult = {};
    try {
        req.checkBody('group_id', 'group id is required').notEmpty();
        console.log(req.body);
        var errors = req.validationErrors();
        if (errors) {
            responseResult.status = false;
            responseResult.message = errors[0].msg;
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else {
            transactionService.getData(req.body, (error, result) => {
                if (error) {
                    responseResult.status = false;
                    responseResult.message = "Internal Server Error";
                    return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.message = "Transaction retrived successfully";
                    responseResult.data = result;
                    res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
                }
            });
        }
    } catch (err) {
        responseResult.status = false;
        responseResult.message = "Internal Server Error";
        return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
    }
};

exports.getDebtData = (req, res, next) => {
    var responseResult = {};
    try {
        req.checkBody('group_id', 'group id is required').notEmpty();
        console.log(req.body);
        var errors = req.validationErrors();
        if (errors) {
            responseResult.status = false;
            responseResult.message = errors[0].msg;
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else {
            transactionService.getDebtData(req.body, (error, result) => {
                if (error) {
                    responseResult.status = false;
                    responseResult.message = "Internal Server Error";
                    return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.message = "Transaction retrived successfully";
                    responseResult.data = result;
                    res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
                }
            });
        }
    } catch (err) {
        responseResult.status = false;
        responseResult.message = "Internal Server Error";
        return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
    }
};
