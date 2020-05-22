const router = require("express").Router();
const patientController = require("../../controllers/patientController");

// matches with "/api/patients/"
router.route("/")  
    .post(patientController.createPatient)
// matches with "/api/patients/:docId"
router.route("/:docId")
    .get(patientController.findAllPatients)
    .post(patientController.createPatientWithDoc)
// matches with "/api/patients/:id"
router.route("/:id")  
    .put(patientController.updatePatient)
// matches with "/api/patients/:docId/:id"
router.route("/:docId/:id")
    .delete(patientController.removePatient)
    .put(patientController.removePatientFromDoc)
// matches with "/api/patients/updatedoc/:docId/:id"
router.route("/updatedoc/:docId/:id")    
    .put(patientController.updatePatientDoc)

module.exports = router;