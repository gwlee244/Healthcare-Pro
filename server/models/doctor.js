const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
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
    schools: [{
        type: String,
        required: [true, "At least one school is required"]
    }],
    dob: {
        type: Date,
        required: [true, "Date of Birth is required"]
    },
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    type: {
        type: String,
        required: [true, "Physician Type is required"]
    }
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;