const router = require("express").Router();
const doctorController = require("../../controllers/doctorController");

// matches with "/api/doctors"
router.route("/")
    .get(doctorController.findAllDocs)
    .post(doctorController.createDoc)

    // Matches with "/api/doctors/:id"
router.route("/:id")
    .get(doctorController.findDocById)
    .put(doctorController.updateDoc)
    .delete(doctorController.removeDoc)

module.exports = router;