const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Prescription name is required"]
    },
    class: {
        type: String,
        required: [true, "Prescription class is required"]
    },
    reason: {
        type: String,
        required: [true, "Reason for prescription is required"]
    },
    doseAmt: {
        type: Number,
        required: [true, "Dosage Ammount is required"]
    },
    doseUnit: {
        type: String,
        required: [true, "Dosage units are required"]
    },
    instructions: {
        type: String,
        required: [true, "Prescription instructions are required"]
        // ex. Take by mouth twice daily
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: [true, "Start Date is required"]
    },
    endDate: {
        type: Date
    },
    complete: {
        type: Boolean
    }
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;