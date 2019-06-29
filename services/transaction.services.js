const transactionModel = require('../app/models/transaction.model');

exports.addData = (data, callback) => {
    transactionModel.save(data, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.getData = (data, callback) => {
    transactionModel.getByGroupId(data, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

exports.getDebtData = (data, callback) => {
    transactionModel.getByGroupId(data, (error, result) => {
        if (error) {
            callback(error, null);
        } else {
            // callback(null, result);
            var debtData = [];
            for (var i = 0; i < result.length; i++) {
                var index = -1;
                var data = {
                    email: result[i].paid_by.email,
                    amount: result[i].amount,
                    share: []
                };
                // if (debtData.length == 0) {
                debtData.push(data);
                // }
                // if (debtData.length > 0) {
                // debtData.forEach(element => {
                // for (var j = 0; j < debtData.length; j++) {
                //     console.log("debtData : ",debtData[j]);
                //     console.log("data : ",data);
                //     if (debtData[j].email !== data.email) {
                //         debtData.push(data);
                //     }
                // }
                // });
                // index = debtData.indexOf(data);
                // if (index == -1) {
                //     debtData.push(data);
                // }
                // }
                //  else {
                //     for (var j = 0; j < debtData.length; j++) {
                //         // if (debtData[j].email == data.email) {
                //         //     debtData[j].amount = debtData[j].amount + data.amount;
                //         // } else if (debtData[j].email != data.email) {
                //         //     debtData.push(data);
                //         // }
                //         // var index = debtData.indexOf(data);
                //         if (debtData[j].email != data.email) {
                //             debtData.push(data);
                //         }
                //     }

                // }
            }
            var newArray = [];
            // for (var i = 0; i < debtData.length; i++) {
            debtData.forEach(element => {
                if (newArray.length == 0) {
                    newArray.push(element)
                } else {
                    var index = -1;
                    // index = newArray.indexOf(element)
                    for (var j = 0; j < newArray.length; j++) {
                        if (element.email == newArray[j].email) {
                            index = j;
                        }
                    }
                    if (index == -1) {
                        newArray.push(element)
                    } else {
                        newArray[index].amount = newArray[index].amount + element.amount;
                    }
                }
            });
            // }
            var split = [];
            var debt = [];
            for (var i = 0; i < newArray.length; i++) {
                var share = (newArray[i].amount) / newArray.length;
                split.push(share);
                // newArray[i].share = [];
                for (var j = 0; j < newArray.length; j++) {
                    if (newArray[i].email != newArray[j].email) {
                        var email = newArray[i].email;
                        newArray[j].share.push({ email: email, share: share })
                    }
                }
            }
            // }
            // callback(null, { array: newArray, split: split })
            callback(null, newArray);
            }
        });
};