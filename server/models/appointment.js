const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    date: {
        type: Date,
        required: [true, "Start Date is required"]
    },
    length: {
        type: Number,
        required: [true, "Appoinment length is required"]
    },
    reason: {
        type: String
    },
    followUp: {
        type: Boolean
    },
    notes: {
        type: String
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;