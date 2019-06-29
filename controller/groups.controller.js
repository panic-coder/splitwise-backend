const constantsParam = require('../constants/static.js');
const groupService = require('../services/groups.services');

exports.addData = (req, res, next) => {
    var responseResult = {};
    try {
        req.checkBody('name', 'group name is required').notEmpty();
        console.log(req.body);
        var errors = req.validationErrors();
        if (errors) {
            responseResult.status = false;
            responseResult.message = errors[0].msg;
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else {
            groupService.addData(req.body, (error, result) => {
                if (error) {
                    responseResult.status = false;
                    responseResult.message = "Internal Server Error";
                    return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.message = "Group Added successfully";
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


exports.update = (req, res, next) => {
    var responseResult = {};
    try {
        req.checkBody('type', 'type is required').notEmpty();
        console.log(req.body);

        var errors = req.validationErrors();
        if (errors) {
            responseResult.status = false;
            responseResult.message = errors[0].msg;
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else {
            if (req.body.type == 'add') {
                groupService.addData(req.body, (error, result) => {
                    if (error) {
                        responseResult.status = false;
                        responseResult.message = "Internal Server Error";
                        return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
                    } else {
                        responseResult.status = true;
                        responseResult.message = "Group Updated successfully";
                        res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
                    }
                });
            } else if (req.body.type == 'remove') {

            } else {
                responseResult.status = false;
                responseResult.message = 'Type of update not defined';
                return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
            }
        }
    } catch (err) {
        responseResult.status = false;
        responseResult.message = "Internal Server Error";
        return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
    }
};