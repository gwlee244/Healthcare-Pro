const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last name is required"]
    },
    dob: {
        type: Date
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    conditions: [{
        type: String
    }],
    allergies: [{
        type: String
    }],
    prescriptions: [{
        type: Schema.Types.ObjectId,
        ref: 'Prescription'
    }],
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;