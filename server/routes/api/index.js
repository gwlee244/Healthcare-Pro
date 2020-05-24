const router = require("express").Router();
const docRoutes = require("./doctors");
const patientRoutes = require("./patients");
const scripRoutes = require("./prescriptions");
const appRoutes = require("./appointments");

// Doctor routes
router.use("/doctors", docRoutes);
// Patient Routes
router.use("/patients", patientRoutes);
// Prescription Routes
router.use("/prescriptions", scripRoutes);
// Prescription Routes
router.use("/appointments", appRoutes);

module.exports = router;
