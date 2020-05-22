const router = require("express").Router();
const docRoutes = require("./doctors");
const patientRoutes = require("./patients");

// Doctor routes
router.use("/doctors", docRoutes);
// Patient Routes
router.use("/patients", patientRoutes);

module.exports = router;
