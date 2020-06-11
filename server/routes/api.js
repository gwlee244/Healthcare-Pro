const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const passport = require("passport");

// Load Patient & Doctor mongoose models
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");

// Load input validation
const validateLoginInput = require("../validation/loginValdation");

// @route POST api/user/login
// @desc  login user
// access Public
router.post("/login", (req, res) => {
  console.log(req.body);
	const { errors, isValid } = validateLoginInput(req.body.userdata);
	const { email, password } = req.body.userdata;
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	// Try find a user
	Patient.findOne({
		email
	})
		.then(patient => {
			if (patient) {
				// Compare hashed passwords with bcrypt
				bcrypt.compare(password, patient.password).then(isMatch => {
					if (isMatch) {
						// User Matched
						const payload = {
							id: patient.id,
							firstName: patient.firstName,
							lastName: patient.lastName,
							typeOfUser: "Patient"
						}; // Create JWT Payload
						// Sign Token
						jwt.sign(payload, keys.secretKey,(err, token) => {
							if (err) console.log(err + "ERROR");
							res.json({
								success: true,
								token: "Bearer " + token
							});
						});
					} else {
						console.log(`Password incorrect`);
						errors.password = "Password incorrect";
						return res.status(404).json(errors);
					}
				});
			} else {
				// Again try find a user
				Doctor.findOne({
					email
				}).then(doctor => {
					// Check validation
					if (!doctor) {
						errors.email = "User not found";
						return res.status(404).json(errors);
					}
					if (doctor) {
						bcrypt
							.compare(password, doctor.password)
							.then(isMatch => {
								if (isMatch) {
									// User Matched
									const payload = {
										id: doctor.id,
										firstName: doctor.firstName,
										lastName: doctor.lastName,
										typeOfUser: "Doctor"
									}; // Create JWT Payload
									// Sign Token
									jwt.sign(
										payload,
										keys.secretKey,
										(err, token) => {
											if (err) console.log(err);
											res.json({
												success: true,
												token: "Bearer " + token
											});
										}
									);
									console.log(`User matched!`);
								} else {
									console.log("Password incorrect");
									errors.password = "Password incorrect";
									return res.status(404).json(errors);
								}
							});
					} else {
						// If both don`t found, user don`t exist
						errors.email = "User not found";
						return res.status(404).json(errors);
					}
				});
			}
		})
		.catch(err => console.log(err));
});

// @route 	GET /api/user/get/:id
// @desc 	get data about user, for their profile
// @access 	Private
router.get(
	"/get/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		console.log(req.params);
		Doctor.findById(req.params.id.substring(1))
			.then(doc => {
				if (doc) {
					console.log("doc " + doc);
					res.send(doc);
				} else {
					Patient.findById(req.params.id.substring(1)).then(
						patient => {
							if (patient) {
								console.log("patient " + patient);
								res.send(patient);
							} else res.status(400).send();
						}
					);
				}
			})
			.catch(err => console.log(err));
	}
);

module.exports = router;
