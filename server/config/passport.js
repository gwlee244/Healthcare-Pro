// passport config
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const keys = require("./keys");
const Doctor = mongoose.model("Doctor");
const Patient = mongoose.model("Patient");

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = passport => {
	passport.use(
		new JWTStrategy(opts, (jwt_payload, done) => {
			Doctor.findById(jwt_payload.id)
				.then(doctor => {
					if (doctor) {
						return done(null, doctor);
					} else {
						Patient.findById(jwt_payload.id).then(patient => {
							if (patient) {
								return done(null, patient);
							} else {
								return done(null, false);
							}
						});
					}
				})
				.catch(err => console.log(err));
		})
	);
};
