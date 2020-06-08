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
  email: {
    type: String,
    required: [true, "At least one school is required"]
  },
  password: {
    type: String,
    required: [true, "Date of Birth is required"]
  },
  patients : [{
    patient : {
        type: Schema.Types.ObjectId,
        ref: "patients"
    }
}],
  appointments: {
    type: [Schema.Types.Mixed]
  },
  typeOfUser: {
    type: String,
  },
  tokens: {
    type: [String]
  },
  created: {
    type: Date,
    default: Date.now
  },
  settings: {
    type: Schema.Types.Mixed
  },
  color: {
    type: String
  },
  stars: {
    type: [String],
    default: ["0", "0", "0", "0", "0"]
  }
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;