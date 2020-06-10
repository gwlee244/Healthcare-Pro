const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const mongoose = require("mongoose");
const omitEmpty = require("omit-empty");
const chartConfig = require("../config/charts");

// Helpers functions
const statsHelpers = require("../../client/src/helpers/statsHelpers");

// Load Doctor & Patient mongoose models
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

// Load input validation
const validateRegisterInput = require("../validation/registerValidation");

// @route 		POST /api/doctors/register
// @desc	  	register doctor
// @access		Public
router.post("/register", (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body.userdata);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	Doctor.findOne({ email: req.body.userdata.email })
		.then(doc => {
			if (doc) {
				// If user found, user already exists
				errors.email = "Email already exists";
				return res.status(400).json(errors);
			} else {
				// Create new
				const newDoctor = new Doctor({
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
					if (err) throw err;
					bcrypt.hash(newDoctor.password, salt, (err, hash) => {
						if (err) throw err;
						newDoctor.password = hash;
						newDoctor
							.save()
							.then(doctor => res.json(doctor))
							.catch(err => console.log(err));
					});
				});
			}
		})
		.catch(err => console.log(err));
});

// @route 	POST /api/doctors/tokens
// @desc  	add generated doctor token to db
// @access 	Private
router.post(
	"/tokens",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Doctor.findByIdAndUpdate(
			req.body.id,
			{
				$push: {
					tokens: req.body.token
				}
			},
			{
				new: true,
				upsert: true
			},
			(err, doctor) => {
				if (err) console.log(err);
			}
		);
	}
);

// @route 	GET /api/doctors/:id
// @desc 	Get list of doctors for given patient
// @access 	Private
router.get(
	"/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Doctor.findById(req.params.id)
			.then(doc => {
				// Convert data from coreMongooseArray to normal view
				let monData = doc.patients.map(
					elem => new mongoose.Types.ObjectId(elem._id)
				);
				// Find each patient
				Patient.find(
					{
						_id: {
							$in: monData
						}
					},
					(err, patients) => {
						if (err) console.log(err);
						res.send(patients);
					}
				);
			})
			.catch(err => console.log(err));
	}
);

// @route 	GET /api/doctors/getSettings/:id
// @desc 	Get settings from db
// @access 	Private
router.get(
	"/getSettings/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Doctor.findById(req.params.id)
			.then(doc => {
				if (doc) {
					res.send(doc.settings);
				}
			})
			.catch(err => console.log(err));
	}
);

// @route 	POST /api/doctors/updateSettings
// @desc 	Update, set settings TO db
// @access 	Private
router.post(
	"/updateSettings",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { settings, user } = req.body;
		Doctor.findById(user)
			.then(doc => {
				if (doc) {
					doc.settings = settings;
					doc.save();
				}
			})
			.catch(err => console.log(err));
	}
);
// @route 	GET /api/doctors/appointments/:id
// @desc 	Get appointments from db
// @access 	Private
router.get(
	"/appointments/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Doctor.findById(req.params.id).then(doc => {
			if (doc) {
				res.send(doc.appointments);
			} else res.send("Doctor not found");
		});
	}
);

// @route 	POST /api/doctors/rating
// @desc 	Set value of rating (from patient) to db
// @access 	Private
router.post(
	"/rating",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { doctorID, stars } = req.body;
		Doctor.findById(doctorID)
			.then(doc => {
				if (doc) {
					doc.stars.push(stars);
					doc.save();
				}
			})
			.catch(err => console.log(err));
	}
);

// @route 	POST /api/doctors/appointments/add
// @desc 	Adding appointments to both users
// @access 	Private
router.post(
	"/appointments/add",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { doctorID, patientID, appointment} = req.body;
		Doctor.findById(doctorID)
			.then(doc => {
				if (doc) {
					// Reasigning because mongoose dont let assign directly nested objects i guess
					let tempApps = doc.appointments;
					tempApps.push(appointment);
					doc.appointments = null;
					doc.appointments = tempApps;
					doc.save();

					// Adding appointment to patient, that initiates this
					Patient.findById(patientID).then(patient => {
						if (patient) {
							appointment.text = `Dr. ${doc.firstName} ${
								doc.lastName
							} ${
								doc.settings.cabinet
									? `Room #${doc.settings.cabinet}`
									: ""
							}`;
							// Reasigning because mongoose dont let assign directly nested objects i guess
							let tempApps = patient.appointments;
							tempApps.push(appointment);
							patient.appointments = null;
							patient.appointments = tempApps;
							patient.save();
						}
					});
				}
			})
			.catch(err => console.log(err));
	}
);

// @route 	GET /api/doctors/stats/:id
// @desc 	Fetching doctor stats data, with formatting it to acceptable view for charts (apex charts)
// @access 	Private
router.get(
	"/stats/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// parameters of data for charts
		const {
			quantity,
			sexesPie,
			sexesBar,
			satisfaction,
			monthlyVisitors
		} = chartConfig;
		// vars for chart pie with sexes
		let sexesPieMen = 0,
			sexesPieWomen = 0;
		Doctor.findById(req.params.id)
			.then(doc => {
				// @quantity
				quantity.options.labels[0] = doc.patients.length;
				// @quantity

				// @monthly visits
				monthlyVisitors.options.labels[0] = doc.appointments.length;
				
				// @monthly visits

				// @business
				// business.series = statsHelpers.getVisitsData(doc.appointments);
				// @business

				// @satisfaction
				satisfaction.series = statsHelpers.countInArray(doc.stars);
				// @satisfaction

				// Convert data from coreMongooseArray to normal view
				let mongooseData = doc.patients.map(
					elem => new mongoose.Types.ObjectId(elem._id)
				);
				Patient.find(
					{ _id: { $in: mongooseData } },
					(err, patients) => {
						if (err) console.log(err);
						// @ages
						sexesBar.series = statsHelpers.getAgesData(patients);
						// @ages

						// @sexesPieChart
						patients.forEach(patient => {
							if (patient.settings) {
								switch (patient.settings.sex) {
									case "male":
										sexesPieMen++;
										break;
									case "female":
										sexesPieWomen++;
										break;
									default:
										break;
								}
							}
						});

						sexesPie.series[0] = sexesPieMen;
						sexesPie.series[1] = sexesPieWomen;
						// @sexesPieChart

						res.send({
							quantity,
							sexesPie,
							sexesBar,
							satisfaction,
							monthlyVisitors
						});
					}
				);
			})
			.catch(err => console.log(err));
	}
);

module.exports = router;
