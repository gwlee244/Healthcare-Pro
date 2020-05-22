const router = require("express").Router();
const scripController = require("../../controllers/prescriptionController");

// matches with "/api/prescriptions/:patId"
router.route("/:patId")
    .get(scripController.findAllScrips)
    .post(scripController.createScrip)
// matches with "/api/prescriptions/:id"
router.route("/:id")  
    .put(scripController.updateScrip)
// matches with "/api/prescriptions/:patId/:id"
router.route("/:patId/:id")
    .delete(scripController.removeScrip)

module.exports = router;
    