const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups',
        required: [true, 'group id is required'],
    },
    paid_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'user who paid is required'],
    },
    amount: {
        type: Number,
        required: [true, 'amount is required'],
    },
    creator_stamp: {
        type: Date,
        default: Date.now
    },
    update_stamp: {
        type: Date,
        default: Date.now
    },
});

const Transaction = mongoose.model('transaction', TransactionSchema);

function TransactionSchemaModel() {

}

TransactionSchemaModel.prototype.save = (data, callback) => {
    var newTransaction = new Transaction(data);
    newTransaction.save((error, result) => {
        console.log("Error : ", error);
        console.log("Result : ", result);
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

TransactionSchemaModel.prototype.getByGroupId = (data, callback) => {
    Transaction.find({ group_id: data.group_id }).populate('paid_by').exec(function (error, result) {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

module.exports = new TransactionSchemaModel();