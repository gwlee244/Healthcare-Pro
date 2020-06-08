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
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
    typeOfUser: {
		type: String
	},
	doctors: [
		{
			doctor: {
				type: Schema.Types.ObjectId,
				ref: "doctors"
			}
		}
	],
	settings: {
		type: Schema.Types.Mixed
	},
	created: {
		type: Date,
		default: Date.now
	},
	color: {
		type: String
	},
	diary: {
		type: [Schema.Types.Mixed]
	},
	recepies: {
		type: [Schema.Types.Mixed]
	},
    appointments: {
        type: [Schema.Types.Mixed],
    }
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;