const router = require("express").Router();
const appController = require("../../controllers/appointmentController");

// matches with "/api/appointments/doctor/:docId"
router.route("/doctor/:docId")
    .get(appController.findAllDocApps)
// matches with "/api/appointments/patient/:patId"
router.route("/patient/:patId")
    .get(appController.findAllPatApps)
// matches with "/api/appointments/:id"
router.route("/:id")  
    .put(appController.updateApp)
// matches with "/api/appointments/:patId/:docId/:id"
router.route("/:patId/:docId/:id")
    .delete(appController.removeApp)
    .post(appController.createApp)

module.exports = router;