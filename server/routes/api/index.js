const router = require("express").Router();
const docRoutes = require("./doctors");
const patientRoutes = require("./patients");
const scripRoutes = require("./prescriptions");

// Doctor routes
router.use("/doctors", docRoutes);
// Patient Routes
router.use("/patients", patientRoutes);
// Prescription Routes
router.use("/prescriptions", scripRoutes);

module.exports = router;
