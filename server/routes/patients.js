const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const mongoose = require("mongoose");

// Load Doctor and Patient mongoose models
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

// Load validation
const validateRegisterInput = require("../validation/registerValidation");

// @route 	POST /api/patients/register
// @desc 	Register new patient
// @access 	Public
router.post("/register", (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body.userdata);
	// Check validation of input
	if (!isValid) {
		return res.status(400).json(errors);
	}

	Patient.findOne({ email: req.body.userdata.email })
		.then(patient => {
			// If finded user, user already exists
			if (patient) {
				errors.email = "Email already exists";
				return res.status(400).json(errors);
			} else {
				// If not, create new patient
				const newPatient = new Patient({
					firstName: req.body.userdata.firstName,
					lastName: req.body.userdata.lastName,
					email: req.body.userdata.email,
					password: req.body.userdata.password,
					typeOfUser: req.body.userdata.typeOfUser,
					color: req.body.userdata.color,
					settings: {},
					appointments: {
						monday: [],
						tuesday: [],
						wednesday: [],
						thursday: [],
						friday: []
					}
				});
				// Hash password with bcrypt
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newPatient.password, salt, (err, hash) => {
						if (err) throw err;
						newPatient.password = hash;
						newPatient
							.save()
							.then(patient => res.json(patient))
							.catch(err => console.log(err));
					});
				});
			}
		})
		.catch(err => console.log(err));
});

// @route 	POST /api/patients/adddoctor
// @desc 	Find token, and return doctor, if finded
// @access 	Private
router.post(
	"/adddoctor",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Doctor.findOne(
			{
				tokens: req.body.token
			},
			(err, doctor) => {
				if (err) console.log(err);
				if (doctor) {
					res.send(doctor);
				} else {
					console.log("Token invalid");
				}
			}
		);
	}
);

// @route 	POST /api/patients/merge
// @desc 	Add new doctor to patient`s list,
// @desc		and also new patient to doctor`s list
// @access 	Private
router.post(
	"/merge",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { doctor, patient } = req.body;
		Patient.findById(patient.id)
			.then(patient => {
				if (patient) {
					patient.doctors.push(doctor._id);
					patient.save().then(patient => res.json(patient));
				}
			})
			.catch(err => console.log(err));

		Doctor.findById(doctor._id)
			.then(doc => {
				if (doc) {
					doc.patients.push(patient.id);
					doc.save();
				}
			})
			.catch(err => console.log(err));
	}
);

// @route 	POST /api/patients/updateSettings
// @desc 	Update, set settings for patient
// @access 	Private
router.post(
	"/updateSettings",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { settings, user } = req.body;
		Patient.findById(user)
			.then(patient => {
				if (patient) {
					patient.settings = settings;
					patient.save();
				}
			})
			.catch(err => console.log(err));
	}
);

// @route 	GET /api/patients/:id
// @desc 	Fetch patients list for given doctor
// @access 	Private
router.get(
	"/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Patient.findById(req.params.id)
			.then(patient => {
				// Convert data from coreMongooseArray to normal view
				let monData = patient.doctors.map(
					elem => new mongoose.Types.ObjectId(elem._id)
				);
				// Find each doctor
				Doctor.find(
					{
						_id: {
							$in: monData
						}
					},
					(err, doctors) => {
						if (err) console.log(err);
						res.send(doctors);
					}
				);
			})
			.catch(err => console.log(err));
	}
);

// @route 	POST /api/patients/setdiaryrecord
// @desc 	Add diary record from doctor, to patient`s db record
// @access 	Private
router.post(
	"/setdiaryrecord",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { record, patientID } = req.body;
		Patient.findById(patientID).then(patient => {
			if (patient) {
				patient.diary.push(record);
				patient.save();
			}
		});
	}
);

// @route 	GET /api/patients/records/:id
// @desc 	Get all of patient`s diary records. Using for both sides
// @access 	Private
router.get(
	"/records/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Patient.findById(req.params.id)
			.then(patient => {
				if (patient) {
					res.send(patient.diary);
				}
			})
			.catch(err => console.log(err));
	}
);

// @route 	GET /api/patients/getSettings/:id
// @desc 	Get patient`s settings, for filling forms, etc
// @access 	Private
router.get(
	"/getSettings/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Patient.findById(req.params.id)
			.then(patient => {
				if (patient) {
					res.send(patient.settings);
				}
			})
			.catch(err => console.log(err));
	}
);

// @route 	POST /api/patients/setrecepie
// @desc 	Set recepie record for given patient
// @access 	Private
router.post(
	"/setrecepie",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { recepie, patientID } = req.body;
		Patient.findById(patientID).then(patient => {
			if (patient) {
				patient.recepies.push(recepie);
				patient.save();
			}
		});
	}
);

// @route 	GET /api/patients/recepies/:id
// @desc 	Get all of patient`s recepies records. Using for both sides
// @access 	Private
router.get(
	"/recepies/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Patient.findById(req.params.id).then(patient => {
			if (patient) {
				res.send(patient.recepies);
			}
		});
	}
);

// @route 	POST /api/patients/unsubscribe
// @desc 	Unregister given doctor from given patient
// @access 	Private
router.post(
	"/unsubscribe",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { patientID, doctorID } = req.body;
		Patient.findById(patientID)
			.then(patient => {
				// find needed doctor id and remove
				for (let i = 0; i < patient.doctors.length; i++) {
					if (
						patient.doctors[i]._id.toString() ===
						doctorID.toString()
					) {
						patient.doctors.splice(i, 1);
					}
				}
				patient.save();
			})
			.catch(err => console.log(err));

		Doctor.findById(doctorID)
			.then(doc => {
				// find needed patient id and remove
				for (let i = 0; i < doc.patients.length; i++) {
					if (
						doc.patients[i]._id.toString() === patientID.toString()
					) {
						doc.patients.splice(i, 1);
					}
				}
				doc.save();
			})
			.catch(err => console.log(err));
	}
);

// @route 	GET /api/patients/appointments/:id
// @desc 	Get all patient appointments
// @access 	Private
router.get(
	"/appointments/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Patient.findById(req.params.id)
			.then(patient => {
				if (patient) {
					res.send(patient.appointments);
				}
			})
			.catch(err => console.log(err));
	}
);

module.exports = router;
